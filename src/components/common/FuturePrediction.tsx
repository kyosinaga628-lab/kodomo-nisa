"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/common/ui";

type Confidence = "high" | "medium" | "low";

interface PredictionGroup {
    category: string;
    predictions: {
        title: string;
        value: string;
        currentValue?: string;
        description: string;
        confidence: Confidence;
    }[];
}

const predictions: PredictionGroup[] = [
    {
        category: "エネルギー・環境",
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
        category: "経済・金融",
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
        category: "教育コスト",
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

const confidenceLabels: Record<Confidence, string> = {
    high: "確度: 高",
    medium: "確度: 中",
    low: "確度: 低"
};

export default function FuturePrediction() {
    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <div className="split">
            <SectionHeading
                className="split-sticky"
                kicker="18年後の世界"
                title="2044年の世界予測"
                lead="今日生まれた子どもが18歳になる2044年。現在のデータと比較しながら、長期トレンドを予測します。"
            />

            <div>
                <div className="tabs" role="tablist" aria-label="予測の分野">
                    {predictions.map((pred, index) => (
                        <button
                            key={pred.category}
                            role="tab"
                            aria-selected={selectedCategory === index}
                            onClick={() => setSelectedCategory(index)}
                            className="tab"
                        >
                            {pred.category}
                        </button>
                    ))}
                </div>

                <div role="tabpanel">
                    {predictions[selectedCategory].predictions.map((pred) => (
                        <div key={pred.title} className="py-6 border-b border-[var(--color-line)]">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="heading-card">{pred.title}</h3>
                                <span className="chip chip-outline flex-shrink-0">{confidenceLabels[pred.confidence]}</span>
                            </div>
                            <div className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                                <div>
                                    <p className="note">現在</p>
                                    <p className="tnum text-[1.0625rem] font-medium text-[var(--color-text-secondary)] mt-0.5">{pred.currentValue}</p>
                                </div>
                                <div>
                                    <p className="note">2044年予測</p>
                                    <p className="figure text-[1.625rem] md:text-[1.875rem] mt-0.5">{pred.value}</p>
                                </div>
                            </div>
                            <p className="mt-3 text-[0.9375rem] text-[var(--color-text-secondary)]">{pred.description}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-6 rule-left text-[0.9375rem] text-[var(--color-text-secondary)]">
                    <strong className="block text-[var(--color-text-primary)] mb-1">専門家からのメッセージ</strong>
                    これらの予測は、過去データと政策動向を分析した結果です。不確実性を伴いますが、長期的な資産形成の方向性を考える上で重要な指針となります。世界経済の成長とともに、長期的な視点での資産形成が重要となります。
                </p>
            </div>
        </div>
    );
}
