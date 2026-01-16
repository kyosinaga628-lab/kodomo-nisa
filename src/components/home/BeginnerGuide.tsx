"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BeginnerGuide() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-base p-6 md:p-10"
        >
            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] mb-4">
                    🔰 NISAをまだ知らない方へ
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] mb-4">
                    30秒でわかる「こどもNISA」
                </h2>
                <p className="text-[var(--color-text-secondary)] text-sm md:text-base max-w-2xl mx-auto">
                    難しい言葉は一切使いません。<br className="md:hidden" />
                    まずは「結論」からお伝えします。
                </p>
            </div>

            {/* Conclusion First - The Main Point */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[var(--color-emerald)] to-[var(--color-emerald-dark)] text-white rounded-2xl p-6 md:p-8 text-center mb-8"
            >
                <p className="text-lg md:text-xl font-bold mb-2">
                    結論
                </p>
                <p className="text-2xl md:text-3xl font-bold mb-4">
                    お金が増えても<br className="md:hidden" />
                    税金がかからない制度
                </p>
                <p className="text-white/80 text-sm md:text-base">
                    普通は投資で増えたお金の約20%が税金で取られますが、
                    <br className="hidden md:block" />
                    こどもNISAなら、その税金が0円になります。
                </p>
            </motion.div>

            {/* 3 Simple Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                {[
                    {
                        icon: "💰",
                        title: "税金がかからない",
                        description: "増えたお金はまるごとお子様のもの。国に払う分がゼロに。"
                    },
                    {
                        icon: "📈",
                        title: "長く続けるほどお得",
                        description: "0歳から始めれば最大18年間。お金がお金を生む「複利」の力を最大限活用。"
                    },
                    {
                        icon: "🎓",
                        title: "18歳で自由に使える",
                        description: "大学の入学金、留学、起業資金など、お子様の夢を後押し。"
                    }
                ].map((point, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-5 md:p-6 rounded-xl border border-[var(--glass-border)] text-center"
                    >
                        <div className="text-3xl md:text-4xl mb-3">{point.icon}</div>
                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-2 text-sm md:text-base">
                            {point.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">
                            {point.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Simple Example */}
            <div className="bg-[var(--color-bg-secondary)] rounded-xl p-5 md:p-6 mb-8">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 text-center text-sm md:text-base">
                    📊 例えば、こうなります
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                    <div className="text-center">
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">毎月の積立額</p>
                        <p className="text-2xl md:text-3xl font-bold text-[var(--color-royal-blue)]">5万円</p>
                    </div>
                    <div className="hidden md:block text-3xl text-[var(--color-text-muted)]">→</div>
                    <div className="md:hidden text-2xl text-[var(--color-text-muted)]">↓</div>
                    <div className="text-center">
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">18年後には...</p>
                        <p className="text-2xl md:text-3xl font-bold text-[var(--color-emerald)]">約1,000万円</p>
                        <p className="text-xs text-[var(--color-text-muted)]">（年5%成長の場合）</p>
                    </div>
                </div>
                <p className="text-center text-xs text-[var(--color-text-muted)] mt-4">
                    ※投資元本は600万円（非課税保有上限）。約400万円の利益が非課税に！
                </p>
            </div>

            {/* CTA */}
            <div className="text-center">
                <Link href="/simulator">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        あなたの場合をシミュレーション
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </Link>
            </div>
        </motion.section>
    );
}
