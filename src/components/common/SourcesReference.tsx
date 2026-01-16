"use client";

import { motion } from "framer-motion";
import { OFFICIAL_SOURCES, KEY_CLAIMS, OfficialSource } from "@/lib/official-sources";

interface SourcesReferenceProps {
    showClaims?: boolean;
    compact?: boolean;
    categories?: OfficialSource['category'][];
}

export default function SourcesReference({
    showClaims = true,
    compact = false,
    categories,
}: SourcesReferenceProps) {
    const filteredSources = categories
        ? OFFICIAL_SOURCES.filter(s => categories.includes(s.category))
        : OFFICIAL_SOURCES;

    const getCategoryLabel = (cat: OfficialSource['category']) => {
        const labels = {
            policy: '政策資料',
            statistics: '統計データ',
            guideline: 'ガイドライン',
            report: 'レポート',
            legislation: '法令・税制',
        };
        return labels[cat];
    };

    const getCategoryColor = (cat: OfficialSource['category']) => {
        const colors = {
            policy: 'bg-blue-100 text-blue-800',
            statistics: 'bg-green-100 text-green-800',
            guideline: 'bg-purple-100 text-purple-800',
            report: 'bg-amber-100 text-amber-800',
            legislation: 'bg-red-100 text-red-800',
        };
        return colors[cat];
    };

    const getPublisherIcon = (type: OfficialSource['publisherType']) => {
        switch (type) {
            case 'government':
            case 'ministry':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
                    </svg>
                );
            case 'agency':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                );
            case 'international':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                );
            default:
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                );
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-base p-6 md:p-8"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-royal-blue)]/10 flex items-center justify-center text-[var(--color-royal-blue)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                        <path d="M8 7h8M8 11h8M8 15h4" />
                    </svg>
                </div>
                <div>
                    <h2 className="font-serif text-lg md:text-xl font-semibold text-[var(--color-text-primary)]">
                        参照資料・データソース
                    </h2>
                    <p className="text-xs text-[var(--color-text-muted)]">
                        本サイトの情報は以下の一次資料に基づいています
                    </p>
                </div>
            </div>

            {/* Key Claims with Sources */}
            {showClaims && !compact && (
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-4 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                            <path d="M22 4L12 14.01l-3-3" />
                        </svg>
                        主要な論拠と根拠資料
                    </h3>
                    <div className="space-y-3">
                        {KEY_CLAIMS.slice(0, 4).map((claim, index) => (
                            <div
                                key={index}
                                className="bg-[var(--color-bg-secondary)] rounded-lg p-4"
                            >
                                <p className="font-medium text-sm text-[var(--color-text-primary)] mb-2">
                                    {claim.claim}
                                </p>
                                <p className="text-xs text-[var(--color-text-muted)] mb-2">
                                    {claim.reasoning}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {claim.sourceIds.map(id => {
                                        const source = OFFICIAL_SOURCES.find(s => s.id === id);
                                        return source ? (
                                            <a
                                                key={id}
                                                href={source.url || source.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-white rounded border border-[var(--glass-border)] hover:bg-[var(--color-royal-blue)]/5 hover:border-[var(--color-royal-blue)]/30 transition-colors"
                                            >
                                                {getPublisherIcon(source.publisherType)}
                                                <span className="text-[var(--color-royal-blue)]">{source.publisher}</span>
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
            <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-4 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <path d="M14 2v6h6" />
                    </svg>
                    官公庁一次資料一覧
                </h3>
                <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {filteredSources.map((source) => (
                        <a
                            key={source.id}
                            href={source.url || source.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-lg p-4 border border-[var(--glass-border)] hover:border-[var(--color-royal-blue)]/30 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-royal-blue)] transition-colors">
                                    {getPublisherIcon(source.publisherType)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-royal-blue)] transition-colors truncate">
                                        {source.title}
                                    </p>
                                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                                        {source.publisher} • {source.publishDate}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${getCategoryColor(source.category)}`}>
                                            {getCategoryLabel(source.category)}
                                        </span>
                                        {source.pdfUrl && (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                                PDF
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="flex-shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-royal-blue)] transition-colors"
                                >
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                    <path d="M15 3h6v6M10 14L21 3" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Verification Note */}
            <div className="mt-6 pt-4 border-t border-[var(--glass-border)]">
                <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    最終検証日: 2026年1月15日 | 情報の正確性を定期的に確認しています
                </p>
            </div>
        </motion.section>
    );
}
