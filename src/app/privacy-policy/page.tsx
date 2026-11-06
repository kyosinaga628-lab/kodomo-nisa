"use client";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] page-top">
            <div className="container-width !max-w-[46rem]">
                <h1 className="heading-section pb-6 mb-8 border-b border-[var(--color-line-strong)]">プライバシーポリシー</h1>

                <div className="space-y-8 text-[var(--color-text-secondary)]">
                    <section>
                        <h2 className="heading-card mb-2">1. 個人情報の収集について</h2>
                        <p className="leading-relaxed">
                            当サイト「こどもNISA研究所」（以下「当サイト」）は、ご利用者様の個人情報を適切に保護することを重要な責務と考えています。
                            当サイトでは、シミュレーター機能や金融教育ギフトの作成において入力された情報は、すべてご利用者様のブラウザ内（ローカル）で処理され、当サイトのサーバーには送信されません。
                        </p>
                    </section>

                    <section>
                        <h2 className="heading-card mb-2">2. Cookieの使用について</h2>
                        <p className="leading-relaxed">
                            当サイトでは、利便性向上のためCookieを使用する場合があります。
                            Cookieはご利用者様のブラウザに保存される小さなテキストファイルであり、
                            個人を特定する情報は含まれていません。
                        </p>
                    </section>

                    <section>
                        <h2 className="heading-card mb-2">3. アクセス解析について</h2>
                        <p className="leading-relaxed">
                            当サイトでは、サイトの利用状況を把握するためにアクセス解析ツールを使用する場合があります。
                            これらのツールはCookieを使用して匿名の統計情報を収集しますが、
                            個人を特定する情報は収集されません。
                        </p>
                    </section>

                    <section>
                        <h2 className="heading-card mb-2">4. 第三者への情報提供</h2>
                        <p className="leading-relaxed">
                            当サイトは、法令に基づく場合を除き、ご利用者様の同意なく第三者に個人情報を提供することはありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="heading-card mb-2">5. お問い合わせ</h2>
                        <p className="leading-relaxed">
                            本ポリシーに関するお問い合わせは、当サイトのお問い合わせフォームよりご連絡ください。
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
