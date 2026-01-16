"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { SimulationResult, formatCurrency, formatCurrencyFull } from "@/lib/calculator";

interface Props {
    result: SimulationResult;
}

function AnimatedNumber({ value, duration = 1000 }: { value: number; duration?: number }) {
    const [displayValue, setDisplayValue] = useState(0);
    const previousValue = useRef(0);

    useEffect(() => {
        const start = previousValue.current;
        const end = value;
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function (ease-out-cubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);

            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                previousValue.current = end;
            }
        };

        requestAnimationFrame(animate);
    }, [value, duration]);

    return <>{formatCurrencyFull(displayValue)}</>;
}

export default function ResultSummary({ result }: Props) {
    const stats = [
        {
            label: "投資元本",
            value: result.totalInvestment,
            color: "text-[var(--color-text-secondary)]",
            bgColor: "bg-gray-100",
        },
        {
            label: "最終評価額",
            value: result.finalValue,
            color: "text-[var(--color-royal-blue)]",
            bgColor: "bg-[var(--color-royal-blue)]/10",
            highlight: true,
        },
        {
            label: "運用益",
            value: result.totalGain,
            color: "text-[var(--color-emerald)]",
            bgColor: "bg-[var(--color-emerald)]/10",
        },
        {
            label: "節税効果",
            value: result.taxSaved,
            color: "text-[var(--color-royal-blue-light)]",
            bgColor: "bg-[var(--color-royal-blue)]/5",
            suffix: "（非課税メリット）",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 md:gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`${stat.bgColor} rounded-xl md:rounded-2xl p-3 md:p-5 ${stat.highlight ? "col-span-2 md:col-span-1" : ""}`}
                >
                    <p className="text-xs md:text-sm text-[var(--color-text-muted)] mb-1">
                        {stat.label}
                    </p>
                    <p className={`text-xl md:text-2xl lg:text-3xl font-bold ${stat.color}`}>
                        <AnimatedNumber value={stat.value} />
                    </p>
                    {stat.suffix && (
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">
                            {stat.suffix}
                        </p>
                    )}
                </motion.div>
            ))}

            {/* Visual comparison */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="col-span-2 bg-white rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--glass-border)] overflow-hidden"
            >
                <p className="text-sm text-[var(--color-text-muted)] mb-4">投資効率</p>
                <div className="space-y-3">
                    {/* 元本バー */}
                    <div>
                        <div className="mb-1 flex justify-between text-xs text-[var(--color-text-muted)]">
                            <span>元本</span>
                            <span>{formatCurrency(result.totalInvestment)}</span>
                        </div>
                        <div className="h-4 md:h-6 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gray-400 rounded-full transition-all duration-500"
                                style={{
                                    width: result.finalValue > 0
                                        ? `${(result.totalInvestment / result.finalValue) * 100}%`
                                        : "100%"
                                }}
                            />
                        </div>
                    </div>
                    {/* 最終評価額バー */}
                    <div>
                        <div className="mb-1 flex justify-between text-xs text-[var(--color-text-muted)]">
                            <span>最終評価額</span>
                            <span className="font-semibold text-[var(--color-emerald)]">{formatCurrency(result.finalValue)}</span>
                        </div>
                        <div className="h-4 md:h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[var(--color-royal-blue)] to-[var(--color-emerald)] rounded-full transition-all duration-500"
                                style={{ width: "100%" }}
                            />
                        </div>
                    </div>
                </div>
                {result.totalInvestment > 0 && (
                    <p className="mt-4 text-center text-sm text-[var(--color-emerald)] font-semibold">
                        元本の {((result.finalValue / result.totalInvestment) * 100).toFixed(1)}% に成長
                    </p>
                )}
            </motion.div>
        </div>
    );
}
