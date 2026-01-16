"use client";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-[calc(var(--header-height)+var(--banner-height)+2rem)] pb-24">
            <div className="container-width px-4 max-w-3xl">
                <h1 className="heading-section mb-8">利用規約</h1>

                <div className="space-y-8 text-[var(--color-text-secondary)]">
                    <section>
                        <h2 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">第1条（適用）</h2>
                        <p className="leading-relaxed">
                            本規約は、当サイト「こどもNISA研究所」（以下「当サイト」）が提供するすべてのサービスの利用に関する条件を定めるものです。
                            ご利用者様は、本規約に同意したうえで当サイトをご利用ください。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">第2条（免責事項）</h2>
                        <p className="leading-relaxed mb-3">
                            当サイトは、個人の研究成果として情報を提供しており、所属組織の公式見解とは一切関係ありません。
                        </p>
                        <p className="leading-relaxed mb-3">
                            当サイトで提供するシミュレーション結果は、一定の仮定に基づく試算であり、将来の運用成果を保証するものではありません。
                        </p>
                        <p className="leading-relaxed">
                            当サイトは投資助言を行うものではありません。投資に関する最終的な判断はご自身の責任において行ってください。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">第3条（著作権）</h2>
                        <p className="leading-relaxed">
                            当サイトに掲載されているコンテンツ（文章、画像、デザイン等）の著作権は、当サイト運営者に帰属します。
                            無断での複製、転載、改変等はお控えください。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">第4条（禁止事項）</h2>
                        <p className="leading-relaxed mb-2">ご利用者様は、以下の行為をしてはなりません：</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>当サイトの運営を妨害する行為</li>
                            <li>他の利用者または第三者の権利を侵害する行為</li>
                            <li>法令または公序良俗に反する行為</li>
                            <li>当サイトのコンテンツを商業目的で無断使用する行為</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">第5条（規約の変更）</h2>
                        <p className="leading-relaxed">
                            当サイトは、必要に応じて本規約を変更することがあります。
                            変更後の規約は、当サイトに掲載した時点から効力を生じるものとします。
                        </p>
                    </section>

                    <p className="text-sm text-[var(--color-text-muted)] pt-4">
                        最終更新日: 2026年1月
                    </p>
                </div>
            </div>
        </div>
    );
}
