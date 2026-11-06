import type { ReactNode } from "react";

// サイト共通の小さな部品

export function ArrowIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

export function ExternalIcon({ size = 14 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
        </svg>
    );
}

// 積み上がる 18 年を表すロゴマーク
export function LogoMark({ size = 30, inverse = false }: { size?: number; inverse?: boolean }) {
    return (
        <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
            <rect width="30" height="30" rx="4" fill={inverse ? "#FAF9F5" : "var(--color-royal-blue)"} />
            <g fill={inverse ? "var(--color-royal-blue-dark)" : "#FAF9F5"}>
                <rect x="7" y="18" width="3.5" height="5" />
                <rect x="13.25" y="13" width="3.5" height="10" />
            </g>
            <rect x="19.5" y="7" width="3.5" height="16" fill="#D9694F" />
        </svg>
    );
}

interface PageHeaderProps {
    kicker: string;
    title: ReactNode;
    lead?: ReactNode;
    children?: ReactNode;
}

// 下層ページ共通の見出し（左揃え + 罫線）
export function PageHeader({ kicker, title, lead, children }: PageHeaderProps) {
    return (
        <header className="pb-8 md:pb-12 mb-10 md:mb-16 border-b border-[var(--color-line-strong)]">
            <p className="kicker mb-4">{kicker}</p>
            <h1 className="heading-section md:text-[2.625rem] mb-4">{title}</h1>
            {lead && <p className="lead max-w-[42rem]">{lead}</p>}
            {children}
        </header>
    );
}

interface SectionHeadingProps {
    kicker?: string;
    title: ReactNode;
    lead?: ReactNode;
    className?: string;
}

export function SectionHeading({ kicker, title, lead, className = "" }: SectionHeadingProps) {
    return (
        <div className={className}>
            {kicker && <p className="kicker mb-3">{kicker}</p>}
            <h2 className="heading-section">{title}</h2>
            {lead && <p className="mt-4 text-[var(--color-text-secondary)] max-w-[36rem]">{lead}</p>}
        </div>
    );
}

interface FactProps {
    value: ReactNode;
    label: string;
    tone?: "default" | "gain";
}

// 数字 + ラベルの基本単位
export function Fact({ value, label, tone = "default" }: FactProps) {
    return (
        <div>
            <p className={`figure text-[1.75rem] md:text-[2.125rem] ${tone === "gain" ? "text-[var(--color-emerald)]" : "text-[var(--color-text-primary)]"}`}>
                {value}
            </p>
            <p className="note mt-1.5">{label}</p>
        </div>
    );
}
