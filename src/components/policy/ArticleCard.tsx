"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ArticleTag, getTagColor, getImportanceStars } from "@/lib/articles";

// カテゴリ別のサムネイルアイコンを返す
function getCategoryIcon(category: string): { icon: string; bgColor: string } {
    const iconMap: Record<string, { icon: string; bgColor: string }> = {
        "口座開設": { icon: "🏦", bgColor: "from-emerald-100 to-emerald-50" },
        "投資商品": { icon: "📈", bgColor: "from-blue-100 to-blue-50" },
        "おすすめ記事": { icon: "⭐", bgColor: "from-pink-100 to-pink-50" },
        "税制改正": { icon: "📋", bgColor: "from-purple-100 to-purple-50" },
        "制度解説": { icon: "📖", bgColor: "from-indigo-100 to-indigo-50" },
        "調査レポート": { icon: "📊", bgColor: "from-green-100 to-green-50" },
        "政策分析": { icon: "🔍", bgColor: "from-slate-100 to-slate-50" },
        "比較分析": { icon: "⚖️", bgColor: "from-amber-100 to-amber-50" },
        "経済分析": { icon: "💹", bgColor: "from-cyan-100 to-cyan-50" },
    };
    return iconMap[category] || { icon: "📄", bgColor: "from-gray-100 to-gray-50" };
}

interface ArticleCardProps {
    slug: string;
    date: string;
    category: string;
    title: string;
    excerpt: string;
    featured?: boolean;
    importance: 1 | 2 | 3 | 4 | 5;
    tags: ArticleTag[];
    readTime: number;
    thumbnail?: string;
    externalUrl?: string;
    source?: string;
}

export default function ArticleCard({
    slug,
    date,
    category,
    title,
    excerpt,
    featured = false,
    importance,
    tags,
    readTime,
    thumbnail,
    externalUrl,
    source
}: ArticleCardProps) {
    const { icon, bgColor } = getCategoryIcon(category);
    const isExternal = !!externalUrl;

    const CardContent = (
        <>
            {/* Thumbnail Image */}
            <div className={`relative overflow-hidden rounded-xl mb-4 bg-gradient-to-br ${bgColor} ${featured ? "h-48 md:h-64" : "h-36 md:h-48"}`}>
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl md:text-5xl opacity-60">{icon}</span>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[var(--color-royal-blue)]/0 group-hover:bg-[var(--color-royal-blue)]/5 transition-colors duration-300" />

                {/* Importance Badge */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm">
                    <span className="text-yellow-500 text-[10px] md:text-xs">{getImportanceStars(importance)}</span>
                </div>

                {/* External Source Badge */}
                {source && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium shadow-sm flex items-center gap-1">
                        {source === "note" && <span className="text-green-600">📝</span>}
                        {source === "YouTube" && <span className="text-red-600">▶️</span>}
                        <span className="text-[10px] md:text-xs text-gray-600">{source}</span>
                    </div>
                )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
                {tags.slice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${getTagColor(tag)}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 flex-wrap">
                <span className="editorial-caption text-[10px] md:text-xs">{date}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-[var(--color-royal-blue)]/10 text-[var(--color-royal-blue)]">
                    {category}
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                <span className="text-[10px] md:text-xs text-[var(--color-text-muted)]">{readTime}分</span>
            </div>

            {/* Title */}
            <h3 className={`editorial-heading mb-2 md:mb-3 group-hover:text-[var(--color-royal-blue)] transition-colors text-base md:text-xl ${featured ? "md:text-2xl" : ""}`}>
                {title}
            </h3>

            {/* Excerpt */}
            <p className="editorial-subhead line-clamp-2 text-xs md:text-sm">
                {excerpt}
            </p>

            {/* Read more */}
            <div className="mt-3 md:mt-4 flex items-center text-[var(--color-royal-blue)] font-medium text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {isExternal ? (
                    <>
                        外部サイトで読む
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                    </>
                ) : (
                    <>
                        続きを読む
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1 group-hover:translate-x-1 transition-transform">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </>
                )}
            </div>
        </>
    );

    return (
        <motion.article
            whileHover={{ y: -4 }}
            className={`group cursor-pointer ${featured ? "md:col-span-2" : ""}`}
        >
            {isExternal ? (
                <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full relative">
                    {CardContent}
                </a>
            ) : (
                <Link href={`/policy-curation/${slug}`} className="block h-full relative">
                    {CardContent}
                </Link>
            )}
        </motion.article>
    );
}
