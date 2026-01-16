import "../globals.css";
import Link from "next/link";

export default function KidsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-pink-50">
            {/* Kids Header */}
            <header className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
                <div className="container-width flex items-center justify-between">
                    <Link href="/kids" className="flex items-center gap-2">
                        <span className="text-2xl">🎓</span>
                        <span className="text-xl font-bold">キッズページ</span>
                    </Link>
                    <nav className="flex items-center gap-2 md:gap-4">
                        <Link
                            href="/kids"
                            className="px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                            トップ
                        </Link>
                        <Link
                            href="/kids/money"
                            className="px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                            お金のこと
                        </Link>
                        <Link
                            href="/kids/quiz"
                            className="px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                            クイズ
                        </Link>
                        <Link
                            href="/"
                            className="px-3 py-1.5 rounded-full text-sm bg-white/20 hover:bg-white/30 transition-colors"
                        >
                            おとなのページ
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Kids Footer */}
            <footer className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white py-6 px-4">
                <div className="container-width text-center">
                    <p className="text-lg font-bold mb-2">🎓 こどもNISA研究所 キッズページ</p>
                    <p className="text-sm opacity-80">
                        小学生のみんなが、お金のことを楽しく学べるページだよ！
                    </p>
                    <div className="mt-4 flex justify-center gap-4">
                        <Link href="/kids" className="text-sm hover:underline">トップ</Link>
                        <Link href="/kids/money" className="text-sm hover:underline">お金のこと</Link>
                        <Link href="/kids/quiz" className="text-sm hover:underline">クイズ</Link>
                        <Link href="/" className="text-sm hover:underline">おとなのページへ</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
