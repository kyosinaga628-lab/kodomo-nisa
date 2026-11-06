# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev            # http://localhost:3000
npm run lint           # eslint
npx tsc --noEmit       # type check — this is what CI gates on, not `npm run build`
NEXT_EXPORT=true npm run build   # static export to out/ (next.config.ts switches output:'export')
```

Python automation scripts run standalone with no requirements file:

```bash
python scripts/auto_update_news.py     # prints ADDED=<n> on the last line; mutates src/data/news.ts
python scripts/check_news_sources.py   # prints changed source names, one per line
pip install yfinance numpy && cd scripts && python fetch_data.py   # must run from scripts/
```

There is no test suite. `npx tsc --noEmit` currently passes clean; `npm run lint` currently reports
**1 pre-existing error** (`any` in [seo.ts](src/lib/seo.ts)). Don't treat it as a regression you caused; don't add new ones.

### `npm run build` hangs on Windows

`next build` stalls indefinitely at "Creating an optimized production build" because
`next/font/google` (Noto Sans JP + Noto Serif JP in [layout.tsx](src/app/layout.tsx)) gets ECONNRESET
downloading subset files. To verify a build locally: back up `src/app/layout.tsx`, stub both font
consts to `{ variable: "" }`, build (~1 min), restore. Vercel builds fine. Prefer `npx tsc --noEmit`
for ordinary verification.

## Architecture

Next.js 16 App Router + TypeScript + Tailwind 4 + framer-motion. Japanese-language informational site
about こどもNISA (a tax-free child investment account starting 2027-01). Production is **Vercel,
auto-deploying from `main`**; `https://www.kodomo-nisa.jp` (www-only) is hardcoded in
[layout.tsx](src/app/layout.tsx), [sitemap.ts](src/app/sitemap.ts), [robots.ts](src/app/robots.ts),
[seo.ts](src/lib/seo.ts) and every per-route `layout.tsx`. Any new hardcoded URL must keep the `www.`.

### Content is TypeScript data modules, not a CMS

| Module | Drives |
|---|---|
| [src/lib/articles.ts](src/lib/articles.ts) (~1100 lines) | `/policy-curation` list **and** `/policy-curation/[slug]` static pages via `generateStaticParams`, plus sitemap entries. Article bodies are Tailwind-classed HTML strings embedded in the `content` field. |
| [src/data/news.ts](src/data/news.ts) | Home "最新の政策動向" — only `newsItems.slice(0, 6)` renders, so order is the publishing decision. |
| [src/lib/official-sources.ts](src/lib/official-sources.ts) | Citation database (`OFFICIAL_SOURCES` + `KEY_CLAIMS` chains) surfaced by `SourcesReference`; each entry carries its own `lastVerified`. |
| [src/lib/ai-optimization.ts](src/lib/ai-optimization.ts) | `KODOMO_NISA_FAQ` → FAQPage JSON-LD, `generateHowToSchema()`, and `CALCULATOR_METADATA` (simulator version, tax rate, policy sources). |
| [src/lib/seo.ts](src/lib/seo.ts) | `SITE_AUTHOR` / `SITE_INFO` and the WebPage / WebSite / Organization JSON-LD generators. |

Adding an article = append to `articles` with a new `slug`; the route and sitemap follow automatically.
Revising one = set `dateModified` (it feeds JSON-LD and sitemap `lastModified`).

### SEO / AI-search layer is a first-class concern

Every route has a sibling `layout.tsx` holding `metadata` with an explicit `alternates.canonical`,
because the page files themselves are mostly `"use client"`. JSON-LD is injected as
`<script type="application/ld+json" dangerouslySetInnerHTML>`; the Organization schema is site-wide in
the root layout, per-page schemas are composed in each page. Pages also embed an `AI_CONTENT_SUMMARY`
HTML comment (see [page.tsx](src/app/page.tsx) and [simulator/page.tsx](src/app/simulator/page.tsx))
with a `Last Verified` date — treat that block as content that must be updated alongside facts.

Next replaces rather than merges `openGraph` between segments, so a route layout that sets `openGraph` must
also set `images: [OG_IMAGE]` from [seo.ts](src/lib/seo.ts). The root `twitter` has no title or description on
purpose: Next then fills them from each page's `openGraph`. Article metadata comes from `generateMetadata` in
[policy-curation/[slug]/page.tsx](src/app/policy-curation/%5Bslug%5D/page.tsx). Articles without `content` are
`noindex` and left out of the sitemap, so giving one a body makes it indexable automatically. A plain string
`title` in a layout ends the root title template for its children, so layouts with child routes (`kids`,
`policy-curation`) set their own `title.template`.

[og-image.png](public/og-image.png) is a real 1200×630 PNG; bump the `?v=` in `OG_IMAGE` whenever it is replaced,
because social networks cache images by URL. The favicon and app icons are drawn from the same
bars as `LogoMark` in [ui.tsx](src/components/common/ui.tsx); the 192/512 icons are full-bleed so they stay valid
as `maskable`.

### Layout routing quirk

[ConditionalLayout.tsx](src/components/ConditionalLayout.tsx) suppresses the global
`AlertBanner`/`Header`/`Footer` for any path under `/kids`, which supplies its own chrome.
Design tokens live as CSS custom properties in [globals.css](src/app/globals.css)
(`--color-royal-blue`, `--color-emerald`, `--shadow-*`, `--header-height`), referenced as
`bg-[var(--color-bg)]` rather than Tailwind palette names.

### Design system

The look is an annual-report editorial: paper background, 藍 (`--color-royal-blue`) for structure, 常磐
(`--color-emerald`) for money that grows, 朱 (`--color-accent`) only for the small kicker mark and "いまここ".
Hairline rules instead of cards, Noto Serif JP headings, `.figure` for amounts. No gradients, emoji or English
eyebrows outside `/kids` and the gift PDF template.

Shared classes live in `@layer components` in [globals.css](src/app/globals.css) (`.split`, `.ledger`, `.kicker`,
`.figure`, `.tab`, `.preset`, `.range`, `.chip`, `.data-table`), so Tailwind utilities always override them. Shared
parts are in [ui.tsx](src/components/common/ui.tsx) and [AgeRuler.tsx](src/components/common/AgeRuler.tsx).
`.article-body` is deliberately unlayered with `!important`: it normalizes the Tailwind classes embedded in the
article HTML strings in `articles.ts`. Chart series colors are hard-coded in the chart components and were checked
for colorblind separation; keep principal `#5C8AC8`, gain `#00795B`, third series `#B5791C`.

`calculateNISA` returns `finalValue`/`totalGain`/`taxSaved` at age 18. `yearlyData` also holds 5 later years for
charts only. `generateComparisonData` applies the same 60万円/600万円 limits to all three series, so its NISA line
matches `finalValue` at 5%. Figures shown on the site should come from these functions, not be hard-coded.

### Gift PDF

[GiftDocument.tsx](src/components/simulator/GiftDocument.tsx) is the PDF body: four A4 `[data-pdf-page]` sections,
each captured separately by html2canvas. It must use inline HEX styles only: html2canvas throws on Tailwind 4's
`oklch()`/`lab()` colors, and SVG text cannot use web fonts. The `img[src^="data:image/gif"]` rule in globals.css
keeps html2canvas's baseline measurement correct; without it every line of text in the PDF sits too low.
`Page` also turns off `palt`, letter-spacing and `text-spacing-trim`, because canvas cannot reproduce them
(with trimming on, the 「 in `、「` disappears). Check real output after changing it: render the downloaded PDF.

### `/fear-greed/` is a separate app

[public/fear-greed/](public/fear-greed/) is a standalone vanilla HTML/CSS/JS app (its own manifest,
OGP, JSON-LD) served as static assets, not a Next route — though it is listed in the Next sitemap.
It has its own copy of `fetch_data.py` that **has diverged** from [scripts/fetch_data.py](scripts/fetch_data.py);
the workflow runs the `scripts/` one, which writes `../public/fear-greed/data.json`. Edit
`scripts/fetch_data.py` and treat the `public/` copy as vestigial.

### Contact form

[src/app/api/contact/route.ts](src/app/api/contact/route.ts) is the only server route. It needs
`RESEND_API_KEY` (lazily read so builds don't fail without it) and therefore does not work under
`NEXT_EXPORT=true` or on any static host.

## Working in this repo

**Pull before editing.** Three GitHub Actions commit straight to `main`, so a local clone is usually
behind: `update-fear-greed.yml` (twice per weekday → `public/fear-greed/data.json`),
`auto-update-news.yml` (Mondays 21:00 JST → prepends official-agency RSS items to `src/data/news.ts`,
gated on `npx tsc --noEmit`), `check-news-sources.yml` (Mondays 09:00 JST → opens an Issue when a
watched ministry page changes). `git pull --ff-only` first or `news.ts` will conflict.

`auto_update_news.py` parses `news.ts` with regexes — it locates `export const newsItems: NewsItem[] = [`,
scrapes `href: "…"` for dedupe (normalizing http/https and trailing slash) and `id: <n>,` for the next
id. Keep that formatting intact when hand-editing.

**Dates and market assumptions are duplicated across many files.** This site is periodically refreshed
to "today", and a fact change usually touches several of: `BANK_RATE` / `HIGH_YIELD_BANK_RATE` /
`GLOBAL_STOCK_RATE` in [calculator.ts](src/lib/calculator.ts) **paired with** the display labels in
[ComparisonChart.tsx](src/components/simulator/ComparisonChart.tsx); `AI_CONTENT_SUMMARY` `Last Verified`;
`CALCULATOR_METADATA.lastUpdated`; `lastVerified` fields in `official-sources.ts`;
[AlertBanner.tsx](src/components/AlertBanner.tsx); [QuickActionRoadmap.tsx](src/components/common/QuickActionRoadmap.tsx);
`SourcesReference` 最終検証日; and "開始予定"-style wording in `HeroSection` / `StorySection` /
route metadata. Grep for `時点` / `見込み` / `予定` / `Last Verified` / `lastUpdated` and update them
as one set.

Content is written in Japanese for Japanese parents — match the existing register (です・ます, 全角
punctuation, `約○○万円` figures) in any user-facing string.
