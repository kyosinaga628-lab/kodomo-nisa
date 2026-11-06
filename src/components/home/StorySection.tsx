import AgeRuler from "@/components/common/AgeRuler";
import { SectionHeading } from "@/components/common/ui";

const stories = [
    {
        title: "年間60万円の非課税枠",
        description: "毎年60万円（月5万円）まで投資でき、その運用益が非課税になります。つみたて投資枠と同じ対象商品（インデックスファンド等）に投資可能です。",
        stat: "60",
        unit: "万円",
        statLabel: "年間投資上限",
    },
    {
        title: "最大600万円の保有枠",
        description: "0歳から17歳まで最大18年間、合計600万円まで非課税で保有できます。早く始めるほど、複利効果で資産が大きく成長する可能性があります。",
        stat: "600",
        unit: "万円",
        statLabel: "非課税保有限度額",
    },
    {
        title: "18歳で成人NISAへ移行",
        description: "18歳になると自動的に成人NISAへ移行。非課税のまま運用を継続でき、大学進学、留学、起業資金など、お子様の未来の選択肢を広げます。",
        stat: "0",
        unit: "円",
        statLabel: "移行時の税金",
    },
    {
        title: "運用益が非課税",
        description: "通常、投資の運用益には約20%の税金がかかります。こどもNISAなら、この税金がすべて非課税に。長期運用するほど、節税効果は大きくなります。",
        stat: "約20",
        unit: "%",
        statLabel: "節税できる税率",
    },
];

export default function StorySection() {
    return (
        <section className="section bg-[var(--color-bg)]">
            <div className="container-width">
                <div className="split">
                    <SectionHeading
                        className="split-sticky"
                        kicker="制度の基本"
                        title="こどもNISAの基本"
                        lead="2027年1月からスタートする新制度（口座の事前受付を2026年10月1日から実施中）。お子様の将来のための資産形成を、税制面から強力にサポートします。"
                    />

                    <div className="ledger">
                        {stories.map((story) => (
                            <div key={story.title} className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[9.5rem_minmax(0,1fr)] gap-4 sm:gap-8 py-6 md:py-8">
                                <div>
                                    <p className="figure text-[1.875rem] sm:text-[2.5rem]">
                                        {story.stat}
                                        <span className="figure-unit">{story.unit}</span>
                                    </p>
                                    <p className="note mt-1.5">{story.statLabel}</p>
                                </div>
                                <div>
                                    <h3 className="heading-card">{story.title}</h3>
                                    <p className="mt-2 text-[0.9375rem] text-[var(--color-text-secondary)]">{story.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 年齢のものさし */}
                <div className="mt-16 md:mt-24">
                    <h3 className="heading-card mb-6">いつ、何のために引き出せるか</h3>
                    <AgeRuler />
                </div>

                {/* Eligibility */}
                <div className="mt-14 md:mt-20 grid md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                        <h3 className="heading-card pb-3 border-b border-[var(--color-line-strong)]">対象者</h3>
                        <ul className="mt-3 space-y-2 text-[0.9375rem] text-[var(--color-text-secondary)]">
                            <li>0歳〜17歳の日本居住者</li>
                            <li>親権者等が代理で口座開設・運用</li>
                            <li>1人につき1口座のみ開設可能</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="heading-card pb-3 border-b border-[var(--color-line-strong)]">対象商品</h3>
                        <ul className="mt-3 space-y-2 text-[0.9375rem] text-[var(--color-text-secondary)]">
                            <li>公募等株式投資信託（つみたて投資枠と同様）</li>
                            <li>金融庁が定める基準を満たすインデックスファンド</li>
                            <li>一部のアクティブファンド</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
