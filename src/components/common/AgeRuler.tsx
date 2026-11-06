import { KODOMO_NISA_INFO } from "@/lib/calculator";

// 年齢のものさし: 払出しルールを 0〜18歳の長さそのままに見せる
const BANDS = [
    { flex: 12, from: "0", to: "11歳", fill: "bg-[var(--color-line-strong)]" },
    { flex: 6, from: "12", to: "17歳", fill: "bg-[var(--color-emerald-light)]" },
    { flex: 3, from: "18", to: "歳〜", fill: "bg-[var(--color-royal-blue)]" },
];

export default function AgeRuler() {
    const rules = KODOMO_NISA_INFO.withdrawalRules;

    return (
        <div>
            {/* Desktop: 横のものさし */}
            <div className="hidden md:block">
                <div className="flex gap-[2px]" aria-hidden="true">
                    {BANDS.map((band) => (
                        <div key={band.from} style={{ flex: band.flex }}>
                            <div className={`h-2 ${band.fill}`} />
                            <div
                                className="h-1.5 mt-[2px] opacity-60"
                                style={{
                                    backgroundImage: "linear-gradient(to right, var(--color-line-strong) 1px, transparent 1px)",
                                    backgroundSize: `calc(100% / ${band.flex}) 100%`,
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex gap-[2px] mt-4">
                    {BANDS.map((band, index) => (
                        <div key={band.from} style={{ flex: index === 2 ? 6 : band.flex }} className="pr-6 min-w-0">
                            <p className="figure text-lg">{rules[index].ageRange}</p>
                            <p className="font-semibold text-[0.9375rem] mt-2 leading-relaxed">{rules[index].rule}</p>
                            <p className="note mt-1">{rules[index].detail}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile: 縦のものさし */}
            <ol className="md:hidden">
                {BANDS.map((band, index) => (
                    <li key={band.from} className="flex gap-4">
                        <div className={`w-1.5 flex-shrink-0 ${band.fill} ${index < BANDS.length - 1 ? "mb-[2px]" : ""}`} aria-hidden="true" />
                        <div className="pb-6 min-w-0">
                            <p className="figure text-lg">{rules[index].ageRange}</p>
                            <p className="font-semibold text-[0.9375rem] mt-1.5 leading-relaxed">{rules[index].rule}</p>
                            <p className="note mt-1">{rules[index].detail}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
