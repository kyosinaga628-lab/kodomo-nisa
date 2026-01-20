import { Metadata } from "next";

export const metadata: Metadata = {
    title: "政策キュレーション",
    description: "こどもNISAに関する最新の政策動向、税制改正情報、専門家の見解をキュレーション。2026年度税制改正大綱の解説など、信頼できる情報源からの情報をお届けします。",
    alternates: {
        canonical: "/policy-curation",
    },
    openGraph: {
        title: "政策キュレーション | こどもNISA研究所",
        description: "こどもNISAに関する最新の政策動向、税制改正情報をキュレーション。",
        url: "https://www.kodomo-nisa.jp/policy-curation",
        type: "website",
    },
};

export default function PolicyCurationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
