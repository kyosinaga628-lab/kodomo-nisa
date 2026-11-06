import { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
    title: "利用規約",
    description: "こどもNISA研究所の利用規約。当サイトをご利用いただく際の規約について説明します。",
    alternates: {
        canonical: "/terms",
    },
    openGraph: {
        title: "利用規約 | こどもNISA研究所",
        description: "こどもNISA研究所の利用規約。",
        url: "https://www.kodomo-nisa.jp/terms",
        type: "website",
        images: [OG_IMAGE],
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
