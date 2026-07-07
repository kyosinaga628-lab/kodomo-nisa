"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SimulationResult, formatCurrency } from "@/lib/calculator";

interface EducationDocumentGeneratorProps {
    simulationResult?: SimulationResult;
    monthlyAmount?: number;
    expectedReturn?: number;
    childAge?: number;
}

interface FundSelection {
    name: string;
    customName?: string;
    ratio: number;
    reason: string;
}

// 年齢ステージタイプ
type AgeStage = "infant" | "elementary" | "teen";

interface AgeStageInfo {
    id: AgeStage;
    title: string;
    emoji: string;
    ageRange: string;
    theme: string;
    description: string;
    parentReadingGuide: string;
    childMessage: string;
    learningPoints: string[];
    discussionTopics: string[];
}

const AGE_STAGES: Record<AgeStage, AgeStageInfo> = {
    infant: {
        id: "infant",
        title: "種まき編",
        emoji: "🌱",
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
        emoji: "🌿",
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
        emoji: "🌳",
        ageRange: "13〜18歳",
        theme: "自分で判断する力を身につける",
        description: "これからの資産との向き合い方",
        parentReadingGuide: "高校生以上であれば、お子様が主体的にこの資料を読み、質問があれば一緒に考える形がおすすめです。",
        childMessage: "○○へ。18歳になると、このお金はあなたのものになります。大学、留学、起業、投資の継続…使い方はあなた次第です。",
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

interface ParentMessage {
    childName: string;
    birthYear: number;
    birthMonth: number;
    ageStage: AgeStage;
    funds: FundSelection[];
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
    const documentRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFundChange = (index: number, field: keyof FundSelection, value: string | number) => {
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

        try {
            const html2canvas = (await import("html2canvas")).default;
            const jsPDF = (await import("jspdf")).default;

            const canvas = await html2canvas(documentRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff"
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${formData.childName || "お子様"}への金融教育ギフト.pdf`);
            setStep("preview");
        } catch (error) {
            console.error("PDF generation failed:", error);
            setStep("preview");
        }
    };

    const inputClasses = "w-full px-4 py-3 rounded-xl border border-[var(--glass-border)] bg-white/50 focus:bg-white focus:border-[var(--color-royal-blue)] focus:ring-2 focus:ring-[var(--color-royal-blue)]/20 outline-none transition-all duration-200 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]";

    return (
        <div className="w-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
                {step === "form" && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {/* Header */}
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-royal-blue)] to-[var(--color-emerald)] flex items-center justify-center mx-auto mb-4">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                                </svg>
                            </div>
                            <h2 className="font-serif text-2xl font-semibold mb-2">金融教育ギフトを作成</h2>
                            <p className="text-[var(--color-text-secondary)]">
                                お子様への思いと運用の記録をPDFにまとめます
                            </p>
                        </div>

                        {/* Form */}
                        <div className="card-base p-6 md:p-8 space-y-6">
                            {/* Child Info */}
                            <div>
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[var(--color-royal-blue)] text-white flex items-center justify-center text-sm">1</span>
                                    お子様の情報
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                                            お子様の名前 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="childName"
                                            value={formData.childName}
                                            onChange={handleChange}
                                            placeholder="太郎"
                                            required
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                                            生まれた年
                                        </label>
                                        <select
                                            name="birthYear"
                                            value={formData.birthYear}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        >
                                            {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                                <option key={year} value={year}>{year}年</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                                            生まれた月
                                        </label>
                                        <select
                                            name="birthMonth"
                                            value={formData.birthMonth}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        >
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                                <option key={month} value={month}>{month}月</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Age Stage Selection */}
                            <div>
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[var(--color-royal-blue)] text-white flex items-center justify-center text-sm">2</span>
                                    ギフトのタイプを選択 <span className="text-red-500 text-sm">*</span>
                                </h3>
                                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                                    お子様の年齢に合わせて、親子で一緒に読める内容が変わります。成長に合わせて複数回作成できます。
                                </p>
                                <div className="grid md:grid-cols-3 gap-3">
                                    {(Object.values(AGE_STAGES) as AgeStageInfo[]).map((stage) => (
                                        <button
                                            key={stage.id}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, ageStage: stage.id }))}
                                            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${formData.ageStage === stage.id
                                                ? 'border-[var(--color-royal-blue)] bg-[var(--color-royal-blue)]/5'
                                                : 'border-[var(--glass-border)] hover:border-[var(--color-royal-blue)]/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-2xl">{stage.emoji}</span>
                                                <div>
                                                    <p className="font-semibold text-[var(--color-text-primary)]">{stage.title}</p>
                                                    <p className="text-xs text-[var(--color-text-muted)]">{stage.ageRange}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-[var(--color-text-secondary)]">{stage.theme}</p>
                                        </button>
                                    ))}
                                </div>
                                {/* Selected Stage Info */}
                                <div className="mt-4 p-4 bg-[var(--color-bg-secondary)] rounded-xl">
                                    <p className="text-sm text-[var(--color-text-secondary)]">
                                        <strong>{AGE_STAGES[formData.ageStage].emoji} {AGE_STAGES[formData.ageStage].title}：</strong>
                                        {AGE_STAGES[formData.ageStage].parentReadingGuide}
                                    </p>
                                </div>
                            </div>

                            {/* Investment Plan - Multiple Funds */}
                            <div>
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[var(--color-royal-blue)] text-white flex items-center justify-center text-sm">3</span>
                                    投資方針
                                </h3>

                                <div className="space-y-4">
                                    {formData.funds.map((fund, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-[var(--color-bg-secondary)] rounded-xl space-y-3"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-[var(--color-royal-blue)]">
                                                    ファンド {index + 1}
                                                </span>
                                                {formData.funds.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFund(index)}
                                                        className="text-xs text-red-500 hover:underline"
                                                    >
                                                        削除
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                                <div className="md:col-span-2">
                                                    <select
                                                        value={fund.name}
                                                        onChange={(e) => handleFundChange(index, "name", e.target.value)}
                                                        className={inputClasses}
                                                    >
                                                        {FUND_OPTIONS.map(opt => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max="100"
                                                            value={fund.ratio}
                                                            onChange={(e) => handleFundChange(index, "ratio", parseInt(e.target.value) || 0)}
                                                            className={`${inputClasses} pr-8`}
                                                        />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* カスタムファンド名入力（「その他」選択時） */}
                                            {fund.name === "その他" && (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={fund.customName || ""}
                                                        onChange={(e) => handleFundChange(index, "customName", e.target.value)}
                                                        placeholder="ファンド名を入力してください"
                                                        className={inputClasses}
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <input
                                                    type="text"
                                                    value={fund.reason}
                                                    onChange={(e) => handleFundChange(index, "reason", e.target.value)}
                                                    placeholder="選んだ理由（任意）"
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Add Fund Button */}
                                    {formData.funds.length < 5 && (
                                        <button
                                            type="button"
                                            onClick={addFund}
                                            className="w-full py-3 rounded-xl border-2 border-dashed border-[var(--glass-border)] text-[var(--color-text-muted)] hover:border-[var(--color-royal-blue)] hover:text-[var(--color-royal-blue)] transition-colors flex items-center justify-center gap-2"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                            ファンドを追加
                                        </button>
                                    )}

                                    {/* Ratio Summary */}
                                    <div className={`p-3 rounded-lg ${getTotalRatio() === 100 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                        <p className="text-sm">
                                            合計: {getTotalRatio()}%
                                            {getTotalRatio() !== 100 && <span className="ml-2">（100%になるよう調整してください）</span>}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Parent Message */}
                            <div>
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[var(--color-royal-blue)] text-white flex items-center justify-center text-sm">4</span>
                                    親からのメッセージ
                                </h3>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                                            将来のお子様へのメッセージ <span className="text-red-500">*</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowMessageHints(!showMessageHints)}
                                            className="text-xs text-[var(--color-royal-blue)] hover:underline"
                                        >
                                            {showMessageHints ? "ヒントを閉じる" : "メッセージ例を見る"}
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {showMessageHints && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mb-4 p-4 bg-[var(--color-bg-secondary)] rounded-xl text-sm"
                                            >
                                                <p className="font-medium text-[var(--color-text-primary)] mb-3">💡 メッセージ例</p>
                                                <div className="space-y-3">
                                                    {MESSAGE_EXAMPLES[formData.ageStage].map((example, index) => (
                                                        <div
                                                            key={index}
                                                            className="p-3 bg-white rounded-lg cursor-pointer hover:bg-[var(--color-royal-blue)]/5 transition-colors"
                                                            onClick={() => setFormData(prev => ({ ...prev, parentMessage: example }))}
                                                        >
                                                            <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                                                                「{example}」
                                                            </p>
                                                            <p className="text-[var(--color-royal-blue)] text-xs mt-2">
                                                                クリックして使用 →
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <textarea
                                        name="parentMessage"
                                        value={formData.parentMessage}
                                        onChange={handleChange}
                                        rows={5}
                                        required
                                        placeholder="お子様が18歳になったとき、このメッセージを読みます..."
                                        className={`${inputClasses} resize-none`}
                                    />
                                </div>
                            </div>

                            {/* Optional: Actual Performance */}
                            <div>
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[var(--color-text-muted)] text-white flex items-center justify-center text-sm">5</span>
                                    実績記録（任意）
                                </h3>
                                <p className="text-xs text-[var(--color-text-muted)] mb-4">
                                    💡 証券会社の画面キャプチャと並べて見ることで、シミュレーションと実績の比較ができます。
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                                            実際の投資総額
                                        </label>
                                        <input
                                            type="text"
                                            name="actualInvestment"
                                            value={formData.actualInvestment}
                                            onChange={handleChange}
                                            placeholder="例：5,400,000円"
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                                            実際の評価額
                                        </label>
                                        <input
                                            type="text"
                                            name="actualPerformance"
                                            value={formData.actualPerformance}
                                            onChange={handleChange}
                                            placeholder="例：8,500,000円"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-4">
                                <motion.button
                                    type="button"
                                    onClick={() => setStep("preview")}
                                    disabled={!formData.childName || !formData.parentMessage || getTotalRatio() !== 100}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    プレビューを見る
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {(step === "preview" || step === "generating") && (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Control Buttons */}
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setStep("form")}
                                className="px-6 py-2 rounded-xl border border-[var(--glass-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                            >
                                ← 編集に戻る
                            </button>
                            <motion.button
                                onClick={handleGeneratePDF}
                                disabled={step === "generating"}
                                whileHover={{ scale: step === "generating" ? 1 : 1.02 }}
                                whileTap={{ scale: step === "generating" ? 1 : 0.98 }}
                                className="btn-primary disabled:opacity-60"
                            >
                                {step === "generating" ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        PDF作成中...
                                    </>
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                        </svg>
                                        PDFをダウンロード
                                    </>
                                )}
                            </motion.button>
                        </div>

                        {/* Document Preview */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div ref={documentRef} className="p-8 md:p-12 space-y-8" style={{ backgroundColor: "#ffffff" }}>
                                {/* Cover */}
                                <div className="text-center py-8 border-b-2 border-[#1e3a8a]">
                                    <p className="text-[#10b981] text-sm font-medium tracking-wide mb-2">
                                        FINANCIAL EDUCATION GIFT — {AGE_STAGES[formData.ageStage].emoji} {AGE_STAGES[formData.ageStage].title}
                                    </p>
                                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-4">
                                        {formData.childName}さんへ
                                    </h1>
                                    <p className="text-xl text-gray-600">{AGE_STAGES[formData.ageStage].description.replace("○○", formData.childName)}</p>
                                    <p className="text-sm text-gray-400 mt-4">
                                        {formData.birthYear}年{formData.birthMonth}月生まれ（対象年齢：{AGE_STAGES[formData.ageStage].ageRange}）
                                    </p>
                                </div>

                                {/* Reading Guide for Parents */}
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                                    <p className="text-sm text-gray-700">
                                        <strong>📖 親御さんへ：</strong>{AGE_STAGES[formData.ageStage].parentReadingGuide}
                                    </p>
                                </div>

                                {/* What is Kodomo NISA */}
                                <div className="bg-gradient-to-r from-[#1e3a8a]/5 to-[#10b981]/5 rounded-2xl p-6">
                                    <h2 className="text-xl font-bold text-[#1e3a8a] mb-4">📚 こどもNISAとは</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        こどもNISAは、0歳〜17歳のお子様のための非課税投資制度です。
                                        通常、投資で得た利益には約20%の税金がかかりますが、この制度を使うと非課税で運用できます。
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="bg-white p-3 rounded-lg text-center">
                                            <p className="text-xs text-gray-500">年間上限</p>
                                            <p className="text-lg font-bold text-[#1e3a8a]">60万円</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg text-center">
                                            <p className="text-xs text-gray-500">保有上限</p>
                                            <p className="text-lg font-bold text-[#1e3a8a]">600万円</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg text-center">
                                            <p className="text-xs text-gray-500">対象年齢</p>
                                            <p className="text-lg font-bold text-[#1e3a8a]">0〜17歳</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg text-center">
                                            <p className="text-xs text-gray-500">税金</p>
                                            <p className="text-lg font-bold text-[#10b981]">非課税</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Investment Plan */}
                                <div>
                                    <h2 className="text-xl font-bold text-[#1e3a8a] mb-4">📈 運用計画</h2>
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500 mb-1">毎月の積立額</p>
                                                <p className="text-xl font-bold text-[#1e3a8a]">{formatCurrency(monthlyAmount)}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500 mb-1">想定利回り</p>
                                                <p className="text-xl font-bold text-[#1e3a8a]">{expectedReturn}%</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500 mb-1">運用開始年齢</p>
                                                <p className="text-xl font-bold text-[#1e3a8a]">{childAge}歳</p>
                                            </div>
                                        </div>
                                        {simulationResult && (
                                            <div className="border-t pt-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">投資元本</p>
                                                        <p className="text-lg font-semibold">{formatCurrency(simulationResult.totalInvestment)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">18歳時点の想定評価額</p>
                                                        <p className="text-lg font-semibold text-[#10b981]">{formatCurrency(simulationResult.finalValue)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Fund Selection - Multiple Funds */}
                                <div>
                                    <h2 className="text-xl font-bold text-[#1e3a8a] mb-4">🏦 選んだファンド</h2>
                                    <div className="space-y-3">
                                        {formData.funds.map((fund, index) => {
                                            const displayName = fund.name === "その他" && fund.customName
                                                ? fund.customName
                                                : fund.name;
                                            return (
                                                <div key={index} className="bg-[#1e3a8a]/5 rounded-xl p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="font-semibold text-[#1e3a8a]">{displayName}</p>
                                                        <span className="text-sm font-bold text-[#10b981]">{fund.ratio}%</span>
                                                    </div>
                                                    {fund.reason && (
                                                        <p className="text-gray-600 text-sm">
                                                            <span className="font-medium">選んだ理由：</span> {fund.reason}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Actual Performance */}
                                {(formData.actualInvestment || formData.actualPerformance) && (
                                    <div>
                                        <h2 className="text-xl font-bold text-[#1e3a8a] mb-4">📊 実際の運用実績</h2>
                                        <div className="bg-[#10b981]/5 rounded-xl p-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                {formData.actualInvestment && (
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">投資総額</p>
                                                        <p className="text-xl font-bold">{formData.actualInvestment}</p>
                                                    </div>
                                                )}
                                                {formData.actualPerformance && (
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">評価額</p>
                                                        <p className="text-xl font-bold text-[#10b981]">{formData.actualPerformance}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Parent Message */}
                                <div className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a]/30 rounded-2xl p-8">
                                    <h2 className="text-xl font-bold text-[#92400e] mb-4">💌 親からのメッセージ</h2>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {formData.parentMessage}
                                    </p>
                                </div>

                                {/* Stage-specific Learning Points */}
                                <div className="border-t-2 border-gray-200 pt-8">
                                    <h2 className="text-xl font-bold text-[#1e3a8a] mb-4">
                                        📚 {formData.childName}と一緒に学ぶこと
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-6">
                                        この{AGE_STAGES[formData.ageStage].title}で伝えたい大切なポイントです。
                                    </p>
                                    <div className="space-y-3">
                                        {AGE_STAGES[formData.ageStage].learningPoints.map((point, index) => (
                                            <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                                                <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-sm flex-shrink-0">{index + 1}</span>
                                                <p className="text-gray-700">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Stage-specific Discussion Topics */}
                                <div className="pt-8">
                                    <h2 className="text-xl font-bold text-[#1e3a8a] mb-4">
                                        💬 親子で話し合うヒント
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-6">
                                        このPDFと証券会社の画面を並べて、一緒に確認してみましょう。
                                    </p>
                                    <div className="bg-gradient-to-br from-[#1e3a8a]/5 to-[#10b981]/5 rounded-xl p-6">
                                        <div className="space-y-4">
                                            {AGE_STAGES[formData.ageStage].discussionTopics.map((topic, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <span className="text-lg">💡</span>
                                                    <p className="text-gray-700">{topic}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                                        <p className="text-sm text-blue-800">
                                            <strong>📱 活用のコツ：</strong>証券会社のアプリやウェブサイトで実際の口座画面を見ながら、
                                            このPDFのシミュレーションと実績を比べてみましょう。数字の違いについて話し合うことで、より深い学びになります。
                                        </p>
                                    </div>
                                </div>

                                {/* Child-specific Message */}
                                <div className="pt-8">
                                    <div className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a]/30 rounded-2xl p-6">
                                        <h2 className="text-xl font-bold text-[#92400e] mb-4">
                                            {AGE_STAGES[formData.ageStage].emoji} {formData.childName}へ
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            {AGE_STAGES[formData.ageStage].childMessage.replace(/○○/g, formData.childName)}
                                        </p>
                                    </div>
                                </div>

                                {/* Next Steps - Stage-specific */}
                                <div className="pt-8">
                                    <div className="bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7] rounded-xl p-6">
                                        <h3 className="font-bold text-[#166534] text-lg mb-4">
                                            🔮 次のステップ
                                        </h3>
                                        {formData.ageStage === "infant" && (
                                            <p className="text-sm text-gray-600">
                                                {formData.childName}が小学生になったら、「🌿 成長編」を作成しましょう。
                                                投資と社会のつながりについて、一緒に学べる内容になっています。
                                            </p>
                                        )}
                                        {formData.ageStage === "elementary" && (
                                            <p className="text-sm text-gray-600">
                                                {formData.childName}が中学生になったら、「🌳 自立編」を作成しましょう。
                                                自分で資産配分を考える力を育てる内容になっています。
                                            </p>
                                        )}
                                        {formData.ageStage === "teen" && (
                                            <p className="text-sm text-gray-600">
                                                18歳の誕生日、おめでとうございます！このお金の使い方は、{formData.childName}が自分で決められます。
                                                大学資金に使う、継続して投資する、どちらも正解です。自分の人生は、自分で選びましょう。
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="text-center text-gray-400 text-xs pt-8 border-t">
                                    <p>Created with こどもNISA研究所</p>
                                    <p>https://www.kodomo-nisa.jp</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
