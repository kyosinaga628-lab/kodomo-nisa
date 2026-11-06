import ContactForm from "@/components/common/ContactForm";
import { PageHeader } from "@/components/common/ui";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] page-top">
            <div className="container-width !max-w-[46rem]">
                <PageHeader
                    kicker="お問い合わせ"
                    title="お問い合わせ"
                    lead="ご質問、取材のご依頼、コラボレーションのご提案など、お気軽にお問い合わせください。"
                />

                <ContactForm />

                <div className="note mt-6 flex flex-wrap gap-x-6 gap-y-1">
                    <span>無料相談</span>
                    <span>個人情報保護</span>
                </div>
            </div>
        </div>
    );
}
