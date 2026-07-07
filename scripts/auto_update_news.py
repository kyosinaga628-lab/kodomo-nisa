#!/usr/bin/env python3
"""官公庁RSSからNISA関連の新着を検出し、src/data/news.ts に自動追加するスクリプト。

毎日 GitHub Actions から実行される。LLMは使わず、公式発表のタイトルと
リンクをそのまま追加するだけなので、レビューなしの自動公開でも
誤情報リスクがない。

- 監視RSS: 金融庁・財務省・日本銀行（フィードごとのキーワードで絞り込み）
- 既知エントリは scripts/auto_news_state.json で管理
- 初回実行（状態ファイルなし）は現行エントリをベースラインとして保存するだけ

使い方:
    python scripts/auto_update_news.py
    追加した件数を標準出力の最終行に "ADDED=<n>" として出力する。
"""

import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from email.utils import parsedate_to_datetime
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
NEWS_FILE = REPO_ROOT / "src" / "data" / "news.ts"
STATE_FILE = Path(__file__).parent / "auto_news_state.json"

USER_AGENT = "Mozilla/5.0 (compatible; kodomo-nisa-news-bot/1.0)"

# 監視フィード。keywords のいずれかをタイトルに含むエントリだけを追加する。
FEEDS = [
    {
        "name": "金融庁",
        "url": "https://www.fsa.go.jp/fsaNewsListAll_rss2.xml",
        "keywords": ["NISA", "ＮＩＳＡ", "少額投資非課税", "つみたて投資", "資産運用立国", "金融経済教育"],
    },
    {
        "name": "財務省",
        "url": "https://www.mof.go.jp/news.rss",
        "keywords": ["NISA", "ＮＩＳＡ", "税制改正", "少額投資非課税"],
    },
    {
        "name": "日本銀行",
        "url": "https://www.boj.or.jp/rss/whatsnew.xml",
        "keywords": ["金融政策決定会合", "当面の金融政策運営", "政策金利", "経済・物価情勢の展望"],
    },
]


def localname(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def parse_feed(xml_text: str) -> list[dict]:
    """RSS 2.0 / RSS 1.0 (RDF) の両方から item を取り出す。"""
    root = ET.fromstring(xml_text)
    items = []
    for el in root.iter():
        if localname(el.tag) != "item":
            continue
        entry = {"title": "", "link": "", "description": "", "date": ""}
        for child in el:
            name = localname(child.tag)
            text = (child.text or "").strip()
            if name == "title":
                entry["title"] = text
            elif name == "link":
                entry["link"] = text
            elif name == "description":
                entry["description"] = text
            elif name in ("pubDate", "date"):
                entry["date"] = text
        if entry["title"] and entry["link"]:
            items.append(entry)
    return items


def fetch_feed(url: str) -> list[dict]:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=30) as res:
            return parse_feed(res.read().decode("utf-8", errors="replace"))
    except Exception as e:
        print(f"WARN: feed fetch failed for {url}: {e}", file=sys.stderr)
        return []


def format_date(raw: str) -> str:
    """RFC822 / ISO8601 の日付を YYYY.MM.DD に変換。失敗時は今日の日付。"""
    for parser in (parsedate_to_datetime, datetime.fromisoformat):
        try:
            return parser(raw).strftime("%Y.%m.%d")
        except Exception:
            continue
    return datetime.now().strftime("%Y.%m.%d")


def clean_title(title: str, source: str) -> str:
    # 金融庁RSSは「カテゴリ,本文」形式のことがあるので短い接頭辞を除去
    if source == "金融庁" and "," in title[:12]:
        title = title.split(",", 1)[1]
    return title.strip()


def make_excerpt(entry: dict, source: str) -> str:
    desc = re.sub(r"<[^>]+>", "", entry["description"]).strip()
    if not desc or desc == entry["title"]:
        desc = f"{source}の公式発表です。詳細はリンク先をご確認ください。"
    if len(desc) > 90:
        desc = desc[:89] + "…"
    return desc


def render_item(item_id: int, entry: dict, source: str) -> str:
    """news.ts に挿入するTSオブジェクトリテラルを生成（値はJSONエスケープで安全化）。"""
    fields = {
        "date": format_date(entry["date"]),
        "category": source,
        "title": clean_title(entry["title"], source),
        "excerpt": make_excerpt(entry, source),
        "href": entry["link"],
    }
    lines = ["    {", f"        id: {item_id},"]
    for key, value in fields.items():
        lines.append(f"        {key}: {json.dumps(value, ensure_ascii=False)},")
    lines.append("        isExternal: true,")
    lines.append("    },")
    return "\n".join(lines)


def insert_items(news_source: str, blocks: list[str]) -> str:
    """newsItems 配列の先頭に項目ブロックを挿入する。"""
    marker = re.search(r"export const newsItems: NewsItem\[\] = \[\n", news_source)
    if not marker:
        raise RuntimeError("newsItems array marker not found in news.ts")
    pos = marker.end()
    return news_source[:pos] + "\n".join(blocks) + "\n" + news_source[pos:]


def main() -> int:
    news_source = NEWS_FILE.read_text(encoding="utf-8")

    first_run = not STATE_FILE.exists()
    seen: set[str] = set()
    if not first_run:
        seen = set(json.loads(STATE_FILE.read_text(encoding="utf-8"))["seen_links"])

    max_id = max(int(m) for m in re.findall(r"^\s*id: (\d+),", news_source, re.M))

    new_blocks: list[str] = []
    all_links: set[str] = set(seen)

    for feed in FEEDS:
        for entry in fetch_feed(feed["url"]):
            all_links.add(entry["link"])
            if first_run or entry["link"] in seen or entry["link"] in news_source:
                continue
            if not any(kw in entry["title"] for kw in feed["keywords"]):
                continue
            max_id += 1
            new_blocks.append(render_item(max_id, entry, feed["name"]))
            print(f"ADD: [{feed['name']}] {entry['title']}")

    if new_blocks:
        NEWS_FILE.write_text(insert_items(news_source, new_blocks), encoding="utf-8")

    STATE_FILE.write_text(
        json.dumps({"seen_links": sorted(all_links)}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"ADDED={len(new_blocks)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
