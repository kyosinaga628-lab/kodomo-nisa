"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// アフィリエイト対応の証券会社バナー
// 実際のアフィリエイトリンクは後で設定
const brokerages = [
    {
        id: "sbi",
        name: "SBI証券",
        description: "業界最安水準の手数料。NISAで人気No.1",
        features: ["口座開設無料", "投信積立手数料0円", "Vポイントが貯まる"],
        highlight: "人気No.1",
        affiliateUrl: "https://www.sbisec.co.jp/ETGate/WPLETmgR001Control?OutSide=on&getFlg=on&burl=search_home&cat1=home&cat2=service&dir=service&file=home_sogoaccount_underage.html&msockid=10ea67d801336140323d71dd004b60dc",
        color: "from-blue-600 to-blue-700",
    },
    {
        id: "rakuten",
        name: "楽天証券",
        description: "楽天ポイントで投資可能。楽天経済圏との相性◎",
        features: ["楽天ポイント投資", "投信積立手数料0円", "楽天銀行連携で金利UP"],
        highlight: "ポイント投資",
        affiliateUrl: "https://www.rakuten-sec.co.jp/web/under_age/?msockid=10ea67d801336140323d71dd004b60dc",
        color: "from-red-500 to-red-600",
    },
    {
        id: "matsui",
        name: "松井証券",
        description: "老舗ネット証券。サポート体制が充実",
        features: ["投信残高ポイント還元", "電話サポート充実", "初心者向けツール"],
        highlight: "サポート充実",
        affiliateUrl: "https://www.matsui.co.jp/apply/under-age.html?_gl=1*14ke7u1*_gcl_au*MTAwNTYzOTkzOS4xNzY4Mzc2NTEz*_ga*MTc1NTg0ODQ1MC4xNzY4NTMxNjkx*_ga_15ZX54N556*czE3Njg1MzE2OTAkbzEkZzEkdDE3Njg1MzE3MjYkajI0JGwwJGgw",
        color: "from-green-600 to-green-700",
    },
];

interface AffiliateBannerProps {
    variant?: "full" | "compact" | "sidebar";
}

export default function AffiliateBanner({ variant = "full" }: AffiliateBannerProps) {
    if (variant === "sidebar") {
        return (
            <div className="space-y-4">
                <h3 className="font-serif font-semibold text-base md:text-lg mb-4">
                    おすすめ証券会社
                </h3>
                {brokerages.slice(0, 2).map((broker) => (
                    <motion.a
                        key={broker.id}
                        href={broker.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        whileHover={{ scale: 1.02 }}
                        className="block p-4 bg-white rounded-xl border border-[var(--glass-border)] hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-[var(--color-text-primary)]">{broker.name}</span>
                            <span className={`px-2 py-0.5 text-xs font-medium text-white rounded-full bg-gradient-to-r ${broker.color}`}>
                                {broker.highlight}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)]">{broker.description}</p>
                    </motion.a>
                ))}
                <p className="text-xs text-[var(--color-text-muted)] text-center">
                    ※PR・広告を含みます
                </p>
            </div>
        );
    }

    if (variant === "compact") {
        return (
            <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--glass-border)]">
                <p className="text-xs text-[var(--color-text-muted)] mb-2">PR</p>
                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
                    こどもNISAを始めるなら
                </p>
                <div className="flex gap-2 flex-wrap">
                    {brokerages.map((broker) => (
                        <a
                            key={broker.id}
                            href={broker.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="px-3 py-1.5 text-xs font-medium bg-white rounded-lg border border-[var(--glass-border)] hover:bg-[var(--color-royal-blue)]/5 transition-colors"
                        >
                            {broker.name}
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    // Full variant
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-base p-6 md:p-10"
        >
            <div className="text-center mb-8">
                <p className="text-xs text-[var(--color-text-muted)] mb-2">PR・広告</p>
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-[var(--color-text-primary)]">
                    こどもNISAを始めるなら
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                    2027年の制度開始に備えて、今から口座開設しておきましょう
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {brokerages.map((broker, index) => (
                    <motion.a
                        key={broker.id}
                        href={broker.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="block p-6 bg-white rounded-2xl border border-[var(--glass-border)] hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
                                {broker.name}
                            </h3>
                            <span className={`px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${broker.color}`}>
                                {broker.highlight}
                            </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                            {broker.description}
                        </p>
                        <ul className="space-y-2">
                            {broker.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                        <path d="M22 4L12 14.01l-3-3" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                            <span className="text-sm font-medium text-[var(--color-royal-blue)] flex items-center gap-1">
                                詳細を見る
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </motion.a>
                ))}
            </div>

            <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
                ※上記リンクはアフィリエイトリンクを含みます。口座開設・取引により当サイトが報酬を得る場合があります。
            </p>
        </motion.section>
    );
}
