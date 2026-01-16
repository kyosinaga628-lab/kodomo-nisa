import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AlertBanner from "@/components/AlertBanner";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import ConditionalLayout from "@/components/ConditionalLayout";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "こどもNISA研究所 | 子どもの未来のための資産形成",
  description: "こどもNISA制度を徹底解説。シミュレーターで将来の資産を可視化し、政策動向をキュレーション。お子様の未来のための資産形成をサポートします。",
  keywords: ["こどもNISA", "NISA", "資産形成", "子育て", "教育資金", "投資", "税制優遇"],
  openGraph: {
    title: "こどもNISA研究所",
    description: "子どもの未来のための資産形成をサポート",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} antialiased`}
      >
        <ScrollToTop />
        <ConditionalLayout
          header={<><AlertBanner /><Header /></>}
          footer={<Footer />}
        >
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}

