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

export default function MoneyPage() {
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
                        src="/images/kids/icon-role.png"
                        alt="お金のアイコン"
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-yellow-600">
                    お金のことを学ぼう！
                </h1>
            </motion.div>

            {/* Section 1: お金ってなに？ */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-16 bg-white rounded-3xl shadow-lg p-8 border-4 border-yellow-200"
            >
                <h2 className="text-2xl font-bold text-yellow-600 mb-6 flex items-center gap-3">
                    <span className="w-12 h-12 relative flex-shrink-0">
                        <Image src="/images/kids/icon-role.png" alt="" fill className="object-contain" />
                    </span>
                    お金ってなに？
                </h2>

                <div className="space-y-6 text-lg text-gray-700">
                    <div className="bg-yellow-50 rounded-2xl p-6">
                        <h3 className="font-bold text-yellow-700 mb-3">むかし、お金はなかった！</h3>
                        <p>
                            むかしむかし、お金がなかったころ、人びとは「<Ruby reading="ぶつぶつこうかん">物々交換</Ruby>」をしていたんだ。
                            たとえば、お魚をもっている人と、お米をもっている人が、<strong>おたがいの持っているものを交換</strong>していたよ。
                        </p>
                        <div className="mt-4 w-full h-40 relative">
                            <Image
                                src="/images/kids/icon-history.png"
                                alt="物々交換のイラスト"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-6">
                        <h3 className="font-bold text-yellow-700 mb-3">でも、こまることがあった...</h3>
                        <p className="mb-3">
                            「魚がほしいけど、相手は野菜がほしいって言ってる...」<br />
                            「お米と交換するには、魚は何匹必要？」
                        </p>
                        <p>
                            こんな<strong>こまったこと</strong>があったから、みんなが「これには価値がある」と<Ruby reading="しん">信</Ruby>じるものが必要になったんだ。それが<strong>お金</strong>！
                        </p>
                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-6">
                        <h3 className="font-bold text-yellow-700 mb-4">お金の3つの<Ruby reading="やくわり">役割</Ruby></h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center bg-white rounded-xl p-4 border-2 border-yellow-300">
                                <span className="text-3xl">🛒</span>
                                <p className="font-bold mt-2">買う</p>
                                <p className="text-sm text-gray-600">ほしいものと交換できる</p>
                            </div>
                            <div className="text-center bg-white rounded-xl p-4 border-2 border-yellow-300">
                                <span className="text-3xl">🏦</span>
                                <p className="font-bold mt-2">ためる</p>
                                <p className="text-sm text-gray-600">将来のためにとっておける</p>
                            </div>
                            <div className="text-center bg-white rounded-xl p-4 border-2 border-yellow-300">
                                <span className="text-3xl">📏</span>
                                <p className="font-bold mt-2">はかる</p>
                                <p className="text-sm text-gray-600">ものの<Ruby reading="ねだん">値段</Ruby>がわかる</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Section 2: 投資とは */}
            <motion.section
                id="investment"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-16 bg-white rounded-3xl shadow-lg p-8 border-4 border-green-200 scroll-mt-36"
            >
                <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-3">
                    <span className="w-12 h-12 relative flex-shrink-0">
                        <Image src="/images/kids/icon-investment.png" alt="" fill className="object-contain" />
                    </span>
                    <Ruby reading="ちょきん">貯金</Ruby>と<Ruby reading="とうし">投資</Ruby>のちがい
                </h2>

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

            {/* Section 3: NISA */}
            <motion.section
                id="nisa"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-16 bg-white rounded-3xl shadow-lg p-8 border-4 border-blue-200 scroll-mt-36"
            >
                <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-3">
                    <span className="w-12 h-12 relative flex-shrink-0">
                        <Image src="/images/kids/icon-nisa.png" alt="" fill className="object-contain" />
                    </span>
                    NISAって何？
                </h2>

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
                        <p className="text-center font-bold text-blue-700 mb-2">
                            おうちの人がきみのために投資をして、<br />
                            大人になったら自分で使えるよ！
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Next Step */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
            >
                <Link href="/kids/quiz">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-pink-400 to-orange-400 text-white text-xl font-bold px-8 py-4 rounded-full shadow-lg"
                    >
                        🎯 クイズでたしかめよう！ →
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
