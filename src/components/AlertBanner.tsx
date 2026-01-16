"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AlertBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[var(--color-royal-blue)] to-[var(--color-royal-blue-light)]"
                style={{ height: "var(--banner-height)" }}
            >
                <div className="container-width h-full flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 justify-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-emerald)] text-white">
                            NEW
                        </span>
                        <p className="text-white text-sm font-medium">
                            <span className="hidden sm:inline">2026年度税制改正大綱発表 - </span>
                            <span className="font-normal opacity-90">こどもNISA制度の最新情報をチェック</span>
                        </p>
                        <motion.a
                            href="/policy-curation"
                            whileHover={{ x: 3 }}
                            className="text-white text-sm font-semibold underline underline-offset-2 hover:no-underline flex items-center gap-1"
                        >
                            詳しく見る
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsVisible(false)}
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                        aria-label="バナーを閉じる"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </motion.button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
