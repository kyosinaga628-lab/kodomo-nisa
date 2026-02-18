#!/usr/bin/env python3
"""
Fear & Greed Index 日本版 - データ取得スクリプト
yfinance を用いて日本市場の7指標を取得しスコアリングする。
出力: data.json

エラーハンドリング:
- 各指標は独立して計算。1つが失敗しても他は正常に動作。
- 既存の data.json がある場合、全指標失敗時はタイムスタンプのみ更新。
- ネットワークエラー時はリトライ。
"""

import json
import os
import sys
import time
import datetime
import traceback
import numpy as np
import yfinance as yf

# ============================================================
# 設定
# ============================================================

MAX_RETRIES = 3
RETRY_DELAY = 5  # 秒
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PATH = os.path.join(SCRIPT_DIR, "data.json")

# ============================================================
# ユーティリティ
# ============================================================

def clamp(v, lo=0, hi=100):
    return max(lo, min(hi, v))

def score_label(score):
    if score <= 25:
        return "極度の恐怖"
    elif score <= 45:
        return "恐怖"
    elif score <= 55:
        return "中立"
    elif score <= 75:
        return "貪欲"
    else:
        return "極度の貪欲"

def get_close(df):
    """yfinance の MultiIndex DataFrame から Close の Series を取得"""
    close = df['Close']
    if hasattr(close, 'columns'):
        close = close.iloc[:, 0]
    return close.dropna()

def safe_series(series):
    """NaN を除去して list に変換"""
    s = series.dropna()
    return [round(float(s.iloc[i]), 2) for i in range(len(s))]

def date_str(dt):
    if hasattr(dt, 'strftime'):
        return dt.strftime('%Y-%m-%d')
    return str(dt)[:10]

def download_with_retry(ticker, period="1y", **kwargs):
    """リトライ付きでyfinanceからダウンロード"""
    last_error = None
    for attempt in range(MAX_RETRIES):
        try:
            data = yf.download(ticker, period=period, progress=False,
                               auto_adjust=True, **kwargs)
            if data is not None and not data.empty:
                return data
            if attempt < MAX_RETRIES - 1:
                print(f"    ⚠ {ticker}: データ空。リトライ中... ({attempt + 1}/{MAX_RETRIES})")
                time.sleep(RETRY_DELAY)
        except Exception as e:
            last_error = e
            if attempt < MAX_RETRIES - 1:
                print(f"    ⚠ {ticker}: エラー発生 ({e})。リトライ中... ({attempt + 1}/{MAX_RETRIES})")
                time.sleep(RETRY_DELAY)
    print(f"    ✗ {ticker}: データ取得に失敗 (最終エラー: {last_error})")
    return None

def load_existing_data():
    """既存の data.json を読み込む(フォールバック用)"""
    if os.path.exists(OUTPUT_PATH):
        try:
            with open(OUTPUT_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return None

# ============================================================
# 指標 1: 市場モメンタム (日経225 vs 125日移動平均)
# ============================================================

def calc_market_momentum(nikkei_close):
    close = nikkei_close
    if len(close) < 126:
        return 50, {}, {}

    ma125 = close.rolling(125).mean()
    current = float(close.iloc[-1])
    ma_val = float(ma125.iloc[-1])

    # 乖離率ベースでスコア算出: -10%→0, 0%→50, +10%→100
    deviation = (current - ma_val) / ma_val
    score = clamp(50 + deviation * 500)

    dates = [date_str(d) for d in close.index[-252:]]
    chart_close = safe_series(close[-252:])
    chart_ma = safe_series(ma125[-252:])

    return round(score, 1), {
        "dates": dates,
        "close": chart_close,
        "ma125": chart_ma
    }, {
        "current": round(current, 2),
        "ma125": round(ma_val, 2),
        "deviation": round(deviation * 100, 2)
    }

# ============================================================
# 指標 2: 株価の強さ (52週高値/安値比率)
# ============================================================

SAMPLE_TICKERS = [
    "7203.T", "6758.T", "9984.T", "8306.T", "6861.T",
    "7267.T", "6902.T", "4063.T", "9433.T", "8035.T",
    "6501.T", "7974.T", "4502.T", "6367.T", "3382.T",
    "2914.T", "8058.T", "9432.T", "6098.T", "4661.T",
    "6762.T", "7751.T", "8766.T", "4519.T", "6954.T",
    "8001.T", "5401.T", "6301.T", "2802.T", "9020.T",
]

def calc_stock_strength():
    highs = 0
    lows = 0
    total = 0
    failed = 0

    for t in SAMPLE_TICKERS:
        try:
            hist = download_with_retry(t, period="1y")
            if hist is None or hist.empty or len(hist) < 20:
                failed += 1
                continue
            close = get_close(hist)
            if len(close) < 20:
                failed += 1
                continue
            current = float(close.iloc[-1])
            high_52 = float(close.max())
            low_52 = float(close.min())

            range_52 = high_52 - low_52
            if range_52 == 0:
                continue

            pos = (current - low_52) / range_52
            if pos > 0.9:
                highs += 1
            elif pos < 0.1:
                lows += 1
            total += 1
        except Exception:
            failed += 1
            continue

    if total == 0:
        return None, {}, {}

    ratio = (highs - lows) / total
    score = clamp(50 + ratio * 50)

    return round(score, 1), {}, {
        "highs": highs,
        "lows": lows,
        "total": total,
        "ratio": round(ratio, 3)
    }

# ============================================================
# 指標 3: 騰落レシオ (Advance/Decline Ratio)
# ============================================================

def calc_breadth():
    advances = 0
    declines = 0
    failed = 0

    for t in SAMPLE_TICKERS:
        try:
            hist = download_with_retry(t, period="5d")
            if hist is None or hist.empty or len(hist) < 2:
                failed += 1
                continue
            close = get_close(hist)
            if len(close) < 2:
                failed += 1
                continue
            if float(close.iloc[-1]) > float(close.iloc[-2]):
                advances += 1
            else:
                declines += 1
        except Exception:
            failed += 1
            continue

    total = advances + declines
    if total == 0:
        return None, {}, {}

    ratio = advances / total
    score = clamp(ratio * 100)

    return round(score, 1), {}, {
        "advances": advances,
        "declines": declines,
        "ratio": round(ratio, 3)
    }

# ============================================================
# 指標 4: プット・コール比率 (推計)
# ============================================================

def calc_put_call(nikkei_close):
    """
    日経225オプションのP/C比率の直接APIはないため、
    ボラティリティと価格変動から推計する。
    直近5日の下落幅が大きいほど恐怖(P/C高い)と推定。
    """
    close = nikkei_close
    if len(close) < 6:
        return None, {}, {}

    returns_5d = []
    for i in range(-5, 0):
        if i - 1 >= -len(close):
            r = float(close.iloc[i]) / float(close.iloc[i - 1]) - 1
            returns_5d.append(r)

    if not returns_5d:
        return None, {}, {}

    avg_ret = np.mean(returns_5d)
    # 大きな下落 → P/C高い → 恐怖, 大きな上昇 → P/C低い → 貪欲
    score = clamp(50 + avg_ret * 2000)

    estimated_pc = round(1.0 - avg_ret * 20, 2)

    return round(score, 1), {}, {
        "estimated_pc_ratio": estimated_pc,
        "avg_5d_return": round(avg_ret * 100, 3)
    }

# ============================================================
# 指標 5: 市場ボラティリティ (日経VI)
# ============================================================

def calc_volatility():
    vi_data = download_with_retry("^JNV", period="1y")

    if vi_data is not None and not vi_data.empty:
        close = get_close(vi_data)
    else:
        # フォールバック: 日経225のボラティリティを計算
        print("    ℹ 日経VI直接取得不可。日経225ボラティリティで代替。")
        nk = download_with_retry("^N225", period="1y")
        if nk is None:
            return None, {}, {}
        close_nk = get_close(nk)
        vol = close_nk.pct_change().rolling(20).std() * np.sqrt(252) * 100
        close = vol.dropna()

    if len(close) < 51:
        return None, {}, {}

    ma50 = close.rolling(50).mean()
    current = float(close.iloc[-1])
    ma_val = float(ma50.iloc[-1])

    # VI高い → 恐怖, VI低い → 貪欲  (逆相関)
    deviation = (current - ma_val) / ma_val if ma_val != 0 else 0
    score = clamp(50 - deviation * 250)

    dates = [date_str(d) for d in close.index[-252:]]
    chart_vi = safe_series(close[-252:])
    chart_ma = safe_series(ma50[-252:])

    return round(score, 1), {
        "dates": dates,
        "vi": chart_vi,
        "ma50": chart_ma
    }, {
        "current": round(current, 2),
        "ma50": round(ma_val, 2),
        "deviation": round(deviation * 100, 2)
    }

# ============================================================
# 指標 6: 安全資産需要 (国債ETF vs 株式ETF の20日リターン)
# ============================================================

def calc_safe_haven():
    bond_ticker = "2510.T"
    stock_ticker = "1321.T"

    bond = download_with_retry(bond_ticker, period="6mo")
    stock = download_with_retry(stock_ticker, period="6mo")

    if bond is None or stock is None:
        return None, {}, {}

    bond_close = get_close(bond)
    stock_close = get_close(stock)

    if len(bond_close) < 21 or len(stock_close) < 21:
        return None, {}, {}

    bond_ret = float(bond_close.iloc[-1]) / float(bond_close.iloc[-21]) - 1
    stock_ret = float(stock_close.iloc[-1]) / float(stock_close.iloc[-21]) - 1

    diff = stock_ret - bond_ret
    score = clamp(50 + diff * 800)

    return round(score, 1), {}, {
        "bond_20d_return": round(bond_ret * 100, 2),
        "stock_20d_return": round(stock_ret * 100, 2),
        "diff": round(diff * 100, 2)
    }

# ============================================================
# 指標 7: 社債需要 (ハイイールド vs 投資適格のスプレッド)
# ============================================================

def calc_junk_bond():
    hy_ticker = "1496.T"
    safe_ticker = "2510.T"

    hy = download_with_retry(hy_ticker, period="6mo")
    safe = download_with_retry(safe_ticker, period="6mo")

    if hy is None or safe is None:
        return None, {}, {}

    hy_close = get_close(hy)
    safe_close = get_close(safe)

    if len(hy_close) < 21 or len(safe_close) < 21:
        return None, {}, {}

    hy_ret = float(hy_close.iloc[-1]) / float(hy_close.iloc[-21]) - 1
    safe_ret = float(safe_close.iloc[-1]) / float(safe_close.iloc[-21]) - 1

    diff = hy_ret - safe_ret
    score = clamp(50 + diff * 1000)

    return round(score, 1), {}, {
        "hy_20d_return": round(hy_ret * 100, 2),
        "safe_20d_return": round(safe_ret * 100, 2),
        "diff": round(diff * 100, 2)
    }

# ============================================================
# 日経225 ヒストリカルデータ（タイムライン用）
# ============================================================

def calc_historical_index(nikkei_close):
    """過去1年の日経225の終値からFear & Greedの推移を概算"""
    close = nikkei_close
    if len(close) < 126:
        return []

    ma125 = close.rolling(125).mean()
    vol = close.pct_change().rolling(20).std() * np.sqrt(252)

    results = []
    for i in range(125, len(close)):
        c = float(close.iloc[i])
        m = float(ma125.iloc[i])
        v = float(vol.iloc[i]) if not np.isnan(vol.iloc[i]) else 0.15

        momentum_score = clamp(50 + ((c - m) / m) * 500)
        vol_score = clamp(50 - (v - 0.15) * 300)
        approx_score = (momentum_score + vol_score) / 2

        results.append({
            "date": date_str(close.index[i]),
            "score": round(approx_score, 1)
        })

    return results

# ============================================================
# HTML更新 (dateModified)
# ============================================================

def update_html_timestamp():
    """index.html の dateModified を更新する"""
    html_path = os.path.join(SCRIPT_DIR, "index.html")
    if not os.path.exists(html_path):
        print("  ⚠ index.html が見つかりません。タイムスタンプ更新をスキップします。")
        return

    try:
        with open(html_path, "r", encoding="utf-8") as f:
            content = f.read()

        import re
        today = datetime.datetime.now().strftime("%Y-%m-%d")
        
        # JSON-LD内の dateModified を更新
        # "dateModified": "2026-02-17" のようなパターン
        new_content = re.sub(
            r'"dateModified": "\d{4}-\d{2}-\d{2}"',
            f'"dateModified": "{today}"',
            content
        )

        if content != new_content:
            with open(html_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"  ✅ index.html の dateModified を更新しました: {today}")
        else:
            print("  ℹ index.html の日付は既に最新です。")

    except Exception as e:
        print(f"  ⚠ index.html の更新に失敗しました: {e}")

# ============================================================
# メイン
# ============================================================

def main():
    print("📊 Fear & Greed Index 日本版 - データ取得中...")
    print(f"   開始時刻: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    errors = []

    # 日経225 ヒストリカルデータ取得
    print("  日経225データ取得中...")
    nikkei = download_with_retry("^N225", period="2y")
    if nikkei is None:
        print("  ✗ 致命的エラー: 日経225データを取得できませんでした。")
        existing = load_existing_data()
        if existing:
            existing["updated"] = datetime.datetime.now().strftime("%Y年%m月%d日 %H:%M") + " (更新失敗 - 前回データ)"
            with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
                json.dump(existing, f, ensure_ascii=False, indent=2)
            print("  ⚠ 前回のデータを保持しました（タイムスタンプのみ更新）。")
            
            # HTMLのタイムスタンプ更新（UI上の更新時刻が変わるため）
            update_html_timestamp()
        else:
            print("  ✗ フォールバック用の既存データもありません。")
        sys.exit(1)

    nk_close_series = get_close(nikkei)

    # TOPIX
    print("  TOPIXデータ取得中...")
    topix = download_with_retry("1306.T", period="5d")
    topix_close = get_close(topix) if topix is not None else None

    # --- 各指標を計算（各指標のエラーは独立） ---

    indicator_results = []
    indicator_configs = [
        {
            "id": "momentum", "name": "市場モメンタム",
            "name_en": "Market Momentum",
            "description": "日経平均株価と125日移動平均線の乖離率を測定します。株価が移動平均線を上回っていると強気シグナル、下回っていると弱気シグナルとなります。",
            "calc": lambda: calc_market_momentum(nk_close_series),
        },
        {
            "id": "strength", "name": "株価の強さ",
            "name_en": "Stock Price Strength",
            "description": "東証主要銘柄の52週高値・安値近辺にある銘柄数の比率を分析します。高値圏の銘柄が多いほど貪欲、安値圏が多いほど恐怖を示します。",
            "calc": lambda: calc_stock_strength(),
        },
        {
            "id": "breadth", "name": "騰落レシオ",
            "name_en": "Stock Price Breadth",
            "description": "上昇銘柄数と下落銘柄数の比率（騰落レシオ）を分析します。上昇銘柄が多いほど市場全体に買いが広がっていることを示します。",
            "calc": lambda: calc_breadth(),
        },
        {
            "id": "put_call", "name": "プット・コール比率",
            "name_en": "Put and Call Options",
            "description": "日経225オプション市場の弱気度合いを推計します。プット（売る権利）の比率が高いほど投資家が下落を警戒していることを示します。",
            "calc": lambda: calc_put_call(nk_close_series),
        },
        {
            "id": "volatility", "name": "市場ボラティリティ",
            "name_en": "Market Volatility",
            "description": "日経VIおよびその50日移動平均を使い、市場の変動性を測定します。ボラティリティが高いほど投資家の不安が大きいことを示します。",
            "calc": lambda: calc_volatility(),
        },
        {
            "id": "safe_haven", "name": "安全資産需要",
            "name_en": "Safe Haven Demand",
            "description": "日本国債と株式の直近20日間のリターンを比較します。国債のリターンが株式を上回る場合、投資家がリスク資産から安全資産へ逃避していることを示します。",
            "calc": lambda: calc_safe_haven(),
        },
        {
            "id": "junk_bond", "name": "社債需要",
            "name_en": "Junk Bond Demand",
            "description": "社債と安全資産のリターン差を分析します。社債が好調な場合はリスク選好（貪欲）、不調な場合はリスク回避（恐怖）を示します。",
            "calc": lambda: calc_junk_bond(),
        },
    ]

    for i, config in enumerate(indicator_configs, 1):
        print(f"  指標{i}: {config['name']}...")
        try:
            score, chart, detail = config["calc"]()
            if score is None:
                print(f"    ⚠ {config['name']}: データ不足のためスコア50（中立）で代替")
                score = 50
                errors.append(f"{config['name']}: データ不足")

            indicator_results.append({
                "id": config["id"],
                "name": config["name"],
                "name_en": config["name_en"],
                "score": score,
                "label": score_label(score),
                "description": config["description"],
                "chart": chart if chart else {},
                "detail": detail if detail else {},
            })
        except Exception as e:
            print(f"    ✗ {config['name']}: エラー発生 ({e})")
            traceback.print_exc()
            errors.append(f"{config['name']}: {e}")
            indicator_results.append({
                "id": config["id"],
                "name": config["name"],
                "name_en": config["name_en"],
                "score": 50,
                "label": "中立",
                "description": config["description"],
                "chart": {},
                "detail": {"error": "データ取得失敗"},
            })

    # 総合スコア
    scores = [ind["score"] for ind in indicator_results]
    overall = round(sum(scores) / len(scores), 1)

    # タイムライン
    print("  タイムライン計算中...")
    try:
        timeline = calc_historical_index(nk_close_series)
    except Exception as e:
        print(f"    ⚠ タイムライン計算エラー: {e}")
        timeline = []
        errors.append(f"タイムライン: {e}")

    # 日経225 / TOPIX 現在値
    nikkei_current = round(float(nk_close_series.iloc[-1]), 2)
    nikkei_prev = round(float(nk_close_series.iloc[-2]), 2) if len(nk_close_series) > 1 else nikkei_current
    nikkei_change = round(nikkei_current - nikkei_prev, 2)
    nikkei_change_pct = round((nikkei_change / nikkei_prev) * 100, 2) if nikkei_prev else 0

    if topix_close is not None and len(topix_close) > 0:
        topix_current = round(float(topix_close.iloc[-1]), 2)
        topix_prev = round(float(topix_close.iloc[-2]), 2) if len(topix_close) > 1 else topix_current
        topix_change = round(topix_current - topix_prev, 2)
        topix_change_pct = round((topix_change / topix_prev) * 100, 2) if topix_prev else 0
    else:
        topix_current = 0
        topix_prev = 0
        topix_change = 0
        topix_change_pct = 0
        errors.append("TOPIX: データ取得失敗")

    # 過去のスコア概算
    prev_close_score = timeline[-1]["score"] if len(timeline) >= 1 else overall
    week_ago_score = timeline[-5]["score"] if len(timeline) >= 5 else overall
    month_ago_score = timeline[-22]["score"] if len(timeline) >= 22 else overall
    year_ago_score = timeline[0]["score"] if len(timeline) > 0 else overall

    now = datetime.datetime.now().strftime("%Y年%m月%d日 %H:%M")

    data = {
        "updated": now,
        "overall": {
            "score": overall,
            "label": score_label(overall),
            "previous_close": round(prev_close_score, 1),
            "week_ago": round(week_ago_score, 1),
            "month_ago": round(month_ago_score, 1),
            "year_ago": round(year_ago_score, 1),
        },
        "market": {
            "nikkei225": {
                "value": nikkei_current,
                "change": nikkei_change,
                "change_pct": nikkei_change_pct
            },
            "topix": {
                "value": topix_current,
                "change": topix_change,
                "change_pct": topix_change_pct
            }
        },
        "indicators": indicator_results,
        "timeline": timeline
    }

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n✅ データ出力完了: {OUTPUT_PATH}")
    print(f"   総合スコア: {overall} ({score_label(overall)})")
    for ind in data["indicators"]:
        print(f"   {ind['name']}: {ind['score']} ({ind['label']})")

    if errors:
        print(f"\n⚠ 警告 ({len(errors)}件):")
        for err in errors:
            print(f"   - {err}")

    print(f"\n   完了時刻: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # HTMLのタイムスタンプ更新
    update_html_timestamp()

if __name__ == "__main__":
    main()
