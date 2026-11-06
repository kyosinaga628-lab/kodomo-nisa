import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, generateArticleSchema } from "@/lib/articles";
import { OG_IMAGE, SITE_INFO } from "@/lib/seo";
import ArticleDetailClient from "./ArticleDetailClient";

// Generate static params for export
export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

// 親 layout の設定（一覧ページの canonical など）を、記事ごとの値で上書きする
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = articles.find(a => a.slug === slug);

    if (!article) {
        return {};
    }

    const path = `/policy-curation/${article.slug}`;
    const schema = generateArticleSchema(article);

    return {
        title: article.title,
        description: article.excerpt,
        alternates: {
            canonical: path,
        },
        // 本文のない記事（外部記事の紹介など）は検索結果に出さない。sitemap からも除外している
        ...(article.content ? {} : { robots: { index: false, follow: true } }),
        openGraph: {
            title: article.title,
            description: article.excerpt,
            url: `${SITE_INFO.url}${path}`,
            type: "article",
            publishedTime: schema.datePublished,
            modifiedTime: schema.dateModified,
            images: [OG_IMAGE],
        },
    };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = articles.find(a => a.slug === slug);

    if (!article) {
        notFound();
    }

    return <ArticleDetailClient article={article} />;
}
