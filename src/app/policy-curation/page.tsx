"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ArticleCard from "@/components/policy/ArticleCard";
import { articles } from "@/lib/articles";

const categories = [
    "すべて",
    "口座開設",
    "投資商品",
    "おすすめ記事",
    "税制改正",
    "制度解説",
    "調査レポート",
    "政策分析",
    "比較分析",
    "経済分析"
];

export default function PolicyCurationPage() {
    const [selectedCategory, setSelectedCategory] = useState("すべて");

    const filteredArticles = selectedCategory === "すべて"
        ? articles
        : articles.filter(a => a.category === selectedCategory);

    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-[calc(var(--header-height)+var(--banner-height)+1rem)] md:pt-[calc(var(--header-height)+var(--banner-height)+3rem)] pb-24">
            <div className="container-width px-4">
                {/* Page Header */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-16 pb-8 md:pb-12 border-b border-[var(--glass-border)]"
                >
                    <p className="text-[var(--color-emerald)] font-semibold tracking-wide mb-2 md:mb-4 text-sm md:text-base">
                        CURATION & GUIDES
                    </p>
                    <h1 className="heading-section mb-4 text-2xl md:text-4xl">
                        記事・ガイド
                    </h1>
                    <p className="text-body max-w-2xl mx-auto text-sm md:text-base">
                        口座開設ガイド、投資商品解説、政策分析まで。
                        <br />
                        こどもNISAに関する情報を厳選してお届けします。
                    </p>
                </motion.header>

                {/* Category Filter */}
                <motion.nav
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-wrap gap-2 mb-12 justify-center"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === selectedCategory
                                ? "bg-[var(--color-royal-blue)] text-white"
                                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-royal-blue)]/10 hover:text-[var(--color-royal-blue)]"
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.nav>

                {/* Articles Grid - Editorial Layout */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12"
                >
                    {filteredArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                            className={article.featured ? "md:col-span-2" : ""}
                        >
                            <ArticleCard
                                slug={article.slug}
                                date={article.date}
                                category={article.category}
                                title={article.title}
                                excerpt={article.excerpt}
                                featured={article.featured}
                                importance={article.importance}
                                tags={article.tags}
                                readTime={article.readTime}
                                externalUrl={article.externalUrl}
                                source={article.source}
                                thumbnail={article.thumbnail}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Newsletter Signup */}

            </div>
        </div>
    );
}
