import Link from "next/link";
import { newsItems } from "@/data/news";
import { ArrowIcon, ExternalIcon, SectionHeading } from "@/components/common/ui";

export default function NewsSection() {
    return (
        <section className="section section-rule bg-[var(--color-bg)]">
            <div className="container-width split">
                <div className="split-sticky">
                    <SectionHeading kicker="ニュース" title="最新の政策動向" />
                    <Link href="/policy-curation" className="link-arrow mt-4">
                        すべての記事を見る
                        <ArrowIcon />
                    </Link>
                </div>

                <div className="ledger">
                    {/* 自動追加で件数が増えても最新6件のみ表示 */}
                    {newsItems.slice(0, 6).map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            target={item.isExternal ? "_blank" : undefined}
                            rel={item.isExternal ? "noopener noreferrer" : undefined}
                            className="group block py-5"
                        >
                            <article>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <time className="tnum note">{item.date}</time>
                                    <span className="chip">{item.category}</span>
                                    {item.isExternal && (
                                        <span className="note inline-flex items-center gap-1">
                                            外部サイト
                                            <ExternalIcon size={12} />
                                        </span>
                                    )}
                                </div>
                                <h3 className="heading-card mt-2 group-hover:text-[var(--color-royal-blue-light)] group-hover:underline underline-offset-4 decoration-1 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
                                    {item.excerpt}
                                </p>
                            </article>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
