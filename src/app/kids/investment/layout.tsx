import { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
    title: "貯金と投資のちがい",
    description: "貯金と投資のちがいと、お金を「育てる」しくみを、子どもにもわかる言葉で学べるページです。",
    alternates: {
        canonical: "/kids/investment",
    },
    openGraph: {
        title: "貯金と投資のちがい | こどもNISA研究所",
        description: "貯金と投資のちがいと、お金を「育てる」しくみを、子どもにもわかる言葉で学べるページです。",
        url: "https://www.kodomo-nisa.jp/kids/investment",
        type: "website",
        images: [OG_IMAGE],
    },
};

export default function KidsInvestmentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
