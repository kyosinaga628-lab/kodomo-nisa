"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/common/ui";

export default function AlertBanner() {
    const [isVisible, setIsVisible] = useState(true);

    const close = () => {
        // ヘッダーやページ上余白は --banner-height を参照しているので、ここで一括して詰める
        document.documentElement.style.setProperty("--banner-height", "0px");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-royal-blue-dark)] text-white"
            style={{ height: "var(--banner-height)" }}
        >
            <div className="container-width h-full flex items-center justify-between gap-3">
                <Link
                    href="/policy-curation/kodomo-nisa-2026-november-update"
                    className="flex-1 min-w-0 flex items-center md:justify-center gap-2 text-[0.8125rem] leading-none hover:underline underline-offset-2"
                >
                    <span className="truncate">
                        <span className="hidden sm:inline">こどもNISAの事前受付が各社で実施中（2027年1月口座開設）— </span>
                        <span className="sm:hidden">事前受付を実施中 — </span>
                        <span className="opacity-80">各社キャンペーンと年内の準備をチェック</span>
                    </span>
                    <span className="flex-shrink-0">
                        <ArrowIcon size={14} />
                    </span>
                </Link>
                <button
                    onClick={close}
                    className="-mr-2 w-8 h-8 flex-shrink-0 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    aria-label="バナーを閉じる"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
