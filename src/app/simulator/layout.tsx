import { Metadata } from "next";

export const metadata: Metadata = {
    title: "こども（子供）NISAシミュレーション：何歳でいくら貯まる？",
    description: "子供（子ども/こども）NISA計算シミュレーター。0歳〜17歳のお子様の積立額と年齢を入力するだけで、18歳時点の資産額・非課税効果を即座に試算。2027年開始予定の新制度対応。",
    alternates: {
        canonical: "/simulator",
    },
    openGraph: {
        title: "こども（子供）NISAシミュレーション：何歳でいくら貯まる？",
        description: "子供（子ども/こども）NISA計算シミュレーター。積立額と年齢を入力するだけで18歳時点の資産額を即座に試算。",
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
