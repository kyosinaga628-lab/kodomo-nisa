import { SimulationResult, formatCurrency, formatCurrencyFull } from "@/lib/calculator";

interface Props {
    result: SimulationResult;
}

export default function ResultSummary({ result }: Props) {
    const principalShare = result.finalValue > 0 ? (result.totalInvestment / result.finalValue) * 100 : 100;

    return (
        <div>
            <p className="text-[0.9375rem] font-semibold text-[var(--color-text-secondary)]">
                18歳時点の評価額<span className="font-normal text-[var(--color-text-muted)]">（試算）</span>
            </p>
            <p className="figure mt-1 text-[2.75rem] sm:text-[3.75rem]" aria-live="polite">
                {result.finalValue.toLocaleString()}
                <span className="figure-unit">円</span>
            </p>

            {/* 内訳: 元本と運用益 */}
            <div className="mt-5 flex gap-[2px] h-3" role="img" aria-label={`投資元本 ${formatCurrency(result.totalInvestment)}、運用益 ${formatCurrency(result.totalGain)}`}>
                <div className="bg-[var(--chart-principal)] rounded-l-[2px] transition-[width] duration-200" style={{ width: `${principalShare}%` }} />
                <div className="bg-[var(--chart-gain)] rounded-r-[2px] flex-1" />
            </div>

            <dl className="mt-5 grid sm:grid-cols-3 gap-x-8 gap-y-4">
                <div>
                    <dt className="note flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[var(--chart-principal)]" aria-hidden="true" />
                        投資元本
                    </dt>
                    <dd className="figure text-[1.5rem] mt-1">{formatCurrencyFull(result.totalInvestment)}</dd>
                </div>
                <div>
                    <dt className="note flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[var(--chart-gain)]" aria-hidden="true" />
                        運用益
                    </dt>
                    <dd className="figure text-[1.5rem] mt-1 text-[var(--color-emerald)]">{formatCurrencyFull(result.totalGain)}</dd>
                </div>
                <div>
                    <dt className="note">節税効果（非課税メリット）</dt>
                    <dd className="figure text-[1.5rem] mt-1">{formatCurrencyFull(result.taxSaved)}</dd>
                </div>
            </dl>

            <p className="mt-5 pt-4 border-t border-[var(--color-line)] flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[0.9375rem]">
                <span className="text-[var(--color-text-secondary)]">18歳以降は積立せず、23歳まで運用を続けた場合</span>
                <span className="figure text-[1.25rem]">{formatCurrencyFull(result.yearlyData[result.yearlyData.length - 1].value)}</span>
            </p>
        </div>
    );
}
