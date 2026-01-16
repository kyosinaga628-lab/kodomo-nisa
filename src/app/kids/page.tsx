"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ルビ付きテキストコンポーネント
function Ruby({ children, reading }: { children: string; reading: string }) {
    return (
        <ruby className="ruby-text">
            {children}
            <rp>(</rp>
            <rt className="text-[0.5em] text-gray-500">{reading}</rt>
            <rp>)</rp>
        </ruby>
    );
}

const topics = [
    {
        href: "/kids/money",
        image: "/images/kids/icon-role.png",
        title: "お金ってなに？",
        description: "お金の歴史や役割を学ぼう",
        color: "yellow",
    },
    {
        href: "/kids/investment",
        image: "/images/kids/icon-investment.png",
        title: "貯金と投資のちがい",
        description: "お金を「育てる」ってどういうこと？",
        color: "green",
    },
    {
        href: "/kids/nisa",
        image: "/images/kids/icon-nisa.png",
        title: "NISAって何？",
        description: "国がつくったお得なしくみ",
        color: "blue",
    },
    {
        href: "/kids/quiz",
        image: "/images/kids/quiz-trophy.png",
        title: "クイズにチャレンジ！",
        description: "学んだことをクイズでたしかめよう",
        color: "pink",
    },
];

export default function KidsPage() {
    return (
        <div className="container-width px-4 py-8">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 flex flex-col items-center"
            >
                <div className="w-full max-w-2xl mb-6">
                    <Image
                        src="/images/kids/hero-main.png"
                        alt="子供たちとお金の未来"
                        width={800}
                        height={400}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent py-2">
                    お金のひみつを学ぼう！
                </h1>
                <p className="text-xl md:text-2xl text-gray-700">
                    <Ruby reading="しょうがくせい">小学生</Ruby>のみんなへ、<Ruby reading="とうし">投資</Ruby>のことをわかりやすく<Ruby reading="せつめい">説明</Ruby>するよ！
                </p>
            </motion.div>

            {/* Topic Cards */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-orange-600">
                    📚 すきなテーマをえらんでね
                </h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {topics.map((topic, index) => (
                        <Link key={topic.href} href={topic.href}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                className={`bg-white rounded-3xl shadow-xl p-6 border-4 cursor-pointer h-full transition-colors ${topic.color === "yellow" ? "border-yellow-300 hover:border-yellow-400" :
                                    topic.color === "green" ? "border-green-300 hover:border-green-400" :
                                        topic.color === "blue" ? "border-blue-300 hover:border-blue-400" :
                                            "border-pink-300 hover:border-pink-400"
                                    }`}
                            >
                                <div className="flex items-center gap-6 h-full">
                                    <div className="flex-shrink-0 w-24 h-24 relative">
                                        <Image
                                            src={topic.image}
                                            alt={topic.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className={`text-2xl font-bold mb-2 ${topic.color === "yellow" ? "text-yellow-600" :
                                            topic.color === "green" ? "text-green-600" :
                                                topic.color === "blue" ? "text-blue-600" :
                                                    "text-pink-600"
                                            }`}>
                                            {topic.title}
                                        </h3>
                                        <p className="text-gray-600 text-lg">{topic.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.section>

            {/* Interactive Section */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-600">
                    🌟 やってみよう！
                </h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* 調べてみよう */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border-4 border-purple-200 flex flex-col items-center text-center h-full">
                        <div className="mb-4 w-28 h-28 relative">
                            <Image src="/images/kids/icon-search.png" alt="調べてみよう" fill className="object-contain" />
                        </div>
                        <h3 className="text-xl font-bold text-purple-600 mb-4">
                            調べてみよう！
                        </h3>
                        <ul className="space-y-2 text-gray-700 w-full text-left">
                            <li className="bg-purple-50 rounded-xl p-3 text-sm">
                                📱 すきなゲームを作っている会社は？
                            </li>
                            <li className="bg-purple-50 rounded-xl p-3 text-sm">
                                🏪 近くのお店は何という会社？
                            </li>
                        </ul>
                    </div>

                    {/* 考えてみよう - 画像がないため、icon-historyなどで代用または思考を表すアイコンを追加検討。ここではクイズトロフィーなどで一時的に代用せず、会話アイコンを使って「話し合う」系にするか...。icon-searchとicon-talkがあるので、icon-historyを使います（過去から学ぶ的な）。 */}
                    {/* 今回はicon-historyを使ってみます */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border-4 border-cyan-200 flex flex-col items-center text-center h-full">
                        <div className="mb-4 w-28 h-28 relative">
                            <Image src="/images/kids/icon-history.png" alt="考えてみよう" fill className="object-contain" />
                        </div>
                        <h3 className="text-xl font-bold text-cyan-600 mb-4">
                            考えてみよう！
                        </h3>
                        <ul className="space-y-2 text-gray-700 w-full text-left">
                            <li className="bg-cyan-50 rounded-xl p-3 text-sm">
                                💰 <Ruby reading="ちょきん">貯金</Ruby>と<Ruby reading="とうし">投資</Ruby>のちがいは？
                            </li>
                            <li className="bg-cyan-50 rounded-xl p-3 text-sm">
                                🤔 なぜ国はNISAを作ったの？
                            </li>
                        </ul>
                    </div>

                    {/* おうちの人と話そう */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border-4 border-rose-200 flex flex-col items-center text-center h-full">
                        <div className="mb-4 w-28 h-28 relative">
                            <Image src="/images/kids/icon-talk.png" alt="おうちの人と話そう" fill className="object-contain" />
                        </div>
                        <h3 className="text-xl font-bold text-rose-600 mb-4">
                            おうちの人と話そう！
                        </h3>
                        <ul className="space-y-2 text-gray-700 w-full text-left">
                            <li className="bg-rose-50 rounded-xl p-3 text-sm">
                                「うちでNISAやってる？」
                            </li>
                            <li className="bg-rose-50 rounded-xl p-3 text-sm">
                                「わたしのお金ってある？」
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.section>

            {/* Parent Note */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="bg-gray-100 rounded-2xl p-6 max-w-2xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        👨‍👩‍👧 保護者の方へ
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                        このページは小学校高学年（4〜6年生）のお子様が金融リテラシーの基礎を学ぶことを目的としています。
                        総合学習の時間や、おうちの方との会話のきっかけにお役立てください。
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:underline text-sm"
                    >
                        詳しい制度解説やシミュレーターはこちら →
                    </Link>
                </div>
            </motion.section>
        </div>
    );
}
