"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

// SSRでは useLayoutEffect が警告を出すため、クライアントサイドでのみ使用
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ScrollToTop() {
    const pathname = usePathname();

    useIsomorphicLayoutEffect(() => {
        // ページ遷移時にトップにスクロール（より確実に）
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        // 念のため少し遅延させて再度スクロール（レンダリング完了後）
        const timeoutId = setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
}
