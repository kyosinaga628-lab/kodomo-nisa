import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AlertBanner from "@/components/AlertBanner";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import ConditionalLayout from "@/components/ConditionalLayout";
import { generateOrganizationSchema } from "@/lib/seo";

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

const BASE_URL = "https://www.kodomo-nisa.jp";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "こども（子供）NISA研究所 | 子どもの未来のための資産形成シミュレーター",
    template: "%s | こども（子供）NISA研究所",
  },
  description: "こども（子供）NISA制度を徹底解説。シミュレーターで将来の資産を可視化し、お子様（お子さま）の18歳時点での資産額を試算。2027年開始予定の新制度に向けた資産形成をサポートします。",
  keywords: ["こどもNISA", "子供NISA", "子どもNISA", "NISA", "資産形成", "子育て", "教育資金", "投資", "シミュレーション", "税制優遇", "2027年", "非課税投資"],
  authors: [{ name: "こどもNISA研究所 編集部" }],
  creator: "こどもNISA研究所",
  publisher: "こどもNISA研究所",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "こども（子供）NISA研究所 | 子どもの未来のための資産形成シミュレーター",
    description: "2027年開始予定のこども（子供）NISA制度を徹底解説。シミュレーターで0歳〜17歳のお子様の将来資産を可視化。何歳でいくら貯まる？",
    url: BASE_URL,
    siteName: "こどもNISA研究所",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "こどもNISA研究所 - 子どもの未来のための資産形成",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "こども（子供）NISA研究所 | 子どもの未来のための資産形成シミュレーター",
    description: "2027年開始予定のこども（子供）NISA制度を徹底解説。シミュレーターで将来の資産を可視化。何歳でいくら貯まる？",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console verification (add your verification code)
    // google: "your-google-verification-code",
  },
};

// Organization Schema for JSON-LD
const organizationSchema = generateOrganizationSchema();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Organization Schema for site-wide SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
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

