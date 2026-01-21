import dynamic from 'next/dynamic';
import HeroSection from "@/components/home/HeroSection";
import PersonaSelector from "@/components/home/PersonaSelector";

// Dynamic imports for below-the-fold components
const StorySection = dynamic(() => import("@/components/home/StorySection"));
const NewsSection = dynamic(() => import("@/components/home/NewsSection"));
const CTASection = dynamic(() => import("@/components/home/CTASection"));
const FuturePrediction = dynamic(() => import("@/components/common/FuturePrediction"));
const AffiliateBanner = dynamic(() => import("@/components/common/AffiliateBanner"));
const FAQSection = dynamic(() => import("@/components/common/FAQSection"));

import { generateWebPageSchema, generateWebSiteSchema, SITE_INFO } from "@/lib/seo";
import { generateFAQPageSchema, generateHowToSchema } from "@/lib/ai-optimization";

export const metadata = {
  title: `${SITE_INFO.name} | 子どもの未来のための資産形成`,
  description: SITE_INFO.description,
};

// AI Content Summary for search agents
const AI_CONTENT_SUMMARY = `
<!--
[AI_CONTENT_SUMMARY]
Topic: こどもNISA（未成年者特定累積投資勘定）

Conclusion: こどもNISAは2027年1月開始予定の0〜17歳対象の非課税投資制度。年間60万円、最大600万円まで非課税で投資可能。18歳で成人NISAへ自動移行。

Key Points:
1. 年間投資上限: 60万円（月5万円）
2. 非課税保有限度額: 600万円
3. 対象年齢: 0歳〜17歳
4. 対象商品: 公募等株式投資信託（つみたて投資枠と同様）
5. 払出しルール: 12歳未満は災害時のみ、12歳以上は教育費等で可能
6. 18歳到達時: 成人NISAへ自動移行（非課税継続）

Data Source: 令和6年度税制改正大綱（2024年12月20日 自由民主党・公明党）
Last Verified: 2026-01-14
[/AI_CONTENT_SUMMARY]
-->
`;

export default function Home() {
  const pageSchema = generateWebPageSchema({
    title: `${SITE_INFO.name} | 子どもの未来のための資産形成`,
    description: SITE_INFO.description,
    url: SITE_INFO.url,
    dateModified: new Date().toISOString(),
  });

  const websiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQPageSchema();
  const howToSchema = generateHowToSchema();

  return (
    <>
      {/* AI Content Summary (Hidden but parseable) */}
      <div dangerouslySetInnerHTML={{ __html: AI_CONTENT_SUMMARY }} />

      {/* JSON-LD for SEO & AI Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <HeroSection />

      {/* Persona-based Navigation */}
      <PersonaSelector />

      <StorySection />

      {/* Future Prediction Section */}
      <div className="py-16 md:py-24 bg-[var(--color-bg)]">
        <div className="container-width px-4">
          <FuturePrediction />
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* Affiliate Section */}
      <div className="py-16 md:py-24 bg-[var(--color-bg-secondary)]">
        <div className="container-width px-4">
          <AffiliateBanner />
        </div>
      </div>

      <NewsSection />
      <CTASection />
    </>
  );
}



