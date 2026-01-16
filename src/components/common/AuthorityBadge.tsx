"use client";

import { motion } from "framer-motion";
import { SITE_INFO } from "@/lib/seo";

export default function AuthorityBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-royal-blue)]/10 to-[var(--color-emerald)]/10 rounded-full border border-[var(--color-royal-blue)]/20"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-royal-blue)" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
            <span className="text-xs font-medium text-[var(--color-royal-blue)]">
                {SITE_INFO.tagline}
            </span>
        </motion.div>
    );
}
