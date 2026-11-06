import { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
    title: "クイズにチャレンジ！",
    description: "お金や投資、NISAについて学んだことを、クイズでたしかめられるページです。",
    alternates: {
        canonical: "/kids/quiz",
    },
    openGraph: {
        title: "クイズにチャレンジ！ | こどもNISA研究所",
        description: "お金や投資、NISAについて学んだことを、クイズでたしかめられるページです。",
        url: "https://www.kodomo-nisa.jp/kids/quiz",
        type: "website",
        images: [OG_IMAGE],
    },
};

export default function KidsQuizLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
