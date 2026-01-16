"use client";

import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
    header: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode;
}

export default function ConditionalLayout({ header, footer, children }: ConditionalLayoutProps) {
    const pathname = usePathname();
    const isKidsPage = pathname?.startsWith("/kids");

    if (isKidsPage) {
        // キッズページでは独自のヘッダー・フッターを使用（kids/layout.tsxで定義）
        return <>{children}</>;
    }

    return (
        <>
            {header}
            <main>{children}</main>
            {footer}
        </>
    );
}
