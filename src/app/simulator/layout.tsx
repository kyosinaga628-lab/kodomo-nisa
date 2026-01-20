import { Metadata } from "next";

export const metadata: Metadata = {
    title: "シミュレーター",
    description: "こどもNISAシミュレーターで将来の資産を可視化。積立額と期間を設定して、お子様の18歳時点での資産額や非課税効果を試算できます。",
    alternates: {
        canonical: "/simulator",
    },
    openGraph: {
        title: "こどもNISA シミュレーター",
        description: "積立額と期間を設定して、お子様の18歳時点での資産額や非課税効果を試算できます。",
        url: "https://www.kodomo-nisa.jp/simulator",
        type: "website",
    },
};

export default function SimulatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
