"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import { articles, generateArticleSchema } from "@/lib/articles";

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const article = articles.find(a => a.slug === slug);

    if (!article) {
        notFound();
    }

    const schema = generateArticleSchema(article);

    return (
        <>
            {/* JSON-LD for AI/SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="min-h-screen bg-[var(--color-bg)] pt-[calc(var(--header-height)+var(--banner-height)+3rem)] pb-24">
                <article className="container-width max-w-4xl">
                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8"
                    >
                        <Link href="/" className="hover:text-[var(--color-royal-blue)]">ホーム</Link>
                        <span>/</span>
                        <Link href="/policy-curation" className="hover:text-[var(--color-royal-blue)]">政策キュレーション</Link>
                        <span>/</span>
                        <span className="text-[var(--color-text-primary)]">{article.category}</span>
                    </motion.nav>

                    {/* Article Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        {/* Category & Date */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[var(--color-royal-blue)]/10 text-[var(--color-royal-blue)]">
                                {article.category}
                            </span>
                            <span className="text-sm text-[var(--color-text-muted)]">{article.date}</span>
                            <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                            <span className="text-sm text-[var(--color-text-muted)]">{article.readTime}分で読める</span>
                        </div>

                        {/* Title */}
                        <h1 className="editorial-heading text-4xl md:text-5xl mb-6">
                            {article.title}
                        </h1>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 py-6 border-y border-[var(--glass-border)]">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-royal-blue)]/20 to-[var(--color-emerald)]/20 flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="1.5">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M20 21a8 8 0 10-16 0" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--color-text-primary)]">{article.author.name}</p>
                                <p className="text-sm text-[var(--color-text-muted)]">{article.author.title}</p>
                            </div>
                        </div>
                    </motion.header>

                    {/* TL;DR Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="card-base p-8 mb-12 bg-gradient-to-br from-[var(--color-emerald)]/5 to-transparent border-l-4 border-[var(--color-emerald)]"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2" className="flex-shrink-0 mt-1">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                            <div>
                                <h2 className="font-serif text-xl font-semibold mb-2 text-[var(--color-emerald)]">
                                    専門家の要約
                                </h2>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                    {article.tldr}
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Key Takeaways */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="card-base p-8 mb-12 bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-transparent"
                    >
                        <h2 className="font-serif text-2xl font-semibold mb-6 text-[var(--color-royal-blue)]">
                            重要なポイント
                        </h2>
                        <ul className="space-y-4">
                            {article.keyTakeaways.map((takeaway, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-lg bg-white/50 border border-[var(--glass-border)]"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[var(--color-royal-blue)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <p className="text-[var(--color-text-primary)] leading-relaxed font-medium">
                                        {takeaway}
                                    </p>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* Article Content */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="prose prose-lg max-w-none mb-16"
                    >
                        <div
                            className="editorial-body space-y-6"
                            dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
                        />
                    </motion.section>

                    {/* Tags */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-[var(--glass-border)]"
                    >
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
                            >
                                #{tag}
                            </span>
                        ))}
                    </motion.section>

                    {/* CTA - Back to List */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="text-center"
                    >
                        <Link href="/policy-curation">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-secondary"
                            >
                                ← 記事一覧に戻る
                            </motion.button>
                        </Link>
                    </motion.div>
                </article>
            </div>
        </>
    );
}
