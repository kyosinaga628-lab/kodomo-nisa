"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-16 md:py-32 bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg)]">
            <div className="container-width px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-[var(--color-emerald)] to-[var(--color-emerald-dark)] p-8 md:p-12 lg:p-20 text-center"
                >
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-60 md:w-80 h-60 md:h-80 bg-white/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-[var(--color-royal-blue)]/20 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-white heading-section mb-4 md:mb-6 text-2xl md:text-4xl"
                        >
                            お子様の未来を、
                            <br />
                            今日から設計しませんか？
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-white text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto"
                        >
                            シミュレーターで、18年後の資産を可視化。
                            <br className="hidden md:block" />
                            あなたの投資計画をサポートします。
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link href="/simulator">
                                <motion.button
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2 md:gap-3 bg-white text-[var(--color-emerald-dark)] font-bold text-base md:text-lg px-6 md:px-10 py-3 md:py-5 rounded-xl shadow-xl hover:shadow-2xl transition-shadow"
                                >
                                    シミュレーションを開始
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="md:w-6 md:h-6">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </Link>
                            <Link href="/kids">
                                <motion.button
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-5 rounded-xl shadow-xl hover:shadow-2xl transition-shadow"
                                >
                                    🎓 キッズページ
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
