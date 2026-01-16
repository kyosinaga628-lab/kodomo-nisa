"use client";

import { motion } from "framer-motion";

export default function AuthorProfile() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12 md:my-16 container-width px-4"
        >
            <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-6 md:p-8 border border-[var(--glass-border)] flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {/* Avatar / Symbol */}
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[var(--color-royal-blue)] to-[var(--color-text-primary)] flex items-center justify-center shadow-lg">
                    <span className="font-serif text-2xl md:text-3xl font-bold text-white tracking-widest">
                        YN
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] font-serif">
                            吉永 (enepen)
                        </h3>
                        <span className="text-[var(--color-text-secondary)] text-sm md:text-base font-medium">
                            Policy Analyst / Energy Economist
                        </span>
                    </div>

                    <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-4">
                        国内大手シンクタンクにてエネルギー政策・経済分析に従事する現役の研究員。
                        マクロ経済予測の知見を活かし、次世代（子どもたち）のための資産形成と政策動向を個人的に研究・発信しています。
                        専門はエネルギー経済学、税制政策分析。
                    </p>

                    <div className="bg-[var(--color-bg)]/50 p-3 md:p-4 rounded-lg border border-[var(--glass-border)]">
                        <p className="text-[10px] md:text-xs text-[var(--color-text-muted)] leading-normal">
                            <strong>※免責事項：</strong><br />
                            本サイト「こどもNISA研究所」における情報は、研究員個人の調査・分析に基づく成果物であり、
                            著者が所属する組織・団体の公式見解とは一切関係ありません。
                            投資に関する最終的な決定は、ご自身の判断と責任において行われますようお願いいたします。
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
