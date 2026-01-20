import { Metadata } from "next";

export const metadata: Metadata = {
    title: "このサイトについて",
    description: "こどもNISA研究所について。大手シンクタンク出身の政策専門家が主宰する、子どもの資産形成に特化した情報サイトです。信頼性・わかりやすさ・寄り添いを大切にしています。",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "このサイトについて | こどもNISA研究所",
        description: "大手シンクタンク出身の政策専門家が主宰。子どもの資産形成に関する信頼できる情報を提供。",
        url: "https://www.kodomo-nisa.jp/about",
        type: "website",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
