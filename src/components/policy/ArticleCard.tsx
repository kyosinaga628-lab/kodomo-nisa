import Link from "next/link";
import { ExternalIcon } from "@/components/common/ui";

interface ArticleCardProps {
    slug: string;
    date: string;
    category: string;
    title: string;
    excerpt: string;
    readTime: number;
    thumbnail?: string;
    externalUrl?: string;
    source?: string;
    lead?: boolean;
}

export default function ArticleCard({
    slug,
    date,
    category,
    title,
    excerpt,
    readTime,
    thumbnail,
    externalUrl,
    source,
    lead = false,
}: ArticleCardProps) {
    const isExternal = !!externalUrl;

    const meta = (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <time className="tnum note">{date}</time>
            <span className="chip">{category}</span>
            <span className="note">{readTime}分</span>
            {isExternal && (
                <span className="note inline-flex items-center gap-1">
                    {source ?? "外部サイト"}
                    <ExternalIcon size={12} />
                </span>
            )}
        </div>
    );

    const body = lead ? (
        <div className="grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-6 lg:gap-12 items-center">
            {thumbnail && (
                <div className="aspect-[16/9] overflow-hidden rounded-[10px] bg-[var(--color-bg-secondary)] order-last lg:order-first">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
            )}
            <div>
                {meta}
                <h2 className="editorial-heading !text-[1.5rem] md:!text-[1.875rem] mt-3 group-hover:text-[var(--color-royal-blue-light)] group-hover:underline underline-offset-[6px] decoration-1">
                    {title}
                </h2>
                <p className="mt-3 text-[0.9375rem] text-[var(--color-text-secondary)] line-clamp-3">{excerpt}</p>
            </div>
        </div>
    ) : (
        <div className="flex items-start gap-5 py-6 h-full">
            <div className="flex-1 min-w-0">
                {meta}
                <h3 className="heading-card mt-2 group-hover:text-[var(--color-royal-blue-light)] group-hover:underline underline-offset-4 decoration-1">
                    {title}
                </h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">{excerpt}</p>
            </div>
            {thumbnail && (
                <div className="hidden sm:block w-[104px] h-[78px] flex-shrink-0 mt-1 overflow-hidden rounded-[6px] bg-[var(--color-bg-secondary)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumbnail} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
    );

    const className = `group block h-full ${lead ? "" : "border-b border-[var(--color-line)]"}`;

    return (
        <article>
            {isExternal ? (
                <a href={externalUrl} target="_blank" rel="noopener noreferrer" className={className}>
                    {body}
                </a>
            ) : (
                <Link href={`/policy-curation/${slug}`} className={className}>
                    {body}
                </Link>
            )}
        </article>
    );
}
