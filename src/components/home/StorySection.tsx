"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stories = [
    {
        id: 1,
        title: "年間60万円の非課税枠",
        subtitle: "ANNUAL LIMIT",
        description: "毎年60万円（月5万円）まで投資でき、その運用益が非課税になります。つみたて投資枠と同じ対象商品（インデックスファンド等）に投資可能です。",
        stat: "60万円",
        statLabel: "年間投資上限",
        color: "royal-blue",
    },
    {
        id: 2,
        title: "最大600万円の保有枠",
        subtitle: "TOTAL LIMIT",
        description: "0歳から17歳まで最大18年間、合計600万円まで非課税で保有できます。早く始めるほど、複利効果で資産が大きく成長する可能性があります。",
        stat: "600万円",
        statLabel: "非課税保有限度額",
        color: "emerald",
    },
    {
        id: 3,
        title: "18歳で成人NISAへ移行",
        subtitle: "TRANSITION",
        description: "18歳になると自動的に成人NISAへ移行。非課税のまま運用を継続でき、大学進学、留学、起業資金など、お子様の未来の選択肢を広げます。",
        stat: "0円",
        statLabel: "移行時の税金",
        color: "royal-blue",
    },
    {
        id: 4,
        title: "運用益が非課税",
        subtitle: "TAX BENEFIT",
        description: "通常、投資の運用益には約20%の税金がかかります。こどもNISAなら、この税金がすべて非課税に。長期運用するほど、節税効果は大きくなります。",
        stat: "約20%",
        statLabel: "節税できる税率",
        color: "emerald",
    },
];

export default function StorySection() {
    return (
        <section className="py-16 md:py-32 bg-[var(--color-bg-secondary)]">
            <div className="container-width px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-20"
                >
                    <p className="text-[var(--color-emerald)] font-semibold tracking-wide mb-2 md:mb-4 text-sm md:text-base">
                        KODOMO NISA BASICS
                    </p>
                    <h2 className="heading-section text-2xl md:text-4xl">
                        <span className="text-[var(--color-royal-blue)]">こどもNISA</span>の基本
                    </h2>
                    <p className="mt-4 text-[var(--color-text-secondary)] max-w-2xl mx-auto text-sm md:text-base">
                        2027年からスタート予定の新制度。
                        <br className="hidden md:block" />
                        お子様の将来のための資産形成を、税制面から強力にサポートします。
                    </p>
                </motion.div>

                {/* Story Cards */}
                <div className="space-y-12 md:space-y-32">
                    {stories.map((story, index) => (
                        <StoryCard key={story.id} story={story} index={index} />
                    ))}
                </div>

                {/* Eligibility Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 md:mt-24 card-base p-6 md:p-12 bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5"
                >
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-center mb-6 md:mb-8">
                        利用条件と対象商品
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <div className="p-4 md:p-6 bg-white/50 rounded-xl">
                            <h4 className="font-semibold text-[var(--color-royal-blue)] mb-3 flex items-center gap-2 text-sm md:text-base">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                対象者
                            </h4>
                            <ul className="text-xs md:text-sm text-[var(--color-text-secondary)] space-y-2">
                                <li>• 0歳〜17歳の日本居住者</li>
                                <li>• 親権者等が代理で口座開設・運用</li>
                                <li>• 1人につき1口座のみ開設可能</li>
                            </ul>
                        </div>
                        <div className="p-4 md:p-6 bg-white/50 rounded-xl">
                            <h4 className="font-semibold text-[var(--color-emerald)] mb-3 flex items-center gap-2 text-sm md:text-base">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 3v18h18" />
                                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                                </svg>
                                対象商品
                            </h4>
                            <ul className="text-xs md:text-sm text-[var(--color-text-secondary)] space-y-2">
                                <li>• 公募等株式投資信託（つみたて投資枠と同様）</li>
                                <li>• 金融庁が定める基準を満たすインデックスファンド</li>
                                <li>• 一部のアクティブファンド</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function StoryCard({ story, index }: { story: typeof stories[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -25]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity, y }}
            className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-6 md:gap-12 lg:gap-20`}
        >
            {/* Stat Display */}
            <div className="flex-shrink-0 flex justify-center">
                <div className={`relative w-40 h-40 md:w-64 md:h-64 rounded-2xl md:rounded-3xl bg-gradient-to-br ${story.color === "royal-blue"
                        ? "from-[var(--color-royal-blue)] to-[var(--color-royal-blue-light)]"
                        : "from-[var(--color-emerald)] to-[var(--color-emerald-light)]"
                    } flex flex-col items-center justify-center text-white shadow-xl`}>
                    <span className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">{story.stat}</span>
                    <span className="text-xs md:text-sm opacity-80 text-center px-2">{story.statLabel}</span>

                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-white/20 scale-105 md:scale-110" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/40 shadow-sm md:shadow-none md:bg-transparent md:backdrop-blur-none md:p-0 md:border-none">
                <p className={`text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 md:mb-3 ${story.color === "royal-blue" ? "text-[var(--color-royal-blue)]" : "text-[var(--color-emerald)]"
                    }`}>
                    {story.subtitle}
                </p>
                <h3 className="heading-card mb-3 md:mb-4 text-xl md:text-2xl">{story.title}</h3>
                <p className="text-body leading-relaxed max-w-md text-sm md:text-base">
                    {story.description}
                </p>
            </div>
        </motion.div>
    );
}
