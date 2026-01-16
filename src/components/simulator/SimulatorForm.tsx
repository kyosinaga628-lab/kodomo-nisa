"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SimulationInput, KODOMO_NISA_INFO } from "@/lib/calculator";

interface Props {
    values: SimulationInput;
    onChange: (values: SimulationInput) => void;
}

export default function SimulatorForm({ values, onChange }: Props) {
    const [useMonths, setUseMonths] = useState(false);
    const [months, setMonths] = useState(0);

    const handleChange = (field: keyof SimulationInput, value: number) => {
        onChange({ ...values, [field]: value });
    };

    const handleMonthsChange = (newMonths: number) => {
        setMonths(newMonths);
        // 月齢を年齢に変換（小数点以下も考慮）
        const ageWithMonths = values.childAge + (newMonths / 12);
        // calculator側では整数年齢を使うが、表示用に保持
    };

    // 投資可能年数を計算（現在年齢から17歳まで）
    const investmentYears = Math.max(0, 17 - values.childAge + 1);
    const maxInvestment = Math.min(investmentYears * 600000, KODOMO_NISA_INFO.totalLimit);

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Child Age */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
            >
                <label className="input-label flex items-center justify-between">
                    <span className="text-sm md:text-base">お子様の投資開始時の年齢</span>
                    <span className="text-[var(--color-royal-blue)] font-bold">
                        {values.childAge}歳{useMonths && months > 0 ? `${months}ヶ月` : ""}
                    </span>
                </label>
                <div className="relative">
                    <input
                        type="range"
                        min="0"
                        max="17"
                        step="1"
                        value={values.childAge}
                        onChange={(e) => handleChange("childAge", Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <div className="flex justify-between mt-2 text-xs text-[var(--color-text-muted)]">
                        <span>0歳</span>
                        <span>17歳</span>
                    </div>
                </div>

                {/* Month Option Toggle */}
                <div className="mt-3">
                    <button
                        onClick={() => setUseMonths(!useMonths)}
                        className="text-xs text-[var(--color-royal-blue)] hover:underline flex items-center gap-1"
                    >
                        {useMonths ? "▼ 月齢を非表示" : "▶ 月齢も指定する"}
                    </button>

                    {useMonths && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 p-3 bg-[var(--color-bg-secondary)] rounded-lg"
                        >
                            <label className="text-xs text-[var(--color-text-muted)] block mb-2">
                                月齢（0〜11ヶ月）
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {[0, 3, 6, 9].map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => setMonths(m)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${months === m
                                            ? "bg-[var(--color-royal-blue)] text-white"
                                            : "bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-royal-blue)]/10"
                                            }`}
                                    >
                                        {m}ヶ月
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="mt-3 p-3 bg-[var(--color-bg-secondary)] rounded-lg">
                    <p className="text-xs text-[var(--color-text-secondary)]">
                        <span className="font-semibold text-[var(--color-royal-blue)]">投資可能期間: {investmentYears}年間</span>
                        <br />
                        <span className="text-[var(--color-text-muted)]">（18歳で成人NISAへ自動移行）</span>
                    </p>
                </div>
            </motion.div>

            {/* Monthly Amount */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <label className="input-label flex items-center justify-between">
                    <span className="text-sm md:text-base">月額積立額</span>
                    <span className="text-[var(--color-royal-blue)] font-bold">
                        {values.monthlyAmount.toLocaleString()}円
                    </span>
                </label>
                <div className="relative">
                    <input
                        type="range"
                        min="5000"
                        max="50000"
                        step="1000"
                        value={values.monthlyAmount}
                        onChange={(e) => handleChange("monthlyAmount", Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <div className="flex justify-between mt-2 text-xs text-[var(--color-text-muted)]">
                        <span>5,000円</span>
                        <span>50,000円</span>
                    </div>
                </div>
                <div className="mt-2 text-xs text-[var(--color-text-muted)] space-y-1">
                    <p>※年間上限: 60万円（月額50,000円）</p>
                    <p>※非課税保有限度額: 600万円</p>
                </div>
                {/* Quick Select Buttons */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {[10000, 20000, 30000, 50000].map((amount) => (
                        <motion.button
                            key={amount}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleChange("monthlyAmount", amount)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${values.monthlyAmount === amount
                                ? "bg-[var(--color-royal-blue)] text-white"
                                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-royal-blue)]/10"
                                }`}
                        >
                            {(amount / 10000).toFixed(0)}万円
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Expected Return */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <label className="input-label flex items-center justify-between">
                    <span className="text-sm md:text-base">期待リターン（年率）</span>
                    <span className="text-[var(--color-royal-blue)] font-bold">
                        {values.expectedReturn}%
                    </span>
                </label>
                <div className="relative">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.5"
                        value={values.expectedReturn}
                        onChange={(e) => handleChange("expectedReturn", Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <div className="flex justify-between mt-2 text-xs text-[var(--color-text-muted)]">
                        <span>1%（保守的）</span>
                        <span>10%（積極的）</span>
                    </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {[
                        { rate: 3, label: "3% 保守的" },
                        { rate: 5, label: "5% 標準" },
                        { rate: 7, label: "7% 積極的" },
                    ].map(({ rate, label }) => (
                        <motion.button
                            key={rate}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleChange("expectedReturn", rate)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${values.expectedReturn === rate
                                ? "bg-[var(--color-royal-blue)] text-white"
                                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-royal-blue)]/10"
                                }`}
                        >
                            {label}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Investment Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5 rounded-xl border border-[var(--glass-border)]"
            >
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                    投資プラン概要
                </h4>
                <div className="space-y-1 text-xs text-[var(--color-text-secondary)]">
                    <p>• 年間投資額: <span className="font-semibold">{(values.monthlyAmount * 12).toLocaleString()}円</span></p>
                    <p>• 投資可能年数: <span className="font-semibold">{investmentYears}年</span></p>
                    <p>• 最大投資可能額: <span className="font-semibold">{(maxInvestment / 10000).toLocaleString()}万円</span></p>
                </div>
            </motion.div>

            <style jsx>{`
                .slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                }
                .slider-thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #FFFFFF;
                    border: 2px solid var(--color-royal-blue);
                    cursor: pointer;
                    box-shadow: 0 4px 10px rgba(30, 58, 138, 0.2);
                    transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                    margin-top: -8px;
                }
                .slider-thumb::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.1), 0 8px 15px rgba(30, 58, 138, 0.2);
                }
                .slider-thumb::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 8px;
                    cursor: pointer;
                    background: #E5E7EB;
                    border-radius: 4px;
                }
                .slider-thumb:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.15), 0 8px 15px rgba(30, 58, 138, 0.25);
                }
            `}</style>
        </div>
    );
}
