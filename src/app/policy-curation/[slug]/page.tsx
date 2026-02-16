import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import ArticleDetailClient from "./ArticleDetailClient";

// Generate static params for export
export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = articles.find(a => a.slug === slug);

    if (!article) {
        notFound();
    }

    return <ArticleDetailClient article={article} />;
}
