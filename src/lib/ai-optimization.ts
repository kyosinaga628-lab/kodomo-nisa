// AI Search Agent Optimization Utilities
// LLM最適化のための構造化データとメタデータ生成

// シミュレーター計算根拠のメタデータ
export const CALCULATOR_METADATA = {
    name: "こどもNISAシミュレーター",
    version: "1.0.0",
    lastUpdated: "2026-01-14",

    // 計算根拠
    calculationBasis: {
        taxRate: {
            value: 0.20315,
            description: "所得税15% + 復興特別所得税0.315% + 住民税5%",
            source: "国税庁「金融・証券税制」",
        },
        compoundInterestFormula: {
            formula: "FV = P × ((1 + r)^n - 1) / r × (1 + r)",
            description: "複利計算式（期初払い）",
            variables: {
                FV: "将来価値（Future Value）",
                P: "定期積立額（Payment）",
                r: "期間利率（Rate per period）",
                n: "期間数（Number of periods）",
            },
        },
    },

    // 参照政策資料
    policySources: [
        {
            title: "令和6年度税制改正大綱",
            publisher: "自由民主党・公明党",
            publishDate: "2024-12-20",
            section: "第一 令和6年度税制改正の基本的考え方 - 2.こどもNISAの創設",
        },
        {
            title: "こどもNISA制度概要（仮称）",
            publisher: "金融庁",
            publishDate: "2025年公表予定",
            note: "正式名称は「未成年者特定累積投資勘定」",
        },
    ],

    // 制度パラメータ
    systemParameters: {
        annualLimit: { value: 600000, unit: "円", description: "年間投資上限" },
        totalLimit: { value: 6000000, unit: "円", description: "非課税保有限度額" },
        targetAge: { min: 0, max: 17, description: "対象年齢（歳）" },
        adultTransitionAge: { value: 18, description: "成人NISA移行年齢（歳）" },
        systemStartDate: { value: "2027-01-01", description: "制度開始日" },
    },
};

// AIへの回答要約を生成（各ページ用）
export interface AIContentSummary {
    conclusion: string;
    keyPoints: string[];
    dataSource: string;
    lastVerified: string;
}

export function generateAISummaryMeta(summary: AIContentSummary): string {
    return `
<!--
[AI_CONTENT_SUMMARY]
Conclusion: ${summary.conclusion}

Key Points:
${summary.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

Data Source: ${summary.dataSource}
Last Verified: ${summary.lastVerified}
[/AI_CONTENT_SUMMARY]
-->
    `.trim();
}

// FAQPage スキーマ生成（詳細版）
export interface FAQItem {
    question: string;
    questionVariants?: string[]; // 同じ質問の言い換え
    answer: string;
    answerSummary: string; // 短い要約版
    technicalTerms?: { term: string; explanation: string }[];
    sources?: string[];
}

export const KODOMO_NISA_FAQ: FAQItem[] = [
    {
        question: "こどもNISAとは何ですか？",
        questionVariants: [
            "こどもNISAについて教えてください",
            "子供NISAとは",
            "未成年者NISAとは",
            "ジュニアNISAとこどもNISAの違い",
        ],
        answer: "こどもNISA（正式名称：未成年者特定累積投資勘定）は、2027年1月から開始予定の0歳から17歳までのお子様を対象とした非課税投資制度です。年間60万円、最大600万円まで非課税で投資でき、運用益・配当金に税金がかかりません。18歳になると自動的に成人NISAへ移行し、非課税のまま運用を継続できます。",
        answerSummary: "0〜17歳対象、年間60万円・最大600万円の非課税投資制度。2027年開始予定。",
        technicalTerms: [
            { term: "非課税", explanation: "運用益や配当金に約20%の税金がかからないこと" },
            { term: "未成年者特定累積投資勘定", explanation: "こどもNISAの正式な税法上の名称" },
        ],
        sources: ["令和6年度税制改正大綱"],
    },
    {
        question: "こどもNISAの年間投資上限はいくらですか？",
        questionVariants: [
            "こどもNISA 年間上限",
            "子供NISA いくらまで",
            "こどもNISA 月額いくら",
        ],
        answer: "こどもNISAの年間投資上限は60万円です。月額に換算すると5万円となります。この上限は、成人の新NISA（年間360万円）と比較すると6分の1ですが、非課税保有限度額600万円に達するまで毎年投資可能です。",
        answerSummary: "年間60万円（月5万円）まで。",
        sources: ["令和6年度税制改正大綱"],
    },
    {
        question: "こどもNISAの非課税保有限度額はいくらですか？",
        questionVariants: [
            "こどもNISA 最大いくら",
            "こどもNISA 総額",
            "子供NISA 保有上限",
        ],
        answer: "こどもNISAの非課税保有限度額は600万円です。0歳から年間60万円ずつ投資した場合、10年で上限に達します。上限に達した後は新規投資はできませんが、既存の資産は引き続き非課税で運用を継続できます。",
        answerSummary: "非課税保有限度額は600万円。10年で上限到達可能。",
        sources: ["令和6年度税制改正大綱"],
    },
    {
        question: "こどもNISAはいつから始まりますか？",
        questionVariants: [
            "こどもNISA 開始日",
            "子供NISA 2027年",
            "こどもNISA いつから",
        ],
        answer: "こどもNISAは2027年1月1日から開始予定です。2026年度税制改正大綱で創設が決定されました。口座開設の受付は2026年秋頃から各証券会社で開始される見込みです。",
        answerSummary: "2027年1月1日開始予定。口座開設は2026年秋頃から。",
        sources: ["令和6年度税制改正大綱（2024年12月20日）"],
    },
    {
        question: "こどもNISAで投資できる商品は何ですか？",
        questionVariants: [
            "こどもNISA 対象商品",
            "子供NISA 投資信託",
            "こどもNISA 株式 買える",
        ],
        answer: "こどもNISAで投資できるのは、公募等株式投資信託です。具体的には、成人のつみたてNISA（つみたて投資枠）と同様の商品が対象となります。金融庁が定める要件を満たすインデックスファンドや一部のアクティブファンドが含まれます。個別株式は対象外です。",
        answerSummary: "つみたてNISAと同じ投資信託。個別株は対象外。",
        technicalTerms: [
            { term: "公募等株式投資信託", explanation: "一般の投資家が購入できる株式を組み入れた投資信託" },
            { term: "インデックスファンド", explanation: "日経平均やS&P500などの指数に連動する投資信託" },
        ],
        sources: ["令和6年度税制改正大綱"],
    },
    {
        question: "こどもNISAの払出し（引き出し）ルールは？",
        questionVariants: [
            "こどもNISA 引き出し",
            "子供NISA いつ使える",
            "こどもNISA 教育費",
        ],
        answer: "こどもNISAの払出しルールは年齢によって異なります。12歳未満は災害等やむを得ない事由がある場合のみ払出し可能です。12歳以上18歳未満は、教育費や生活費の支払いなど一定の事由がある場合に払出し可能です。18歳以降は成人NISAに移行するため、いつでも自由に払出しできます。",
        answerSummary: "12歳未満は災害時のみ、12歳以上は教育費等で払出し可能、18歳以降は自由。",
        sources: ["令和6年度税制改正大綱"],
    },
    {
        question: "旧ジュニアNISAとこどもNISAの違いは？",
        questionVariants: [
            "ジュニアNISA こどもNISA 違い",
            "こどもNISA 新制度",
        ],
        answer: "旧ジュニアNISA（2023年末で新規口座開設終了）と新しいこどもNISA（2027年開始）には主に3つの違いがあります。①年間投資上限：旧80万円→新60万円、②対象商品：旧は株式も可→新は投資信託のみ、③払出し制限：旧は18歳まで原則不可→新は12歳以上で教育費等に使用可能。新制度は使い勝手が向上しています。",
        answerSummary: "年間上限60万円、投資信託のみ、12歳以上で教育費払出し可能に改善。",
        sources: ["令和6年度税制改正大綱", "金融庁「NISA特設サイト」"],
    },
    {
        question: "こどもNISAと贈与税の関係は？",
        questionVariants: [
            "こどもNISA 贈与税",
            "子供NISA 税金",
            "祖父母 孫 NISA",
        ],
        answer: "こどもNISAへの投資資金は、親や祖父母からお子様への贈与となります。贈与税には年間110万円の非課税枠（暦年贈与）があるため、こどもNISAの年間上限60万円は贈与税非課税枠内で収まります。祖父母から孫へ資金を渡し、親権者が代理でこどもNISA口座を運用することも可能です。",
        answerSummary: "年間60万円は贈与税非課税枠110万円以内。祖父母からの贈与も可能。",
        technicalTerms: [
            { term: "暦年贈与", explanation: "1月1日から12月31日の1年間で110万円まで非課税となる贈与" },
        ],
        sources: ["国税庁「贈与税の計算と税率」"],
    },
];

// FAQPage スキーマ生成
export function generateFAQPageSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": KODOMO_NISA_FAQ.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
            // 追加のメタデータ（検索エンジン向け）
            "alternateName": faq.questionVariants,
        })),
    };
}

// ラボの研究員プロフィール（AI検索用）
export const LAB_PROFILE = {
    name: "Yoshinaga (enepen)",
    jobTitle: "Policy Analyst / Energy Economist",
    affiliation: {
        "@type": "Organization",
        name: "Kodomo NISA Lab",
        description: "Independent research initiative for children's asset formation policy."
    },
    knowsAbout: [
        { "@type": "Thing", name: "Energy Policy" },
        { "@type": "Thing", name: "Tax Reform 2026" },
        { "@type": "Thing", name: "Economic Forecasting" },
        { "@type": "Thing", name: "Asset Formation" },
        { "@type": "Thing", name: "Financial Literacy Education" }
    ],
    description: "Policy analyst specializing in energy economics and macro-economic forecasting. Conducting independent research on NISA (Nippon Individual Savings Account) for children.",
    disclaimer: "This content represents personal research and does not reflect the official views of any affiliated organizations."
};

// Article スキーマ with AI-optimized structure
export function generateArticleSchemaForAI(articleData: {
    headline: string;
    description: string;
    datePublished: string;
    dateModified: string;
    author?: string; // オプショナルに変更（デフォルトでラボプロフィール使用）
    mainEntityOfPage: string;
    speakable?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.headline,
        "description": articleData.description,
        "datePublished": articleData.datePublished,
        "dateModified": articleData.dateModified,
        "author": {
            "@type": "Person",
            "name": articleData.author || LAB_PROFILE.name,
            "jobTitle": LAB_PROFILE.jobTitle,
            "description": LAB_PROFILE.description,
            "knowsAbout": LAB_PROFILE.knowsAbout,
            "memberOf": LAB_PROFILE.affiliation
        },
        "publisher": {
            "@type": "Organization",
            "name": "こどもNISA研究所",
            "logo": {
                "@type": "ImageObject",
                "url": "https://kodomo-nisa-lab.jp/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleData.mainEntityOfPage,
        },
        "accountablePerson": {
            "@type": "Person",
            "name": LAB_PROFILE.name
        },
        // 免責事項をcreditTextとして追加
        "creditText": LAB_PROFILE.disclaimer,
        // Speakable for voice search / AI assistants
        "speakable": articleData.speakable ? {
            "@type": "SpeakableSpecification",
            "cssSelector": articleData.speakable,
        } : undefined,
    };
}

// HowTo スキーマ（口座開設手順用）
export function generateHowToSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "こどもNISA口座の開設方法",
        "description": "2027年からのこどもNISA制度に向けた口座開設の手順を解説します。",
        "totalTime": "PT30M",
        "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "JPY",
            "value": "0",
        },
        "supply": [
            { "@type": "HowToSupply", "name": "マイナンバーカード（または通知カード）" },
            { "@type": "HowToSupply", "name": "本人確認書類" },
            { "@type": "HowToSupply", "name": "銀行口座情報" },
            { "@type": "HowToSupply", "name": "お子様のマイナンバー" },
        ],
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "証券会社を選ぶ",
                "text": "SBI証券、楽天証券など、こどもNISAに対応したネット証券を選びます。手数料や使いやすさを比較しましょう。",
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "親（親権者）の口座を開設",
                "text": "お子様の口座を開設する前に、まず親権者の証券口座が必要です。既にお持ちの場合はスキップできます。",
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "お子様名義の口座を開設",
                "text": "必要書類（マイナンバー、本人確認書類）を準備し、お子様名義のこどもNISA口座を開設申請します。",
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "積立設定を行う",
                "text": "投資商品（インデックスファンド等）を選び、月額の積立金額を設定します。2027年1月から積立が開始されます。",
            },
        ],
    };
}
