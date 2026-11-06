import { ArrowIcon } from "@/components/common/ui";

// アフィリエイト対応の証券会社バナー
// 実際のアフィリエイトリンクは後で設定
const brokerages = [
    {
        id: "sbi",
        name: "SBI証券",
        description: "投信積立の手数料が0円の大手ネット証券。Vポイントが貯まる",
        features: ["口座開設無料", "投信積立手数料0円", "Vポイントが貯まる"],
        highlight: "Vポイント",
        affiliateUrl: "https://www.sbisec.co.jp/ETGate/WPLETmgR001Control?OutSide=on&getFlg=on&burl=search_home&cat1=home&cat2=service&dir=service&file=home_sogoaccount_underage.html&msockid=10ea67d801336140323d71dd004b60dc",
    },
    {
        id: "rakuten",
        name: "楽天証券",
        description: "楽天ポイントで投資可能。楽天経済圏との相性◎",
        features: ["楽天ポイント投資", "投信積立手数料0円", "楽天銀行連携で金利UP"],
        highlight: "ポイント投資",
        affiliateUrl: "https://www.rakuten-sec.co.jp/web/under_age/?msockid=10ea67d801336140323d71dd004b60dc",
    },
    {
        id: "matsui",
        name: "松井証券",
        description: "老舗ネット証券。サポート体制が充実",
        features: ["投信残高ポイント還元", "電話サポート充実", "初心者向けツール"],
        highlight: "サポート充実",
        affiliateUrl: "https://www.matsui.co.jp/apply/under-age.html?_gl=1*14ke7u1*_gcl_au*MTAwNTYzOTkzOS4xNzY4Mzc2NTEz*_ga*MTc1NTg0ODQ1MC4xNzY4NTMxNjkx*_ga_15ZX54N556*czE3Njg1MzE2OTAkbzEkZzEkdDE3Njg1MzE3MjYkajI0JGwwJGgw",
    },
];

interface AffiliateBannerProps {
    variant?: "full" | "compact" | "sidebar";
}

export default function AffiliateBanner({ variant = "full" }: AffiliateBannerProps) {
    if (variant === "sidebar") {
        return (
            <div>
                <p className="flex items-center gap-2 mb-1">
                    <span className="chip chip-outline">PR</span>
                    <span className="font-serif font-semibold">おすすめ証券会社</span>
                </p>
                <div className="ledger mt-3">
                    {brokerages.slice(0, 2).map((broker) => (
                        <a
                            key={broker.id}
                            href={broker.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="block py-3 group"
                        >
                            <span className="flex items-center justify-between gap-2">
                                <span className="font-semibold text-[0.9375rem] group-hover:text-[var(--color-royal-blue-light)] group-hover:underline underline-offset-4">{broker.name}</span>
                                <span className="chip">{broker.highlight}</span>
                            </span>
                            <span className="block note mt-1">{broker.description}</span>
                        </a>
                    ))}
                </div>
                <p className="note mt-2">※PR・広告を含みます</p>
            </div>
        );
    }

    if (variant === "compact") {
        return (
            <div className="panel-tint p-4">
                <p className="note mb-1">PR</p>
                <p className="text-[0.9375rem] font-semibold mb-3">こどもNISAを始めるなら</p>
                <div className="flex gap-2 flex-wrap">
                    {brokerages.map((broker) => (
                        <a
                            key={broker.id}
                            href={broker.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="preset inline-flex items-center"
                        >
                            {broker.name}
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    // Full variant
    return (
        <section id="affiliate">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6 md:mb-8">
                <div>
                    <p className="note mb-2">PR・広告</p>
                    <h2 className="heading-section !text-[1.5rem] md:!text-[1.75rem]">こどもNISAを始めるなら</h2>
                </div>
                <p className="text-[0.9375rem] text-[var(--color-text-secondary)]">
                    2027年の制度開始に備えて、今から口座開設しておきましょう
                </p>
            </div>

            <div className="grid md:grid-cols-3 border-t border-[var(--color-line-strong)]">
                {brokerages.map((broker, index) => (
                    <a
                        key={broker.id}
                        href={broker.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className={`group flex flex-col py-6 border-b border-[var(--color-line)] md:border-b-0 md:px-7 ${index === 0 ? "md:pl-0" : "md:border-l"} ${index === brokerages.length - 1 ? "md:pr-0" : ""}`}
                    >
                        <span className="flex items-center justify-between gap-3">
                            <span className="font-serif text-[1.25rem] font-semibold">{broker.name}</span>
                            <span className="chip">{broker.highlight}</span>
                        </span>
                        <span className="block mt-2 text-[0.9375rem] text-[var(--color-text-secondary)]">{broker.description}</span>
                        <ul className="mt-3 mb-5 space-y-1 text-[0.875rem] text-[var(--color-text-secondary)]">
                            {broker.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2.5" aria-hidden="true">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <span className="link-arrow mt-auto group-hover:underline">
                            詳細を見る
                            <ArrowIcon />
                        </span>
                    </a>
                ))}
            </div>

            <p className="note mt-4">
                ※上記リンクはアフィリエイトリンクを含みます。口座開設・取引により当サイトが報酬を得る場合があります。
            </p>
        </section>
    );
}
