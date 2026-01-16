"use client";

import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { ComparisonData, formatCurrency } from "@/lib/calculator";

interface ComparisonChartProps {
    data: ComparisonData[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-[var(--glass-border)]">
                <p className="font-semibold mb-2">
                    {payload[0].payload.year}年後
                </p>
                {payload.reverse().map((entry: any, index: number) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: {formatCurrency(entry.value)}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function ComparisonChart({ data }: ComparisonChartProps) {
    return (
        <div className="w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <ResponsiveContainer width="100%" height={280} className="md:!h-[400px]">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorBank" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorGlobal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorHighYield" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D97706" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="year"
                            stroke="#6B7280"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            label={{ value: "年数", position: "insideBottom", offset: -5, style: { fontSize: 12 } }}
                        />
                        <YAxis
                            stroke="#6B7280"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            tickFormatter={(value) => formatCurrency(value)}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{ paddingTop: "20px" }}
                            iconType="line"
                        />
                        <Area
                            type="monotone"
                            dataKey="bankDeposit"
                            name="銀行預金"
                            stroke="#9CA3AF"
                            strokeWidth={2}
                            fill="url(#colorBank)"
                        />
                        <Area
                            type="monotone"
                            dataKey="nisaGlobal"
                            name="NISA（全世界株）"
                            stroke="#1E3A8A"
                            strokeWidth={2}
                            fill="url(#colorGlobal)"
                        />
                        <Area
                            type="monotone"
                            dataKey="highYieldBank"
                            name="ネット銀行（好金利）"
                            stroke="#D97706"
                            strokeWidth={3}
                            fill="url(#colorHighYield)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Comparison Legend */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
            >
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                        <span className="font-semibold text-sm">銀行預金</span>
                    </div>
                    <p className="text-xs text-gray-600">年利0.001%（一般的な普通預金金利）</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--color-royal-blue)]" />
                        <span className="font-semibold text-sm">NISA（全世界株）</span>
                    </div>
                    <p className="text-xs text-[var(--color-royal-blue)]">年利5%想定（長期平均リターン）</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-amber-600" />
                        <span className="font-semibold text-sm">ネット銀行（好金利）</span>
                    </div>
                    <p className="text-xs text-amber-700">年利0.3%想定（一部のネット銀行など）</p>
                </div>
            </motion.div>
        </div>
    );
}
