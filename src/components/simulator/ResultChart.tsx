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
    ReferenceLine,
} from "recharts";
import { YearlyData, formatCurrency } from "@/lib/calculator";

interface Props {
    data: YearlyData[];
}

const COLORS = {
    principal: "#5C8AC8",
    value: "#00795B",
    grid: "#ECE9E1",
    axis: "#667080",
};

type ChartDatum = YearlyData & { name: string };

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartDatum }> }) {
    if (!active || !payload || payload.length === 0) return null;
    const data = payload[0].payload;
    return (
        <div className="bg-[var(--color-surface)] px-3.5 py-3 rounded-md shadow-[var(--shadow-lg)] border border-[var(--color-line)] text-xs max-w-[220px]">
            <p className="font-semibold text-[0.875rem] mb-1.5">{data.name}時点</p>
            <dl className="space-y-0.5 tnum">
                <div className="flex justify-between gap-5"><dt>評価額</dt><dd className="font-semibold">{formatCurrency(data.value)}</dd></div>
                <div className="flex justify-between gap-5"><dt>投資元本</dt><dd>{formatCurrency(data.invested)}</dd></div>
                <div className="flex justify-between gap-5"><dt>運用益</dt><dd>{formatCurrency(data.gain)}</dd></div>
            </dl>
            <p className="mt-2 pt-2 border-t border-[var(--color-line)] text-[var(--color-text-muted)]">{data.withdrawReason}</p>
        </div>
    );
}

export default function ResultChart({ data }: Props) {
    // 各行は「その年の終わり」の値なので、到達する年齢をラベルにする
    const chartData = useMemo<ChartDatum[]>(
        () => data.map((item) => ({ ...item, name: `${item.age + 1}歳` })),
        [data]
    );

    return (
        <div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mb-3 note">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5" style={{ background: COLORS.value }} aria-hidden="true" />評価額</span>
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5" style={{ background: COLORS.principal }} aria-hidden="true" />投資元本</span>
            </div>
            <div className="w-full h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 22, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke={COLORS.grid} />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12, fill: COLORS.axis }}
                            axisLine={{ stroke: "#C9C4B6" }}
                            tickLine={false}
                            interval="preserveStartEnd"
                            minTickGap={24}
                        />
                        <YAxis
                            tickFormatter={(value) => formatCurrency(value)}
                            tick={{ fontSize: 12, fill: COLORS.axis }}
                            axisLine={false}
                            tickLine={false}
                            width={64}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#17202C", strokeOpacity: 0.3 }} />
                        <ReferenceLine
                            x="18歳"
                            stroke="#465162"
                            strokeDasharray="3 3"
                            label={{ value: "18歳 成人NISAへ移行", position: "top", fontSize: 12, fill: "#465162" }}
                        />
                        <Area type="monotone" dataKey="value" stroke={COLORS.value} strokeWidth={2} fill={COLORS.value} fillOpacity={0.14} isAnimationActive={false} />
                        <Area type="monotone" dataKey="invested" stroke={COLORS.principal} strokeWidth={2} fill={COLORS.principal} fillOpacity={0.28} isAnimationActive={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
