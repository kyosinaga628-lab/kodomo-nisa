import { Metadata } from "next";

export const metadata: Metadata = {
    title: "利用規約",
    description: "こどもNISA研究所の利用規約。当サイトをご利用いただく際の規約について説明します。",
    alternates: {
        canonical: "/terms",
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
