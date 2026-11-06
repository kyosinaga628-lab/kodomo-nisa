import Link from "next/link";
import { ExternalIcon, LogoMark } from "@/components/common/ui";
import { SITE_INFO } from "@/lib/seo";

const footerLinks = [
    {
        title: "ツール",
        links: [
            { href: "/simulator", label: "シミュレーター" },
            { href: "/education-gift", label: "金融教育ギフト" },
            { href: "/fear-greed/", label: "Fear & Greed指数" },
        ],
    },
    {
        title: "学ぶ",
        links: [
            { href: "/guide", label: "こどもNISAとは" },
            { href: "/policy-curation", label: "記事・ガイド" },
            { href: "/kids", label: "キッズページ" },
        ],
    },
    {
        title: "サイト情報",
        links: [
            { href: "/about", label: "私たちについて" },
            { href: "/contact", label: "お問い合わせ" },
            { href: "/privacy-policy", label: "プライバシーポリシー" },
            { href: "/terms", label: "利用規約" },
        ],
    },
    {
        title: "公的機関",
        links: [
            { href: "https://www.fsa.go.jp/", label: "金融庁", external: true },
            { href: "https://www.nta.go.jp/", label: "国税庁", external: true },
        ],
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-royal-blue-dark)] text-white/70">
            <div className="container-width py-14 md:py-20">
                <div className="grid grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(4,minmax(0,1fr))] gap-x-8 gap-y-10">
                    <div className="col-span-2 lg:col-span-1 lg:pr-10">
                        <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                            <LogoMark inverse />
                            <span className="font-serif font-semibold text-[1.1875rem] text-white">こどもNISA研究所</span>
                        </Link>
                        <p className="text-[0.875rem] leading-relaxed">
                            子どもの未来のための資産形成を、確かな知識でサポートします。
                        </p>
                        <p className="text-xs mt-3 text-white/60">{SITE_INFO.tagline}</p>
                    </div>

                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h2 className="font-sans text-xs font-medium tracking-[0.06em] text-white/60 mb-3">
                                {group.title}
                            </h2>
                            <ul className="space-y-2">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        {"external" in link ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-[0.875rem] text-white/85 hover:text-white hover:underline underline-offset-4"
                                            >
                                                {link.label}
                                                <ExternalIcon size={12} />
                                            </a>
                                        ) : link.href.startsWith("/fear-greed") ? (
                                            // 静的アプリなので Link（プリフェッチ）を使わない
                                            <a
                                                href={link.href}
                                                className="text-[0.875rem] text-white/85 hover:text-white hover:underline underline-offset-4"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-[0.875rem] text-white/85 hover:text-white hover:underline underline-offset-4"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-6 border-t border-white/15 flex flex-col md:flex-row md:justify-between gap-3 text-xs text-white/60">
                    <div>
                        <p>本サイトは個人の研究成果であり、所属組織の公式見解とは一切関係ありません。</p>
                        <p>※当サイトは投資助言を行うものではありません</p>
                    </div>
                    <p className="flex-shrink-0">© {currentYear} こどもNISA研究所. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
