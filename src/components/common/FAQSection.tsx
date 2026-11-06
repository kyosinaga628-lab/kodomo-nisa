"use client";

import { useState } from "react";
import { KODOMO_NISA_FAQ } from "@/lib/ai-optimization";
import { SectionHeading } from "@/components/common/ui";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="section section-rule bg-[var(--color-bg)]">
            <div className="container-width split">
                <SectionHeading
                    className="split-sticky"
                    kicker="Q&A"
                    title="よくある質問"
                    lead="こどもNISAに関するよくある質問をまとめました。"
                />

                <div className="ledger">
                    {KODOMO_NISA_FAQ.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={faq.question}>
                                <h3 className="font-sans">
                                    <button
                                        onClick={() => toggleQuestion(index)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-answer-${index}`}
                                        className="w-full flex items-start justify-between gap-5 py-4 md:py-5 text-left font-semibold text-[1rem] leading-relaxed hover:text-[var(--color-royal-blue)] transition-colors"
                                    >
                                        {faq.question}
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.75"
                                            aria-hidden="true"
                                            className="flex-shrink-0 mt-1 text-[var(--color-text-muted)]"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="M12 5v14" className={`origin-center transition-transform duration-200 ${isOpen ? "scale-y-0" : ""}`} />
                                        </svg>
                                    </button>
                                </h3>

                                <div id={`faq-answer-${index}`} className="collapsible" data-open={isOpen}>
                                    <div>
                                        <div className="pb-6 pr-8">
                                            <p className="text-[var(--color-text-secondary)] text-[0.9375rem]">{faq.answer}</p>

                                            {faq.technicalTerms && faq.technicalTerms.length > 0 && (
                                                <dl className="mt-4 panel-tint p-4">
                                                    {faq.technicalTerms.map((term) => (
                                                        <div key={term.term} className="text-xs leading-relaxed text-[var(--color-text-secondary)] [&+&]:mt-1.5">
                                                            <dt className="inline font-semibold text-[var(--color-text-primary)]">{term.term}：</dt>
                                                            <dd className="inline">{term.explanation}</dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            )}

                                            {faq.sources && faq.sources.length > 0 && (
                                                <p className="note mt-3">出典: {faq.sources.join("、")}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
