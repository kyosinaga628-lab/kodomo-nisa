import { OFFICIAL_SOURCES, KEY_CLAIMS, OfficialSource } from "@/lib/official-sources";
import { ExternalIcon } from "@/components/common/ui";

interface SourcesReferenceProps {
    showClaims?: boolean;
    compact?: boolean;
    categories?: OfficialSource['category'][];
}

const categoryLabels: Record<OfficialSource['category'], string> = {
    policy: '政策資料',
    statistics: '統計データ',
    guideline: 'ガイドライン',
    report: 'レポート',
    legislation: '法令・税制',
};

export default function SourcesReference({
    showClaims = true,
    compact = false,
    categories,
}: SourcesReferenceProps) {
    const filteredSources = categories
        ? OFFICIAL_SOURCES.filter(s => categories.includes(s.category))
        : OFFICIAL_SOURCES;

    return (
        <section>
            <h2 className="heading-section !text-[1.375rem] md:!text-[1.625rem]">参照資料・データソース</h2>
            <p className="note mt-1">本サイトの情報は以下の一次資料に基づいています</p>

            {/* Key Claims with Sources */}
            {showClaims && !compact && (
                <div className="mt-7">
                    <h3 className="heading-card pb-3 border-b border-[var(--color-line-strong)]">主要な論拠と根拠資料</h3>
                    <div className="grid md:grid-cols-2 md:gap-x-10">
                        {KEY_CLAIMS.slice(0, 4).map((claim) => (
                            <div key={claim.claim} className="py-4 border-b border-[var(--color-line)]">
                                <p className="font-semibold text-[0.9375rem] leading-relaxed">{claim.claim}</p>
                                <p className="note mt-1">{claim.reasoning}</p>
                                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                                    {claim.sourceIds.map(id => {
                                        const source = OFFICIAL_SOURCES.find(s => s.id === id);
                                        return source ? (
                                            <a
                                                key={id}
                                                href={source.url || source.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-royal-blue-light)] hover:underline underline-offset-2"
                                            >
                                                {source.publisher}
                                                <ExternalIcon size={11} />
                                            </a>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sources List */}
            <div className="mt-7">
                <h3 className="heading-card pb-3 border-b border-[var(--color-line-strong)]">官公庁一次資料一覧</h3>
                <div className={`grid ${compact ? 'grid-cols-1' : 'md:grid-cols-2 md:gap-x-10'}`}>
                    {filteredSources.map((source) => (
                        <a
                            key={source.id}
                            href={source.url || source.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start justify-between gap-4 py-3.5 border-b border-[var(--color-line)]"
                        >
                            <span className="min-w-0">
                                <span className="block font-medium text-[0.9375rem] leading-relaxed group-hover:text-[var(--color-royal-blue-light)] group-hover:underline underline-offset-4">
                                    {source.title}
                                </span>
                                <span className="note mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <span>{source.publisher}</span>
                                    <span className="tnum">{source.publishDate}</span>
                                    <span className="chip">{categoryLabels[source.category]}</span>
                                    {source.pdfUrl && <span className="chip chip-outline">PDF</span>}
                                </span>
                            </span>
                            <span className="flex-shrink-0 mt-1.5 text-[var(--color-text-muted)] group-hover:text-[var(--color-royal-blue-light)]">
                                <ExternalIcon />
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Verification Note */}
            <p className="note mt-4">最終検証日: 2026年11月2日 | 情報の正確性を定期的に確認しています</p>
        </section>
    );
}
