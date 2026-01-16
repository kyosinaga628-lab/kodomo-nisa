"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BeginnerGuide from "./BeginnerGuide";
import ExperiencedGuide from "./ExperiencedGuide";
import QuickActionRoadmap from "@/components/common/QuickActionRoadmap";

type PersonaType = "beginner" | "experienced" | "action";

const personas = [
    {
        id: "beginner" as PersonaType,
        icon: "🔰",
        title: "NISAをまだ知らない",
        description: "30秒でわかる基礎ガイド",
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-[var(--color-emerald)]/10",
        textColor: "text-[var(--color-emerald)]",
    },
    {
        id: "experienced" as PersonaType,
        icon: "📊",
        title: "既にNISAを利用中",
        description: "戦略的併用ガイド",
        color: "from-blue-600 to-blue-700",
        bgColor: "bg-[var(--color-royal-blue)]/10",
        textColor: "text-[var(--color-royal-blue)]",
    },
    {
        id: "action" as PersonaType,
        icon: "⚡",
        title: "今すぐ始めたい",
        description: "3ステップ実行ガイド",
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-500/10",
        textColor: "text-orange-600",
    },
];

export default function PersonaSelector() {
    const [selectedPersona, setSelectedPersona] = useState<PersonaType>("beginner");

    return (
        <section className="py-16 md:py-24 bg-[var(--color-bg)]">
            <div className="container-width px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-12"
                >
                    <p className="text-[var(--color-emerald)] font-semibold tracking-wide mb-2 md:mb-4 text-sm md:text-base">
                        PERSONALIZED GUIDE
                    </p>
                    <h2 className="heading-section text-2xl md:text-4xl mb-4">
                        あなたに合った<span className="text-[var(--color-royal-blue)]">ガイド</span>を選択
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-sm md:text-base">
                        ご自身の状況に合わせて、最適な情報をお届けします。
                    </p>
                </motion.div>

                {/* Persona Tabs */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
                    {personas.map((persona) => (
                        <motion.button
                            key={persona.id}
                            onClick={() => setSelectedPersona(persona.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative flex items-center gap-3 px-5 py-4 rounded-xl transition-all ${selectedPersona === persona.id
                                    ? `bg-gradient-to-r ${persona.color} text-white shadow-lg`
                                    : `${persona.bgColor} ${persona.textColor} hover:shadow-md`
                                }`}
                        >
                            <span className="text-2xl">{persona.icon}</span>
                            <div className="text-left">
                                <p className="font-semibold text-sm md:text-base">{persona.title}</p>
                                <p className={`text-xs ${selectedPersona === persona.id ? "text-white/80" : "opacity-70"}`}>
                                    {persona.description}
                                </p>
                            </div>
                            {selectedPersona === persona.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-xl ring-2 ring-white/50"
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedPersona}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {selectedPersona === "beginner" && <BeginnerGuide />}
                        {selectedPersona === "experienced" && <ExperiencedGuide />}
                        {selectedPersona === "action" && <QuickActionRoadmap />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
