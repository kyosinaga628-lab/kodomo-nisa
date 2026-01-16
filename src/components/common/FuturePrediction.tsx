"use client";

import { motion } from "framer-motion";
import { useState, ReactNode } from "react";

interface FuturePrediction {
    year: number;
    category: string;
    icon: ReactNode;
    predictions: {
        title: string;
        value: string;
        currentValue?: string;
        description: string;
        confidence: "high" | "medium" | "low";
    }[];
}

const predictions: FuturePrediction[] = [
    {
        year: 2044,
        category: "エネルギー・環境",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
            </svg>
        ),
        predictions: [
            {
                title: "再エネ比率",
                value: "60-70%",
                currentValue: "約22% (2022年度)",
                description: "日本の電源構成における再生可能エネルギーの割合。政府目標を上回る可能性",
                confidence: "high"
            },
            {
                title: "カーボンプライシング",
                value: "1万円/t-CO2",
                currentValue: "約289円/t-CO2",
                description: "炭素税・排出権取引の実質価格。化石燃料投資のリスクが顕在化",
                confidence: "medium"
            },
            {
                title: "GX関連市場",
                value: "年成長率8-12%",
                currentValue: "成長初期段階",
                description: "蓄電池、水素、CCS等の脱炭素技術市場の拡大ペース",
                confidence: "high"
            }
        ]
    },
    {
        year: 2044,
        category: "経済・金融",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
        predictions: [
            {
                title: "世界経済成長率",
                value: "年3-4%",
                currentValue: "3.2% (2024年予測)",
                description: "名目GDP成長率。新興国の台頭とデジタル化が牽引",
                confidence: "medium"
            },
            {
                title: "日本の物価上昇率",
                value: "年1.5-2.0%",
                currentValue: "約2.5% (直近)",
                description: "日銀の目標達成後の安定期。実質金利は低位維持",
                confidence: "medium"
            },
            {
                title: "全世界株式リターン",
                value: "年5-7%",
                currentValue: "過去30年平均: 約7%",
                description: "過去データと人口動態を踏まえた長期期待リターン",
                confidence: "medium"
            }
        ]
    },
    {
        year: 2044,
        category: "教育コスト",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-yellow-600)" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
        ),
        predictions: [
            {
                title: "大学4年間の総コスト",
                value: "800-1,200万円",
                currentValue: "約700-1,000万円",
                description: "国公立でも生活費含め年200万円超。私立理系は1,500万円も",
                confidence: "high"
            },
            {
                title: "教育のデジタル化",
                value: "普及率80%超",
                currentValue: "端末整備完了・活用過渡期",
                description: "オンライン学習・個別最適化教育が標準に。コスト構造が変化",
                confidence: "medium"
            },
            {
                title: "奨学金の返済負担",
                value: "平均300万円",
                currentValue: "平均324万円",
                description: "給付型拡充も借り入れ依存は継続。事前準備の重要性増大",
                confidence: "high"
            }
        ]
    }
];

const confidenceColors = {
    high: "bg-emerald-100 text-emerald-700 border-emerald-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    low: "bg-gray-100 text-gray-700 border-gray-300"
};

const confidenceLabels = {
    high: "確度: 高",
    medium: "確度: 中",
    low: "確度: 低"
};

export default function FuturePrediction() {
    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <div className="card-base p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 mb-6"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-royal-blue)]/20 to-[var(--color-emerald)]/20 flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                    </div>
                </motion.div>
                <h2 className="font-serif text-3xl font-semibold mb-4">
                    2044年の世界予測 (現在との比較)
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                    今日生まれた子どもが18歳になる2044年。<br />
                    現在のデータと比較しながら、長期トレンドを予測します。
                </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {predictions.map((pred, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(index)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-3 ${selectedCategory === index
                            ? "bg-gradient-to-r from-[var(--color-royal-blue)] to-[var(--color-emerald)] text-white shadow-lg"
                            : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-royal-blue)]/10"
                            }`}
                    >
                        <span className={selectedCategory === index ? "" : "opacity-50"}>
                            {pred.icon}
                        </span>
                        <span>{pred.category}</span>
                    </motion.button>
                ))}
            </div>

            {/* Predictions Grid */}
            <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {predictions[selectedCategory].predictions.map((pred, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-white to-[var(--color-bg-secondary)] p-6 rounded-2xl border border-[var(--glass-border)] hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
                                {pred.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${confidenceColors[pred.confidence]}`}>
                                {confidenceLabels[pred.confidence]}
                            </span>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                                2044年予測
                            </p>
                            <p className="text-3xl font-bold text-[var(--color-royal-blue)] mb-2">
                                {pred.value}
                            </p>
                            {pred.currentValue && (
                                <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg border border-gray-100">
                                    <span className="text-[var(--color-text-muted)] text-xs">現在:</span>
                                    <span className="font-medium text-[var(--color-text-primary)]">{pred.currentValue}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {pred.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Expert Note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 p-6 bg-gradient-to-r from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5 rounded-xl border-l-4 border-[var(--color-royal-blue)]"
            >
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-royal-blue)]/10 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                            専門家からのメッセージ
                        </h4>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            これらの予測は、過去データと政策動向を分析した結果です。不確実性を伴いますが、
                            <strong className="text-[var(--color-royal-blue)]">長期的な資産形成の方向性を考える上で重要な指針</strong>となります。
                            世界経済の成長とともに、長期的な視点での資産形成が重要となります。
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
