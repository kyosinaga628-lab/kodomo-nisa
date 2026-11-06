import { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
    title: {
        default: "キッズ向けコンテンツ",
        template: "%s | こども（子供）NISA研究所",
    },
    description: "子どもでもわかる！お金と投資の学習コンテンツ。NISAやお金の基礎知識をわかりやすく解説。クイズで楽しく学べます。",
    alternates: {
        canonical: "/kids",
    },
    openGraph: {
        title: "キッズ向けコンテンツ | こどもNISA研究所",
        description: "子どもでもわかる！お金と投資の学習コンテンツ。クイズで楽しく学べます。",
        url: "https://www.kodomo-nisa.jp/kids",
        type: "website",
        images: [OG_IMAGE],
    },
};

export default function KidsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
