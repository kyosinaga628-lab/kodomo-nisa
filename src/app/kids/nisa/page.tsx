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

export default function NisaPage() {
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
                        src="/images/kids/icon-nisa.png"
                        alt="NISAのアイコン"
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600">
                    NISAって何？
                </h1>
            </motion.div>

            {/* Main Content */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-16 bg-white rounded-3xl shadow-lg p-8 border-4 border-blue-200"
            >
                <div className="space-y-6 text-lg text-gray-700">
                    <div className="bg-blue-50 rounded-2xl p-6">
                        <h3 className="font-bold text-blue-700 mb-3">国がつくった「お<Ruby reading="とく">得</Ruby>」なしくみ</h3>
                        <p className="mb-4">
                            ふつう、投資でお金がふえると「<Ruby reading="ぜいきん">税金</Ruby>」というものがかかるんだ。
                            でも、<strong>NISAをつかうと税金がかからない</strong>よ！
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-4 border-2 border-red-200 text-center">
                                <p className="text-sm text-red-600 mb-1">ふつうの投資</p>
                                <p className="text-lg">ふえたお金の<strong className="text-red-600">約20%</strong>を国にはらう</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 border-2 border-green-300 text-center">
                                <p className="text-sm text-green-600 mb-1">NISA</p>
                                <p className="text-lg"><strong className="text-green-600">税金ゼロ！</strong></p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-6">
                        <h3 className="font-bold text-blue-700 mb-3">こどもNISAって？</h3>
                        <p className="mb-4">
                            2027年から始まる、<strong>子どものための</strong>NISAだよ！<br />
                            0さいから17さいまでの子どもが使えるんだ。
                        </p>
                        <div className="bg-white rounded-xl p-4 border-2 border-blue-300">
                            <p className="text-center font-bold text-blue-700 mb-2">
                                おうちの人がきみのために投資をして、<br />
                                大人になったら自分で使えるよ！
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6">
                        <h3 className="font-bold text-blue-700 mb-4">📊 かんたんな例で考えてみよう</h3>
                        <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
                            <p className="mb-3">
                                もし100万円が200万円になったら...
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 text-center">
                                <div className="bg-red-50 rounded-lg p-3">
                                    <p className="text-sm text-red-600 font-bold">ふつうの投資</p>
                                    <p>ふえた100万円のうち</p>
                                    <p className="text-2xl font-bold text-red-600">約20万円</p>
                                    <p>を国にはらう</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-3">
                                    <p className="text-sm text-green-600 font-bold">NISA</p>
                                    <p>ふえた100万円は</p>
                                    <p className="text-2xl font-bold text-green-600">ぜんぶ自分のもの！</p>
                                    <p>税金ゼロ</p>
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
                <Link href="/kids/quiz">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-pink-400 to-orange-400 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg"
                    >
                        🎯 クイズにチャレンジ！ →
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
