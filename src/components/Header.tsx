"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthorityBadge from "@/components/common/AuthorityBadge";
import { LogoMark } from "@/components/common/ui";

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
            { href: "/fear-greed/", label: "Fear & Greed指数", description: "日本市場の投資家心理指標" },
        ],
    },
    {
        label: "学ぶ",
        items: [
            { href: "/guide", label: "こどもNISAとは", description: "制度の概要を解説" },
            { href: "/policy-curation", label: "記事・ガイド", description: "政策解説・おすすめ記事" },
            { href: "/kids", label: "キッズページ", description: "小学生向けの学習コンテンツ" },
            { href: "/about", label: "私たちについて", description: "サイトの紹介" },
        ],
    },
];

const navLinkClass =
    "px-3 py-2 text-[0.9375rem] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors";

// /fear-greed/ は Next のルートではない静的アプリなので通常のリンクにする
function NavLink({ href, ...props }: React.ComponentProps<"a"> & { href: string }) {
    return href.startsWith("/fear-greed") ? <a href={href} {...props} /> : <Link href={href} {...props} />;
}

export default function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpenDropdown(null);
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    // メニュー表示中は背面をスクロールさせない
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

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

    const closeMenus = () => {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
    };

    const isSolid = scrolled || mobileMenuOpen;

    return (
        <header
            className={`fixed top-[var(--banner-height)] left-0 right-0 z-40 border-b transition-colors duration-200 ${isSolid
                ? "bg-[var(--color-bg)] border-[var(--color-line)]"
                : "bg-transparent border-transparent"
                }`}
            style={{ height: "var(--header-height)" }}
        >
            <div className="container-width h-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5" onClick={closeMenus}>
                    <LogoMark />
                    <span className="font-serif font-semibold text-[1.125rem] md:text-[1.1875rem] tracking-[0.02em] text-[var(--color-text-primary)]">
                        こどもNISA研究所
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 whitespace-nowrap" aria-label="メインメニュー">
                    {navGroups.map((group) => (
                        <div
                            key={group.label}
                            className="relative"
                            onMouseEnter={() => handleMouseEnter(group.label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                aria-expanded={openDropdown === group.label}
                                aria-haspopup="true"
                                onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                                className={`${navLinkClass} flex items-center gap-1 ${openDropdown === group.label ? "!text-[var(--color-text-primary)]" : ""}`}
                            >
                                {group.label}
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                    className={`transition-transform duration-150 ${openDropdown === group.label ? "rotate-180" : ""}`}
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>

                            {openDropdown === group.label && (
                                <div className="absolute top-full left-0 pt-2">
                                    <div className="py-2 w-64 bg-[var(--color-surface)] rounded-lg shadow-[var(--shadow-lg)] border border-[var(--color-line)]">
                                        {group.items.map((item) => (
                                            <NavLink
                                                key={item.href}
                                                href={item.href}
                                                onClick={closeMenus}
                                                className="block px-4 py-2.5 hover:bg-[var(--color-bg)] transition-colors"
                                            >
                                                <span className="block text-[0.9375rem] font-medium leading-snug text-[var(--color-text-primary)]">
                                                    {item.label}
                                                </span>
                                                {item.description && (
                                                    <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">
                                                        {item.description}
                                                    </span>
                                                )}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <Link href="/contact" className={navLinkClass}>
                        お問い合わせ
                    </Link>

                    <Link href="/simulator" className="btn-primary btn-sm ml-2 lg:ml-3">
                        シミュレーター
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
                    aria-expanded={mobileMenuOpen}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    key={pathname}
                    className="md:hidden fixed inset-x-0 bottom-0 top-[calc(var(--banner-height)+var(--header-height))] bg-[var(--color-bg)] overflow-y-auto border-t border-[var(--color-line)]"
                >
                    <nav className="container-width py-5" aria-label="モバイルメニュー">
                        {navGroups.map((group) => (
                            <div key={group.label} className="mb-6">
                                <p className="note font-medium mb-1">{group.label}</p>
                                <div className="ledger">
                                    {group.items.map((item) => (
                                        <NavLink key={item.href} href={item.href} onClick={closeMenus} className="block py-3">
                                            <span className="block font-medium leading-snug">{item.label}</span>
                                            {item.description && (
                                                <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">{item.description}</span>
                                            )}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <Link href="/contact" onClick={closeMenus} className="block py-3 font-medium">
                            お問い合わせ
                        </Link>

                        <Link href="/simulator" onClick={closeMenus} className="btn-primary w-full mt-4">
                            シミュレーターを試す
                        </Link>

                        <div className="mt-6">
                            <AuthorityBadge />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
