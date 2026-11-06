import Link from "next/link";
import { ArrowIcon } from "@/components/common/ui";

export default function CTASection() {
    return (
        <section className="bg-[var(--color-royal-blue)] text-white">
            <div className="container-width py-14 md:py-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div>
                    <h2 className="heading-section text-white md:!text-[2.5rem]">
                        お子様の未来を、
                        <br />
                        今日から設計しませんか？
                    </h2>
                    <p className="mt-4 text-white/80">
                        シミュレーターで、18年後の資産を可視化。あなたの投資計画をサポートします。
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <Link href="/simulator" className="btn-inverse">
                        シミュレーションを開始
                        <ArrowIcon />
                    </Link>
                    <Link href="/kids" className="btn-ghost-inverse">
                        キッズページ
                    </Link>
                </div>
            </div>
        </section>
    );
}
