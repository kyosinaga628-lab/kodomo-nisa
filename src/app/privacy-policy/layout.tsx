import { Metadata } from "next";

export const metadata: Metadata = {
    title: "プライバシーポリシー",
    description: "こどもNISA研究所のプライバシーポリシー。個人情報の取り扱いについて説明します。",
    alternates: {
        canonical: "/privacy-policy",
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
