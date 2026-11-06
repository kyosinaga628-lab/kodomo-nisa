"use client";

import { useId } from "react";
import { SimulationInput, KODOMO_NISA_INFO } from "@/lib/calculator";

interface Props {
    values: SimulationInput;
    onChange: (values: SimulationInput) => void;
}

interface RangeFieldProps {
    label: string;
    display: string;
    min: number;
    max: number;
    step: number;
    value: number;
    minLabel: string;
    maxLabel: string;
    onChange: (value: number) => void;
}

function RangeField({ label, display, min, max, step, value, minLabel, maxLabel, onChange }: RangeFieldProps) {
    const id = useId();
    return (
        <div>
            <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[0.9375rem] font-medium">
                {label}
                <span className="figure text-[1.375rem] text-[var(--color-royal-blue)]">{display}</span>
            </label>
            <input
                id={id}
                type="range"
                className="range mt-1"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ "--fill": `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties}
            />
            <div className="flex justify-between note">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>
        </div>
    );
}

export default function SimulatorForm({ values, onChange }: Props) {
    const handleChange = (field: keyof SimulationInput, value: number) => {
        onChange({ ...values, [field]: value });
    };

    // 投資可能年数を計算（現在年齢から17歳まで）
    const investmentYears = Math.max(0, 17 - values.childAge + 1);
    const maxInvestment = Math.min(investmentYears * 600000, KODOMO_NISA_INFO.totalLimit);

    return (
        <div className="space-y-7">
            <RangeField
                label="お子様の投資開始時の年齢"
                display={`${values.childAge}歳`}
                min={0}
                max={17}
                step={1}
                value={values.childAge}
                minLabel="0歳"
                maxLabel="17歳"
                onChange={(v) => handleChange("childAge", v)}
            />

            <div>
                <RangeField
                    label="月額積立額"
                    display={`${values.monthlyAmount.toLocaleString()}円`}
                    min={5000}
                    max={50000}
                    step={1000}
                    value={values.monthlyAmount}
                    minLabel="5,000円"
                    maxLabel="50,000円"
                    onChange={(v) => handleChange("monthlyAmount", v)}
                />
                <div className="mt-2.5 flex flex-wrap gap-2">
                    {[10000, 20000, 30000, 50000].map((amount) => (
                        <button
                            key={amount}
                            type="button"
                            aria-pressed={values.monthlyAmount === amount}
                            onClick={() => handleChange("monthlyAmount", amount)}
                            className="preset tnum"
                        >
                            {(amount / 10000).toFixed(0)}万円
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <RangeField
                    label="期待リターン（年率）"
                    display={`${values.expectedReturn}%`}
                    min={1}
                    max={10}
                    step={0.5}
                    value={values.expectedReturn}
                    minLabel="1%（保守的）"
                    maxLabel="10%（積極的）"
                    onChange={(v) => handleChange("expectedReturn", v)}
                />
                <div className="mt-2.5 flex flex-wrap gap-2">
                    {[
                        { rate: 3, label: "3% 保守的" },
                        { rate: 5, label: "5% 標準" },
                        { rate: 7, label: "7% 積極的" },
                    ].map(({ rate, label }) => (
                        <button
                            key={rate}
                            type="button"
                            aria-pressed={values.expectedReturn === rate}
                            onClick={() => handleChange("expectedReturn", rate)}
                            className="preset"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-t border-[var(--color-line)] pt-4">
                <h3 className="font-sans text-[0.875rem] font-semibold mb-2">投資プラン概要</h3>
                <dl className="space-y-1 text-[0.875rem] text-[var(--color-text-secondary)]">
                    {[
                        ["年間投資額", `${(values.monthlyAmount * 12).toLocaleString()}円`],
                        ["投資可能期間", `${investmentYears}年間`],
                        ["最大投資可能額", `${(maxInvestment / 10000).toLocaleString()}万円`],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-3">
                            <dt>{label}</dt>
                            <dd className="tnum font-semibold text-[var(--color-text-primary)]">{value}</dd>
                        </div>
                    ))}
                </dl>
                <ul className="note mt-3 space-y-0.5">
                    <li>※18歳で成人NISAへ自動移行</li>
                    <li>※年間上限: 60万円（月額50,000円）</li>
                    <li>※非課税保有限度額: 600万円</li>
                </ul>
            </div>
        </div>
    );
}
