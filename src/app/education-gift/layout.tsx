import { Metadata } from "next";

export const metadata: Metadata = {
    title: "教育資金ギフト",
    description: "こどもNISAシミュレーション結果と親御さんのメッセージをPDFにまとめ、お子様の18歳の誕生日にプレゼントできる教育資金ギフト資料を作成。",
    alternates: {
        canonical: "/education-gift",
    },
    openGraph: {
        title: "教育資金ギフト | こどもNISA研究所",
        description: "シミュレーション結果とメッセージをPDFにまとめてプレゼント。",
        url: "https://www.kodomo-nisa.jp/education-gift",
        type: "website",
    },
};

export default function EducationGiftLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
