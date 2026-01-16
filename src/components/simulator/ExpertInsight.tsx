"use client";

import { motion } from "framer-motion";
import { getExpertComment } from "@/lib/calculator";

interface ExpertInsightProps {
    expectedReturn: number;
}

const riskLevelConfig = {
    low: {
        label: "リスク: 低",
        color: "bg-blue-100 text-blue-700 border-blue-300",
    },
    medium: {
        label: "リスク: 中",
        color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    },
    high: {
        label: "リスク: 高",
        color: "bg-red-100 text-red-700 border-red-300",
    },
};

export default function ExpertInsight({ expectedReturn }: ExpertInsightProps) {
    const insight = getExpertComment(expectedReturn);
    const riskConfig = riskLevelConfig[insight.riskLevel];

    return (
        <motion.div
            key={expectedReturn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card-base p-4 md:p-6 bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5 border-l-4 border-[var(--color-emerald)]"
        >
            <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
                <div className="flex items-center gap-3 md:block">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--color-emerald)]/10 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2" className="md:w-6 md:h-6">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                            <path d="M8 10h.01M12 10h.01M16 10h.01" />
                        </svg>
                    </div>
                    <span className={`md:hidden px-2 py-1 rounded-md text-xs font-medium border ${riskConfig.color}`}>
                        {riskConfig.label}
                    </span>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif font-semibold text-base md:text-lg text-[var(--color-emerald)]">
                            {insight.title}
                        </h3>
                        <span className={`hidden md:inline-flex px-2 py-1 rounded-md text-xs font-medium border ${riskConfig.color}`}>
                            {riskConfig.label}
                        </span>
                    </div>
                    <p className="text-[var(--color-text-primary)] mb-2 md:mb-3 leading-relaxed text-sm md:text-base">
                        {insight.comment}
                    </p>
                    <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {insight.context}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
