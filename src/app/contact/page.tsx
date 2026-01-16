"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/common/ContactForm";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-[calc(var(--header-height)+var(--banner-height)+1rem)] md:pt-[calc(var(--header-height)+var(--banner-height)+3rem)] pb-24">
            <div className="container-width px-4 max-w-2xl">
                {/* Hero */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <p className="text-[var(--color-emerald)] font-semibold tracking-wide mb-2 md:mb-4 text-sm md:text-base">
                        CONTACT
                    </p>
                    <h1 className="heading-section mb-4 md:mb-6 text-2xl md:text-4xl">
                        お問い合わせ
                    </h1>
                    <p className="text-body max-w-lg mx-auto text-sm md:text-base">
                        ご質問、取材のご依頼、コラボレーションのご提案など、
                        お気軽にお問い合わせください。
                    </p>
                </motion.header>

                {/* Contact Form */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
                    <div className="card-base p-6 md:p-10">
                        <ContactForm />
                    </div>
                </motion.section>

                {/* Additional Info */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-8"
                >
                    <div className="text-center text-sm text-[var(--color-text-muted)]">
                        <p className="mb-4">
                            通常、2〜3営業日以内にご返信いたします。
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <div className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                    <path d="M22 4L12 14.01l-3-3" />
                                </svg>
                                <span>無料相談</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <span>個人情報保護</span>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
