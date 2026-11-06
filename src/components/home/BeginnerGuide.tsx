import Link from "next/link";
import { ArrowIcon } from "@/components/common/ui";
import { calculateNISA, formatCurrency } from "@/lib/calculator";

const points = [
    {
        title: "税金がかからない",
        description: "増えたお金はまるごとお子様のもの。国に払う分がゼロに。",
    },
    {
        title: "長く続けるほどお得",
        description: "0歳から始めれば最大18年間。お金がお金を生む「複利」の力を最大限活用。",
    },
    {
        title: "18歳で自由に使える",
        description: "大学の入学金、留学、起業資金など、お子様の夢を後押し。",
    },
];

// 例示の金額はシミュレーターと同じ計算から出す（18歳時点）
const example = calculateNISA({ monthlyAmount: 50000, childAge: 0, expectedReturn: 5 });

export default function BeginnerGuide() {
    return (
        <div>
            <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-14">
                {/* 結論 */}
                <div className="bg-[var(--color-royal-blue)] text-white rounded-[10px] p-6 sm:p-9 flex flex-col">
                    <p className="text-[0.8125rem] font-medium tracking-[0.06em] text-white/70">30秒でわかる「こどもNISA」の結論</p>
                    <h3 className="text-white text-[1.625rem] sm:text-[2rem] leading-[1.45] mt-3">
                        お金が増えても
                        <br />
                        税金がかからない制度
                    </h3>
                    <p className="text-white/80 text-[0.9375rem] mt-4">
                        普通は投資で増えたお金の約20%が税金で取られますが、こどもNISAなら、その税金が0円になります。
                    </p>
                    <p className="text-white/70 text-xs mt-auto pt-6">難しい言葉は一切使いません。まずは「結論」からお伝えします。</p>
                </div>

                {/* 3つの要点 */}
                <ol className="ledger self-start w-full">
                    {points.map((point, index) => (
                        <li key={point.title} className="grid grid-cols-[2.25rem_minmax(0,1fr)] py-5">
                            <span className="figure text-[1.25rem] text-[var(--color-text-muted)]" aria-hidden="true">{index + 1}</span>
                            <div>
                                <h3 className="heading-card">{point.title}</h3>
                                <p className="mt-1 text-[0.9375rem] text-[var(--color-text-secondary)]">{point.description}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            {/* 例 */}
            <div className="mt-10 md:mt-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                    <h3 className="heading-card mb-4">例えば、こうなります</h3>
                    <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
                        <div>
                            <p className="note mb-1">毎月の積立額</p>
                            <p className="figure text-[2rem] md:text-[2.5rem]">5<span className="figure-unit">万円</span></p>
                        </div>
                        <span className="pb-2 text-[var(--color-text-muted)]" aria-hidden="true"><ArrowIcon size={22} /></span>
                        <div>
                            <p className="note mb-1">18歳時点では（年5%成長の場合）</p>
                            <p className="figure text-[2rem] md:text-[2.5rem] text-[var(--color-emerald)]">約{formatCurrency(example.finalValue).replace("万円", "")}<span className="figure-unit">万円</span></p>
                        </div>
                    </div>
                    <p className="note mt-3">
                        ※投資元本は{formatCurrency(example.totalInvestment)}（非課税保有上限）。約{formatCurrency(example.totalGain)}の利益が非課税に。将来の成果を保証するものではありません。
                    </p>
                </div>
                <Link href="/simulator" className="btn-primary flex-shrink-0">
                    あなたの場合をシミュレーション
                    <ArrowIcon />
                </Link>
            </div>
        </div>
    );
}
