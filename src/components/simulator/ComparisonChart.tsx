"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ComparisonData, formatCurrency } from "@/lib/calculator";

interface ComparisonChartProps {
    data: ComparisonData[];
}

// 表示順はグラフ上の高い順。色はシリーズに固定（検証済みの組み合わせ）
const SERIES = [
    {
        key: "nisaGlobal" as const,
        name: "NISA（全世界株）",
        color: "#00795B",
        note: "年利5%想定（長期平均リターン）",
    },
    {
        key: "highYieldBank" as const,
        name: "ネット銀行（好金利）",
        color: "#B5791C",
        note: "年利0.7%想定（一部ネット銀行の優遇金利、2026年11月時点。預入上限・条件がある場合あり）",
    },
    {
        key: "bankDeposit" as const,
        name: "銀行預金",
        color: "#5C8AC8",
        note: "年利0.5%（メガバンク普通預金、2026年11月2日改定）",
    },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ComparisonData }> }) {
    if (!active || !payload || payload.length === 0) return null;
    const row = payload[0].payload;
    return (
        <div className="bg-[var(--color-surface)] px-3.5 py-3 rounded-md shadow-[var(--shadow-lg)] border border-[var(--color-line)] text-xs">
            <p className="font-semibold text-[0.875rem] mb-1.5">{row.year}年後</p>
            <dl className="space-y-0.5 tnum">
                {SERIES.map((series) => (
                    <div key={series.key} className="flex items-center justify-between gap-5">
                        <dt className="flex items-center gap-1.5">
                            <span className="w-2 h-0.5" style={{ background: series.color }} aria-hidden="true" />
                            {series.name}
                        </dt>
                        <dd className="font-semibold">{formatCurrency(row[series.key])}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

export default function ComparisonChart({ data }: ComparisonChartProps) {
    const last = data[data.length - 1];

    return (
        <div className="w-full">
            <div className="h-[260px] md:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#ECE9E1" />
                        <XAxis
                            dataKey="year"
                            tick={{ fontSize: 12, fill: "#667080" }}
                            axisLine={{ stroke: "#C9C4B6" }}
                            tickLine={false}
                            tickFormatter={(year) => `${year}年`}
                            interval="preserveStartEnd"
                            minTickGap={24}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: "#667080" }}
                            axisLine={false}
                            tickLine={false}
                            width={64}
                            tickFormatter={(value) => formatCurrency(value)}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#17202C", strokeOpacity: 0.3 }} />
                        {SERIES.map((series) => (
                            <Line
                                key={series.key}
                                type="monotone"
                                dataKey={series.key}
                                name={series.name}
                                stroke={series.color}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 2, stroke: "#FFFFFF" }}
                                isAnimationActive={false}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 凡例兼、最終年の値 */}
            <dl className="mt-5 grid md:grid-cols-3 gap-x-8 gap-y-4 border-t border-[var(--color-line)] pt-4">
                {SERIES.map((series) => (
                    <div key={series.key}>
                        <dt className="flex items-center gap-2 text-[0.875rem] font-semibold">
                            <span className="w-3 h-0.5 flex-shrink-0" style={{ background: series.color }} aria-hidden="true" />
                            {series.name}
                        </dt>
                        {last && <dd className="figure text-[1.375rem] mt-1">{formatCurrency(last[series.key])}</dd>}
                        <dd className="note mt-1">{series.note}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
