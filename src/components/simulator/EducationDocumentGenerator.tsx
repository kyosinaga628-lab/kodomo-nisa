"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { SimulationResult } from "@/lib/calculator";
import GiftDocument, { AGE_STAGES, AgeStage, GiftFund, PAGE_BACKGROUND, PAGE_WIDTH } from "./GiftDocument";

interface EducationDocumentGeneratorProps {
    simulationResult?: SimulationResult;
    monthlyAmount?: number;
    expectedReturn?: number;
    childAge?: number;
}

interface ParentMessage {
    childName: string;
    birthYear: number;
    birthMonth: number;
    ageStage: AgeStage;
    funds: GiftFund[];
    parentMessage: string;
    actualInvestment?: string;
    actualPerformance?: string;
}

const MESSAGE_EXAMPLES: Record<AgeStage, string[]> = {
    infant: [
        "○○ちゃんへ。あなたが生まれた日から、パパ（ママ）はあなたのために毎月少しずつ貯金を始めました。でもこれはただの貯金ではありません。世界中の会社に応援の気持ちを込めて投資しています。",
        "生まれてきてくれてありがとう。あなたの未来が輝くものになるように、今からこうして準備をしています。大きくなったら、またこの話をしようね。"
    ],
    elementary: [
        "○○へ。知っていますか？あなたのお金は今、世界中の会社で「働いて」います。iPhoneを作るApple、YouTubeを運営するGoogle、みんなが使うAmazon…そういった会社の一部を持っているんです。",
        "株価が下がっても心配しないでね。それは「安く買えるチャンス」でもあるんです。長い目で見ると、世界は少しずつ成長していきます。"
    ],
    teen: [
        "○○へ。18年間、毎月コツコツ積み立ててきました。このお金の使い方は、あなたが決めてください。全部使っても、一部を残して運用を続けてもいい。大切なのは「自分で考えて決める」ことです。",
        "投資の経験は、お金だけでなく「忍耐力」「長期思考」「社会への関心」も育ててくれます。これからも学び続けてください。"
    ]
};

const FUND_OPTIONS = [
    "eMAXIS Slim 全世界株式（オール・カントリー）",
    "eMAXIS Slim 米国株式（S&P500）",
    "iFreeETF JPXプライム150",
    "iFreeNEXT FANG+インデックス",
    "楽天・全世界株式インデックス・ファンド",
    "SBI・V・全米株式インデックス・ファンド",
    "ニッセイ外国株式インデックスファンド",
    "その他"
];

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

function FormSection({ number, title, children }: { number: number; title: string; children: ReactNode }) {
    return (
        <section className="grid md:grid-cols-[2.5rem_minmax(0,1fr)] gap-y-3 py-7 border-t border-[var(--color-line)] first:border-t-0 first:pt-0">
            <span className="figure text-[1.5rem] text-[var(--color-text-muted)] hidden md:block" aria-hidden="true">{number}</span>
            <div className="min-w-0">
                <h3 className="heading-card mb-4">{title}</h3>
                {children}
            </div>
        </section>
    );
}

export default function EducationDocumentGenerator({
    simulationResult,
    monthlyAmount = 30000,
    expectedReturn = 5,
    childAge = 0
}: EducationDocumentGeneratorProps) {
    const [step, setStep] = useState<"form" | "preview" | "generating">("form");
    const [formData, setFormData] = useState<ParentMessage>({
        childName: "",
        birthYear: new Date().getFullYear(),
        birthMonth: 1,
        ageStage: "infant",
        funds: [{ name: FUND_OPTIONS[0], ratio: 100, reason: "" }],
        parentMessage: "",
        actualInvestment: "",
        actualPerformance: ""
    });
    const [showMessageHints, setShowMessageHints] = useState(false);
    const [pdfError, setPdfError] = useState("");
    const [createdAt] = useState(() => new Date());
    const [previewZoom, setPreviewZoom] = useState(1);
    const previewBoxRef = useRef<HTMLDivElement>(null);
    const documentRef = useRef<HTMLDivElement>(null);
    const isForm = step === "form";

    // A4 幅の紙面を、画面幅に合わせて縮小して見せる
    useEffect(() => {
        const box = previewBoxRef.current;
        if (!box) return;
        const observer = new ResizeObserver(([entry]) => {
            setPreviewZoom(Math.min(1, entry.contentRect.width / PAGE_WIDTH));
        });
        observer.observe(box);
        return () => observer.disconnect();
    }, [isForm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFundChange = (index: number, field: keyof GiftFund, value: string | number) => {
        setFormData(prev => {
            const newFunds = [...prev.funds];
            newFunds[index] = { ...newFunds[index], [field]: value };
            return { ...prev, funds: newFunds };
        });
    };

    const addFund = () => {
        if (formData.funds.length >= 5) return;
        const remainingRatio = 100 - formData.funds.reduce((sum, f) => sum + f.ratio, 0);
        setFormData(prev => ({
            ...prev,
            funds: [...prev.funds, { name: FUND_OPTIONS[0], ratio: Math.max(0, remainingRatio), reason: "" }]
        }));
    };

    const removeFund = (index: number) => {
        if (formData.funds.length <= 1) return;
        setFormData(prev => ({
            ...prev,
            funds: prev.funds.filter((_, i) => i !== index)
        }));
    };

    const getTotalRatio = () => formData.funds.reduce((sum, f) => sum + f.ratio, 0);

    const handleGeneratePDF = async () => {
        if (!documentRef.current) return;

        setStep("generating");
        setPdfError("");

        try {
            const html2canvas = (await import("html2canvas")).default;
            const jsPDF = (await import("jspdf")).default;
            await document.fonts.ready;

            const pages = Array.from(documentRef.current.querySelectorAll<HTMLElement>("[data-pdf-page]"));
            const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

            for (const [index, page] of pages.entries()) {
                const canvas = await html2canvas(page, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: PAGE_BACKGROUND,
                    onclone: (doc) => {
                        // 画面用の縮小を外し、常に A4 幅で描画する
                        const zoom = doc.querySelector<HTMLElement>("[data-pdf-zoom]");
                        if (zoom) zoom.style.zoom = "1";
                    },
                });

                if (index > 0) pdf.addPage();
                pdf.setFillColor(PAGE_BACKGROUND);
                pdf.rect(0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, "F");

                // 文章量が多く1ページを超えた場合は、切らずに縮小して収める
                const fullHeight = (canvas.height * A4_WIDTH_MM) / canvas.width;
                const height = Math.min(fullHeight, A4_HEIGHT_MM);
                const width = (height * canvas.width) / canvas.height;
                pdf.addImage(canvas.toDataURL("image/png"), "PNG", (A4_WIDTH_MM - width) / 2, 0, width, height, undefined, "FAST");
            }

            pdf.save(`${formData.childName || "お子様"}への金融教育ギフト.pdf`);
            setStep("preview");
        } catch (error) {
            console.error("PDF generation failed:", error);
            setPdfError("PDFの作成に失敗しました。時間をおいて再度お試しいただくか、別のブラウザでお試しください。");
            setStep("preview");
        }
    };

    if (!isForm) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <button onClick={() => setStep("form")} className="btn-secondary">
                        編集に戻る
                    </button>
                    <button onClick={handleGeneratePDF} disabled={step === "generating"} className="btn-primary disabled:opacity-60">
                        {step === "generating" ? "PDF作成中..." : "PDFをダウンロード"}
                    </button>
                    <p className="note">A4・4ページのPDFを作成します</p>
                </div>

                {pdfError && <p className="notice-caution" role="alert">{pdfError}</p>}

                <div ref={previewBoxRef} className="panel-tint p-3 sm:p-6 overflow-hidden">
                    <div className="mx-auto w-fit" data-pdf-zoom style={{ zoom: previewZoom }} ref={documentRef}>
                        <GiftDocument
                            childName={formData.childName}
                            birthYear={formData.birthYear}
                            birthMonth={formData.birthMonth}
                            stage={AGE_STAGES[formData.ageStage]}
                            funds={formData.funds}
                            parentMessage={formData.parentMessage}
                            actualInvestment={formData.actualInvestment}
                            actualPerformance={formData.actualPerformance}
                            monthlyAmount={monthlyAmount}
                            expectedReturn={expectedReturn}
                            childAge={childAge}
                            simulationResult={simulationResult}
                            createdAt={createdAt}
                        />
                    </div>
                </div>
            </div>
        );
    }

    const selectedStage = AGE_STAGES[formData.ageStage];
    const totalRatio = getTotalRatio();

    return (
        <div>
            <p className="note mb-6">お子様への思いと運用の記録をPDFにまとめます。</p>

            <FormSection number={1} title="お子様の情報">
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="gift-child-name" className="input-label">
                            お子様の名前 <span className="text-[var(--color-accent)]" aria-label="必須">*</span>
                        </label>
                        <input id="gift-child-name" type="text" name="childName" value={formData.childName} onChange={handleChange} placeholder="太郎" required className="input-field" />
                    </div>
                    <div>
                        <label htmlFor="gift-birth-year" className="input-label">生まれた年</label>
                        <select id="gift-birth-year" name="birthYear" value={formData.birthYear} onChange={handleChange} className="input-field">
                            {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year}>{year}年</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gift-birth-month" className="input-label">生まれた月</label>
                        <select id="gift-birth-month" name="birthMonth" value={formData.birthMonth} onChange={handleChange} className="input-field">
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <option key={month} value={month}>{month}月</option>
                            ))}
                        </select>
                    </div>
                </div>
            </FormSection>

            <FormSection number={2} title="ギフトのタイプを選択">
                <p className="note mb-3">お子様の年齢に合わせて、親子で一緒に読める内容が変わります。成長に合わせて複数回作成できます。</p>
                <div className="grid md:grid-cols-3 gap-3">
                    {Object.values(AGE_STAGES).map((stage) => (
                        <button
                            key={stage.id}
                            type="button"
                            aria-pressed={formData.ageStage === stage.id}
                            onClick={() => setFormData(prev => ({ ...prev, ageStage: stage.id }))}
                            className={`p-4 rounded-[8px] border text-left transition-colors ${formData.ageStage === stage.id
                                ? "border-[var(--color-royal-blue)] shadow-[inset_0_0_0_1px_var(--color-royal-blue)] bg-[var(--color-surface)]"
                                : "border-[var(--color-line-strong)] hover:border-[var(--color-royal-blue)]"
                                }`}
                        >
                            <span className="note block">{stage.ageRange}</span>
                            <span className="font-serif font-semibold text-[1.125rem] block">{stage.title}</span>
                            <span className="note block mt-1">{stage.theme}</span>
                        </button>
                    ))}
                </div>
                <p className="rule-left mt-4 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">{selectedStage.parentReadingGuide}</p>
            </FormSection>

            <FormSection number={3} title="投資方針">
                <div className="ledger">
                    {formData.funds.map((fund, index) => (
                        <div key={index} className="py-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[0.875rem] font-semibold">ファンド {index + 1}</span>
                                {formData.funds.length > 1 && (
                                    <button type="button" onClick={() => removeFund(index)} className="text-[0.8125rem] text-[var(--color-accent)] hover:underline underline-offset-2">
                                        削除
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-[minmax(0,1fr)_6rem] gap-3">
                                <select aria-label={`ファンド ${index + 1} の銘柄`} value={fund.name} onChange={(e) => handleFundChange(index, "name", e.target.value)} className="input-field">
                                    {FUND_OPTIONS.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <div className="relative">
                                    <input
                                        aria-label={`ファンド ${index + 1} の比率`}
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={fund.ratio}
                                        onChange={(e) => handleFundChange(index, "ratio", parseInt(e.target.value) || 0)}
                                        className="input-field tnum !pr-7"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">%</span>
                                </div>
                            </div>
                            {fund.name === "その他" && (
                                <input type="text" value={fund.customName || ""} onChange={(e) => handleFundChange(index, "customName", e.target.value)} placeholder="ファンド名を入力してください" className="input-field" />
                            )}
                            <input type="text" value={fund.reason} onChange={(e) => handleFundChange(index, "reason", e.target.value)} placeholder="選んだ理由（任意）" className="input-field" />
                        </div>
                    ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    {formData.funds.length < 5 ? (
                        <button type="button" onClick={addFund} className="btn-secondary btn-sm">ファンドを追加</button>
                    ) : <span />}
                    <p className={`text-[0.875rem] tnum ${totalRatio === 100 ? "text-[var(--color-text-secondary)]" : "font-semibold text-[var(--color-accent)]"}`} role="status">
                        合計 {totalRatio}%{totalRatio !== 100 && "（100%になるよう調整してください）"}
                    </p>
                </div>
            </FormSection>

            <FormSection number={4} title="親からのメッセージ">
                <div className="flex justify-between items-baseline gap-3 mb-2">
                    <label htmlFor="gift-message" className="input-label !mb-0">
                        将来のお子様へのメッセージ <span className="text-[var(--color-accent)]" aria-label="必須">*</span>
                    </label>
                    <button type="button" onClick={() => setShowMessageHints(!showMessageHints)} aria-expanded={showMessageHints} className="text-[0.8125rem] font-medium text-[var(--color-royal-blue)] hover:underline underline-offset-2 flex-shrink-0">
                        {showMessageHints ? "例を閉じる" : "メッセージ例を見る"}
                    </button>
                </div>

                {showMessageHints && (
                    <div className="mb-3 grid gap-2">
                        {MESSAGE_EXAMPLES[formData.ageStage].map((example) => (
                            <button
                                key={example}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, parentMessage: example.replace(/○○/g, prev.childName || "○○") }))}
                                className="panel-tint p-3 text-left text-[0.8125rem] leading-relaxed text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                            >
                                {example}
                                <span className="block mt-1 font-semibold text-[var(--color-royal-blue)]">この例を使う</span>
                            </button>
                        ))}
                    </div>
                )}

                <textarea
                    id="gift-message"
                    name="parentMessage"
                    value={formData.parentMessage}
                    onChange={handleChange}
                    rows={6}
                    maxLength={1000}
                    required
                    placeholder="お子様が18歳になったとき、このメッセージを読みます..."
                    className="input-field resize-y"
                />
            </FormSection>

            <FormSection number={5} title="実績記録（任意）">
                <p className="note mb-3">証券会社の画面キャプチャと並べて見ることで、シミュレーションと実績の比較ができます。</p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="gift-actual-investment" className="input-label">実際の投資総額</label>
                        <input id="gift-actual-investment" type="text" name="actualInvestment" value={formData.actualInvestment} onChange={handleChange} placeholder="例：5,400,000円" className="input-field" />
                    </div>
                    <div>
                        <label htmlFor="gift-actual-performance" className="input-label">実際の評価額</label>
                        <input id="gift-actual-performance" type="text" name="actualPerformance" value={formData.actualPerformance} onChange={handleChange} placeholder="例：8,500,000円" className="input-field" />
                    </div>
                </div>
            </FormSection>

            <div className="pt-6 border-t border-[var(--color-line)]">
                <button
                    type="button"
                    onClick={() => setStep("preview")}
                    disabled={!formData.childName || !formData.parentMessage || totalRatio !== 100}
                    className="btn-primary w-full sm:w-auto sm:min-w-[14rem] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    プレビューを見る
                </button>
                {(!formData.childName || !formData.parentMessage) && (
                    <p className="note mt-2">お子様の名前とメッセージを入力すると、プレビューできます。</p>
                )}
            </div>
        </div>
    );
}
