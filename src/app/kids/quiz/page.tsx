"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// クイズデータ
const quizzes = [
    {
        id: 1,
        question: "お金の3つの役割（やくわり）は、「買う」「ためる」ともう1つは何？",
        options: ["食べる", "はかる", "なげる", "もやす"],
        answer: 1,
        explanation: "お金は「ものの値段をはかる」役割もあるよ！100円と1000円でどっちが高いかわかるよね。"
    },
    {
        id: 2,
        question: "投資（とうし）とは、どんなことをすること？",
        options: ["お金をかくすこと", "会社を応援（おうえん）すること", "お金を燃やすこと", "お金をすてること"],
        answer: 1,
        explanation: "投資は会社を応援すること！応援した会社がうまくいくと、お礼としてお金がふえるんだ。"
    },
    {
        id: 3,
        question: "NISAをつかうと、どんないいことがある？",
        options: ["お菓子がもらえる", "ふえたお金に税金がかからない", "宿題がへる", "ゲームができる"],
        answer: 1,
        explanation: "NISAをつかうと、投資でふえたお金に税金がかからないよ！国がつくった特別なしくみなんだ。"
    },
    {
        id: 4,
        question: "貯金箱（ちょきんばこ）に入れたお金はどうなる？",
        options: ["へっていく", "ふえていく", "そのまま", "きえる"],
        answer: 2,
        explanation: "貯金箱のお金はふえないよ。1000円は1000円のまま。でも投資をすると、ふえる可能性があるんだ！"
    },
    {
        id: 5,
        question: "投資でお金がふえるには、何が大切？",
        options: ["すぐに売ること", "長い時間まつこと", "たくさん買うこと", "毎日見ること"],
        answer: 1,
        explanation: "投資は木を育てるのと同じで、長い時間がかかるよ。「長い目で見る」ことが大切なんだ！"
    }
];

export default function QuizPage() {
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<boolean[]>([]);

    const handleAnswer = (index: number) => {
        setSelectedAnswer(index);
        const isCorrect = index === quizzes[currentQuiz].answer;
        if (isCorrect) {
            setScore(score + 1);
        }
        setAnswers([...answers, isCorrect]);
    };

    const nextQuiz = () => {
        if (currentQuiz < quizzes.length - 1) {
            setCurrentQuiz(currentQuiz + 1);
            setSelectedAnswer(null);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuiz(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setAnswers([]);
    };

    const getResultMessage = () => {
        const percentage = (score / quizzes.length) * 100;
        if (percentage === 100) return { emoji: "🏆", message: "すごい！全問正解！きみはお金博士だ！" };
        if (percentage >= 80) return { emoji: "🎉", message: "よくできました！すごいね！" };
        if (percentage >= 60) return { emoji: "👍", message: "なかなかいいね！もう少しで完ぺき！" };
        if (percentage >= 40) return { emoji: "📚", message: "がんばったね！もう一度学んでみよう！" };
        return { emoji: "🌱", message: "これからもっと学んでいこう！" };
    };

    return (
        <div className="container-width px-4 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="w-24 h-24 mx-auto mb-4 relative">
                    <Image
                        src="/images/kids/quiz-trophy.png"
                        alt="クイズ"
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-pink-600">
                    クイズにチャレンジ！
                </h1>
                <p className="text-lg text-gray-600">
                    お金のことをどれくらい知っているかな？
                </p>
            </motion.div>

            {/* Progress Bar */}
            {!showResult && (
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>もんだい {currentQuiz + 1} / {quizzes.length}</span>
                        <span>正解: {score}問</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-pink-400 to-orange-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuiz + 1) / quizzes.length) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Quiz Card */}
            <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key={currentQuiz}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="bg-white rounded-3xl shadow-xl p-8 border-4 border-pink-200"
                        >
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
                                {quizzes[currentQuiz].question}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {quizzes[currentQuiz].options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={selectedAnswer === null ? { scale: 1.03 } : {}}
                                        whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                                        onClick={() => selectedAnswer === null && handleAnswer(index)}
                                        disabled={selectedAnswer !== null}
                                        className={`p-5 rounded-2xl text-lg font-medium text-left transition-all ${selectedAnswer === null
                                            ? "bg-gray-100 hover:bg-pink-100 cursor-pointer"
                                            : selectedAnswer === index
                                                ? index === quizzes[currentQuiz].answer
                                                    ? "bg-green-200 border-4 border-green-500"
                                                    : "bg-red-200 border-4 border-red-500"
                                                : index === quizzes[currentQuiz].answer
                                                    ? "bg-green-200 border-4 border-green-500"
                                                    : "bg-gray-100 opacity-50"
                                            }`}
                                    >
                                        <span className="mr-3">{["A", "B", "C", "D"][index]}.</span>
                                        {option}
                                    </motion.button>
                                ))}
                            </div>

                            {selectedAnswer !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-8"
                                >
                                    <div className={`p-5 rounded-2xl mb-6 ${selectedAnswer === quizzes[currentQuiz].answer
                                        ? "bg-green-100 border-2 border-green-400"
                                        : "bg-red-100 border-2 border-red-400"
                                        }`}>
                                        <p className="font-bold text-lg mb-2">
                                            {selectedAnswer === quizzes[currentQuiz].answer
                                                ? "🎉 せいかい！"
                                                : "😢 ざんねん..."}
                                        </p>
                                        <p className="text-gray-700">{quizzes[currentQuiz].explanation}</p>
                                    </div>
                                    <button
                                        onClick={nextQuiz}
                                        className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xl font-bold rounded-2xl hover:opacity-90 transition-opacity"
                                    >
                                        {currentQuiz < quizzes.length - 1 ? "つぎのもんだいへ →" : "けっかを見る 🏆"}
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl shadow-xl p-8 border-4 border-pink-200 text-center"
                        >
                            <div className="w-48 h-48 mx-auto mb-6 relative">
                                <Image
                                    src="/images/kids/quiz-trophy.png"
                                    alt="結果発表"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">クイズ終了！</h2>
                            <p className="text-2xl text-gray-700 mb-4">
                                {quizzes.length}問中 <span className="text-pink-600 font-bold text-4xl">{score}</span> 問 正解！
                            </p>
                            <p className="text-xl text-gray-600 mb-8">
                                {getResultMessage().message}
                            </p>

                            {/* Answer Summary */}
                            <div className="flex justify-center gap-2 mb-8">
                                {answers.map((correct, i) => (
                                    <div
                                        key={i}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${correct ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    >
                                        {correct ? "○" : "×"}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={resetQuiz}
                                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-lg font-bold rounded-full hover:opacity-90 transition-opacity"
                                >
                                    もう一度やる 🔄
                                </button>
                                <Link href="/kids/money">
                                    <button className="px-8 py-4 bg-white border-2 border-pink-400 text-pink-600 text-lg font-bold rounded-full hover:bg-pink-50 transition-colors">
                                        もっと学ぶ 📚
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
