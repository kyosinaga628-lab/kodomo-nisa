"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EducationDocumentGenerator from "@/components/simulator/EducationDocumentGenerator";
import SimulatorForm from "@/components/simulator/SimulatorForm";
import ResultSummary from "@/components/simulator/ResultSummary";
import { SimulationInput, calculateNISA } from "@/lib/calculator";

export default function EducationGiftPage() {
    const [inputs, setInputs] = useState<SimulationInput>({
        monthlyAmount: 30000,
        childAge: 0,
        expectedReturn: 5,
    });
    const [showCreator, setShowCreator] = useState(false);
    const [showSimulator, setShowSimulator] = useState(true);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [selectedStage, setSelectedStage] = useState<"infant" | "elementary" | "teen" | null>(null);

    const result = useMemo(() => calculateNISA(inputs), [inputs]);

    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-[calc(var(--header-height)+var(--banner-height)+1rem)] md:pt-[calc(var(--header-height)+var(--banner-height)+3rem)] pb-24">
            <div className="container-width px-4">
                <AnimatePresence mode="wait">
                    {!showCreator ? (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Hero Section - Simplified & Impactful */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-8 md:mb-12"
                            >
                                <div className="inline-flex items-center gap-2 bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    <span className="text-lg">🎁</span>
                                    無料で作れる金融教育ギフト
                                </div>
                                <h1 className="heading-section mb-4 text-2xl md:text-4xl">
                                    18歳の誕生日に届ける、
                                    <br />
                                    <span className="bg-gradient-to-r from-[var(--color-royal-blue)] to-[var(--color-emerald)] bg-clip-text text-transparent">
                                        お金の思い出と知恵
                                    </span>
                                </h1>
                                <p className="text-body max-w-xl mx-auto text-sm md:text-base">
                                    こどもNISAの運用記録・親の想い・金融教育を<br className="hidden md:block" />
                                    1枚のPDFにまとめてプレゼント
                                </p>
                            </motion.div>

                            {/* Visual Process - 3 Steps */}
                            <motion.section
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.6 }}
                                className="mb-8 md:mb-12"
                            >
                                <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                                    <div className="relative bg-white rounded-2xl p-5 border border-[var(--glass-border)] text-center">
                                        <div className="w-10 h-10 rounded-full bg-[var(--color-royal-blue)] text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">1</div>
                                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">入力する</h3>
                                        <p className="text-xs text-[var(--color-text-muted)]">お子様の名前・投資プラン・<br />メッセージを入力</p>
                                        <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 text-[var(--color-text-muted)]">→</div>
                                    </div>
                                    <div className="relative bg-white rounded-2xl p-5 border border-[var(--glass-border)] text-center">
                                        <div className="w-10 h-10 rounded-full bg-[var(--color-royal-blue)] text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">2</div>
                                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">プレビュー</h3>
                                        <p className="text-xs text-[var(--color-text-muted)]">完成イメージを<br />その場で確認</p>
                                        <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 text-[var(--color-text-muted)]">→</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-[var(--color-emerald)]/10 to-[var(--color-royal-blue)]/10 rounded-2xl p-5 border border-[var(--color-emerald)]/30 text-center">
                                        <div className="w-10 h-10 rounded-full bg-[var(--color-emerald)] text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">3</div>
                                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">ダウンロード</h3>
                                        <p className="text-xs text-[var(--color-text-muted)]">PDFを保存して<br />18歳の誕生日に渡す</p>
                                    </div>
                                </div>
                            </motion.section>

                            {/* 3 Types of Gift - Visual Showcase */}
                            <motion.section
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18, duration: 0.6 }}
                                className="mb-10 md:mb-16"
                            >
                                <h2 className="text-center font-serif text-lg md:text-xl font-semibold mb-3">
                                    📚 成長に合わせた3種類のギフト
                                </h2>
                                <p className="text-center text-sm text-[var(--color-text-muted)] mb-8 max-w-xl mx-auto">
                                    お子様の年齢に応じて、親子で一緒に読める内容が変わります。<br className="hidden md:block" />
                                    成長の節目に何度でも作成できます。
                                </p>

                                <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                                    {/* 種まき編 - Simple Card */}
                                    <button
                                        onClick={() => {
                                            setSelectedStage("infant");
                                            setShowPreviewModal(true);
                                        }}
                                        className="bg-white rounded-2xl shadow-md border-2 border-pink-200 p-6 text-left hover:shadow-xl hover:border-pink-400 hover:scale-[1.02] transition-all cursor-pointer group"
                                    >
                                        <div className="text-center mb-4">
                                            <span className="text-5xl">🌱</span>
                                            <h3 className="font-bold text-pink-600 text-lg mt-2">種まき編</h3>
                                            <p className="text-sm text-pink-500 font-medium">0〜6歳向け</p>
                                        </div>
                                        <p className="text-sm text-gray-600 text-center mb-4">
                                            お金が「育つ」ことを<br />
                                            絵本感覚で伝える
                                        </p>
                                        <div className="text-center">
                                            <span className="inline-flex items-center gap-1 text-xs text-pink-500 group-hover:text-pink-600">
                                                <span>クリックして詳細を見る</span>
                                                <span>→</span>
                                            </span>
                                        </div>
                                    </button>

                                    {/* 成長編 - Simple Card */}
                                    <button
                                        onClick={() => {
                                            setSelectedStage("elementary");
                                            setShowPreviewModal(true);
                                        }}
                                        className="bg-white rounded-2xl shadow-md border-2 border-blue-200 p-6 text-left hover:shadow-xl hover:border-blue-400 hover:scale-[1.02] transition-all cursor-pointer group"
                                    >
                                        <div className="text-center mb-4">
                                            <span className="text-5xl">🌿</span>
                                            <h3 className="font-bold text-blue-600 text-lg mt-2">成長編</h3>
                                            <p className="text-sm text-blue-500 font-medium">7〜12歳向け</p>
                                        </div>
                                        <p className="text-sm text-gray-600 text-center mb-4">
                                            投資と社会のつながりを<br />
                                            親子で対話しながら学ぶ
                                        </p>
                                        <div className="text-center">
                                            <span className="inline-flex items-center gap-1 text-xs text-blue-500 group-hover:text-blue-600">
                                                <span>クリックして詳細を見る</span>
                                                <span>→</span>
                                            </span>
                                        </div>
                                    </button>

                                    {/* 自立編 - Simple Card */}
                                    <button
                                        onClick={() => {
                                            setSelectedStage("teen");
                                            setShowPreviewModal(true);
                                        }}
                                        className="bg-white rounded-2xl shadow-md border-2 border-green-200 p-6 text-left hover:shadow-xl hover:border-green-400 hover:scale-[1.02] transition-all cursor-pointer group"
                                    >
                                        <div className="text-center mb-4">
                                            <span className="text-5xl">🌳</span>
                                            <h3 className="font-bold text-green-600 text-lg mt-2">自立編</h3>
                                            <p className="text-sm text-green-500 font-medium">13〜18歳向け</p>
                                        </div>
                                        <p className="text-sm text-gray-600 text-center mb-4">
                                            自分で判断する力を<br />
                                            18歳の自立に向けて育む
                                        </p>
                                        <div className="text-center">
                                            <span className="inline-flex items-center gap-1 text-xs text-green-500 group-hover:text-green-600">
                                                <span>クリックして詳細を見る</span>
                                                <span>→</span>
                                            </span>
                                        </div>
                                    </button>
                                </div>

                                {/* Usage Hint */}
                                <div className="mt-6 max-w-2xl mx-auto text-center">
                                    <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-full text-xs">
                                        <span>💡</span>
                                        <span>証券会社のアプリ画面と並べて見ると、より深い学びになります</span>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Preview Modal */}
                            <AnimatePresence>
                                {showPreviewModal && selectedStage && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                                        onClick={() => setShowPreviewModal(false)}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Modal Header */}
                                            <div className={`p-4 text-white text-center ${selectedStage === "infant" ? "bg-gradient-to-r from-pink-500 to-pink-400" :
                                                selectedStage === "elementary" ? "bg-gradient-to-r from-blue-500 to-blue-400" :
                                                    "bg-gradient-to-r from-green-500 to-green-400"
                                                }`}>
                                                <p className="text-xs opacity-80">FINANCIAL EDUCATION GIFT</p>
                                                <p className="text-lg font-bold">
                                                    {selectedStage === "infant" && "🌱 種まき編（0〜6歳）"}
                                                    {selectedStage === "elementary" && "🌿 成長編（7〜12歳）"}
                                                    {selectedStage === "teen" && "🌳 自立編（13〜18歳）"}
                                                </p>
                                            </div>

                                            {/* Modal Content - PDF Preview */}
                                            <div className="p-6 space-y-4">
                                                {/* Sample Numbers */}
                                                <div className="grid grid-cols-3 gap-3 text-center">
                                                    <div className="bg-gray-50 rounded-lg p-3">
                                                        <p className="text-lg font-bold text-gray-800">月3万円</p>
                                                        <p className="text-xs text-gray-500">積立額</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-3">
                                                        <p className="text-lg font-bold text-gray-800">18年間</p>
                                                        <p className="text-xs text-gray-500">運用期間</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-3">
                                                        <p className="text-lg font-bold text-[var(--color-emerald)]">約940万円</p>
                                                        <p className="text-xs text-gray-500">予想資産</p>
                                                    </div>
                                                </div>

                                                {/* Learning Points */}
                                                <div className="bg-gray-50 rounded-xl p-4">
                                                    <p className="font-semibold text-gray-800 mb-2">📖 親子で学ぶこと</p>
                                                    <ul className="text-sm text-gray-600 space-y-1">
                                                        {selectedStage === "infant" && (
                                                            <>
                                                                <li>✓ あなたのためのお金がある</li>
                                                                <li>✓ お金は「育つ」ことがある</li>
                                                                <li>✓ 時間をかけると大きくなる</li>
                                                            </>
                                                        )}
                                                        {selectedStage === "elementary" && (
                                                            <>
                                                                <li>✓ 投資＝会社を応援すること</li>
                                                                <li>✓ 複利の力（お金がお金を生む）</li>
                                                                <li>✓ 世界経済とのつながり</li>
                                                            </>
                                                        )}
                                                        {selectedStage === "teen" && (
                                                            <>
                                                                <li>✓ 資産配分の考え方</li>
                                                                <li>✓ リスクとリターンの関係</li>
                                                                <li>✓ 18歳以降の選択肢</li>
                                                            </>
                                                        )}
                                                    </ul>
                                                </div>

                                                {/* Sample Message */}
                                                <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-400">
                                                    <p className="text-sm text-gray-600 italic">
                                                        {selectedStage === "infant" && "「○○ちゃん、パパとママがあなたのためにお金を育てているよ。大きくなったら一緒に見ようね...」"}
                                                        {selectedStage === "elementary" && "「君の好きなゲームを作っている会社にも投資しているんだよ。応援したい会社にお金を預けているんだ...」"}
                                                        {selectedStage === "teen" && "「このお金の使い方は、あなたが自分で決めていいんだよ。大学に使う？継続して投資する？...」"}
                                                    </p>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-3 pt-2">
                                                    <button
                                                        onClick={() => setShowPreviewModal(false)}
                                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                                                    >
                                                        閉じる
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setShowPreviewModal(false);
                                                            setShowCreator(true);
                                                            window.scrollTo({ top: 0, behavior: 'instant' });
                                                        }}
                                                        className={`flex-1 px-4 py-3 rounded-xl text-white font-semibold transition-colors ${selectedStage === "infant" ? "bg-pink-500 hover:bg-pink-600" :
                                                            selectedStage === "elementary" ? "bg-blue-500 hover:bg-blue-600" :
                                                                "bg-green-500 hover:bg-green-600"
                                                            }`}
                                                    >
                                                        ギフト作成 →
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Use Cases - Emotional & Clear */}
                            <motion.section
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="mb-10 md:mb-16"
                            >
                                <h2 className="text-center font-serif text-lg md:text-xl font-semibold mb-6">
                                    👨‍👩‍👧‍👦 こんな方におすすめ
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                                    <div className="bg-white rounded-xl p-5 border border-[var(--glass-border)] flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-2xl flex-shrink-0">👶</div>
                                        <div>
                                            <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">これから始める方</h3>
                                            <p className="text-xs text-[var(--color-text-muted)]">「2027年からこどもNISAを始めるつもり」<br />→ 最初から記録を残しておきたい</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border border-[var(--glass-border)] flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl flex-shrink-0">🧒</div>
                                        <div>
                                            <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">すでに投資中の方</h3>
                                            <p className="text-xs text-[var(--color-text-muted)]">「子ども用に積立してるけど何も伝えてない」<br />→ 今の想いを記録しておきたい</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border border-[var(--glass-border)] flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0">🎓</div>
                                        <div>
                                            <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">金融教育したい方</h3>
                                            <p className="text-xs text-[var(--color-text-muted)]">「お金の大切さを伝えたいけど方法がわからない」<br />→ 実体験として教材を作りたい</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border border-[var(--glass-border)] flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl flex-shrink-0">💝</div>
                                        <div>
                                            <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">思い出を残したい方</h3>
                                            <p className="text-xs text-[var(--color-text-muted)]">「写真だけでなく別の形でも想いを伝えたい」<br />→ 世界に一つだけのギフトを贈りたい</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* What's Included - Features */}
                            <motion.section
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.6 }}
                                className="mb-10 md:mb-16"
                            >
                                <div className="bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-[var(--color-emerald)]/5 rounded-2xl p-6 md:p-8">
                                    <h2 className="font-serif text-lg md:text-xl font-semibold mb-6 text-center">📄 PDFに含まれる内容</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="bg-white/80 rounded-xl p-4 text-center">
                                            <div className="text-2xl mb-2">📊</div>
                                            <p className="font-medium text-sm text-[var(--color-text-primary)]">運用計画</p>
                                            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">積立額・利回り・期間</p>
                                        </div>
                                        <div className="bg-white/80 rounded-xl p-4 text-center">
                                            <div className="text-2xl mb-2">🏦</div>
                                            <p className="font-medium text-sm text-[var(--color-text-primary)]">ファンド</p>
                                            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">銘柄と選んだ理由</p>
                                        </div>
                                        <div className="bg-white/80 rounded-xl p-4 text-center">
                                            <div className="text-2xl mb-2">💌</div>
                                            <p className="font-medium text-sm text-[var(--color-text-primary)]">メッセージ</p>
                                            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">親から子への想い</p>
                                        </div>
                                        <div className="bg-white/80 rounded-xl p-4 text-center">
                                            <div className="text-2xl mb-2">🗺️</div>
                                            <p className="font-medium text-sm text-[var(--color-text-primary)]">成長ガイド</p>
                                            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">年齢別ロードマップ</p>
                                        </div>
                                        <div className="bg-white/80 rounded-xl p-4 text-center">
                                            <div className="text-2xl mb-2">💎</div>
                                            <p className="font-medium text-sm text-[var(--color-text-primary)]">4つの核心</p>
                                            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">金融教育の本質</p>
                                        </div>
                                        <div className="bg-white/80 rounded-xl p-4 text-center">
                                            <div className="text-2xl mb-2">🎓</div>
                                            <p className="font-medium text-sm text-[var(--color-text-primary)]">専門家解説</p>
                                            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">AI時代の投資教育</p>
                                        </div>
                                        <div className="bg-white/80 rounded-xl p-4 text-center">
                                            <div className="text-2xl mb-2">📈</div>
                                            <p className="font-medium text-sm text-[var(--color-text-primary)]">実績記録</p>
                                            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">任意で実績も記載</p>
                                        </div>
                                        <div className="bg-white/80 rounded-xl p-4 text-center">
                                            <div className="text-2xl mb-2">🎉</div>
                                            <p className="font-medium text-sm text-[var(--color-text-primary)]">お祝い</p>
                                            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">18歳へのメッセージ</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-center"
                            >
                                <button
                                    onClick={() => setShowCreator(true)}
                                    className="btn-primary text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-shadow"
                                >
                                    ギフトを作成する →
                                </button>
                                <p className="text-xs text-[var(--color-text-muted)] mt-3">
                                    無料で作成・ダウンロードできます
                                </p>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="creator"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Back Button */}
                            <button
                                onClick={() => setShowCreator(false)}
                                className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                ギフト紹介に戻る
                            </button>

                            {/* Page Header */}
                            <motion.div className="text-center mb-8">
                                <h1 className="heading-section text-2xl md:text-3xl">金融教育ギフトを作成</h1>
                            </motion.div>

                            {/* Simulation Settings Toggle */}
                            <div className="mb-8">
                                <button
                                    onClick={() => setShowSimulator(!showSimulator)}
                                    className="w-full card-base p-4 text-left flex items-center justify-between hover:bg-[var(--color-bg-secondary)] transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[var(--color-royal-blue)]/10 flex items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2">
                                                <circle cx="12" cy="12" r="3" />
                                                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[var(--color-text-primary)]">運用シミュレーション設定</p>
                                            <p className="text-sm text-[var(--color-text-muted)]">
                                                月額 {inputs.monthlyAmount.toLocaleString()}円 / 利回り {inputs.expectedReturn}% / {inputs.childAge}歳から
                                            </p>
                                        </div>
                                    </div>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="var(--color-text-muted)"
                                        strokeWidth="2"
                                        className={`transition-transform ${showSimulator ? "rotate-180" : ""}`}
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>

                                {showSimulator && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="card-base p-6 mt-2 space-y-6"
                                    >
                                        <SimulatorForm values={inputs} onChange={setInputs} />
                                        <div className="border-t pt-4">
                                            <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">シミュレーション結果</p>
                                            <ResultSummary result={result} />
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Main Content */}
                            <EducationDocumentGenerator
                                simulationResult={result}
                                monthlyAmount={inputs.monthlyAmount}
                                expectedReturn={inputs.expectedReturn}
                                childAge={inputs.childAge}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
