"use client";

import { useState } from "react";
import ArticleCard from "@/components/policy/ArticleCard";
import { PageHeader } from "@/components/common/ui";
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

    const [leadArticle, ...restArticles] = filteredArticles;

    return (
        <div className="min-h-screen bg-[var(--color-bg)] page-top">
            <div className="container-width">
                <PageHeader
                    kicker="記事・ガイド"
                    title="記事・ガイド"
                    lead="口座開設ガイド、投資商品解説、政策分析まで。こどもNISAに関する情報を厳選してお届けします。"
                />

                {/* Category Filter */}
                <nav className="tabs !gap-5 sm:!gap-7 -mt-4 md:-mt-8 mb-8 md:mb-12" aria-label="カテゴリで絞り込む">
                    {categories.map((category) => (
                        <button
                            key={category}
                            aria-pressed={category === selectedCategory}
                            onClick={() => setSelectedCategory(category)}
                            className="tab"
                        >
                            {category}
                        </button>
                    ))}
                </nav>

                {leadArticle ? (
                    <>
                        <ArticleCard {...leadArticle} lead />
                        <div className="mt-8 md:mt-12 grid md:grid-cols-2 md:gap-x-12 border-t border-[var(--color-line-strong)]">
                            {restArticles.map((article) => (
                                <ArticleCard key={article.id} {...article} />
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="py-16 text-center text-[var(--color-text-secondary)]">このカテゴリの記事はまだありません。</p>
                )}
            </div>
        </div>
    );
}
