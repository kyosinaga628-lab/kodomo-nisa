import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        サービス: [
            { href: "/simulator", label: "シミュレーター" },
            { href: "/policy-curation", label: "政策キュレーション" },
            { href: "/education-gift", label: "金融教育ギフト" },
        ],
        情報: [
            { href: "/about", label: "私たちについて" },
            { href: "/privacy-policy", label: "プライバシーポリシー" },
            { href: "/terms", label: "利用規約" },
        ],
        リソース: [
            { href: "https://www.fsa.go.jp/", label: "金融庁" },
            { href: "https://www.nta.go.jp/", label: "国税庁" },
        ],
    };

    return (
        <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--glass-border)]">
            <div className="container-width py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-4">
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
                            <span className="font-serif font-bold text-xl">こどもNISA研究所</span>
                        </Link>
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                            子どもの未来のための資産形成を、
                            <br />
                            確かな知識でサポートします。
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm uppercase tracking-wider">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-royal-blue)] text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-[var(--color-text-muted)] text-xs mb-1">
                            本サイトは個人の研究成果であり、所属組織の公式見解とは一切関係ありません。
                        </p>
                        <p className="text-[var(--color-text-muted)] text-sm">
                            © {currentYear} こどもNISA研究所. All rights reserved.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[var(--color-text-muted)] text-xs">
                            ※当サイトは投資助言を行うものではありません
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
