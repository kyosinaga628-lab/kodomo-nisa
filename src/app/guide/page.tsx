"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { KODOMO_NISA_INFO } from "@/lib/calculator";
import InvestmentCase from "@/components/common/InvestmentCase";
import AffiliateBanner from "@/components/common/AffiliateBanner";
import SourcesReference from "@/components/common/SourcesReference";

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-[calc(var(--header-height)+var(--banner-height)+1rem)] md:pt-[calc(var(--header-height)+var(--banner-height)+3rem)] pb-24">
            <div className="container-width px-4">
                {/* Hero */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-20"
                >
                    <p className="text-[var(--color-emerald)] font-semibold tracking-wide mb-2 md:mb-4 text-sm md:text-base">
                        ABOUT KODOMO NISA
                    </p>
                    <h1 className="heading-section mb-4 md:mb-6 text-2xl md:text-4xl">
                        こどもNISAとは
                    </h1>
                    <p className="text-body max-w-2xl mx-auto text-sm md:text-base">
                        2027年から始まる、お子様のための非課税投資制度を
                        <br className="hidden sm:block" />
                        わかりやすく解説します。
                    </p>
                </motion.header>

                {/* Quick Summary */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-24"
                >
                    <div className="card-base p-6 md:p-12 bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                            <div className="text-center p-4 bg-white/50 rounded-xl">
                                <p className="text-2xl md:text-3xl font-bold text-[var(--color-royal-blue)]">60万円</p>
                                <p className="text-xs md:text-sm text-[var(--color-text-muted)]">年間投資上限</p>
                            </div>
                            <div className="text-center p-4 bg-white/50 rounded-xl">
                                <p className="text-2xl md:text-3xl font-bold text-[var(--color-royal-blue)]">600万円</p>
                                <p className="text-xs md:text-sm text-[var(--color-text-muted)]">非課税保有限度額</p>
                            </div>
                            <div className="text-center p-4 bg-white/50 rounded-xl">
                                <p className="text-2xl md:text-3xl font-bold text-[var(--color-royal-blue)]">0〜17歳</p>
                                <p className="text-xs md:text-sm text-[var(--color-text-muted)]">対象年齢</p>
                            </div>
                            <div className="text-center p-4 bg-white/50 rounded-xl">
                                <p className="text-2xl md:text-3xl font-bold text-[var(--color-emerald)]">非課税</p>
                                <p className="text-xs md:text-sm text-[var(--color-text-muted)]">運用益・配当金</p>
                            </div>
                        </div>
                        <p className="text-center text-[var(--color-text-secondary)] text-sm md:text-base">
                            ※2026年度税制改正大綱に基づく情報です。正式な制度開始は2027年1月予定。
                        </p>
                    </div>
                </motion.section>

                {/* What is Kodomo NISA */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-24"
                >
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="editorial-caption mb-2 md:mb-4 text-xs md:text-sm">OVERVIEW</h2>
                        <h3 className="font-serif text-2xl md:text-3xl font-semibold">制度の概要</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="card-base p-6 md:p-8">
                            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-[var(--color-royal-blue)]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 16v-4M12 8h.01" />
                                </svg>
                                こどもNISAとは？
                            </h4>
                            <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed">
                                こどもNISA（正式名称：未成年者特定累積投資勘定）は、
                                2027年から始まる0〜17歳のお子様を対象とした非課税投資制度です。
                                親権者等が代理で口座を開設し、お子様名義で投資信託を積み立てることができます。
                            </p>
                        </div>
                        <div className="card-base p-6 md:p-8">
                            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-[var(--color-emerald)]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                </svg>
                                非課税のメリット
                            </h4>
                            <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed">
                                通常、投資で得た利益（運用益・配当金）には約20%の税金がかかります。
                                こどもNISAなら、この税金がすべて非課税になります。
                                長期運用するほど、節税効果は大きくなります。
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Withdrawal Rules */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-24"
                >
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="editorial-caption mb-2 md:mb-4 text-xs md:text-sm">WITHDRAWAL RULES</h2>
                        <h3 className="font-serif text-2xl md:text-3xl font-semibold">払出しルール</h3>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                        {KODOMO_NISA_INFO.withdrawalRules.map((rule, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-base p-4 md:p-6"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[var(--color-royal-blue)]/10 text-[var(--color-royal-blue)] w-fit">
                                        {rule.ageRange}
                                    </span>
                                    <div className="flex-1">
                                        <p className="font-semibold text-[var(--color-text-primary)] mb-1">{rule.rule}</p>
                                        <p className="text-sm text-[var(--color-text-muted)]">{rule.detail}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Eligible Products */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-24"
                >
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="editorial-caption mb-2 md:mb-4 text-xs md:text-sm">ELIGIBLE PRODUCTS</h2>
                        <h3 className="font-serif text-2xl md:text-3xl font-semibold">対象商品</h3>
                    </div>
                    <div className="card-base p-6 md:p-8">
                        <ul className="space-y-4">
                            {KODOMO_NISA_INFO.eligibleProducts.map((product, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2" className="flex-shrink-0 mt-1">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                        <path d="M22 4L12 14.01l-3-3" />
                                    </svg>
                                    <span className="text-[var(--color-text-secondary)] text-sm md:text-base">{product}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 p-4 bg-[var(--color-bg-secondary)] rounded-lg">
                            <p className="text-xs md:text-sm text-[var(--color-text-muted)]">
                                ※つみたて投資枠と同様の商品が対象です。個別株式は対象外となります。
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* System Diagram */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-24"
                >
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="editorial-caption mb-2 md:mb-4 text-xs md:text-sm">SYSTEM OVERVIEW</h2>
                        <h3 className="font-serif text-2xl md:text-3xl font-semibold">制度の仕組み</h3>
                    </div>
                    <div className="card-base p-4 md:p-8 bg-white">
                        <div className="max-w-3xl mx-auto space-y-6">
                            {/* Step 1 */}
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="flex-1 bg-gradient-to-r from-[var(--color-royal-blue)]/10 to-transparent rounded-xl p-5 border border-[var(--glass-border)]">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-[var(--color-royal-blue)] text-white flex items-center justify-center font-bold text-sm">1</div>
                                        <h4 className="font-semibold text-[var(--color-text-primary)]">親・祖父母からの資金贈与</h4>
                                    </div>
                                    <p className="text-xs md:text-sm text-[var(--color-text-secondary)] ml-11">
                                        年間110万円まで非課税（暦年贈与）。<br />
                                        こどもNISAの上限60万円は枠内で収まります。
                                    </p>
                                </div>
                                <div className="hidden md:flex items-center justify-center w-10">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </div>
                                <div className="md:hidden flex items-center justify-center h-6">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-gradient-to-br from-[var(--color-royal-blue)]/10 to-[var(--color-emerald)]/10 rounded-xl p-5 border-2 border-[var(--color-royal-blue)]/20">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-[var(--color-emerald)] text-white flex items-center justify-center font-bold text-sm">2</div>
                                    <h4 className="font-semibold text-[var(--color-text-primary)]">こどもNISA口座で非課税運用</h4>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 ml-11">
                                    <div className="text-center p-2 bg-white rounded-lg">
                                        <p className="text-[10px] text-[var(--color-text-muted)]">年間上限</p>
                                        <p className="text-lg font-bold text-[var(--color-royal-blue)]">60万円</p>
                                    </div>
                                    <div className="text-center p-2 bg-white rounded-lg">
                                        <p className="text-[10px] text-[var(--color-text-muted)]">保有限度</p>
                                        <p className="text-lg font-bold text-[var(--color-emerald)]">600万円</p>
                                    </div>
                                    <div className="text-center p-2 bg-white rounded-lg">
                                        <p className="text-[10px] text-[var(--color-text-muted)]">対象年齢</p>
                                        <p className="text-lg font-bold text-[var(--color-text-primary)]">0〜17歳</p>
                                    </div>
                                    <div className="text-center p-2 bg-white rounded-lg">
                                        <p className="text-[10px] text-[var(--color-text-muted)]">運用益</p>
                                        <p className="text-lg font-bold text-[var(--color-emerald)]">非課税</p>
                                    </div>
                                </div>
                                <p className="text-xs text-[var(--color-text-secondary)] ml-11">
                                    つみたて投資枠と同様の投資信託で長期運用。運用益・配当金は非課税。
                                </p>
                            </div>

                            {/* Timeline */}
                            <div className="relative py-4">
                                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-royal-blue)]/20 -translate-x-1/2"></div>
                                <div className="relative flex items-center justify-center">
                                    <div className="bg-white px-4 py-1.5 rounded-full border border-[var(--glass-border)] text-xs font-medium text-[var(--color-text-secondary)]">
                                        最大18年間の非課税運用
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="flex-1 bg-gradient-to-r from-transparent to-[var(--color-emerald)]/10 rounded-xl p-5 border border-[var(--glass-border)]">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-[var(--color-royal-blue)] text-white flex items-center justify-center font-bold text-sm">3</div>
                                        <h4 className="font-semibold text-[var(--color-text-primary)]">18歳で成人NISAへ自動移行</h4>
                                    </div>
                                    <p className="text-xs md:text-sm text-[var(--color-text-secondary)] ml-11">
                                        非課税のまま運用継続が可能。<br />
                                        成人NISAの新規枠（年360万円/限度1,800万円）も追加で利用可能に。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-24"
                >
                    <div className="card-base p-8 md:p-12 text-center bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5">
                        <h3 className="font-serif text-xl md:text-2xl font-semibold mb-4">
                            シミュレーションで試してみましょう
                        </h3>
                        <p className="text-[var(--color-text-secondary)] mb-6 text-sm md:text-base">
                            積立額と期間を設定して、将来の資産額をシミュレーション
                        </p>
                        <Link href="/simulator" className="btn-primary inline-block">
                            シミュレーションを始める →
                        </Link>
                    </div>
                </motion.section>

                {/* Sources Reference */}
                <div className="mb-12 md:mb-24">
                    <SourcesReference categories={['policy', 'legislation', 'guideline']} />
                </div>

                {/* Investment Case */}
                <div className="mb-12 md:mb-24">
                    <InvestmentCase />
                </div>

                {/* Affiliate Banner */}
                <div className="mb-12 md:mb-24">
                    <AffiliateBanner />
                </div>
            </div>
        </div>
    );
}
