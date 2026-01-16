"use client";

import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// NISA枠の比較データ
const nisaComparisonData = [
    {
        name: "つみたてNISA\n（成人・2023年まで）",
        年間上限: 40,
        保有限度: 800,
    },
    {
        name: "一般NISA\n（成人・2023年まで）",
        年間上限: 120,
        保有限度: 600,
    },
    {
        name: "新NISA\n（成人・2024年〜）",
        年間上限: 360,
        保有限度: 1800,
    },
    {
        name: "こどもNISA\n（2027年〜）",
        年間上限: 60,
        保有限度: 600,
    },
];

// 世帯全体の非課税枠活用フロー
const strategyFlow = [
    {
        step: 1,
        title: "親の新NISA枠を優先",
        description: "年間360万円の枠をまず活用。つみたて投資枠120万円 + 成長投資枠240万円。",
        priority: "高",
        color: "bg-red-500",
    },
    {
        step: 2,
        title: "子どものこどもNISA枠",
        description: "年間60万円。0歳から始めれば18年間で最大600万円の非課税枠を確保。",
        priority: "中",
        color: "bg-yellow-500",
    },
    {
        step: 3,
        title: "贈与税非課税枠の活用",
        description: "年間110万円まで贈与税がかからない。こどもNISAの原資として活用可能。",
        priority: "補助",
        color: "bg-blue-500",
    },
];

// 贈与税シミュレーション
const giftTaxInfo = {
    annualExemption: 1100000,
    kodomoNisaAnnual: 600000,
    remainingAfterNisa: 500000,
};

export default function ExperiencedGuide() {
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-royal-blue)]/10 text-[var(--color-royal-blue)] mb-4">
                    📊 既にNISAをご利用の方へ
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] mb-4">
                    既存NISAとの戦略的併用ガイド
                </h2>
                <p className="text-[var(--color-text-secondary)] text-sm md:text-base max-w-2xl mx-auto">
                    世帯全体の非課税枠を最大化する戦略と、
                    <br className="hidden md:block" />
                    贈与税回避を考慮した最適な資金配分をご提案します。
                </p>
            </div>

            {/* NISA Comparison Chart */}
            <div className="mb-10">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm md:text-base">
                    📈 NISA制度の比較（万円）
                </h3>
                <div className="bg-white rounded-xl p-4 border border-[var(--glass-border)]">
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                            data={nisaComparisonData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 10, fill: "#6B7280" }}
                                interval={0}
                                angle={-15}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                            <Tooltip
                                formatter={(value) => `${value}万円`}
                                contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB" }}
                            />
                            <Legend />
                            <Bar dataKey="年間上限" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="保有限度" fill="#059669" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Strategy Flow */}
            <div className="mb-10">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm md:text-base">
                    🎯 推奨する活用順序
                </h3>
                <div className="space-y-4">
                    {strategyFlow.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[var(--glass-border)]"
                        >
                            <div className={`flex-shrink-0 w-10 h-10 ${item.color} rounded-full flex items-center justify-center text-white font-bold`}>
                                {item.step}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-[var(--color-text-primary)] text-sm md:text-base">
                                        {item.title}
                                    </h4>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.priority === "高" ? "bg-red-100 text-red-700" :
                                        item.priority === "中" ? "bg-yellow-100 text-yellow-700" :
                                            "bg-blue-100 text-blue-700"
                                        }`}>
                                        優先度: {item.priority}
                                    </span>
                                </div>
                                <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Gift Tax Section */}
            <div className="mb-8">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm md:text-base">
                    💡 贈与税回避のポイント
                </h3>
                <div className="bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5 rounded-xl p-5 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-4 bg-white rounded-lg">
                            <p className="text-xs text-[var(--color-text-muted)] mb-1">年間贈与税非課税枠</p>
                            <p className="text-xl md:text-2xl font-bold text-[var(--color-royal-blue)]">110万円</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                            <p className="text-xs text-[var(--color-text-muted)] mb-1">こどもNISA年間上限</p>
                            <p className="text-xl md:text-2xl font-bold text-[var(--color-emerald)]">60万円</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                            <p className="text-xs text-[var(--color-text-muted)] mb-1">残り贈与枠</p>
                            <p className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">50万円</p>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg border-l-4 border-[var(--color-royal-blue)]">
                        <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            <strong className="text-[var(--color-royal-blue)]">戦略:</strong>
                            祖父母からお子様へ年間110万円を贈与し、そのうち60万円をこどもNISAに投資。
                            残り50万円は通常の預貯金や教育積立として活用できます。
                            <br /><br />
                            <strong>注意:</strong> 毎年同額を贈与し続けると「連年贈与」とみなされ課税される可能性があります。
                            金額や時期を変えるなどの工夫が推奨されます。
                        </p>
                    </div>
                </div>
            </div>

            {/* Summary Table */}
            <div className="overflow-x-auto">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm md:text-base">
                    📋 世帯の非課税枠まとめ（4人家族の場合）
                </h3>
                <table className="w-full text-xs md:text-sm border-collapse">
                    <thead>
                        <tr className="bg-[var(--color-bg-secondary)]">
                            <th className="p-3 text-left border border-[var(--glass-border)]">対象者</th>
                            <th className="p-3 text-right border border-[var(--glass-border)]">年間上限</th>
                            <th className="p-3 text-right border border-[var(--glass-border)]">保有限度額</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3 border border-[var(--glass-border)]">父（新NISA）</td>
                            <td className="p-3 text-right border border-[var(--glass-border)]">360万円</td>
                            <td className="p-3 text-right border border-[var(--glass-border)]">1,800万円</td>
                        </tr>
                        <tr>
                            <td className="p-3 border border-[var(--glass-border)]">母（新NISA）</td>
                            <td className="p-3 text-right border border-[var(--glass-border)]">360万円</td>
                            <td className="p-3 text-right border border-[var(--glass-border)]">1,800万円</td>
                        </tr>
                        <tr>
                            <td className="p-3 border border-[var(--glass-border)]">子1（こどもNISA）</td>
                            <td className="p-3 text-right border border-[var(--glass-border)]">60万円</td>
                            <td className="p-3 text-right border border-[var(--glass-border)]">600万円</td>
                        </tr>
                        <tr>
                            <td className="p-3 border border-[var(--glass-border)]">子2（こどもNISA）</td>
                            <td className="p-3 text-right border border-[var(--glass-border)]">60万円</td>
                            <td className="p-3 text-right border border-[var(--glass-border)]">600万円</td>
                        </tr>
                        <tr className="bg-[var(--color-emerald)]/10 font-semibold">
                            <td className="p-3 border border-[var(--glass-border)]">世帯合計</td>
                            <td className="p-3 text-right border border-[var(--glass-border)] text-[var(--color-emerald)]">840万円</td>
                            <td className="p-3 text-right border border-[var(--glass-border)] text-[var(--color-emerald)]">4,800万円</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </motion.section>
    );
}
