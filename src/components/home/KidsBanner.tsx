"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function KidsBanner() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-8"
        >
            <Link href="/kids">
                <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl p-6 md:p-8 text-white cursor-pointer shadow-lg"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <div className="text-5xl md:text-6xl">🎓</div>
                        <div className="text-center md:text-left flex-1">
                            <p className="text-white/80 text-sm mb-1">小学生のみんなへ</p>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                キッズページであそぼう！
                            </h3>
                            <p className="text-white/90 text-sm md:text-base">
                                クイズや「調べてみよう」で、お金のひみつを楽しく学べるよ 🌟
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                            <span className="font-bold">学ぶ</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
