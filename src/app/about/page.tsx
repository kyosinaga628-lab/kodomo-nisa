import Link from "next/link";
import { SITE_AUTHOR } from "@/lib/seo";
import AffiliateBanner from "@/components/common/AffiliateBanner";
import { ArrowIcon, PageHeader } from "@/components/common/ui";

const values = [
    {
        title: "信頼性",
        description: "政策資料や公式データに基づいた、信頼できる情報提供を心がけます。",
    },
    {
        title: "わかりやすさ",
        description: "複雑な制度や税制を、誰にでも理解できるよう丁寧に解説します。",
    },
    {
        title: "寄り添い",
        description: "親として、同じ立場で資産形成の悩みや疑問に寄り添います。",
    },
];

const sectionTitle = "heading-section !text-[1.375rem] md:!text-[1.75rem]";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] page-top">
            <div className="container-width">
                <PageHeader
                    kicker="私たちについて"
                    title="このサイトについて"
                    lead="こどもNISA研究所は、2027年から始まる子どものための非課税投資制度を解説する情報サイトです。"
                />

                {/* Mission */}
                <section className="mb-14 md:mb-24">
                    <p className="note mb-3">私たちの使命</p>
                    <p className="font-serif font-medium text-[1.5rem] md:text-[2.25rem] leading-[1.6]">
                        複雑な制度を、シンプルに。
                        <br />
                        確かな知識で、子どもの未来を育む。
                    </p>
                </section>

                {/* Profile */}
                <section className="mb-14 md:mb-24 split">
                    <h2 className={sectionTitle}>主宰者プロフィール</h2>
                    <div>
                        <p className="text-[var(--color-text-secondary)]">{SITE_AUTHOR.bio}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {SITE_AUTHOR.expertise.map((tag) => (
                                <span key={tag} className="chip">{tag}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="mb-14 md:mb-24 split">
                    <h2 className={sectionTitle}>私たちが大切にすること</h2>
                    <ol className="ledger">
                        {values.map((value, index) => (
                            <li key={value.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] py-5">
                                <span className="figure text-[1.5rem] text-[var(--color-text-muted)]" aria-hidden="true">{index + 1}</span>
                                <div>
                                    <h3 className="heading-card">{value.title}</h3>
                                    <p className="mt-1 text-[0.9375rem] text-[var(--color-text-secondary)]">{value.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Links */}
                <section className="mb-14 md:mb-24 grid md:grid-cols-2 md:gap-x-10 border-t border-[var(--color-line-strong)]">
                    {[
                        { href: "/guide", title: "こどもNISAとは", description: "制度の概要を詳しく解説" },
                        { href: "/contact", title: "お問い合わせ", description: "ご質問・ご相談はこちら" },
                    ].map((link) => (
                        <Link key={link.href} href={link.href} className="group flex items-center justify-between gap-4 py-5 border-b border-[var(--color-line)]">
                            <span>
                                <span className="block heading-card font-serif group-hover:text-[var(--color-royal-blue-light)]">{link.title}</span>
                                <span className="note">{link.description}</span>
                            </span>
                            <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-royal-blue-light)] transition-transform group-hover:translate-x-0.5">
                                <ArrowIcon size={20} />
                            </span>
                        </Link>
                    ))}
                </section>

                {/* Affiliate Banner */}
                <AffiliateBanner />
            </div>
        </div>
    );
}
