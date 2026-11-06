"use client";

import { useEffect, useState, useMemo } from "react";
import EducationDocumentGenerator from "@/components/simulator/EducationDocumentGenerator";
import SimulatorForm from "@/components/simulator/SimulatorForm";
import ResultSummary from "@/components/simulator/ResultSummary";
import { ArrowIcon, PageHeader } from "@/components/common/ui";
import { SimulationInput, calculateNISA, formatCurrency } from "@/lib/calculator";

const STAGES = {
    infant: {
        title: "種まき編",
        age: "0〜6歳向け",
        summary: "お金が「育つ」ことを絵本感覚で伝える",
        learn: ["あなたのためのお金がある", "お金は「育つ」ことがある", "時間をかけると大きくなる"],
        sample: "「○○ちゃん、パパとママがあなたのためにお金を育てているよ。大きくなったら一緒に見ようね...」",
    },
    elementary: {
        title: "成長編",
        age: "7〜12歳向け",
        summary: "投資と社会のつながりを親子で対話しながら学ぶ",
        learn: ["投資＝会社を応援すること", "複利の力（お金がお金を生む）", "世界経済とのつながり"],
        sample: "「君の好きなゲームを作っている会社にも投資しているんだよ。応援したい会社にお金を預けているんだ...」",
    },
    teen: {
        title: "自立編",
        age: "13〜18歳向け",
        summary: "自分で判断する力を18歳の自立に向けて育む",
        learn: ["資産配分の考え方", "リスクとリターンの関係", "18歳以降の選択肢"],
        sample: "「このお金の使い方は、あなたが自分で決めていいんだよ。大学に使う？継続して投資する？...」",
    },
};

type Stage = keyof typeof STAGES;

const STEPS = [
    { title: "入力する", description: "お子様の名前・投資プラン・メッセージを入力" },
    { title: "プレビュー", description: "完成イメージをその場で確認" },
    { title: "ダウンロード", description: "PDFを保存して18歳の誕生日に渡す" },
];

const USE_CASES = [
    { title: "これから始める方", quote: "「2027年からこどもNISAを始めるつもり」", want: "最初から記録を残しておきたい" },
    { title: "すでに投資中の方", quote: "「子ども用に積立してるけど何も伝えてない」", want: "今の想いを記録しておきたい" },
    { title: "金融教育したい方", quote: "「お金の大切さを伝えたいけど方法がわからない」", want: "実体験として教材を作りたい" },
    { title: "思い出を残したい方", quote: "「写真だけでなく別の形でも想いを伝えたい」", want: "世界に一つだけのギフトを贈りたい" },
];

const PDF_CONTENTS = [
    ["メッセージ", "親から子への想い"],
    ["18歳までの道のり", "今の時期がわかる表紙"],
    ["運用計画", "積立額・利回り・18歳時点の試算"],
    ["資産の推移", "元本と運用益のグラフ"],
    ["ファンド", "銘柄と選んだ理由"],
    ["実績記録", "任意で実績も記載"],
    ["親子で学ぶこと", "年齢に合わせたポイントと対話のヒント"],
    ["制度のしくみ", "非課税のしくみと払出しルール"],
];

// モーダル内の例示はシミュレーターと同じ計算から出す
const SAMPLE = calculateNISA({ monthlyAmount: 30000, childAge: 0, expectedReturn: 5 });

const sectionTitle = "heading-section !text-[1.375rem] md:!text-[1.75rem]";

export default function EducationGiftPage() {
    const [inputs, setInputs] = useState<SimulationInput>({
        monthlyAmount: 30000,
        childAge: 0,
        expectedReturn: 5,
    });
    const [showCreator, setShowCreator] = useState(false);
    const [showSimulator, setShowSimulator] = useState(true);
    const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

    const result = useMemo(() => calculateNISA(inputs), [inputs]);

    useEffect(() => {
        if (!selectedStage) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedStage(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedStage]);

    if (showCreator) {
        return (
            <div className="min-h-screen bg-[var(--color-bg)] page-top">
                <div className="container-width">
                    <button
                        onClick={() => setShowCreator(false)}
                        className="link-arrow !font-medium mb-6"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M19 12H5M11 18l-6-6 6-6" />
                        </svg>
                        ギフト紹介に戻る
                    </button>

                    <h1 className="heading-section pb-6 mb-8 border-b border-[var(--color-line-strong)]">金融教育ギフトを作成</h1>

                    {/* Simulation Settings Toggle */}
                    <div className="mb-8 card-base">
                        <button
                            onClick={() => setShowSimulator(!showSimulator)}
                            aria-expanded={showSimulator}
                            className="w-full p-5 text-left flex items-center justify-between gap-4"
                        >
                            <span>
                                <span className="block font-semibold">運用シミュレーション設定</span>
                                <span className="block note tnum">
                                    月額 {inputs.monthlyAmount.toLocaleString()}円 / 利回り {inputs.expectedReturn}% / {inputs.childAge}歳から
                                </span>
                            </span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--color-text-muted)"
                                strokeWidth="2"
                                aria-hidden="true"
                                className={`flex-shrink-0 transition-transform ${showSimulator ? "rotate-180" : ""}`}
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        {showSimulator && (
                            <div className="p-5 border-t border-[var(--color-line)] grid lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-5">
                                    <SimulatorForm values={inputs} onChange={setInputs} />
                                </div>
                                <div className="lg:col-span-7">
                                    <ResultSummary result={result} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <EducationDocumentGenerator
                        simulationResult={result}
                        monthlyAmount={inputs.monthlyAmount}
                        expectedReturn={inputs.expectedReturn}
                        childAge={inputs.childAge}
                    />
                </div>
            </div>
        );
    }

    const stage = selectedStage ? STAGES[selectedStage] : null;

    return (
        <div className="min-h-screen bg-[var(--color-bg)] page-top">
            <div className="container-width">
                <PageHeader
                    kicker="無料で作れる金融教育ギフト"
                    title={<>18歳の誕生日に届ける、<br />お金の思い出と知恵</>}
                    lead="こどもNISAの運用記録・親の想い・金融教育を、A4・4ページのPDFにまとめてプレゼント"
                >
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-2">
                        <button onClick={() => setShowCreator(true)} className="btn-primary">
                            ギフトを作成する
                            <ArrowIcon />
                        </button>
                        <p className="note">無料で作成・ダウンロードできます</p>
                    </div>
                </PageHeader>

                {/* Steps */}
                <section className="mb-14 md:mb-24">
                    <ol className="grid md:grid-cols-3 md:gap-10">
                        {STEPS.map((step, index) => (
                            <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] py-4 md:py-0 border-b md:border-b-0 border-[var(--color-line)]">
                                <span className="figure text-[1.5rem] text-[var(--color-text-muted)]" aria-hidden="true">{index + 1}</span>
                                <div>
                                    <h2 className="heading-card">{step.title}</h2>
                                    <p className="note mt-0.5">{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* 3 Types of Gift */}
                <section className="mb-14 md:mb-24">
                    <h2 className={sectionTitle}>成長に合わせた3種類のギフト</h2>
                    <p className="mt-2 mb-6 text-[0.9375rem] text-[var(--color-text-secondary)]">
                        お子様の年齢に応じて、親子で一緒に読める内容が変わります。成長の節目に何度でも作成できます。
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 md:gap-5">
                        {(Object.keys(STAGES) as Stage[]).map((key) => (
                            <button
                                key={key}
                                onClick={() => setSelectedStage(key)}
                                className="group card-base p-5 md:p-6 text-left flex flex-col hover:border-[var(--color-royal-blue)] transition-colors"
                            >
                                <span className="note">{STAGES[key].age}</span>
                                <span className="font-serif font-semibold text-[1.375rem] mt-0.5">{STAGES[key].title}</span>
                                <span className="mt-2 mb-4 text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">{STAGES[key].summary}</span>
                                <span className="link-arrow mt-auto group-hover:underline">
                                    詳細を見る
                                    <ArrowIcon />
                                </span>
                            </button>
                        ))}
                    </div>
                    <p className="note mt-4">証券会社のアプリ画面と並べて見ると、より深い学びになります</p>
                </section>

                {/* Use Cases */}
                <section className="mb-14 md:mb-24 split">
                    <h2 className={sectionTitle}>こんな方におすすめ</h2>
                    <div className="ledger">
                        {USE_CASES.map((useCase) => (
                            <div key={useCase.title} className="py-4 sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                                <h3 className="heading-card">{useCase.title}</h3>
                                <p className="text-[0.9375rem] text-[var(--color-text-secondary)] mt-1 sm:mt-0.5">
                                    {useCase.quote}
                                    <br />
                                    {useCase.want}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What's Included */}
                <section className="mb-14 md:mb-20">
                    <h2 className={`${sectionTitle} mb-5`}>PDFに含まれる内容</h2>
                    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 border-t border-[var(--color-line-strong)]">
                        {PDF_CONTENTS.map(([title, description]) => (
                            <div key={title} className="py-3.5 border-b border-[var(--color-line)]">
                                <dt className="font-semibold text-[0.9375rem]">{title}</dt>
                                <dd className="note">{description}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <button onClick={() => setShowCreator(true)} className="btn-primary w-full sm:w-auto">
                    ギフトを作成する
                    <ArrowIcon />
                </button>
            </div>

            {/* Preview Modal */}
            {stage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-royal-blue-dark)]/60"
                    onClick={() => setSelectedStage(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="gift-preview-title"
                        className="bg-[var(--color-surface)] rounded-[10px] shadow-[var(--shadow-xl)] max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="note">金融教育ギフト</p>
                        <h2 id="gift-preview-title" className="heading-section !text-[1.5rem]">
                            {stage.title}<span className="font-sans text-[0.875rem] font-normal text-[var(--color-text-muted)] ml-2">{stage.age}</span>
                        </h2>

                        <dl className="mt-5 grid grid-cols-3 gap-4 border-y border-[var(--color-line)] py-3">
                            <div>
                                <dt className="note">積立額</dt>
                                <dd className="figure text-[1.25rem] mt-0.5">月3万円</dd>
                            </div>
                            <div>
                                <dt className="note">運用期間</dt>
                                <dd className="figure text-[1.25rem] mt-0.5">18年間</dd>
                            </div>
                            <div>
                                <dt className="note">予想資産</dt>
                                <dd className="figure text-[1.25rem] mt-0.5 text-[var(--color-emerald)]">約{formatCurrency(SAMPLE.finalValue)}</dd>
                            </div>
                        </dl>

                        <h3 className="font-sans font-semibold text-[0.9375rem] mt-5 mb-1.5">親子で学ぶこと</h3>
                        <ul className="space-y-1 text-[0.9375rem] text-[var(--color-text-secondary)]">
                            {stage.learn.map((item) => (
                                <li key={item}>・{item}</li>
                            ))}
                        </ul>

                        <p className="rule-left mt-5 font-serif text-[0.9375rem]">{stage.sample}</p>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setSelectedStage(null)} className="btn-secondary flex-1">
                                閉じる
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedStage(null);
                                    setShowCreator(true);
                                    window.scrollTo({ top: 0, behavior: "instant" });
                                }}
                                className="btn-primary flex-1"
                            >
                                ギフト作成
                                <ArrowIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
