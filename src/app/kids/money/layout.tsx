import { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
    title: "お金ってなに？",
    description: "お金の歴史や役割を、子どもにもわかる言葉で学べるページです。",
    alternates: {
        canonical: "/kids/money",
    },
    openGraph: {
        title: "お金ってなに？ | こどもNISA研究所",
        description: "お金の歴史や役割を、子どもにもわかる言葉で学べるページです。",
        url: "https://www.kodomo-nisa.jp/kids/money",
        type: "website",
        images: [OG_IMAGE],
    },
};

export default function KidsMoneyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
