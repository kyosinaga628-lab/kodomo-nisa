import Link from "next/link";
import HeroEstimator from "./HeroEstimator";
import { ArrowIcon, Fact } from "@/components/common/ui";
import { SITE_INFO } from "@/lib/seo";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-[calc(var(--header-height)+var(--banner-height))]">
            <div className="absolute inset-x-0 top-0 h-[640px] graph-paper" aria-hidden="true" />

            <div className="container-width relative">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] gap-10 lg:gap-16 items-center pt-10 md:pt-16 lg:pt-20 pb-12 md:pb-20">
                    <div>
                        <p className="kicker mb-5 md:mb-7">2027年1月スタート確定の新制度</p>

                        <h1 className="heading-hero">
                            こども
                            <span className="text-[0.62em] font-medium text-[var(--color-text-muted)]">（子供）</span>
                            NISAで、
                            <br />
                            未来を設計する
                        </h1>

                        <p className="lead mt-5 md:mt-7 max-w-[32rem]">
                            0〜17歳のお子様のための非課税投資制度。
                            <br className="hidden sm:block" />
                            年間60万円、最大600万円まで、運用益が非課税に。
                        </p>

                        <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <Link href="/simulator" className="btn-primary w-full sm:w-auto">
                                シミュレーターを試す
                                <ArrowIcon />
                            </Link>
                            <Link href="/guide" className="link-arrow">
                                制度を詳しく知る
                                <ArrowIcon />
                            </Link>
                        </div>

                        <p className="note mt-8 hidden sm:block">{SITE_INFO.tagline}。官公庁の一次資料に基づいて解説しています。</p>
                    </div>

                    <HeroEstimator />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-7 py-8 md:py-10 border-t border-[var(--color-line-strong)]">
                    <Fact value={<>60<span className="figure-unit">万円</span></>} label="年間の投資上限（月5万円）" />
                    <Fact value={<>600<span className="figure-unit">万円</span></>} label="非課税保有限度額" />
                    <Fact value={<>0〜17<span className="figure-unit">歳</span></>} label="対象年齢・親権者等が代理で運用" />
                    <Fact value="非課税" label="運用益（通常は約20%課税）" tone="gain" />
                </div>
            </div>
        </section>
    );
}
