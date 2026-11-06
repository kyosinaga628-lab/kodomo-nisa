import { formatCurrencyFull } from "@/lib/calculator";

interface PublicValueProps {
    taxSaved: number;
    totalGain: number;
}

export default function PublicValue({ taxSaved, totalGain }: PublicValueProps) {
    // 税金が教育費に転換される割合を計算
    const educationRatio = totalGain > 0 ? (taxSaved / totalGain * 100).toFixed(1) : "0";

    return (
        <div>
            <h2 className="heading-section !text-[1.375rem] md:!text-[1.625rem]">こどもNISAの公的価値</h2>
            <p className="mt-2 text-[0.9375rem] text-[var(--color-text-secondary)]">
                非課税制度は、単なる「節税」ではありません。社会が支えるべき次世代への、直接的な投資です。
            </p>

            <div className="mt-5 grid sm:grid-cols-2 border-y border-[var(--color-line-strong)]">
                <div className="py-5 sm:pr-8 border-b sm:border-b-0 sm:border-r border-[var(--color-line)]">
                    <h3 className="font-sans font-semibold text-[0.9375rem]">通常の場合（課税）</h3>
                    <p className="note mt-1">運用益の約20%が税金として徴収されます。</p>
                    <p className="figure text-[1.75rem] mt-3 text-[var(--color-text-secondary)]">{formatCurrencyFull(taxSaved)}</p>
                    <p className="note mt-1">納税額（想定）</p>
                </div>
                <div className="py-5 sm:pl-8">
                    <h3 className="font-sans font-semibold text-[0.9375rem]">こどもNISAの場合</h3>
                    <p className="note mt-1">本来納めるはずの税金が、お子様の教育資金に転換されます。</p>
                    <p className="figure text-[1.75rem] mt-3 text-[var(--color-emerald)]">{formatCurrencyFull(taxSaved)}</p>
                    <p className="note mt-1">教育資金への転換額</p>
                </div>
            </div>

            <p className="mt-4 text-[0.9375rem] text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-text-primary)]">社会による次世代支援のカタチ：</strong>
                運用益の<strong className="tnum text-[var(--color-text-primary)]">{educationRatio}%</strong>が、「お子様専用の教育資金」に振り替えられています。少子化対策と資産形成を一体化した先進的な制度です。
            </p>
        </div>
    );
}
