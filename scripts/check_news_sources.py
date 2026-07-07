#!/usr/bin/env python3
"""官公庁の情報源ページの更新を検知するスクリプト。

毎週 GitHub Actions から実行され、監視対象ページの本文ハッシュを
scripts/news_watch_state.json と比較する。変更があれば標準出力に
変更のあったソース名を1行ずつ出力し、状態ファイルを更新する。

初回実行時（状態ファイルなし）はベースラインを保存するだけで、
変更としては報告しない。

使い方:
    python scripts/check_news_sources.py
"""

import hashlib
import json
import re
import sys
import urllib.request
from pathlib import Path

STATE_FILE = Path(__file__).parent / "news_watch_state.json"

# 監視対象（名前, URL）。ニュース更新の起点となる一次情報源を登録する。
WATCHED_SOURCES = [
    {
        "name": "金融庁 NISA特設ウェブサイト",
        "url": "https://www.fsa.go.jp/policy/nisa2/index.html",
    },
    {
        "name": "財務省 令和8年度税制改正",
        "url": "https://www.mof.go.jp/tax_policy/tax_reform/outline/fy2026/index.html",
    },
    {
        "name": "日本銀行 金融政策決定会合",
        "url": "https://www.boj.or.jp/mopo/mpmdeci/index.htm",
    },
]

USER_AGENT = "Mozilla/5.0 (compatible; kodomo-nisa-news-watch/1.0)"


def fetch_content_hash(url: str) -> str | None:
    """ページ本文のハッシュを返す。取得失敗時は None。"""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=30) as res:
            html = res.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"WARN: fetch failed for {url}: {e}", file=sys.stderr)
        return None

    # script/style を除去し、タグを剥がして本文テキストだけを比較対象にする
    text = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", html, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def main() -> int:
    old_state: dict[str, str] = {}
    first_run = not STATE_FILE.exists()
    if not first_run:
        old_state = json.loads(STATE_FILE.read_text(encoding="utf-8"))

    new_state: dict[str, str] = {}
    changed: list[str] = []

    for source in WATCHED_SOURCES:
        digest = fetch_content_hash(source["url"])
        if digest is None:
            # 取得失敗時は前回の値を維持（誤検知を防ぐ）
            if source["url"] in old_state:
                new_state[source["url"]] = old_state[source["url"]]
            continue
        new_state[source["url"]] = digest
        if not first_run and old_state.get(source["url"]) not in (None, digest):
            changed.append(f"{source['name']} ({source['url']})")

    STATE_FILE.write_text(
        json.dumps(new_state, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    for line in changed:
        print(line)
    return 0


if __name__ == "__main__":
    sys.exit(main())
