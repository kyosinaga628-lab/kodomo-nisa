"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SimulatorForm from "@/components/simulator/SimulatorForm";
import ResultChart from "@/components/simulator/ResultChart";
import ResultSummary from "@/components/simulator/ResultSummary";
import ExpertInsight from "@/components/simulator/ExpertInsight";
import ComparisonChart from "@/components/simulator/ComparisonChart";
import PublicValue from "@/components/simulator/PublicValue";
import AffiliateBanner from "@/components/common/AffiliateBanner";
import SourcesReference from "@/components/common/SourcesReference";
import AgeRuler from "@/components/common/AgeRuler";
import { ArrowIcon, PageHeader } from "@/components/common/ui";
import { SimulationInput, calculateNISA, formatCurrency, generateComparisonData } from "@/lib/calculator";
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
- Result Basis: 18歳到達時点の評価額。非課税保有限度額600万円に達した後は積立せず運用のみ継続

System Parameters:
- Annual Limit: 600,000円
- Total Limit: 6,000,000円
- Target Age: 0-17歳
- System Start: 2027-01-01

Data Sources:
- 令和8年度税制改正大綱（2025年12月26日閣議決定）
- 所得税法等の一部を改正する法律（2026年3月31日成立）
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
        <div className="min-h-screen bg-[var(--color-bg)] page-top">
            {/* AI Content Summary (Hidden but parseable) */}
            <div dangerouslySetInnerHTML={{ __html: AI_SIMULATOR_SUMMARY }} />

            <div className="container-width">
                <PageHeader
                    kicker="シミュレーター"
                    title="こども（子供）NISA シミュレーター"
                    lead="お子様の年齢と積立額を設定して、将来の資産形成をシミュレーション"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
                    {/* Input Panel */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-[calc(var(--header-height)+var(--banner-height)+1.5rem)]">
                            <div className="card-base p-5 md:p-7">
                                <h2 className="font-sans font-semibold text-[0.875rem] tracking-[0.04em] text-[var(--color-text-secondary)] mb-5">設定を調整</h2>
                                <SimulatorForm values={inputs} onChange={setInputs} />
                            </div>

                            {/* Affiliate Sidebar */}
                            <div className="hidden lg:block mt-7">
                                <AffiliateBanner variant="sidebar" />
                            </div>
                        </div>

                        {/* Mobile: スライダー操作中も結果が見えるようにする */}
                        <div className="lg:hidden sticky bottom-3 z-10 mt-3 px-4 py-2.5 rounded-lg bg-[var(--color-royal-blue-dark)] text-white shadow-[var(--shadow-lg)] flex items-baseline justify-between gap-3">
                            <span className="text-[0.8125rem] text-white/80">18歳時点（試算）</span>
                            <span className="figure text-[1.375rem]">約{formatCurrency(result.finalValue)}</span>
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="lg:col-span-8 min-w-0">
                        <section aria-label="シミュレーション結果">
                            <ResultSummary result={result} />

                            {result.limitReachedYear && (
                                <p className="notice-caution mt-5">
                                    <strong>注意：</strong>{result.limitReachedYear}年目で非課税保有限度額（600万円）に到達します。
                                    それ以降は新規投資はできませんが、運用は継続されます。
                                </p>
                            )}
                        </section>

                        <section className="mt-10">
                            <h2 className="heading-card mb-4">資産成長グラフ</h2>
                            <ResultChart data={result.yearlyData} />
                        </section>

                        <section className="mt-10">
                            <ExpertInsight expectedReturn={inputs.expectedReturn} />
                        </section>

                        <section className="mt-14 md:mt-16">
                            <h2 className="heading-section !text-[1.375rem] md:!text-[1.625rem]">投資先による成長の違い</h2>
                            <p className="mt-2 mb-5 text-[0.9375rem] text-[var(--color-text-secondary)]">
                                同じ積立額でも、投資先によって最終的な資産額は大きく異なります。いずれも元本が600万円に達した時点で積立を止めて比較しています。
                            </p>
                            <ComparisonChart data={comparisonData} />
                        </section>

                        <section className="mt-14 md:mt-16">
                            <PublicValue taxSaved={result.taxSaved} totalGain={result.totalGain} />
                        </section>

                        <section className="mt-14 md:mt-16">
                            <h2 className="heading-section !text-[1.375rem] md:!text-[1.625rem] mb-6">払出しルール</h2>
                            <AgeRuler />
                        </section>

                        {/* Education Gift CTA */}
                        <section className="mt-12 md:mt-14 panel-tint p-5 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                            <div className="flex-1">
                                <h2 className="heading-card">金融教育ギフトを作成</h2>
                                <p className="note mt-1">
                                    このシミュレーション結果と親御さんのメッセージをPDFにまとめ、お子様の18歳の誕生日にプレゼントできます
                                </p>
                            </div>
                            <Link href="/education-gift" className="btn-primary flex-shrink-0">
                                資料を作成する
                                <ArrowIcon />
                            </Link>
                        </section>

                        {/* What is Kodomo NISA */}
                        <section className="mt-12 md:mt-14">
                            <h2 className="heading-card">こどもNISAとは？</h2>
                            <p className="mt-2 text-[0.9375rem] text-[var(--color-text-secondary)]">
                                2027年から始まる、0〜17歳のお子様（子供・子ども）のための非課税投資制度です。
                                年間60万円、最大600万円まで投資でき、運用益が非課税になります。
                                18歳で成人NISAに自動移行し、非課税のまま運用を継続できます。
                            </p>
                            <Link href="/guide" className="link-arrow mt-2">
                                制度を詳しく知る
                                <ArrowIcon />
                            </Link>
                        </section>

                        {/* Disclaimer */}
                        <section className="mt-12 md:mt-14 pt-5 border-t border-[var(--color-line)]">
                            <h3 className="font-sans font-semibold text-[0.875rem] mb-2">ご注意事項</h3>
                            <ul className="note space-y-1">
                                <li>・本シミュレーションは仮定の数値に基づく試算であり、将来の運用成果を保証するものではありません。</li>
                                <li>・実際の運用では、市場変動により元本割れの可能性があります。</li>
                                <li>・制度の詳細は2026年度税制改正大綱に基づいていますが、変更される可能性があります。</li>
                                <li>・投資判断は自己責任でお願いいたします。</li>
                            </ul>
                        </section>

                        {/* Sources Reference */}
                        <div className="mt-12 md:mt-14">
                            <SourcesReference compact showClaims={false} categories={['policy', 'legislation']} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
