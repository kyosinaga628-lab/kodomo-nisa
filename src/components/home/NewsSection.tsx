"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { newsItems } from "@/data/news";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

export default function NewsSection() {
    return (
        <section className="py-32 bg-[var(--color-bg)]">
            <div className="container-width">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                >
                    <div>
                        <p className="text-[var(--color-emerald)] font-semibold tracking-wide mb-4">
                            LATEST NEWS
                        </p>
                        <h2 className="heading-section">
                            最新の政策動向
                        </h2>
                    </div>
                    <Link href="/policy-curation">
                        <motion.span
                            whileHover={{ x: 5 }}
                            className="inline-flex items-center gap-2 text-[var(--color-royal-blue)] font-semibold mt-4 md:mt-0"
                        >
                            すべての記事を見る
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.span>
                    </Link>
                </motion.div>

                {/* News Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {/* 自動追加で件数が増えても最新6件のみ表示 */}
                    {newsItems.slice(0, 6).map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            target={item.isExternal ? "_blank" : undefined}
                            rel={item.isExternal ? "noopener noreferrer" : undefined}
                        >
                            <motion.article
                                variants={itemVariants}
                                className="card-base p-8 group cursor-pointer h-full"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-caption">{item.date}</span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-royal-blue)]/10 text-[var(--color-royal-blue)]">
                                        {item.category}
                                    </span>
                                    {item.isExternal && (
                                        <span className="text-xs text-[var(--color-text-muted)]">↗外部</span>
                                    )}
                                </div>
                                <h3 className="font-serif font-semibold text-lg mb-3 group-hover:text-[var(--color-royal-blue)] transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2">
                                    {item.excerpt}
                                </p>
                                <div className="mt-6 flex items-center text-[var(--color-royal-blue)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.isExternal ? "外部サイトで見る" : "続きを読む"}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </motion.article>
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

