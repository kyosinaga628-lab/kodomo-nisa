// NISA枠の比較データ
const nisaComparisonData = [
    { name: "つみたてNISA", note: "成人・2023年まで", annual: 40, total: 800 },
    { name: "一般NISA", note: "成人・2023年まで", annual: 120, total: 600 },
    { name: "新NISA", note: "成人・2024年〜", annual: 360, total: 1800 },
    { name: "こどもNISA", note: "2027年〜", annual: 60, total: 600, highlight: true },
];

const MAX_TOTAL = 1800;

// 世帯全体の非課税枠活用フロー
const strategyFlow = [
    {
        title: "親の新NISA枠を優先",
        description: "年間360万円の枠をまず活用。つみたて投資枠120万円 + 成長投資枠240万円。",
        priority: "高",
    },
    {
        title: "子どものこどもNISA枠",
        description: "年間60万円。0歳から始めれば18年間で最大600万円の非課税枠を確保。",
        priority: "中",
    },
    {
        title: "贈与税非課税枠の活用",
        description: "年間110万円まで贈与税がかからない。こどもNISAの原資として活用可能。",
        priority: "補助",
    },
];

const householdRows = [
    { name: "父（新NISA）", annual: "360万円", total: "1,800万円" },
    { name: "母（新NISA）", annual: "360万円", total: "1,800万円" },
    { name: "子1（こどもNISA）", annual: "60万円", total: "600万円" },
    { name: "子2（こどもNISA）", annual: "60万円", total: "600万円" },
];

export default function ExperiencedGuide() {
    return (
        <div>
            <div className="max-w-[44rem]">
                <h3 className="text-[1.5rem] md:text-[1.75rem]">既存NISAとの戦略的併用ガイド</h3>
                <p className="mt-3 text-[var(--color-text-secondary)]">
                    世帯全体の非課税枠を最大化する戦略と、贈与税回避を考慮した最適な資金配分をご提案します。
                </p>
            </div>

            <div className="mt-10 grid lg:grid-cols-2 gap-10 lg:gap-14">
                {/* 比較 */}
                <div>
                    <h4 className="heading-card pb-3 border-b border-[var(--color-line-strong)]">NISA制度の比較</h4>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>制度</th>
                                <th className="!text-right !pr-0">年間上限</th>
                                <th className="!text-right !pr-0 pl-4">保有限度</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nisaComparisonData.map((row) => (
                                <tr key={row.name}>
                                    <td>
                                        <span className={`block leading-snug ${row.highlight ? "font-bold" : "font-medium"}`}>{row.name}</span>
                                        <span className="block text-xs text-[var(--color-text-muted)]">{row.note}</span>
                                        <span
                                            className={`block h-1 mt-2 ${row.highlight ? "bg-[var(--color-emerald)]" : "bg-[var(--chart-principal)]"}`}
                                            style={{ width: `${(row.total / MAX_TOTAL) * 100}%` }}
                                            aria-hidden="true"
                                        />
                                    </td>
                                    <td className="num">{row.annual}万円</td>
                                    <td className="num pl-4">{row.total.toLocaleString()}万円</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 世帯まとめ */}
                <div>
                    <h4 className="heading-card pb-3 border-b border-[var(--color-line-strong)]">世帯の非課税枠まとめ（4人家族の場合）</h4>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>対象者</th>
                                <th className="!text-right !pr-0">年間上限</th>
                                <th className="!text-right !pr-0 pl-4">保有限度額</th>
                            </tr>
                        </thead>
                        <tbody>
                            {householdRows.map((row) => (
                                <tr key={row.name}>
                                    <td>{row.name}</td>
                                    <td className="num">{row.annual}</td>
                                    <td className="num pl-4">{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>世帯合計</td>
                                <td className="num text-[var(--color-emerald)]">840万円</td>
                                <td className="num pl-4 text-[var(--color-emerald)]">4,800万円</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* 活用順序 */}
            <div className="mt-12">
                <h4 className="heading-card pb-3 border-b border-[var(--color-line-strong)]">推奨する活用順序</h4>
                <ol className="grid md:grid-cols-3 md:gap-10">
                    {strategyFlow.map((item, index) => (
                        <li key={item.title} className="py-5 border-b md:border-b-0 border-[var(--color-line)]">
                            <div className="flex items-center gap-3">
                                <span className="figure text-[1.5rem] text-[var(--color-text-muted)]" aria-hidden="true">{index + 1}</span>
                                <span className="chip chip-outline">優先度: {item.priority}</span>
                            </div>
                            <h5 className="heading-card mt-2">{item.title}</h5>
                            <p className="mt-1 text-[0.9375rem] text-[var(--color-text-secondary)]">{item.description}</p>
                        </li>
                    ))}
                </ol>
            </div>

            {/* 贈与税 */}
            <div className="mt-8 md:mt-12 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-14">
                <div>
                    <h4 className="heading-card pb-3 border-b border-[var(--color-line-strong)]">贈与税回避のポイント</h4>
                    <dl className="ledger [&>*:first-child]:border-t-0">
                        {[
                            ["年間贈与税非課税枠", "110万円"],
                            ["こどもNISA年間上限", "60万円"],
                            ["残り贈与枠", "50万円"],
                        ].map(([label, value]) => (
                            <div key={label} className="flex items-baseline justify-between py-3">
                                <dt className="text-[0.9375rem] text-[var(--color-text-secondary)]">{label}</dt>
                                <dd className="figure text-[1.375rem]">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="space-y-4 lg:pt-12">
                    <p className="rule-left text-[0.9375rem] text-[var(--color-text-secondary)]">
                        <strong className="text-[var(--color-text-primary)]">戦略：</strong>
                        祖父母からお子様へ年間110万円を贈与し、そのうち60万円をこどもNISAに投資。残り50万円は通常の預貯金や教育積立として活用できます。
                    </p>
                    <p className="notice-caution">
                        <strong>注意：</strong>毎年同額を贈与し続けると「連年贈与」とみなされ課税される可能性があります。金額や時期を変えるなどの工夫が推奨されます。
                    </p>
                </div>
            </div>
        </div>
    );
}
