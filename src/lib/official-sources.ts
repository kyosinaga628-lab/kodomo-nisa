// 官公庁一次資料データベース
// Official Government Sources Database

export interface OfficialSource {
    id: string;
    title: string;
    publisher: string;
    publisherType: 'government' | 'ministry' | 'agency' | 'party' | 'international';
    publishDate: string;
    url?: string;
    pdfUrl?: string;
    description: string;
    relevantSections?: string[];
    lastVerified: string;
    category: 'policy' | 'statistics' | 'guideline' | 'report' | 'legislation';
}

// 官公庁一次資料リスト
export const OFFICIAL_SOURCES: OfficialSource[] = [
    // === 税制改正関連（令和8年度） ===
    {
        id: 'tax-reform-fy2026',
        title: '令和8年度税制改正の大綱',
        publisher: '財務省',
        publisherType: 'ministry',
        publishDate: '2025-12-26',
        url: 'https://www.mof.go.jp/tax_policy/tax_reform/outline/index.html',
        pdfUrl: 'https://www.mof.go.jp/tax_policy/tax_reform/outline/fy2026/20251226taikou.pdf',
        description: '閣議決定された令和8年度税制改正大綱。こどもNISA制度の詳細規定を含む',
        relevantSections: [
            'こどもNISA（未成年者特定累積投資勘定）の創設',
            '年間投資上限60万円、非課税保有限度額600万円',
        ],
        lastVerified: '2026-01-15',
        category: 'policy',
    },
    {
        id: 'tax-reform-fy2026-summary',
        title: '令和8年度税制改正の大綱の概要',
        publisher: '財務省',
        publisherType: 'ministry',
        publishDate: '2025-12-26',
        pdfUrl: 'https://www.mof.go.jp/tax_policy/tax_reform/outline/fy2026/08taikou_gaiyou.pdf',
        description: '税制改正大綱の概要版。こどもNISA制度のポイントをわかりやすくまとめた資料',
        lastVerified: '2026-01-15',
        category: 'policy',
    },

    // === 金融庁資料 ===
    {
        id: 'fsa-nisa-overview',
        title: 'NISA特設ウェブサイト',
        publisher: '金融庁',
        publisherType: 'agency',
        publishDate: '2024-01-01',
        url: 'https://www.fsa.go.jp/policy/nisa2/index.html',
        description: 'NISA制度の公式解説サイト。制度概要、対象商品、口座開設方法を掲載',
        lastVerified: '2026-01-15',
        category: 'guideline',
    },
    {
        id: 'fsa-fund-list',
        title: 'つみたてNISA対象商品届出一覧',
        publisher: '金融庁',
        publisherType: 'agency',
        publishDate: '2025-12-01',
        url: 'https://www.fsa.go.jp/policy/nisa2/about/tsumitate/target/index.html',
        description: 'つみたてNISA（こどもNISAも同様）の対象投資信託リスト',
        relevantSections: [
            '公募等株式投資信託一覧',
            'インデックスファンド',
            'アクティブファンド',
        ],
        lastVerified: '2026-01-15',
        category: 'guideline',
    },

    // === 国税庁資料 ===
    {
        id: 'nta-securities-tax',
        title: '金融・証券税制',
        publisher: '国税庁',
        publisherType: 'agency',
        publishDate: '2025-04-01',
        url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1463.htm',
        description: '株式等の譲渡所得・配当所得の税率（20.315%）の根拠資料',
        relevantSections: [
            '上場株式等に係る譲渡所得等の税率',
            '所得税15% + 復興特別所得税0.315% + 住民税5%',
        ],
        lastVerified: '2026-01-15',
        category: 'legislation',
    },
    {
        id: 'nta-gift-tax',
        title: '贈与税の計算と税率',
        publisher: '国税庁',
        publisherType: 'agency',
        publishDate: '2025-04-01',
        url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/zoyo/4408.htm',
        description: '贈与税の基礎控除110万円の根拠資料',
        relevantSections: [
            '暦年課税の基礎控除額：110万円',
        ],
        lastVerified: '2026-01-15',
        category: 'legislation',
    },

    // === 統計資料 ===
    {
        id: 'gpif-returns',
        title: '年金積立金の運用実績',
        publisher: '年金積立金管理運用独立行政法人（GPIF）',
        publisherType: 'agency',
        publishDate: '2025-07-01',
        url: 'https://www.gpif.go.jp/operation/results.html',
        description: '世界最大級の機関投資家の長期運用実績。分散投資の参考データ',
        relevantSections: [
            '2001年度以降の収益率',
            '年率平均約3.99%（2001-2024年度）',
        ],
        lastVerified: '2026-01-15',
        category: 'statistics',
    },
    {
        id: 'boj-statistics',
        title: '金融経済統計月報',
        publisher: '日本銀行',
        publisherType: 'agency',
        publishDate: '2025-12-01',
        url: 'https://www.boj.or.jp/statistics/pub/sk/index.htm/',
        description: '金利・為替・株価等の金融統計データ',
        lastVerified: '2026-01-15',
        category: 'statistics',
    },

    // === 国際比較 ===
    {
        id: 'oecd-financial-education',
        title: 'OECD/INFE Policy Handbook on Financial Education for Young People',
        publisher: 'OECD',
        publisherType: 'international',
        publishDate: '2024-03-01',
        url: 'https://www.oecd.org/financial/education/',
        description: '若年層向け金融教育の国際的ガイドライン',
        lastVerified: '2026-01-15',
        category: 'report',
    },
];

// カテゴリ別のソース取得
export function getSourcesByCategory(category: OfficialSource['category']): OfficialSource[] {
    return OFFICIAL_SOURCES.filter(source => source.category === category);
}

// IDでソース取得
export function getSourceById(id: string): OfficialSource | undefined {
    return OFFICIAL_SOURCES.find(source => source.id === id);
}

// 論理構成のための引用チェーン
export interface CitationChain {
    claim: string;
    sourceIds: string[];
    reasoning: string;
}

export const KEY_CLAIMS: CitationChain[] = [
    {
        claim: 'こどもNISAは2027年1月から開始',
        sourceIds: ['tax-reform-fy2026', 'tax-reform-fy2026-summary'],
        reasoning: '令和8年度税制改正大綱にて創設が決定。2025年12月26日閣議決定。',
    },
    {
        claim: '年間投資上限は60万円、非課税保有限度額は600万円',
        sourceIds: ['tax-reform-fy2026'],
        reasoning: '税制改正大綱の具体的数値に基づく。',
    },
    {
        claim: '運用益・配当金は20.315%の税金が免除される',
        sourceIds: ['tax-reform-fy2026', 'nta-securities-tax'],
        reasoning: '通常の株式譲渡所得税率（国税庁）と、NISA制度による非課税措置の組み合わせ。',
    },
    {
        claim: '対象商品はつみたてNISAと同様の投資信託',
        sourceIds: ['tax-reform-fy2026', 'fsa-fund-list'],
        reasoning: '税制改正大綱で規定。具体的な商品リストは金融庁が公表。',
    },
    {
        claim: '親・祖父母からの資金贈与は年間110万円まで非課税',
        sourceIds: ['nta-gift-tax'],
        reasoning: '暦年贈与の基礎控除。こどもNISA上限60万円はこの範囲内。',
    },
    {
        claim: '長期分散投資の有効性',
        sourceIds: ['gpif-returns', 'oecd-financial-education'],
        reasoning: 'GPIFの20年超の運用実績とOECDの金融教育ガイドラインに基づく。',
    },
];

// JSON-LD スキーマ生成（Dataset）
export function generateSourcesSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "こどもNISA研究所 参照資料データベース",
        "description": "こどもNISA制度に関する官公庁一次資料の構造化データベース",
        "creator": {
            "@type": "Organization",
            "name": "こどもNISA研究所",
        },
        "dateModified": new Date().toISOString().split('T')[0],
        "license": "https://creativecommons.org/licenses/by/4.0/",
        "distribution": OFFICIAL_SOURCES.map(source => ({
            "@type": "DataDownload",
            "name": source.title,
            "contentUrl": source.url || source.pdfUrl,
            "encodingFormat": source.pdfUrl ? "application/pdf" : "text/html",
            "publisher": {
                "@type": source.publisherType === 'government' || source.publisherType === 'ministry' ? 'GovernmentOrganization' : 'Organization',
                "name": source.publisher,
            },
            "datePublished": source.publishDate,
        })),
    };
}
