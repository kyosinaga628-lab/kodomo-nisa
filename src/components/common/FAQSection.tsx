"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KODOMO_NISA_FAQ } from "@/lib/ai-optimization";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 md:py-24 bg-[var(--color-bg)]">
            <div className="container-width px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-12"
                >
                    <p className="text-[var(--color-emerald)] font-semibold tracking-wide mb-2 md:mb-4 text-sm md:text-base">
                        FREQUENTLY ASKED QUESTIONS
                    </p>
                    <h2 className="heading-section text-2xl md:text-4xl mb-4">
                        よくある質問
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-sm md:text-base">
                        こどもNISAに関するよくある質問をまとめました。
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
                    {KODOMO_NISA_FAQ.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="card-base overflow-hidden"
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-[var(--color-bg-secondary)] transition-colors"
                            >
                                <h3 className="font-semibold text-[var(--color-text-primary)] text-sm md:text-base pr-4">
                                    {faq.question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </motion.div>
                            </button>

                            {/* Answer */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-4 md:px-6 pb-4 md:pb-6">
                                            <div className="pt-2 border-t border-[var(--glass-border)]">
                                                <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mt-4">
                                                    {faq.answer}
                                                </p>

                                                {/* Technical Terms */}
                                                {faq.technicalTerms && faq.technicalTerms.length > 0 && (
                                                    <div className="mt-4 p-3 bg-[var(--color-bg-secondary)] rounded-lg">
                                                        <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-2">用語解説</p>
                                                        <div className="space-y-1">
                                                            {faq.technicalTerms.map((term, i) => (
                                                                <p key={i} className="text-xs text-[var(--color-text-secondary)]">
                                                                    <span className="font-medium text-[var(--color-royal-blue)]">{term.term}</span>: {term.explanation}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Sources */}
                                                {faq.sources && faq.sources.length > 0 && (
                                                    <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                                                        出典: {faq.sources.join("、")}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Structured Data Hint */}
                <div className="hidden">
                    {/* This helps AI agents understand the FAQ structure */}
                    <div itemScope itemType="https://schema.org/FAQPage">
                        {KODOMO_NISA_FAQ.map((faq, index) => (
                            <div key={index} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                                <h3 itemProp="name">{faq.question}</h3>
                                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                    <p itemProp="text">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
