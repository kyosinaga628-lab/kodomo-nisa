import type { CSSProperties, ReactNode } from "react";
import { SimulationResult, formatCurrency, KODOMO_NISA_INFO } from "@/lib/calculator";

// PDF本体。html2canvas は Tailwind 4 の色関数（oklch / lab）を解釈できず例外になるため、
// このファイル内は className を使わず、HEX のインラインスタイルだけで組む。
// SVG 内の文字は画像化の際に Web フォントを使えないので、ラベルは HTML で置く。

export type AgeStage = "infant" | "elementary" | "teen";

export interface AgeStageInfo {
    id: AgeStage;
    title: string;
    ageRange: string;
    theme: string;
    description: string;
    parentReadingGuide: string;
    childMessage: string;
    learningPoints: string[];
    discussionTopics: string[];
}

export const AGE_STAGES: Record<AgeStage, AgeStageInfo> = {
    infant: {
        id: "infant",
        title: "種まき編",
        ageRange: "0〜6歳",
        theme: "お金が「育つ」ことを知る",
        description: "今日から始まる、○○のための資産づくり",
        parentReadingGuide: "お子様がまだ小さいため、この資料は親御さんが保管し、折に触れて「あなたのためのお金を育てているんだよ」と伝えてあげてください。",
        childMessage: "○○ちゃんへ。あなたが生まれた日から、パパとママはあなたのために少しずつお金を育てています。このお金は、あなたが大きくなったときのプレゼントです。",
        learningPoints: [
            "あなたのためのお金がある",
            "お金は「育つ」ことがある",
            "時間をかけると大きくなる"
        ],
        discussionTopics: [
            "「これは○○のためのお金だよ」",
            "証券会社のアプリを一緒に見てみよう",
            "今日のお金はいくらかな？"
        ]
    },
    elementary: {
        id: "elementary",
        title: "成長編",
        ageRange: "7〜12歳",
        theme: "投資と社会のつながりを知る",
        description: "あなたのお金が「働いている」話",
        parentReadingGuide: "お子様と一緒にこの資料を読み、好きな商品やサービスと投資のつながりについて対話してみてください。",
        childMessage: "○○へ。このお金は、世界中の会社に「がんばってね」と応援するために使われています。あなたが使っているサービスや商品を作っている会社も含まれているかもしれません。",
        learningPoints: [
            "投資＝会社を応援すること",
            "株式会社のしくみ",
            "世界経済とのつながり",
            "複利の力（お金がお金を生む）"
        ],
        discussionTopics: [
            "好きな商品・サービスを作っている会社は？",
            "なぜ株価は上がったり下がったりするの？",
            "グラフを一緒に見てみよう"
        ]
    },
    teen: {
        id: "teen",
        title: "自立編",
        ageRange: "13〜18歳",
        theme: "自分で判断する力を身につける",
        description: "これからの資産との向き合い方",
        parentReadingGuide: "高校生以上であれば、お子様が主体的にこの資料を読み、質問があれば一緒に考える形がおすすめです。",
        childMessage: "○○へ。18歳になると、このお金の使い方を自分で決められるようになります。大学、留学、起業、投資の継続…使い方はあなた次第です。",
        learningPoints: [
            "資産配分の考え方",
            "リスクとリターンの関係",
            "長期投資の意義",
            "18歳以降の選択肢（継続運用 or 取り崩し）"
        ],
        discussionTopics: [
            "この資産をどう使いたい？",
            "投資を続ける？一部を使う？",
            "自分で証券口座を見てみよう"
        ]
    }
};

const NEXT_STEPS: Record<AgeStage, (name: string) => string> = {
    infant: (name) => `${name}が小学生になったら、「成長編」を作成しましょう。投資と社会のつながりについて、一緒に学べる内容になっています。`,
    elementary: (name) => `${name}が中学生になったら、「自立編」を作成しましょう。自分で資産配分を考える力を育てる内容になっています。`,
    teen: (name) => `18歳の誕生日、おめでとうございます。このお金の使い方は、${name}が自分で決められます。大学資金に使う、継続して投資する、どちらも正解です。自分の人生は、自分で選びましょう。`,
};

export interface GiftFund {
    name: string;
    customName?: string;
    ratio: number;
    reason: string;
}

interface GiftDocumentProps {
    childName: string;
    birthYear: number;
    birthMonth: number;
    stage: AgeStageInfo;
    funds: GiftFund[];
    parentMessage: string;
    actualInvestment?: string;
    actualPerformance?: string;
    monthlyAmount: number;
    expectedReturn: number;
    childAge: number;
    simulationResult?: SimulationResult;
    createdAt: Date;
}

export const PAGE_WIDTH = 794; // A4 幅（96dpi）
const PAGE_HEIGHT = 1123;
export const PAGE_BACKGROUND = "#FBFAF6";

const COLOR = {
    ink: "#17202C",
    sub: "#465162",
    muted: "#667080",
    line: "#E3DFD5",
    lineStrong: "#C9C4B6",
    tint: "#F2F0E9",
    blue: "#1E3A5F",
    green: "#0B6E55",
    accent: "#B8432A",
    principal: "#5C8AC8",
    gain: "#00795B",
};

const SERIF = "var(--font-serif)";
const SANS = "var(--font-sans)";

const heading: CSSProperties = { fontFamily: SERIF, fontWeight: 600, fontSize: 21, lineHeight: 1.5, color: COLOR.ink, margin: 0, wordBreak: "normal" };
const body: CSSProperties = { fontSize: 15, lineHeight: 1.9, color: COLOR.sub, margin: 0 };
const small: CSSProperties = { fontSize: 12.5, lineHeight: 1.75, color: COLOR.muted, margin: 0 };
const figure: CSSProperties = { fontFamily: SERIF, fontWeight: 600, lineHeight: 1.2, color: COLOR.ink, margin: 0 };

function Page({ number, total, children }: { number: number; total: number; children: ReactNode }) {
    return (
        <section
            data-pdf-page
            style={{
                width: PAGE_WIDTH,
                minHeight: PAGE_HEIGHT,
                boxSizing: "border-box",
                padding: "68px 72px 44px",
                display: "flex",
                flexDirection: "column",
                background: PAGE_BACKGROUND,
                color: COLOR.ink,
                fontFamily: SANS,
                lineHeight: 1.7,
                // canvas への描画は palt や字間指定、約物の詰めを再現できず、文字が重なったり括弧が消えたりするため、PDF では無効にする
                letterSpacing: 0,
                fontFeatureSettings: "normal",
                textSpacingTrim: "space-all",
            } as CSSProperties}
        >
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</div>
            <div style={{ marginTop: 32, paddingTop: 10, borderTop: `1px solid ${COLOR.line}`, display: "flex", justifyContent: "space-between", fontSize: 11.5, color: COLOR.muted }}>
                <span>こどもNISA研究所　https://www.kodomo-nisa.jp</span>
                <span>{number} / {total}</span>
            </div>
        </section>
    );
}

function SectionTitle({ children, first = false }: { children: ReactNode; first?: boolean }) {
    return <h2 style={{ ...heading, marginTop: first ? 0 : 36, paddingBottom: 10, marginBottom: 14, borderBottom: `1px solid ${COLOR.lineStrong}` }}>{children}</h2>;
}

function Logo() {
    return (
        <svg width="28" height="28" viewBox="0 0 30 30" aria-hidden="true">
            <rect width="30" height="30" rx="4" fill={COLOR.blue} />
            <rect x="7" y="18" width="3.5" height="5" fill="#FAF9F5" />
            <rect x="13.25" y="13" width="3.5" height="10" fill="#FAF9F5" />
            <rect x="19.5" y="7" width="3.5" height="16" fill="#D9694F" />
        </svg>
    );
}

// 18年のものさし: 今どの時期のギフトかを示す
function StageRuler({ stageId }: { stageId: AgeStage }) {
    const stages = Object.values(AGE_STAGES);
    const years: Record<AgeStage, number> = { infant: 7, elementary: 6, teen: 6 };
    return (
        <div>
            <p style={{ ...small, marginBottom: 12 }}>18歳までの道のり</p>
            <div style={{ display: "flex", gap: 3 }}>
                {stages.map((s) => (
                    <div key={s.id} style={{ flex: years[s.id] }}>
                        <div style={{ height: 6, background: s.id === stageId ? COLOR.blue : COLOR.lineStrong }} />
                        <p style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 15, lineHeight: 1.5, marginTop: 10, marginBottom: 0, color: s.id === stageId ? COLOR.ink : COLOR.muted }}>{s.title}</p>
                        <p style={{ ...small, marginTop: 1 }}>{s.ageRange}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function GrowthChart({ result, childAge }: { result: SimulationResult; childAge: number }) {
    const W = 650;
    const H = 170;
    const points = [
        { age: childAge, value: 0, invested: 0 },
        ...result.yearlyData.slice(0, result.investmentYears).map((d) => ({ age: d.age + 1, value: d.value, invested: d.invested })),
    ];
    const maxValue = Math.max(result.finalValue, 1) * 1.06;
    const x = (age: number) => (age / 18) * W;
    const y = (value: number) => H - (value / maxValue) * H;
    const coords = (key: "value" | "invested") => points.map((p) => `${x(p.age).toFixed(1)},${y(p[key]).toFixed(1)}`);
    const start = x(points[0].age).toFixed(1);
    const end = x(points[points.length - 1].age).toFixed(1);

    return (
        <div>
            <svg width={W} height={H + 8} viewBox={`0 0 ${W} ${H + 8}`} style={{ display: "block" }} aria-hidden="true">
                <path d={`M${coords("invested").join(" L")} L${end},${H} L${start},${H} Z`} fill={COLOR.principal} fillOpacity={0.45} />
                <path d={`M${coords("value").join(" L")} L${coords("invested").reverse().join(" L")} Z`} fill={COLOR.gain} fillOpacity={0.85} />
                <path d={`M${coords("value").join(" L")}`} fill="none" stroke={COLOR.gain} strokeWidth={2} />
                <line x1={0} x2={W} y1={H} y2={H} stroke={COLOR.lineStrong} />
                {Array.from({ length: 19 }, (_, age) => (
                    <line key={age} x1={Math.min(x(age), W - 0.5)} x2={Math.min(x(age), W - 0.5)} y1={H} y2={H + (age % 6 === 0 ? 8 : 4)} stroke={COLOR.lineStrong} />
                ))}
            </svg>
            <div style={{ position: "relative", height: 20, fontSize: 12, color: COLOR.muted }}>
                <span style={{ position: "absolute", left: 0 }}>0歳</span>
                <span style={{ position: "absolute", left: "33.33%", transform: "translateX(-50%)" }}>6歳</span>
                <span style={{ position: "absolute", left: "66.66%", transform: "translateX(-50%)" }}>12歳</span>
                <span style={{ position: "absolute", right: 0 }}>18歳</span>
            </div>
        </div>
    );
}

export default function GiftDocument({
    childName,
    birthYear,
    birthMonth,
    stage,
    funds,
    parentMessage,
    actualInvestment,
    actualPerformance,
    monthlyAmount,
    expectedReturn,
    childAge,
    simulationResult,
    createdAt,
}: GiftDocumentProps) {
    const total = 4;
    const withName = (text: string) => text.replace(/○○/g, childName);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: PAGE_WIDTH, color: COLOR.ink }}>
            {/* 1. 表紙 */}
            <Page number={1} total={total}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Logo />
                    <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 17 }}>こどもNISA研究所</span>
                </div>

                <div style={{ marginTop: 210, marginBottom: "auto" }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: COLOR.sub, margin: 0 }}>
                        <span style={{ display: "inline-block", width: 9, height: 9, background: COLOR.accent, marginRight: 10 }} />
                        金融教育ギフト　{stage.title}（{stage.ageRange}）
                    </p>
                    <h1 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 60, lineHeight: 1.3, margin: "22px 0 0", color: COLOR.ink }}>
                        {childName}さんへ
                    </h1>
                    <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 21, lineHeight: 1.7, margin: "18px 0 0", color: COLOR.sub }}>
                        {withName(stage.description)}
                    </p>
                    <p style={{ ...small, fontSize: 14, marginTop: 26 }}>
                        {birthYear}年{birthMonth}月生まれ　／　{createdAt.getFullYear()}年{createdAt.getMonth() + 1}月{createdAt.getDate()}日 作成
                    </p>
                </div>

                <StageRuler stageId={stage.id} />
            </Page>

            {/* 2. メッセージ */}
            <Page number={2} total={total}>
                <SectionTitle first>親からのメッセージ</SectionTitle>
                <p style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 2.1, color: COLOR.ink, margin: "10px 0 0", whiteSpace: "pre-wrap" }}>
                    {parentMessage}
                </p>

                <SectionTitle>{childName}へ</SectionTitle>
                <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 2, color: COLOR.sub, margin: 0 }}>
                    {withName(stage.childMessage)}
                </p>

                <div style={{ marginTop: "auto", paddingTop: 32 }}>
                    <div style={{ borderLeft: `2px solid ${COLOR.blue}`, paddingLeft: 16 }}>
                        <p style={{ ...small, fontWeight: 600, color: COLOR.sub }}>親御さんへ</p>
                        <p style={{ ...small, marginTop: 2 }}>{stage.parentReadingGuide}</p>
                    </div>
                </div>
            </Page>

            {/* 3. 運用計画 */}
            <Page number={3} total={total}>
                <SectionTitle first>運用計画</SectionTitle>
                <div style={{ display: "flex", gap: 40 }}>
                    {[
                        ["毎月の積立額", `${monthlyAmount.toLocaleString()}円`],
                        ["想定利回り（年率）", `${expectedReturn}%`],
                        ["運用開始年齢", `${childAge}歳`],
                    ].map(([label, value]) => (
                        <div key={label}>
                            <p style={small}>{label}</p>
                            <p style={{ ...figure, fontSize: 23, marginTop: 3 }}>{value}</p>
                        </div>
                    ))}
                </div>

                {simulationResult && (
                    <div style={{ marginTop: 26 }}>
                        <p style={{ fontSize: 13.5, fontWeight: 600, color: COLOR.sub, margin: 0 }}>18歳時点の想定評価額（試算）</p>
                        <p style={{ ...figure, fontSize: 46, marginTop: 4, marginBottom: 10 }}>
                            <span style={{ fontSize: 22, fontWeight: 500 }}>約</span>
                            {formatCurrency(simulationResult.finalValue).replace("万円", "")}
                            <span style={{ fontSize: 22, fontWeight: 500 }}>万円</span>
                        </p>
                        <div style={{ display: "flex", gap: 28, fontSize: 13.5, color: COLOR.sub, marginBottom: 14 }}>
                            <span><span style={{ display: "inline-block", width: 10, height: 10, background: COLOR.principal, marginRight: 7 }} />投資元本 <strong style={{ color: COLOR.ink }}>{formatCurrency(simulationResult.totalInvestment)}</strong></span>
                            <span><span style={{ display: "inline-block", width: 10, height: 10, background: COLOR.gain, marginRight: 7 }} />運用益（非課税） <strong style={{ color: COLOR.ink }}>{formatCurrency(simulationResult.totalGain)}</strong></span>
                        </div>
                        <GrowthChart result={simulationResult} childAge={childAge} />
                        {simulationResult.limitReachedYear && (
                            <p style={{ ...small, marginTop: 6 }}>
                                ※{simulationResult.limitReachedYear}年目に非課税保有限度額（600万円）へ到達し、以降は積立をせず運用のみを続ける計画です。
                            </p>
                        )}
                    </div>
                )}

                <SectionTitle>選んだファンド</SectionTitle>
                <div>
                    {funds.map((fund, index) => (
                        <div key={index} style={{ padding: "10px 0", borderBottom: index < funds.length - 1 ? `1px solid ${COLOR.line}` : "none" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                                <span style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.6 }}>{fund.name === "その他" && fund.customName ? fund.customName : fund.name}</span>
                                <span style={{ ...figure, fontSize: 17, lineHeight: 1.5 }}>{fund.ratio}%</span>
                            </div>
                            {fund.reason && <p style={{ ...small, marginTop: 2 }}>選んだ理由：{fund.reason}</p>}
                        </div>
                    ))}
                </div>

                {(actualInvestment || actualPerformance) && (
                    <>
                        <SectionTitle>実際の運用実績</SectionTitle>
                        <div style={{ display: "flex", gap: 40 }}>
                            {actualInvestment && (
                                <div>
                                    <p style={small}>投資総額</p>
                                    <p style={{ ...figure, fontSize: 21, marginTop: 3 }}>{actualInvestment}</p>
                                </div>
                            )}
                            {actualPerformance && (
                                <div>
                                    <p style={small}>評価額</p>
                                    <p style={{ ...figure, fontSize: 21, marginTop: 3, color: COLOR.green }}>{actualPerformance}</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                <p style={{ ...small, marginTop: "auto", paddingTop: 24 }}>
                    ※この計画は想定利回りが続くと仮定した試算であり、将来の運用成果を保証するものではありません。実際の運用では市場変動により元本割れの可能性があります。
                </p>
            </Page>

            {/* 4. 親子で学ぶ */}
            <Page number={4} total={total}>
                <SectionTitle first>{childName}と一緒に学ぶこと</SectionTitle>
                <p style={{ ...small, marginBottom: 6 }}>この{stage.title}で伝えたい大切なポイントです。テーマ：{stage.theme}</p>
                <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {stage.learningPoints.map((point, index) => (
                        <li key={point} style={{ display: "flex", gap: 14, padding: "7px 0", fontSize: 15.5, lineHeight: 1.7 }}>
                            <span style={{ ...figure, fontSize: 17, lineHeight: 1.6, color: COLOR.muted, width: 16 }}>{index + 1}</span>
                            <span>{point}</span>
                        </li>
                    ))}
                </ol>

                <SectionTitle>親子で話し合うヒント</SectionTitle>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {stage.discussionTopics.map((topic) => (
                        <li key={topic} style={{ padding: "5px 0", fontSize: 15, lineHeight: 1.7, color: COLOR.ink }}>{withName(topic)}</li>
                    ))}
                </ul>
                <p style={{ ...small, marginTop: 8 }}>
                    証券会社のアプリやウェブサイトで実際の口座画面を見ながら、このPDFの計画と実績を比べてみましょう。数字の違いについて話し合うことで、より深い学びになります。
                </p>

                <SectionTitle>こどもNISAのしくみ</SectionTitle>
                <p style={body}>
                    こどもNISAは、0歳〜17歳のお子様のための非課税投資制度です。通常、投資で得た利益には約20%の税金がかかりますが、この制度を使うと非課税で運用できます。年間60万円、合計600万円まで投資できます。
                </p>
                <div style={{ marginTop: 10 }}>
                    {KODOMO_NISA_INFO.withdrawalRules.map((rule) => (
                        <div key={rule.ageRange} style={{ display: "flex", gap: 16, padding: "6px 0", borderTop: `1px solid ${COLOR.line}`, fontSize: 14, lineHeight: 1.7 }}>
                            <span style={{ width: 76, flexShrink: 0, fontWeight: 600 }}>{rule.ageRange}</span>
                            <span style={{ color: COLOR.sub }}>{rule.rule}</span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: "auto", paddingTop: 28 }}>
                    <div style={{ background: COLOR.tint, borderRadius: 8, padding: "16px 20px" }}>
                        <p style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 16, margin: 0 }}>次のステップ</p>
                        <p style={{ ...body, fontSize: 14, marginTop: 4 }}>{NEXT_STEPS[stage.id](childName)}</p>
                    </div>
                </div>
            </Page>
        </div>
    );
}
