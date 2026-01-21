"use client";

import { motion, LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
    return (
        <LazyMotion features={domAnimation}>
            <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-[calc(var(--header-height)+var(--banner-height))]">
                {/* Aurora Background */}
                <div className="absolute inset-0 bg-[var(--color-bg)] overflow-hidden">
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-aurora opacity-30 bg-[conic-gradient(from_90deg_at_50%_50%,#FDFBF7_0%,#E0E7FF_50%,#D1FAE5_100%)] mix-blend-multiply blur-3xl" />
                    <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] animate-aurora-reverse opacity-30 bg-[conic-gradient(from_270deg_at_50%_50%,#E0E7FF_0%,#FDFBF7_50%,#D1FAE5_100%)] mix-blend-multiply blur-3xl" />
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-transparent rounded-full blur-[100px] animate-pulse-subtle" />
                <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-tl from-[var(--color-emerald)]/5 to-transparent rounded-full blur-[100px] animate-pulse-subtle" style={{ animationDelay: "1s" }} />

                <div className="container-width relative z-10 text-center px-4">
                    <m.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {/* Eyebrow */}
                        <m.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-[var(--color-emerald)] font-semibold tracking-wide mb-4 md:mb-6 text-sm md:text-base"
                        >
                            2027年スタート予定の新制度
                        </m.p>

                        {/* Main Heading */}
                        <h1 className="heading-hero mb-4 md:mb-8 max-w-4xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                            <span className="block text-[var(--color-text-primary)]">
                                こどもNISAで
                            </span>
                            <span className="block bg-gradient-to-r from-[var(--color-royal-blue)] to-[var(--color-emerald)] bg-clip-text text-transparent">
                                未来を設計する
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <m.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-body max-w-2xl mx-auto mb-8 md:mb-12 text-sm md:text-base px-4"
                        >
                            0〜17歳のお子様のための非課税投資制度。
                            <br className="hidden sm:block" />
                            年間60万円、最大600万円まで、運用益が非課税に。
                        </m.p>

                        {/* Quick Stats - Mobile Friendly */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="grid grid-cols-3 gap-2 md:gap-4 max-w-lg mx-auto mb-8 md:mb-12"
                        >
                            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-[var(--glass-border)]">
                                <p className="text-[var(--color-royal-blue)] font-bold text-xl md:text-2xl">60万</p>
                                <p className="text-[var(--color-text-muted)] text-xs">年間上限</p>
                            </div>
                            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-[var(--glass-border)]">
                                <p className="text-[var(--color-royal-blue)] font-bold text-xl md:text-2xl">600万</p>
                                <p className="text-[var(--color-text-muted)] text-xs">保有上限</p>
                            </div>
                            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-[var(--glass-border)]">
                                <p className="text-[var(--color-emerald)] font-bold text-xl md:text-2xl">非課税</p>
                                <p className="text-[var(--color-text-muted)] text-xs">運用益</p>
                            </div>
                        </m.div>

                        {/* CTA Buttons */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
                        >
                            <Link href="/simulator" className="w-full sm:w-auto">
                                <m.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto"
                                >
                                    シミュレーターを試す
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </m.button>
                            </Link>
                            <Link href="/guide" className="w-full sm:w-auto">
                                <m.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto"
                                >
                                    制度を詳しく知る
                                </m.button>
                            </Link>
                        </m.div>
                    </m.div>
                </div>

                {/* Scroll indicator - outside container for correct positioning */}
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:block z-10"
                >
                    <m.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]"
                    >
                        <span className="text-xs tracking-widest uppercase">Scroll</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                    </m.div>
                </m.div>
            </section>
        </LazyMotion>
    );
}
