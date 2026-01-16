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

export default function InvestmentPage() {
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
                        src="/images/kids/icon-investment.png"
                        alt="投資のアイコン"
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-green-600">
                    <Ruby reading="ちょきん">貯金</Ruby>と<Ruby reading="とうし">投資</Ruby>のちがい
                </h1>
            </motion.div>

            {/* Main Content */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-16 bg-white rounded-3xl shadow-lg p-8 border-4 border-green-200"
            >
                <div className="space-y-6 text-lg text-gray-700">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 rounded-2xl p-6">
                            <h3 className="font-bold text-blue-700 mb-3 text-center">🏦 <Ruby reading="ちょきん">貯金</Ruby></h3>
                            <ul className="space-y-2">
                                <li>✅ 安全にお金をあずけておく</li>
                                <li>✅ いつでも引き出せる</li>
                                <li>❌ ほとんどふえない</li>
                            </ul>
                            <p className="mt-4 text-center text-2xl">💴 → 💴</p>
                            <p className="text-center text-sm text-gray-500">1万円は1万円のまま</p>
                        </div>
                        <div className="bg-green-50 rounded-2xl p-6">
                            <h3 className="font-bold text-green-700 mb-3 text-center">🌱 <Ruby reading="とうし">投資</Ruby></h3>
                            <ul className="space-y-2">
                                <li>✅ お金がふえる可能性がある</li>
                                <li>⚠️ へることもある</li>
                                <li>⏳ 長い時間がかかる</li>
                            </ul>
                            <p className="mt-4 text-center text-2xl">💴 → 💴💴</p>
                            <p className="text-center text-sm text-gray-500">1万円が2万円になるかも？</p>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-6">
                        <h3 className="font-bold text-green-700 mb-4"><Ruby reading="とうし">投資</Ruby>＝会社を<Ruby reading="おうえん">応援</Ruby>すること！</h3>
                        <p className="mb-4">
                            投資とは、がんばっている会社に「<strong>お金を使って応援する</strong>」こと。
                            応援した会社がうまくいくと、お礼としてお金がもらえるんだ。
                        </p>
                        <div className="bg-white rounded-xl p-4 border-2 border-green-300">
                            <p className="text-center">
                                📱 きみの好きなゲームを作っている会社も、<br />
                                みんなから応援（投資）されてゲームを作っているよ！
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6">
                        <h3 className="font-bold text-green-700 mb-4">🌳 投資は「木を育てること」ににている</h3>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-full md:w-1/2 h-64 relative">
                                <Image
                                    src="/images/kids/icon-investment.png"
                                    alt="投資は木を育てるようなもの"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="grid gap-4 text-center flex-1">
                                <div className="bg-white/80 rounded-xl p-3">
                                    <p className="font-bold text-green-800">1. タネをまく</p>
                                    <p className="text-sm text-gray-600">（お金を入れる）</p>
                                </div>
                                <div className="bg-white/80 rounded-xl p-3">
                                    <p className="font-bold text-green-800">2. 長い時間まつ</p>
                                    <p className="text-sm text-gray-600">（何年もかかる）</p>
                                </div>
                                <div className="bg-white/80 rounded-xl p-3">
                                    <p className="font-bold text-green-800">3. 大きくなる</p>
                                    <p className="text-sm text-gray-600">（お金がふえる）</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Navigation */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <Link href="/kids">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-200 text-gray-700 text-lg font-bold px-6 py-3 rounded-full shadow-md"
                    >
                        ← もどる
                    </motion.button>
                </Link>
                <Link href="/kids/nisa">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg"
                    >
                        NISAって何？ →
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
