import { Metadata } from "next";

export const metadata: Metadata = {
    title: "お問い合わせ",
    description: "こどもNISA研究所へのお問い合わせフォーム。ご質問やご相談、サイトへのご意見などをお送りください。",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "お問い合わせ | こどもNISA研究所",
        description: "こどもNISA研究所へのお問い合わせ。ご質問やご相談をお送りください。",
        url: "https://www.kodomo-nisa.jp/contact",
        type: "website",
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
