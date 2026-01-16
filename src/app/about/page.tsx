"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SITE_AUTHOR } from "@/lib/seo";
import AffiliateBanner from "@/components/common/AffiliateBanner";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-[calc(var(--header-height)+var(--banner-height)+1rem)] md:pt-[calc(var(--header-height)+var(--banner-height)+3rem)] pb-24">
            <div className="container-width px-4">
                {/* Hero */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-20"
                >
                    <p className="text-[var(--color-emerald)] font-semibold tracking-wide mb-2 md:mb-4 text-sm md:text-base">
                        ABOUT THIS SITE
                    </p>
                    <h1 className="heading-section mb-4 md:mb-6 text-2xl md:text-4xl">
                        このサイトについて
                    </h1>
                    <p className="text-body max-w-2xl mx-auto text-sm md:text-base">
                        こどもNISA研究所は、2027年から始まる
                        <br className="hidden sm:block" />
                        子どものための非課税投資制度を解説する情報サイトです。
                    </p>
                </motion.header>

                {/* About Section */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-24"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                        {/* Image */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[var(--color-royal-blue)]/20 to-[var(--color-emerald)]/20 flex items-center justify-center">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[var(--color-royal-blue)]/10 flex items-center justify-center">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="1" className="md:w-16 md:h-16">
                                            <circle cx="12" cy="8" r="4" />
                                            <path d="M20 21a8 8 0 10-16 0" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute -inset-3 md:-inset-4 rounded-2xl md:rounded-3xl border-2 border-[var(--color-royal-blue)]/10" />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="text-center md:text-left">
                            <h2 className="font-serif text-xl md:text-2xl font-semibold mb-4">主宰者プロフィール</h2>
                            <div className="space-y-3 text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed">
                                <p>{SITE_AUTHOR.bio}</p>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                                {SITE_AUTHOR.expertise.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full text-xs md:text-sm bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Mission */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-24"
                >
                    <div className="card-base p-8 md:p-16 text-center bg-gradient-to-br from-[var(--color-royal-blue)]/5 to-transparent">
                        <h2 className="editorial-caption mb-2 md:mb-4 text-xs md:text-sm">OUR MISSION</h2>
                        <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-[var(--color-text-primary)] max-w-3xl mx-auto">
                            「複雑な制度を、シンプルに。
                            <br />
                            <span className="text-[var(--color-royal-blue)]">確かな知識で、子どもの未来を育む。</span>」
                        </p>
                    </div>
                </motion.section>

                {/* Values */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-24"
                >
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="editorial-caption mb-2 md:mb-4 text-xs md:text-sm">OUR VALUES</h2>
                        <h3 className="font-serif text-2xl md:text-3xl font-semibold">私たちが大切にすること</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                        {[
                            {
                                icon: (
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                ),
                                title: "信頼性",
                                description: "政策資料や公式データに基づいた、信頼できる情報提供を心がけます。",
                            },
                            {
                                icon: (
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 16v-4M12 8h.01" />
                                    </svg>
                                ),
                                title: "わかりやすさ",
                                description: "複雑な制度や税制を、誰にでも理解できるよう丁寧に解説します。",
                            },
                            {
                                icon: (
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                    </svg>
                                ),
                                title: "寄り添い",
                                description: "親として、同じ立場で資産形成の悩みや疑問に寄り添います。",
                            },
                        ].map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="card-base p-6 md:p-8 text-center"
                            >
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[var(--color-royal-blue)]/10 text-[var(--color-royal-blue)] flex items-center justify-center mx-auto mb-4 md:mb-6">
                                    {value.icon}
                                </div>
                                <h4 className="font-serif text-lg md:text-xl font-semibold mb-2 md:mb-3">{value.title}</h4>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* CTA Links */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-24"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <Link
                            href="/guide"
                            className="card-base p-6 md:p-8 hover:border-[var(--color-royal-blue)]/30 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-royal-blue)]/10 flex items-center justify-center text-[var(--color-royal-blue)]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-royal-blue)] transition-colors">
                                        こどもNISAとは →
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-muted)]">
                                        制度の概要を詳しく解説
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/contact"
                            className="card-base p-6 md:p-8 hover:border-[var(--color-emerald)]/30 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-emerald)]/10 flex items-center justify-center text-[var(--color-emerald)]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <path d="M22 6l-10 7L2 6" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-emerald)] transition-colors">
                                        お問い合わせ →
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-muted)]">
                                        ご質問・ご相談はこちら
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </motion.section>

                {/* Affiliate Banner */}
                <div className="mb-12 md:mb-24">
                    <AffiliateBanner />
                </div>
            </div>
        </div>
    );
}
