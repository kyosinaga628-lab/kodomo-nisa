"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AuthorityBadge from "@/components/common/AuthorityBadge";

interface NavGroup {
    label: string;
    items: { href: string; label: string; description?: string }[];
}

const navGroups: NavGroup[] = [
    {
        label: "ツール",
        items: [
            { href: "/simulator", label: "シミュレーター", description: "積立シミュレーション" },
            { href: "/education-gift", label: "金融教育ギフト", description: "お子様への資料作成" },
        ],
    },
    {
        label: "学ぶ",
        items: [
            { href: "/guide", label: "こどもNISAとは", description: "制度の概要を解説" },
            { href: "/policy-curation", label: "記事・ガイド", description: "政策解説・おすすめ記事" },
            { href: "/kids", label: "🎓 キッズページ", description: "小学生向けの学習コンテンツ" },
            { href: "/about", label: "私たちについて", description: "サイトの紹介" },
        ],
    },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMouseEnter = (label: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setOpenDropdown(label);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    return (
        <header
            className={`fixed top-[var(--banner-height)] left-0 right-0 z-40 transition-all duration-500 ease-smooth ${scrolled
                ? "glass-effect shadow-md"
                : "bg-transparent"
                }`}
            style={{
                height: "var(--header-height)",
                background: scrolled ? "var(--glass-bg)" : "transparent",
                backdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
                borderBottom: scrolled ? "1px solid var(--glass-border)" : "none",
            }}
        >
            <div className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay noise-bg"></div>
            <div className="container-width h-full flex items-center justify-between relative z-10">
                {/* Logo + Authority Badge */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-royal-blue)] to-[var(--color-emerald)] flex items-center justify-center">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="text-white"
                                >
                                    <path
                                        d="M12 2L2 7L12 12L22 7L12 2Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2 17L12 22L22 17"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2 12L12 17L22 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="font-serif font-bold text-xl tracking-tight text-[var(--color-text-primary)]">
                                こどもNISA研究所
                            </span>
                        </motion.div>
                    </Link>
                    <div className="hidden lg:block">
                        <AuthorityBadge />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 lg:gap-2 whitespace-nowrap">
                    {/* Home Link */}
                    <Link
                        href="/"
                        className="px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-royal-blue)]/5 transition-all duration-300"
                    >
                        ホーム
                    </Link>

                    {/* Dropdown Menus */}
                    {navGroups.map((group) => (
                        <div
                            key={group.label}
                            className="relative"
                            onMouseEnter={() => handleMouseEnter(group.label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className={`flex items-center gap-1 px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${openDropdown === group.label
                                    ? "text-[var(--color-text-primary)] bg-[var(--color-royal-blue)]/5"
                                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                                    }`}
                            >
                                {group.label}
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={`transition-transform duration-200 ${openDropdown === group.label ? "rotate-180" : ""
                                        }`}
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {openDropdown === group.label && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-0 mt-2 py-2 w-56 bg-white rounded-xl shadow-xl border border-[var(--glass-border)] overflow-hidden"
                                    >
                                        {group.items.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="block px-4 py-3 hover:bg-[var(--color-bg-secondary)] transition-colors"
                                            >
                                                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                                                    {item.label}
                                                </p>
                                                {item.description && (
                                                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {/* Contact Link */}
                    <Link
                        href="/contact"
                        className="px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-royal-blue)]/5 transition-all duration-300"
                    >
                        お問い合わせ
                    </Link>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-2 ml-1 lg:ml-2">
                        <Link href="/kids">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center h-10 px-3 lg:px-4 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 shadow-md cursor-pointer"
                                title="キッズページへ"
                            >
                                <span className="text-white font-bold text-sm tracking-wide">キッズ</span>
                            </motion.div>
                        </Link>
                        <Link href="/simulator">
                            <motion.span
                                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px -5px rgba(30, 58, 138, 0.2)" }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary py-2.5 px-4 lg:px-6 text-sm inline-block whitespace-nowrap"
                            >
                                シミュレーション開始
                            </motion.span>
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="メニューを開く"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        {mobileMenuOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-effect border-t border-[var(--glass-border)]"
                    >
                        <nav className="container-width py-4 flex flex-col gap-1">
                            {/* Home */}
                            <Link
                                href="/"
                                className="px-4 py-3 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] font-medium transition-all"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                ホーム
                            </Link>

                            {/* Groups */}
                            {navGroups.map((group) => (
                                <div key={group.label} className="py-2">
                                    <p className="px-4 py-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                                        {group.label}
                                    </p>
                                    {group.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="px-4 py-3 pl-6 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] font-medium transition-all block"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                            {item.description && (
                                                <span className="text-xs text-[var(--color-text-muted)] ml-2">
                                                    {item.description}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            ))}

                            {/* Contact */}
                            <Link
                                href="/contact"
                                className="px-4 py-3 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] font-medium transition-all"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                お問い合わせ
                            </Link>

                            {/* CTA */}
                            <div className="flex gap-2 mt-3 px-4">
                                <Link
                                    href="/kids"
                                    className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white font-bold py-3 rounded-xl text-center shadow-md flex items-center justify-center gap-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-xl">🎓</span> キッズ
                                </Link>
                                <Link
                                    href="/simulator"
                                    className="flex-[2] btn-primary py-3 text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    シミュレーション
                                </Link>
                            </div>

                            {/* Authority Badge */}
                            <div className="mt-4 pt-4 border-t border-[var(--glass-border)] flex justify-center">
                                <AuthorityBadge />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
