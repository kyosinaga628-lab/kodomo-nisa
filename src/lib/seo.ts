// SEO and Schema.org utilities for enhanced authoritativeness

export interface AuthorInfo {
    name: string;
    title: string;
    organization: string;
    expertise: string[];
    bio: string;
}

export const SITE_AUTHOR: AuthorInfo = {
    name: "こどもNISA研究所 編集部",
    title: "政策アナリスト",
    organization: "こどもNISA研究所",
    expertise: [
        "エネルギー政策分析",
        "経済政策研究",
        "長期マクロ経済予測",
        "資産形成戦略"
    ],
    bio: "大手シンクタンク出身の政策専門家が主宰。政府の政策形成プロセスに携わった経験を活かし、子どもの資産形成に関する情報発信を行っています。政府公認ではない民間の立場から、本音の解説を提供。"
};

export const SITE_INFO = {
    name: "こどもNISA研究所",
    alternateName: "KODOMO-NISA.JP",
    url: "https://kodomo-nisa.jp",
    description: "民間専門家による、こどもNISA制度の本音の解説と資産形成支援サイト",
    tagline: "政府公認ではないからこそ言える、本音の解説",
    foundingDate: "2025",
    sameAs: [
        // 将来的にSNSアカウントを追加
    ]
};

// ページ用のJSON-LDスキーマ生成
export function generateWebPageSchema(pageData: {
    title: string;
    description: string;
    url: string;
    datePublished?: string;
    dateModified?: string;
    breadcrumb?: Array<{ name: string; url: string }>;
}) {
    const schema: any = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": pageData.title,
        "description": pageData.description,
        "url": pageData.url,
        "author": {
            "@type": "Person",
            "name": SITE_AUTHOR.name,
            "jobTitle": SITE_AUTHOR.title,
            "description": SITE_AUTHOR.bio,
            "knowsAbout": SITE_AUTHOR.expertise
        },
        "publisher": {
            "@type": "Organization",
            "name": SITE_INFO.name,
            "alternateName": SITE_INFO.alternateName,
            "url": SITE_INFO.url,
            "description": SITE_INFO.description,
            "foundingDate": SITE_INFO.foundingDate
        },
        "inLanguage": "ja-JP"
    };

    if (pageData.datePublished) {
        schema.datePublished = pageData.datePublished;
    }
    if (pageData.dateModified) {
        schema.dateModified = pageData.dateModified;
    }

    if (pageData.breadcrumb && pageData.breadcrumb.length > 0) {
        schema.breadcrumb = {
            "@type": "BreadcrumbList",
            "itemListElement": pageData.breadcrumb.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": crumb.url
            }))
        };
    }

    return schema;
}

// Organization Schema
export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": SITE_INFO.name,
        "alternateName": SITE_INFO.alternateName,
        "url": SITE_INFO.url,
        "description": SITE_INFO.description,
        "foundingDate": SITE_INFO.foundingDate,
        "founder": {
            "@type": "Person",
            "name": SITE_AUTHOR.name,
            "jobTitle": SITE_AUTHOR.title,
            "description": SITE_AUTHOR.bio,
            "knowsAbout": SITE_AUTHOR.expertise
        }
    };
}

// WebSite Schema
export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": SITE_INFO.name,
        "alternateName": SITE_INFO.alternateName,
        "url": SITE_INFO.url,
        "description": SITE_INFO.description,
        "author": {
            "@type": "Person",
            "name": SITE_AUTHOR.name,
            "jobTitle": SITE_AUTHOR.title
        },
        "publisher": {
            "@type": "Organization",
            "name": SITE_INFO.name
        }
    };
}
