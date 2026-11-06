"use client";

import { useState } from "react";
import BeginnerGuide from "./BeginnerGuide";
import ExperiencedGuide from "./ExperiencedGuide";
import QuickActionRoadmap from "@/components/common/QuickActionRoadmap";
import { SectionHeading } from "@/components/common/ui";

type PersonaType = "beginner" | "experienced" | "action";

const personas = [
    { id: "beginner" as PersonaType, title: "NISAをまだ知らない", description: "30秒でわかる基礎ガイド" },
    { id: "experienced" as PersonaType, title: "既にNISAを利用中", description: "戦略的併用ガイド" },
    { id: "action" as PersonaType, title: "今すぐ始めたい", description: "3ステップ実行ガイド" },
];

export default function PersonaSelector() {
    const [selectedPersona, setSelectedPersona] = useState<PersonaType>("beginner");

    return (
        <section className="section bg-[var(--color-bg-secondary)]">
            <div className="container-width">
                <SectionHeading
                    kicker="状況別のガイド"
                    title="あなたに合ったガイドを選択"
                    lead="ご自身の状況に合わせて、最適な情報をお届けします。"
                    className="mb-8 md:mb-10"
                />

                <div className="tabs max-sm:grid max-sm:grid-cols-3 !gap-3 sm:!gap-10" role="tablist" aria-label="ガイドの種類">
                    {personas.map((persona) => (
                        <button
                            key={persona.id}
                            id={`persona-tab-${persona.id}`}
                            role="tab"
                            aria-selected={selectedPersona === persona.id}
                            aria-controls="persona-panel"
                            onClick={() => setSelectedPersona(persona.id)}
                            className="tab max-sm:text-[0.8125rem]"
                        >
                            <span className="block leading-snug [word-break:auto-phrase] [text-wrap:balance]">{persona.title}</span>
                            <span className="hidden sm:block text-xs font-normal text-[var(--color-text-muted)] mt-0.5">
                                {persona.description}
                            </span>
                        </button>
                    ))}
                </div>

                <div
                    id="persona-panel"
                    role="tabpanel"
                    aria-labelledby={`persona-tab-${selectedPersona}`}
                    className="pt-8 md:pt-12"
                >
                    {selectedPersona === "beginner" && <BeginnerGuide />}
                    {selectedPersona === "experienced" && <ExperiencedGuide />}
                    {selectedPersona === "action" && <QuickActionRoadmap />}
                </div>
            </div>
        </section>
    );
}
