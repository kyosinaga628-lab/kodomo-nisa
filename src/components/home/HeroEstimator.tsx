"use client";

import { useId, useMemo, useState, useRef } from "react";
import { calculateNISA } from "@/lib/calculator";

const EXPECTED_RETURN = 5;
// 入力を変えても縦軸を固定し、金額の差がそのまま形の差に見えるようにする
const Y_MAX = 12_000_000;
const AGE_MAX = 18;

const W = 520;
const H = 208;
const PAD = { top: 12, right: 12, bottom: 30, left: 12 };

const toManYen = (value: number) => `${Math.round(value / 10000).toLocaleString()}`;

function buildPoints(childAge: number, monthlyAmount: number) {
    const { yearlyData, investmentYears } = calculateNISA({ monthlyAmount, childAge, expectedReturn: EXPECTED_RETURN });
    return [
        { age: childAge, value: 0, invested: 0 },
        ...yearlyData.slice(0, investmentYears).map((d) => ({ age: d.age + 1, value: d.value, invested: d.invested })),
    ];
}

export default function HeroEstimator() {
    const [monthlyAmount, setMonthlyAmount] = useState(30000);
    const [childAge, setChildAge] = useState(0);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const monthlyId = useId();
    const ageId = useId();

    const points = useMemo(() => buildPoints(childAge, monthlyAmount), [childAge, monthlyAmount]);
    const last = points[points.length - 1];
    const active = hoverIndex !== null ? points[Math.min(hoverIndex, points.length - 1)] : null;

    const x = (age: number) => PAD.left + (age / AGE_MAX) * (W - PAD.left - PAD.right);
    const y = (value: number) => H - PAD.bottom - (value / Y_MAX) * (H - PAD.top - PAD.bottom);
    const baseline = y(0);

    const line = (key: "value" | "invested") => points.map((p) => `${x(p.age).toFixed(1)},${y(p[key]).toFixed(1)}`).join(" L");
    const investedPath = `M${line("invested")} L${x(last.age).toFixed(1)},${baseline} L${x(points[0].age).toFixed(1)},${baseline} Z`;
    const gainPath = `M${line("value")} L${points.slice().reverse().map((p) => `${x(p.age).toFixed(1)},${y(p.invested).toFixed(1)}`).join(" L")} Z`;

    const handlePointer = (clientX: number) => {
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return;
        const age = ((clientX - rect.left) / rect.width) * W;
        const target = ((age - PAD.left) / (W - PAD.left - PAD.right)) * AGE_MAX;
        let nearest = 0;
        points.forEach((p, i) => {
            if (Math.abs(p.age - target) < Math.abs(points[nearest].age - target)) nearest = i;
        });
        setHoverIndex(nearest);
    };

    const shown = active ?? last;

    return (
        <div className="card-base p-5 sm:p-7" style={{ boxShadow: "var(--shadow-xl)" }}>
            <div className="flex items-baseline justify-between gap-4">
                <p className="text-[0.875rem] font-semibold text-[var(--color-text-secondary)]">
                    {shown.age}歳時点の評価額<span className="font-normal text-[var(--color-text-muted)]">（試算）</span>
                </p>
                <span className="chip chip-outline">年率{EXPECTED_RETURN}%</span>
            </div>

            <p className="figure mt-2 text-[2.75rem] sm:text-[3.5rem]" aria-live="polite">
                <span className="text-[0.5em] font-medium mr-1">約</span>
                {toManYen(shown.value)}
                <span className="figure-unit">万円</span>
            </p>

            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[0.875rem] text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[var(--chart-principal)]" aria-hidden="true" />
                    <dt>投資元本</dt>
                    <dd className="tnum font-semibold text-[var(--color-text-primary)]">{toManYen(shown.invested)}万円</dd>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[var(--chart-gain)]" aria-hidden="true" />
                    <dt>運用益（非課税）</dt>
                    <dd className="tnum font-semibold text-[var(--color-text-primary)]">{toManYen(shown.value - shown.invested)}万円</dd>
                </div>
            </dl>

            <svg
                ref={svgRef}
                viewBox={`0 0 ${W} ${H}`}
                className="w-full h-auto mt-4 touch-pan-y"
                role="img"
                aria-label={`${childAge}歳から毎月${monthlyAmount.toLocaleString()}円を積み立てた場合の資産推移。18歳時点で約${toManYen(last.value)}万円`}
                onPointerMove={(e) => handlePointer(e.clientX)}
                onPointerLeave={() => setHoverIndex(null)}
            >
                {/* 年齢のものさし */}
                <line x1={PAD.left} x2={W - PAD.right} y1={baseline} y2={baseline} stroke="var(--color-line-strong)" />
                {Array.from({ length: AGE_MAX + 1 }, (_, age) => (
                    <line
                        key={age}
                        x1={x(age)}
                        x2={x(age)}
                        y1={baseline}
                        y2={baseline + (age % 6 === 0 ? 7 : 4)}
                        stroke="var(--color-line-strong)"
                    />
                ))}
                {[0, 6, 12, 18].map((age) => (
                    <text
                        key={age}
                        x={x(age)}
                        y={H - 4}
                        fontSize="12"
                        fill="var(--color-text-muted)"
                        textAnchor={age === 0 ? "start" : age === 18 ? "end" : "middle"}
                    >
                        {age}歳
                    </text>
                ))}

                {/* 12歳から教育費に使える */}
                <line x1={x(12)} x2={x(12)} y1={PAD.top + 4} y2={baseline} stroke="var(--color-line-strong)" strokeDasharray="2 3" />
                <text x={x(12) - 6} y={PAD.top + 14} fontSize="12" fill="var(--color-text-muted)" textAnchor="end">
                    12歳〜 教育費の払出し可
                </text>

                <path d={investedPath} fill="var(--chart-principal)" fillOpacity="0.55" />
                <path d={gainPath} fill="var(--chart-gain)" fillOpacity="0.85" />
                <path d={`M${line("value")}`} fill="none" stroke="var(--chart-gain)" strokeWidth="2" />

                {/* 終点 / ホバー位置 */}
                <line x1={x(shown.age)} x2={x(shown.age)} y1={y(shown.value)} y2={baseline} stroke="var(--color-text-primary)" strokeOpacity={active ? 0.5 : 0} />
                <circle cx={x(shown.age)} cy={y(shown.value)} r="5" fill="var(--chart-gain)" stroke="var(--color-surface)" strokeWidth="2" />
            </svg>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                    <label htmlFor={monthlyId} className="flex items-baseline justify-between text-[0.875rem] font-medium">
                        毎月の積立額
                        <span className="tnum font-semibold text-[var(--color-royal-blue)]">{monthlyAmount.toLocaleString()}円</span>
                    </label>
                    <input
                        id={monthlyId}
                        type="range"
                        className="range"
                        min={5000}
                        max={50000}
                        step={5000}
                        value={monthlyAmount}
                        onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                        style={{ "--fill": `${((monthlyAmount - 5000) / 45000) * 100}%` } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label htmlFor={ageId} className="flex items-baseline justify-between text-[0.875rem] font-medium">
                        始めるときの年齢
                        <span className="tnum font-semibold text-[var(--color-royal-blue)]">{childAge}歳</span>
                    </label>
                    <input
                        id={ageId}
                        type="range"
                        className="range"
                        min={0}
                        max={17}
                        step={1}
                        value={childAge}
                        onChange={(e) => setChildAge(Number(e.target.value))}
                        style={{ "--fill": `${(childAge / 17) * 100}%` } as React.CSSProperties}
                    />
                </div>
            </div>

            <p className="note mt-3">
                年率{EXPECTED_RETURN}%（複利）で運用できた場合の試算です。将来の成果を保証するものではなく、元本割れの可能性があります。
            </p>
        </div>
    );
}
