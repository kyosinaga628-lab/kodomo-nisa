import Link from "next/link";
import { Article, generateArticleSchema } from "@/lib/articles";
import { ArrowIcon } from "@/components/common/ui";

export default function ArticleDetailClient({ article }: { article: Article }) {
    const schema = generateArticleSchema(article);

    return (
        <>
            {/* JSON-LD for AI/SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="min-h-screen bg-[var(--color-bg)] page-top">
                <article className="container-width !max-w-[48rem]">
                    {/* Breadcrumb */}
                    <nav className="flex flex-wrap items-center gap-2 note mb-6 md:mb-8" aria-label="パンくずリスト">
                        <Link href="/" className="hover:text-[var(--color-royal-blue)] hover:underline underline-offset-2">ホーム</Link>
                        <span aria-hidden="true">/</span>
                        <Link href="/policy-curation" className="hover:text-[var(--color-royal-blue)] hover:underline underline-offset-2">記事・ガイド</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-[var(--color-text-secondary)]">{article.category}</span>
                    </nav>

                    {/* Article Header */}
                    <header className="mb-8 md:mb-10">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                            <span className="chip">{article.category}</span>
                            <time className="tnum note">{article.date}</time>
                            <span className="note">{article.readTime}分で読める</span>
                        </div>

                        <h1 className="editorial-heading">{article.title}</h1>

                        <div className="mt-6 py-4 border-y border-[var(--color-line)]">
                            <p className="font-semibold text-[0.9375rem] leading-snug">{article.author.name}</p>
                            <p className="note">{article.author.title}</p>
                        </div>
                    </header>

                    {/* TL;DR Section */}
                    <section className="rule-left mb-8 md:mb-10">
                        <h2 className="font-sans text-[0.875rem] font-semibold text-[var(--color-text-secondary)] mb-1">専門家の要約</h2>
                        <p className="text-[1.0625rem]">{article.tldr}</p>
                    </section>

                    {/* Key Takeaways */}
                    <section className="panel-tint p-5 md:p-7 mb-10 md:mb-14">
                        <h2 className="heading-card mb-3">重要なポイント</h2>
                        <ol className="space-y-3">
                            {article.keyTakeaways.map((takeaway, index) => (
                                <li key={takeaway} className="grid grid-cols-[1.75rem_minmax(0,1fr)]">
                                    <span className="figure text-[1.125rem] leading-[1.75] text-[var(--color-text-muted)]" aria-hidden="true">{index + 1}</span>
                                    <p className="text-[0.9375rem] font-medium leading-[1.8]">{takeaway}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Article Content */}
                    <section className="mb-12">
                        <div
                            className="article-body"
                            dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
                        />
                    </section>

                    {/* Tags */}
                    <section className="flex flex-wrap gap-2 pt-6 border-t border-[var(--color-line)]" aria-label="タグ">
                        {article.tags.map((tag) => (
                            <span key={tag} className="chip">#{tag}</span>
                        ))}
                    </section>

                    {/* Next actions */}
                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3">
                        <Link href="/simulator" className="btn-primary">
                            シミュレーターで試算する
                            <ArrowIcon />
                        </Link>
                        <Link href="/policy-curation" className="link-arrow">
                            記事一覧に戻る
                        </Link>
                    </div>
                </article>
            </div>
        </>
    );
}
