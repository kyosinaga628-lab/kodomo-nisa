"use client";

import { motion } from "framer-motion";

// 主催者の実際の投資事例
const investmentCase = {
    title: "主宰者の投資事例",
    description: "こどもNISA研究所の主宰者が、実際に子どものために行っている資産形成の一例をご紹介します。",
    disclaimer: "※これは個人の投資事例であり、投資の成果を保証するものではありません。投資は自己責任でお願いします。",
    details: {
        childAge: "0歳（2025年生まれ）",
        startDate: "2027年1月（制度開始予定）",
        monthlyAmount: "50,000円（年間上限の60万円を最大活用）",
        investmentProducts: [
            { name: "eMAXIS Slim 全世界株式（オール・カントリー）", ratio: "50%" },
            { name: "iFreeETF JPXプライム150", ratio: "50%" },
        ],
        strategy: "毎月定額の積立投資（ドルコスト平均法）・2銘柄に1:1で分散",
        expectedReturn: "年5〜7%（長期平均リターン想定）",
        goal: "18歳時点で約1,500万円〜2,000万円の教育資金形成",
    },
    reasoning: [
        {
            title: "なぜ「オルカン」を選んだか",
            content: "全世界の株式に分散投資できるインデックスファンド。特定の国や地域に依存せず、世界経済の成長に連動。信託報酬も最安水準（年0.05775%）で、長期保有に最適。ポートフォリオの安定基盤として50%を配分。"
        },
        {
            title: "なぜ「JPXプライム150」を選んだか",
            content: "JPXプライム150指数は、東証プライム市場の中から『価値創造企業』150社を選定した指数。ROEや株主資本コストなど、企業価値向上に注目した銘柄選定で、日本株の成長を積極的に取り込む。国内株式への投資としてオルカンを補完する50%配分。"
        },
        {
            title: "なぜ1:1で分散するか",
            content: "「オルカン」で世界全体（主に米国中心）の成長を確保しつつ、「JPXプライム150」で日本の優良企業の成長を取り込む。地域分散によりリスクを軽減しながら、日本経済への応援投資も兼ねた18年の長期運用戦略。"
        },
        {
            title: "18年後の想定シナリオ",
            content: "オルカン（年5%）+ JPXプライム150（年6%想定）の平均5.5%で運用した場合、18歳時点で約1,700万円に。大学4年間の学費（約800万円）と留学・大学院などの選択肢を確保。日本経済の復活と世界経済の成長、両方の恩恵を受けられるポートフォリオ。"
        },
    ]
};

export default function InvestmentCase() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-base p-6 md:p-10 bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5"
        >
            <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[var(--color-royal-blue)]/10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2" className="md:w-8 md:h-8">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                <div>
                    <h2 className="font-serif text-xl md:text-2xl font-semibold text-[var(--color-text-primary)]">
                        {investmentCase.title}
                    </h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        {investmentCase.description}
                    </p>
                </div>
            </div>

            {/* Investment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white rounded-xl border border-[var(--glass-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">子どもの年齢</p>
                    <p className="text-sm md:text-base font-medium text-[var(--color-text-primary)]">{investmentCase.details.childAge}</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[var(--glass-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">投資開始予定</p>
                    <p className="text-sm md:text-base font-medium text-[var(--color-text-primary)]">{investmentCase.details.startDate}</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[var(--glass-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">月額積立額</p>
                    <p className="text-sm md:text-base font-medium text-[var(--color-text-primary)]">{investmentCase.details.monthlyAmount}</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[var(--glass-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">投資戦略</p>
                    <p className="text-sm md:text-base font-medium text-[var(--color-text-primary)]">{investmentCase.details.strategy}</p>
                </div>
            </div>

            {/* Investment Products */}
            <div className="mb-6">
                <p className="text-xs text-[var(--color-text-muted)] mb-3">投資商品（1:1比率で分散）</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {investmentCase.details.investmentProducts.map((product, index) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-[var(--color-royal-blue)]/10 to-transparent rounded-xl border border-[var(--color-royal-blue)]/20">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-semibold text-[var(--color-royal-blue)]">{product.ratio}</span>
                            </div>
                            <p className="text-sm md:text-base font-medium text-[var(--color-text-primary)]">{product.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expected Returns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white rounded-xl border border-[var(--glass-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">期待リターン</p>
                    <p className="text-sm md:text-base font-medium text-[var(--color-text-primary)]">{investmentCase.details.expectedReturn}</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[var(--glass-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">18歳時点の目標</p>
                    <p className="text-sm md:text-base font-medium text-[var(--color-text-primary)]">{investmentCase.details.goal}</p>
                </div>
            </div>

            {/* Reasoning */}
            <div className="space-y-4 mb-6">
                {investmentCase.reasoning.map((reason, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white rounded-xl border-l-4 border-[var(--color-royal-blue)]"
                    >
                        <h4 className="font-semibold text-[var(--color-royal-blue)] mb-2 text-sm md:text-base">
                            {reason.title}
                        </h4>
                        <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {reason.content}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Disclaimer */}
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-xs text-yellow-800">
                    {investmentCase.disclaimer}
                </p>
            </div>
        </motion.section>
    );
}
