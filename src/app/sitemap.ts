import { MetadataRoute } from 'next'
import { articles } from '@/lib/articles';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.kodomo-nisa.jp';
    const lastModified = new Date();

    // メインページ
    const mainPages = [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/simulator`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/guide`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/policy-curation`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/education-gift`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified,
            changeFrequency: 'yearly' as const,
            priority: 0.2,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified,
            changeFrequency: 'yearly' as const,
            priority: 0.2,
        },
        {
            url: `${baseUrl}/fear-greed/`,
            lastModified,
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
    ];

    // キッズページ
    const kidsPages = [
        {
            url: `${baseUrl}/kids`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/kids/money`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/kids/investment`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/kids/nisa`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/kids/quiz`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
    ];

    // 記事詳細ページ（articles.ts から自動生成）
    const articlePages = articles.map((article) => ({
        url: `${baseUrl}/policy-curation/${article.slug}`,
        lastModified: new Date((article.dateModified ?? article.date).replace(/\./g, '-')),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...mainPages, ...kidsPages, ...articlePages];
}
