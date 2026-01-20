import { Metadata } from "next";

export const metadata: Metadata = {
    title: "こどもNISAとは",
    description: "2027年から始まるこどもNISA（未成年者特定累積投資勘定）の制度概要を詳しく解説。年間60万円・最大600万円の非課税投資、払出しルール、対象商品などをわかりやすく説明します。",
    alternates: {
        canonical: "/guide",
    },
    openGraph: {
        title: "こどもNISAとは | 制度の概要を詳しく解説",
        description: "2027年開始予定のこどもNISA制度を詳しく解説。年間60万円・最大600万円の非課税投資の仕組みを説明。",
        url: "https://www.kodomo-nisa.jp/guide",
        type: "article",
    },
};

export default function GuideLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
