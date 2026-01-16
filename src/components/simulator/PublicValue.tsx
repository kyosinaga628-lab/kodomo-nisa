"use client";

import { motion } from "framer-motion";
import { formatCurrencyFull } from "@/lib/calculator";

interface PublicValueProps {
    taxSaved: number;
    totalGain: number;
}

export default function PublicValue({ taxSaved, totalGain }: PublicValueProps) {
    // 税金が教育費に転換される割合を計算
    const educationRatio = totalGain > 0 ? (taxSaved / totalGain * 100).toFixed(1) : "0";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card-base p-4 md:p-8 bg-gradient-to-br from-[var(--color-emerald)]/10 via-white to-[var(--color-royal-blue)]/10"
        >
            <div className="text-center mb-4 md:mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-emerald)] to-[var(--color-royal-blue)] mb-3 md:mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="md:w-8 md:h-8">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                </div>
                <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
                    こどもNISAの公的価値
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-sm md:text-base">
                    非課税制度は、単なる「節税」ではありません。
                    <br className="hidden md:block" />
                    社会が支えるべき次世代への、直接的な投資です。
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-[var(--color-emerald)]/20">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[var(--color-emerald)]/10 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2" className="md:w-5 md:h-5">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-sm md:text-base text-[var(--color-emerald)]">
                            通常の場合（課税）
                        </h3>
                    </div>
                    <p className="text-xs md:text-sm text-[var(--color-text-secondary)] mb-3 md:mb-4">
                        運用益の約20%が税金として徴収されます。
                    </p>
                    <div className="text-right">
                        <p className="text-xs text-[var(--color-text-muted)]">納税額（想定）</p>
                        <p className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">
                            {formatCurrencyFull(taxSaved)}
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5 p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-[var(--color-royal-blue)]/30">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[var(--color-royal-blue)]/20 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2" className="md:w-5 md:h-5">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-sm md:text-base text-[var(--color-royal-blue)]">
                            こどもNISAの場合
                        </h3>
                    </div>
                    <p className="text-xs md:text-sm text-[var(--color-text-primary)] mb-3 md:mb-4 font-medium">
                        本来納めるはずの税金が、
                        <span className="text-[var(--color-royal-blue)] font-bold">お子様の教育資金</span>に転換されます。
                    </p>
                    <div className="text-right">
                        <p className="text-xs text-[var(--color-royal-blue)]">教育資金への転換額</p>
                        <p className="text-2xl md:text-3xl font-bold text-[var(--color-royal-blue)]">
                            {formatCurrencyFull(taxSaved)}
                        </p>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-[var(--color-royal-blue)]/10 to-[var(--color-emerald)]/10 p-4 md:p-6 rounded-xl border border-[var(--color-royal-blue)]/20"
            >
                <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2" className="md:w-6 md:h-6">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-serif font-semibold text-base md:text-lg mb-2">
                            社会による次世代支援のカタチ
                        </h4>
                        <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            運用益の<strong className="text-[var(--color-royal-blue)]">{educationRatio}%</strong>が、「お子様専用の教育資金」に振り替えられています。
                            少子化対策と資産形成を一体化した先進的な制度です。
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
