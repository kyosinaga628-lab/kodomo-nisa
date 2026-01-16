"use client";

import { useMemo } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ReferenceLine,
} from "recharts";
import { YearlyData, formatCurrency } from "@/lib/calculator";

interface Props {
    data: YearlyData[];
}

export default function ResultChart({ data }: Props) {
    const chartData = useMemo(() => {
        return data.map((item) => ({
            ...item,
            name: `${item.age}歳`,
        }));
    }, [data]);

    // 18歳の位置を見つける（成人NISA移行ライン）
    const adultTransitionIndex = chartData.findIndex(d => d.age === 18);

    const CustomTooltip = ({ active, payload }: {
        active?: boolean;
        payload?: Array<{ value: number; dataKey: string; color: string; payload: YearlyData & { name: string } }>;
    }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 md:p-4 rounded-xl shadow-lg border border-[var(--glass-border)] max-w-[200px]">
                    <p className="font-semibold text-[var(--color-text-primary)] mb-2 text-sm">{data.name}</p>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500">
                            投資元本: {formatCurrency(data.invested)}
                        </p>
                        <p className="text-xs text-[var(--color-royal-blue)]">
                            評価額: {formatCurrency(data.value)}
                        </p>
                        <p className="text-xs text-[var(--color-emerald)] font-medium">
                            運用益: {formatCurrency(data.gain)}
                        </p>
                    </div>
                    {data.canWithdraw && (
                        <p className="text-xs text-[var(--color-text-muted)] mt-2 pt-2 border-t border-gray-100">
                            {data.withdrawReason}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6B7280" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6B7280" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: "#6B7280" }}
                        axisLine={{ stroke: "#E5E7EB" }}
                        tickLine={{ stroke: "#E5E7EB" }}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tickFormatter={(value) => formatCurrency(value)}
                        tick={{ fontSize: 10, fill: "#6B7280" }}
                        axisLine={{ stroke: "#E5E7EB" }}
                        tickLine={{ stroke: "#E5E7EB" }}
                        width={60}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        formatter={(value) => (value === "invested" ? "投資元本" : "評価額")}
                        wrapperStyle={{ fontSize: 12 }}
                    />
                    {adultTransitionIndex >= 0 && (
                        <ReferenceLine
                            x="18歳"
                            stroke="#059669"
                            strokeDasharray="5 5"
                            label={{ value: "成人NISA移行", position: "top", fontSize: 10, fill: "#059669" }}
                        />
                    )}
                    <Area
                        type="monotone"
                        dataKey="invested"
                        stroke="#6B7280"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorInvested)"
                        animationDuration={1000}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#1E3A8A"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        animationDuration={1200}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
