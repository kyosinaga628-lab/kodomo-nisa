import { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
    title: "NISAって何？",
    description: "国がつくったお得なしくみ、NISAについて、子どもにもわかる言葉で学べるページです。",
    alternates: {
        canonical: "/kids/nisa",
    },
    openGraph: {
        title: "NISAって何？ | こどもNISA研究所",
        description: "国がつくったお得なしくみ、NISAについて、子どもにもわかる言葉で学べるページです。",
        url: "https://www.kodomo-nisa.jp/kids/nisa",
        type: "website",
        images: [OG_IMAGE],
    },
};

export default function KidsNisaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
