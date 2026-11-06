import { getExpertComment } from "@/lib/calculator";

interface ExpertInsightProps {
    expectedReturn: number;
}

const riskLabels = {
    low: "リスク: 低",
    medium: "リスク: 中",
    high: "リスク: 高",
};

export default function ExpertInsight({ expectedReturn }: ExpertInsightProps) {
    const insight = getExpertComment(expectedReturn);

    return (
        <div className="rule-left">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="heading-card">{insight.title}</h3>
                <span className="chip chip-outline">{riskLabels[insight.riskLevel]}</span>
            </div>
            <p className="mt-1.5 text-[0.9375rem]">{insight.comment}</p>
            <p className="mt-1 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">{insight.context}</p>
        </div>
    );
}
