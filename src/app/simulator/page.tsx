"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SimulatorForm from "@/components/simulator/SimulatorForm";
import ResultChart from "@/components/simulator/ResultChart";
import ResultSummary from "@/components/simulator/ResultSummary";
import ExpertInsight from "@/components/simulator/ExpertInsight";
import ComparisonChart from "@/components/simulator/ComparisonChart";
import PublicValue from "@/components/simulator/PublicValue";
import AffiliateBanner from "@/components/common/AffiliateBanner";
import SourcesReference from "@/components/common/SourcesReference";
import { SimulationInput, calculateNISA, generateComparisonData, KODOMO_NISA_INFO } from "@/lib/calculator";
import { CALCULATOR_METADATA } from "@/lib/ai-optimization";

// AI Content Summary for simulator page
const AI_SIMULATOR_SUMMARY = `
<!--
[AI_CONTENT_SUMMARY]
Topic: こどもNISAシミュレーター - 計算根拠

Calculator Version: ${CALCULATOR_METADATA.version}
Last Updated: ${CALCULATOR_METADATA.lastUpdated}

Calculation Basis:
- Tax Rate: 20.315% (所得税15% + 復興特別所得税0.315% + 住民税5%)
- Formula: 複利計算式（期初払い）FV = P × ((1 + r)^n - 1) / r × (1 + r)

System Parameters:
- Annual Limit: 600,000円
- Total Limit: 6,000,000円
- Target Age: 0-17歳
- System Start: 2027-01-01

Data Sources:
- 令和6年度税制改正大綱（2024年12月20日）
- 金融庁「NISA特設サイト」

Disclaimer: このシミュレーションは将来の運用成果を保証するものではありません。
[/AI_CONTENT_SUMMARY]
-->
`;

export default function SimulatorPage() {
    const [inputs, setInputs] = useState<SimulationInput>({
        monthlyAmount: 30000,
        childAge: 0,
        expectedReturn: 5,
    });

    const result = useMemo(() => calculateNISA(inputs), [inputs]);
    const comparisonData = useMemo(() =>
        generateComparisonData(inputs.monthlyAmount, result.investmentYears),
        [inputs.monthlyAmount, result.investmentYears]
    );

    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-[calc(var(--header-height)+var(--banner-height)+1rem)] md:pt-[calc(var(--header-height)+var(--banner-height)+3rem)] pb-24">
            {/* AI Content Summary (Hidden but parseable) */}
            <div dangerouslySetInnerHTML={{ __html: AI_SIMULATOR_SUMMARY }} />

            <div className="container-width">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <p className="text-[var(--color-emerald)] font-semibold tracking-wide mb-2 md:mb-4 text-sm md:text-base">
                        SIMULATOR
                    </p>
                    <h1 className="heading-section mb-2 md:mb-4 text-2xl md:text-4xl">
                        こどもNISA シミュレーター
                    </h1>
                    <p className="text-body max-w-2xl mx-auto text-sm md:text-base px-4">
                        お子様の年齢と積立額を設定して、<br className="md:hidden" />
                        将来の資産形成をシミュレーション
                    </p>
                </motion.div>

                {/* What is Kodomo NISA - Beginner Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="mb-8 md:mb-12"
                >
                    <div className="card-base p-4 md:p-8 bg-gradient-to-br from-[var(--color-emerald)]/5 to-transparent">
                        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[var(--color-emerald)]/10 flex items-center justify-center mx-auto md:mx-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2" className="md:w-8 md:h-8">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 16v-4M12 8h.01" />
                                </svg>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="font-serif text-lg md:text-xl font-semibold mb-2 md:mb-3">
                                    こどもNISAとは？
                                </h2>
                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                                    2027年から始まる、0〜17歳のお子様のための非課税投資制度です。
                                    年間60万円、最大600万円まで投資でき、運用益が非課税になります。
                                    18歳で成人NISAに自動移行し、非課税のまま運用を継続できます。
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                    <div className="bg-white/50 p-3 rounded-lg text-center">
                                        <p className="text-xs text-[var(--color-text-muted)]">年間上限</p>
                                        <p className="text-lg font-bold text-[var(--color-royal-blue)]">60万円</p>
                                    </div>
                                    <div className="bg-white/50 p-3 rounded-lg text-center">
                                        <p className="text-xs text-[var(--color-text-muted)]">保有上限</p>
                                        <p className="text-lg font-bold text-[var(--color-royal-blue)]">600万円</p>
                                    </div>
                                    <div className="bg-white/50 p-3 rounded-lg text-center">
                                        <p className="text-xs text-[var(--color-text-muted)]">対象年齢</p>
                                        <p className="text-lg font-bold text-[var(--color-royal-blue)]">0〜17歳</p>
                                    </div>
                                    <div className="bg-white/50 p-3 rounded-lg text-center">
                                        <p className="text-xs text-[var(--color-text-muted)]">非課税効果</p>
                                        <p className="text-lg font-bold text-[var(--color-emerald)]">約20%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    {/* Input Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:col-span-4"
                    >
                        <div className="card-base p-4 md:p-8 lg:sticky lg:top-[calc(var(--header-height)+var(--banner-height)+2rem)]">
                            <h2 className="font-serif font-semibold text-lg md:text-xl mb-4 md:mb-6 flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2" className="md:w-6 md:h-6">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                                </svg>
                                設定を調整
                            </h2>
                            <SimulatorForm values={inputs} onChange={setInputs} />
                        </div>

                        {/* Affiliate Sidebar */}
                        <div className="hidden lg:block mt-6">
                            <AffiliateBanner variant="sidebar" />
                        </div>
                    </motion.div>

                    {/* Results Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-8 space-y-6 md:space-y-8"
                    >
                        {/* Expert Insight */}
                        <ExpertInsight expectedReturn={inputs.expectedReturn} />

                        {/* Summary Cards */}
                        <div className="card-base p-4 md:p-8">
                            <h2 className="font-serif font-semibold text-lg md:text-xl mb-4 md:mb-6 flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2" className="md:w-6 md:h-6">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                </svg>
                                シミュレーション結果
                            </h2>
                            <ResultSummary result={result} />

                            {/* Limit Reached Alert */}
                            {result.limitReachedYear && (
                                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                                    <p className="text-sm text-yellow-800">
                                        <strong>📌 注意:</strong> {result.limitReachedYear}年目で非課税保有限度額（600万円）に到達します。
                                        それ以降は新規投資はできませんが、運用は継続されます。
                                    </p>
                                </div>
                            )}

                            {/* Education Gift CTA */}
                            <div className="mt-6 p-4 bg-gradient-to-r from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5 rounded-xl border border-[var(--glass-border)]">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <div className="flex-1">
                                        <p className="font-semibold text-[var(--color-text-primary)] mb-1">
                                            📝 金融教育ギフトを作成
                                        </p>
                                        <p className="text-xs text-[var(--color-text-muted)]">
                                            このシミュレーション結果と親御さんのメッセージをPDFにまとめ、お子様の18歳の誕生日にプレゼントできます
                                        </p>
                                    </div>
                                    <Link
                                        href="/education-gift"
                                        className="btn-primary whitespace-nowrap text-sm"
                                    >
                                        資料を作成する →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Public Value */}
                        <PublicValue taxSaved={result.taxSaved} totalGain={result.totalGain} />

                        {/* Withdrawal Rules */}
                        <div className="card-base p-4 md:p-8">
                            <h2 className="font-serif font-semibold text-lg md:text-xl mb-4 md:mb-6 flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2" className="md:w-6 md:h-6">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                                払出しルール
                            </h2>
                            <div className="space-y-3">
                                {KODOMO_NISA_INFO.withdrawalRules.map((rule, index) => (
                                    <div key={index} className="p-3 md:p-4 bg-[var(--color-bg-secondary)] rounded-xl">
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-royal-blue)]/10 text-[var(--color-royal-blue)] w-fit">
                                                {rule.ageRange}
                                            </span>
                                            <p className="text-sm font-medium text-[var(--color-text-primary)]">
                                                {rule.rule}
                                            </p>
                                        </div>
                                        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                            {rule.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Comparison Chart */}
                        <div className="card-base p-4 md:p-8">
                            <h2 className="font-serif font-semibold text-lg md:text-xl mb-4 md:mb-6 flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2" className="md:w-6 md:h-6">
                                    <path d="M3 3v18h18" />
                                    <path d="M18 17V9M13 17V5M8 17v-3" />
                                </svg>
                                投資先による成長の違い
                            </h2>
                            <p className="text-[var(--color-text-secondary)] text-xs md:text-sm mb-4 md:mb-6">
                                同じ積立額でも、投資先によって最終的な資産額は大きく異なります。
                            </p>
                            <ComparisonChart data={comparisonData} />
                        </div>

                        {/* Original Chart */}
                        <div className="card-base p-4 md:p-8">
                            <h2 className="font-serif font-semibold text-lg md:text-xl mb-4 md:mb-6 flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2" className="md:w-6 md:h-6">
                                    <path d="M3 3v18h18" />
                                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                                </svg>
                                資産成長グラフ
                            </h2>
                            <ResultChart data={result.yearlyData} />
                        </div>

                        {/* Disclaimer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="bg-[var(--color-bg-secondary)] rounded-2xl p-4 md:p-6 border border-[var(--glass-border)]"
                        >
                            <h3 className="font-semibold text-sm text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 16v-4M12 8h.01" />
                                </svg>
                                ご注意事項
                            </h3>
                            <ul className="text-xs text-[var(--color-text-muted)] space-y-1">
                                <li>・本シミュレーションは仮定の数値に基づく試算であり、将来の運用成果を保証するものではありません。</li>
                                <li>・実際の運用では、市場変動により元本割れの可能性があります。</li>
                                <li>・制度の詳細は2026年度税制改正大綱に基づいていますが、変更される可能性があります。</li>
                                <li>・投資判断は自己責任でお願いいたします。</li>
                            </ul>
                        </motion.div>

                        {/* Sources Reference */}
                        <div className="mt-6">
                            <SourcesReference compact showClaims={false} categories={['policy', 'legislation']} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
