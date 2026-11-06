import { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
    title: "プライバシーポリシー",
    description: "こどもNISA研究所のプライバシーポリシー。個人情報の取り扱いについて説明します。",
    alternates: {
        canonical: "/privacy-policy",
    },
    openGraph: {
        title: "プライバシーポリシー | こどもNISA研究所",
        description: "こどもNISA研究所のプライバシーポリシー。",
        url: "https://www.kodomo-nisa.jp/privacy-policy",
        type: "website",
        images: [OG_IMAGE],
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
