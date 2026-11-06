import Link from "next/link";
import { KODOMO_NISA_INFO } from "@/lib/calculator";
import AgeRuler from "@/components/common/AgeRuler";
import InvestmentCase from "@/components/common/InvestmentCase";
import AffiliateBanner from "@/components/common/AffiliateBanner";
import SourcesReference from "@/components/common/SourcesReference";
import { ArrowIcon, ExternalIcon, Fact, PageHeader } from "@/components/common/ui";

const featuredLinks = [
    {
        href: "https://www.mof.go.jp/tax_policy/tax_reform/outline/index.html",
        publisher: "財務省",
        title: "令和8年度税制改正",
        description: "こどもNISA創設を含む税制改正の全容。正式な制度設計の根拠資料（2026年3月31日改正法成立）。",
    },
    {
        href: "https://www.fsa.go.jp/policy/nisa2/about/index.html",
        publisher: "金融庁",
        title: "NISA特設サイト",
        description: "新しいNISA制度の公式情報ページ。こどもNISA情報も順次更新予定。",
    },
    {
        href: "https://www.fsa.go.jp/policy/nisa2/know/index.html",
        publisher: "金融庁",
        title: "つみたてNISA対象商品について",
        description: "こどもNISAでも投資可能なつみたて投資枠対象商品の解説。",
    },
    {
        href: "https://www.j-flec.go.jp/",
        publisher: "J-FLEC",
        title: "金融経済教育推進機構",
        description: "子どもから大人まで、金融リテラシーを高めるための情報。",
    },
];

const sectionTitle = "heading-section !text-[1.375rem] md:!text-[1.75rem]";

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] page-top">
            <div className="container-width">
                <PageHeader
                    kicker="制度ガイド"
                    title="こどもNISAとは"
                    lead="2027年から始まる、お子様のための非課税投資制度をわかりやすく解説します。"
                />

                {/* Quick Summary */}
                <section className="mb-14 md:mb-24">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-7">
                        <Fact value={<>60<span className="figure-unit">万円</span></>} label="年間投資上限" />
                        <Fact value={<>600<span className="figure-unit">万円</span></>} label="非課税保有限度額" />
                        <Fact value={<>0〜17<span className="figure-unit">歳</span></>} label="対象年齢" />
                        <Fact value="非課税" label="運用益・配当金" tone="gain" />
                    </div>
                    <p className="note mt-6 max-w-[48rem]">
                        ※2026年3月31日成立の令和8年度税制改正法に基づく情報です。制度開始は2027年1月1日（確定）。口座開設の受付は2026年10月1日から主要ネット証券で始まります。
                    </p>
                </section>

                {/* Overview */}
                <section className="mb-14 md:mb-24 split">
                    <h2 className={sectionTitle}>制度の概要</h2>
                    <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                        <div>
                            <h3 className="heading-card">こどもNISAとは？</h3>
                            <p className="mt-2 text-[var(--color-text-secondary)]">
                                こどもNISA（正式名称：未成年者特定累積投資勘定）は、2027年から始まる0〜17歳のお子様を対象とした非課税投資制度です。親権者等が代理で口座を開設し、お子様名義で投資信託を積み立てることができます。
                            </p>
                        </div>
                        <div>
                            <h3 className="heading-card">非課税のメリット</h3>
                            <p className="mt-2 text-[var(--color-text-secondary)]">
                                通常、投資で得た利益（運用益・配当金）には約20%の税金がかかります。こどもNISAなら、この税金がすべて非課税になります。長期運用するほど、節税効果は大きくなります。
                            </p>
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="mb-14 md:mb-24 split">
                    <h2 className={sectionTitle}>制度の仕組み</h2>
                    <ol className="ledger">
                        <li className="grid grid-cols-[2.5rem_minmax(0,1fr)] py-6">
                            <span className="figure text-[1.5rem] text-[var(--color-text-muted)]" aria-hidden="true">1</span>
                            <div>
                                <h3 className="heading-card">親・祖父母からの資金贈与</h3>
                                <p className="mt-1.5 text-[0.9375rem] text-[var(--color-text-secondary)]">
                                    年間110万円まで非課税（暦年贈与）。こどもNISAの上限60万円は枠内で収まります。
                                </p>
                            </div>
                        </li>
                        <li className="grid grid-cols-[2.5rem_minmax(0,1fr)] py-6">
                            <span className="figure text-[1.5rem] text-[var(--color-text-muted)]" aria-hidden="true">2</span>
                            <div>
                                <h3 className="heading-card">こどもNISA口座で非課税運用</h3>
                                <p className="mt-1.5 text-[0.9375rem] text-[var(--color-text-secondary)]">
                                    つみたて投資枠と同様の投資信託で長期運用。運用益・配当金は非課税。最大18年間の非課税運用が可能です。
                                </p>
                                <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-[0.875rem]">
                                    {[
                                        ["年間上限", "60万円"],
                                        ["保有限度", "600万円"],
                                        ["対象年齢", "0〜17歳"],
                                        ["運用益", "非課税"],
                                    ].map(([label, value]) => (
                                        <div key={label} className="flex items-baseline gap-2">
                                            <dt className="note">{label}</dt>
                                            <dd className="tnum font-semibold">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </li>
                        <li className="grid grid-cols-[2.5rem_minmax(0,1fr)] py-6">
                            <span className="figure text-[1.5rem] text-[var(--color-text-muted)]" aria-hidden="true">3</span>
                            <div>
                                <h3 className="heading-card">18歳で成人NISAへ自動移行</h3>
                                <p className="mt-1.5 text-[0.9375rem] text-[var(--color-text-secondary)]">
                                    非課税のまま運用継続が可能。成人NISAの新規枠（年360万円/限度1,800万円）も追加で利用可能に。
                                </p>
                            </div>
                        </li>
                    </ol>
                </section>

                {/* Withdrawal Rules */}
                <section className="mb-14 md:mb-24">
                    <h2 className={`${sectionTitle} mb-6 md:mb-8`}>払出しルール</h2>
                    <AgeRuler />
                </section>

                {/* Eligible Products */}
                <section className="mb-14 md:mb-24 split">
                    <h2 className={sectionTitle}>対象商品</h2>
                    <div>
                        <ul className="ledger">
                            {KODOMO_NISA_INFO.eligibleProducts.map((product) => (
                                <li key={product} className="flex items-start gap-3 py-3.5">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2.5" className="flex-shrink-0 mt-1.5" aria-hidden="true">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>{product}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="note mt-3">※つみたて投資枠と同様の商品が対象です。個別株式は対象外となります。</p>
                    </div>
                </section>

                {/* CTA */}
                <section className="mb-14 md:mb-24 bg-[var(--color-royal-blue)] rounded-[10px] p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div>
                        <h2 className="text-white text-[1.375rem] md:text-[1.625rem]">シミュレーションで試してみましょう</h2>
                        <p className="text-white/80 text-[0.9375rem] mt-1">積立額と期間を設定して、将来の資産額をシミュレーション</p>
                    </div>
                    <Link href="/simulator" className="btn-inverse flex-shrink-0">
                        シミュレーションを始める
                        <ArrowIcon />
                    </Link>
                </section>

                {/* Investment Case */}
                <div className="mb-14 md:mb-24">
                    <InvestmentCase />
                </div>

                {/* Featured Links */}
                <section className="mb-14 md:mb-24">
                    <h2 className={sectionTitle}>注目記事</h2>
                    <p className="note mt-1 mb-5">こどもNISAに関連する最新情報（外部サイト）</p>
                    <div className="grid md:grid-cols-2 md:gap-x-10 border-t border-[var(--color-line-strong)]">
                        {featuredLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block py-4 border-b border-[var(--color-line)]"
                            >
                                <span className="note flex items-center gap-1.5">
                                    {link.publisher}
                                    <ExternalIcon size={12} />
                                </span>
                                <span className="block heading-card font-serif mt-1 group-hover:text-[var(--color-royal-blue-light)] group-hover:underline underline-offset-4 decoration-1">
                                    {link.title}
                                </span>
                                <span className="block mt-1 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">{link.description}</span>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Sources Reference */}
                <div className="mb-14 md:mb-24">
                    <SourcesReference categories={['policy', 'legislation', 'guideline']} />
                </div>

                {/* Affiliate Banner */}
                <AffiliateBanner />
            </div>
        </div>
    );
}
