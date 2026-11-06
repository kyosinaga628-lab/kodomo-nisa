import { calculateNISA, formatCurrency } from "@/lib/calculator";

// 2025年生まれ・2027年1月開始（開始時1歳）、月5万円で10年後に600万円の上限へ到達する前提で試算する
const estimateAtEighteen = (expectedReturn: number) =>
    formatCurrency(calculateNISA({ monthlyAmount: 50000, childAge: 1, expectedReturn }).finalValue);

// 主催者の実際の投資事例
const investmentCase = {
    title: "主宰者の投資事例",
    description: "こどもNISA研究所の主宰者が、実際に子どものために行っている資産形成の一例をご紹介します。",
    disclaimer: "※これは個人の投資事例であり、投資の成果を保証するものではありません。投資は自己責任でお願いします。",
    details: {
        childAge: "0歳（2025年生まれ）",
        startDate: "2027年1月（制度開始・確定）",
        monthlyAmount: "50,000円（年間上限の60万円を最大活用）",
        contributionPeriod: "10年間（2027〜2036年）。600万円の非課税保有限度額に到達後は積立せず、18歳まで運用のみ",
        investmentProducts: [
            { name: "eMAXIS Slim 全世界株式（オール・カントリー）", ratio: "50%" },
            { name: "iFreeETF JPXプライム150", ratio: "50%" },
        ],
        strategy: "毎月定額の積立投資（ドルコスト平均法）・2銘柄に1:1で分散",
        expectedReturn: "年5〜7%（長期平均リターン想定）",
        goal: `18歳時点で約${estimateAtEighteen(5)}〜${estimateAtEighteen(7)}の教育資金形成（年5〜7%で運用できた場合）`,
    },
    reasoning: [
        {
            title: "なぜ「オルカン」を選んだか",
            content: "全世界の株式に分散投資できるインデックスファンド。特定の国や地域に依存せず、世界経済の成長に連動。信託報酬も最安水準（年0.05775%）で、長期保有に最適。ポートフォリオの安定基盤として50%を配分。"
        },
        {
            title: "なぜ「JPXプライム150」を選んだか",
            content: "JPXプライム150指数は、東証プライム市場の中から『価値創造企業』150社を選定した指数。ROEや株主資本コストなど、企業価値向上に注目した銘柄選定で、日本株の成長を積極的に取り込む。国内株式への投資としてオルカンを補完する50%配分。"
        },
        {
            title: "なぜ1:1で分散するか",
            content: "「オルカン」で世界全体（主に米国中心）の成長を確保しつつ、「JPXプライム150」で日本の優良企業の成長を取り込む。地域分散によりリスクを軽減しながら、日本経済への応援投資も兼ねた、18歳までの長期運用戦略。"
        },
        {
            title: "18歳時点の想定シナリオ",
            content: `オルカン（年5%）+ JPXプライム150（年6%想定）の平均5.5%で運用した場合、10年目に非課税保有限度額の600万円へ到達し、その後は運用のみを続けて18歳時点で約${estimateAtEighteen(5.5)}に。大学4年間の学費（約800万円）に備えつつ、留学・大学院などの選択肢も検討できる水準です。日本経済の復活と世界経済の成長、両方の恩恵を受けられるポートフォリオ。`
        },
    ]
};

export default function InvestmentCase() {
    const { details } = investmentCase;
    const rows = [
        ["子どもの年齢", details.childAge],
        ["投資開始予定", details.startDate],
        ["月額積立額", details.monthlyAmount],
        ["積立期間", details.contributionPeriod],
        ["投資戦略", details.strategy],
        ["期待リターン", details.expectedReturn],
        ["18歳時点の目標", details.goal],
    ];

    return (
        <section>
            <h2 className="heading-section !text-[1.375rem] md:!text-[1.625rem]">{investmentCase.title}</h2>
            <p className="mt-2 text-[0.9375rem] text-[var(--color-text-secondary)] max-w-[42rem]">{investmentCase.description}</p>

            <div className="mt-6 grid lg:grid-cols-2 gap-x-14 gap-y-8">
                <div>
                    <dl className="ledger">
                        {rows.map(([label, value]) => (
                            <div key={label} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 py-3">
                                <dt className="note pt-0.5">{label}</dt>
                                <dd className="text-[0.9375rem] font-medium leading-relaxed">{value}</dd>
                            </div>
                        ))}
                    </dl>

                    <h3 className="font-sans font-semibold text-[0.875rem] mt-6 mb-2">投資商品（1:1比率で分散）</h3>
                    <div className="flex gap-[2px] h-2" aria-hidden="true">
                        <div className="flex-1 bg-[var(--color-royal-blue)]" />
                        <div className="flex-1 bg-[var(--chart-principal)]" />
                    </div>
                    <ul className="mt-2 grid sm:grid-cols-2 gap-x-4 gap-y-2 text-[0.875rem]">
                        {details.investmentProducts.map((product) => (
                            <li key={product.name}>
                                <span className="tnum font-semibold">{product.ratio}</span>
                                <span className="block text-[var(--color-text-secondary)]">{product.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-5">
                    {investmentCase.reasoning.map((reason) => (
                        <div key={reason.title}>
                            <h3 className="heading-card">{reason.title}</h3>
                            <p className="mt-1 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">{reason.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            <p className="notice-caution mt-7">{investmentCase.disclaimer}</p>
        </section>
    );
}
