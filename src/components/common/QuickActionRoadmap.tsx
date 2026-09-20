"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// チェックリスト項目
const checklistItems = [
    { id: 1, label: "マイナンバーカード（または通知カード）", required: true },
    { id: 2, label: "本人確認書類（運転免許証、パスポート等）", required: true },
    { id: 3, label: "銀行口座情報（入出金用）", required: true },
    { id: 4, label: "メールアドレス", required: true },
    { id: 5, label: "お子様のマイナンバー", required: true },
    { id: 6, label: "お子様の健康保険証（本人確認用）", required: false },
    { id: 7, label: "お子様のマイナンバー記載の住民票の写し（楽天証券など提出を求める会社あり）", required: false },
    { id: 7, label: "お子様のマイナンバー記載の住民票の写し（楽天証券など提出を求める会社あり）", required: false },
];

// タイムラインデータ
const timeline = [
    {
        date: "2026年 10月1日",
        title: "口座開設（事前）受付開始",
        description: "SBI・楽天・マネックス・松井・三菱UFJ eスマート・PayPayなど主要ネット証券で受付開始。親権者の口座とお子様の未成年口座が必要",
        status: "upcoming",
    },
    {
        date: "2026年 10〜12月",
        title: "申込・書類提出・税務署審査",
        description: "マイナンバー確認書類等を提出し、金融機関と税務署の審査へ。積立金額・投資商品・引落口座の設定もこの期間に",
        status: "upcoming",
    },
    {
        date: "2027年 1月",
        title: "制度開始・口座開設完了・初回積立",
        description: "審査通過後、2027年1月以降にこどもNISA口座が開設され、初回の積立が実行される",
        status: "upcoming",
    },
    {
        date: "2027年 12月末まで",
        title: "1年目の投資完了",
        description: "年間上限60万円まで投資可能。初年度の非課税枠を最大活用",
        status: "upcoming",
    },
];

interface QuickActionRoadmapProps {
    variant?: "full" | "compact";
}

export default function QuickActionRoadmap({ variant = "full" }: QuickActionRoadmapProps) {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const toggleCheck = (id: number) => {
        setCheckedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const completedCount = checkedItems.length;
    const requiredCount = checklistItems.filter(item => item.required).length;
    const requiredCompleted = checklistItems.filter(item => item.required && checkedItems.includes(item.id)).length;

    if (variant === "compact") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-base p-4 md:p-6 bg-gradient-to-br from-[var(--color-emerald)]/5 to-transparent"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-emerald)] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[var(--color-text-primary)] text-sm md:text-base">
                            今すぐ始めたい方へ
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)]">
                            3ステップで準備完了
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 mb-4">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex-1 text-center p-2 bg-white rounded-lg">
                            <div className="w-6 h-6 rounded-full bg-[var(--color-emerald)]/20 text-[var(--color-emerald)] text-xs font-bold flex items-center justify-center mx-auto mb-1">
                                {step}
                            </div>
                            <p className="text-xs text-[var(--color-text-secondary)]">
                                {step === 1 ? "口座開設" : step === 2 ? "子ども口座" : "積立開始"}
                            </p>
                        </div>
                    ))}
                </div>
                <Link href="/about#roadmap" className="block">
                    <button className="w-full py-2 text-sm font-medium text-[var(--color-emerald)] bg-[var(--color-emerald)]/10 rounded-lg hover:bg-[var(--color-emerald)]/20 transition-colors">
                        詳細を見る →
                    </button>
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-base p-6 md:p-10"
            id="roadmap"
        >
            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] mb-4">
                    ⚡ 今すぐ始めたい方へ
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] mb-4">
                    最短3ステップの実行ロードマップ
                </h2>
                <p className="text-[var(--color-text-secondary)] text-sm md:text-base max-w-2xl mx-auto">
                    口座開設の受付は2026年10月1日開始。2027年1月の制度開始に向けて、今からできる準備を始めましょう。
                </p>
            </div>

            {/* 3 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
                {[
                    {
                        step: 1,
                        icon: "🏦",
                        title: "証券口座を開設",
                        description: "まず親名義の証券口座を開設。SBI証券や楽天証券などネット証券がおすすめ。",
                        action: "口座開設はこちら",
                        link: "#affiliate"
                    },
                    {
                        step: 2,
                        icon: "👶",
                        title: "子ども名義の口座を準備",
                        description: "こどもNISA口座の受付は2026年10月1日から。お子様名義の未成年口座と必要書類を今のうちに準備しておく。",
                        action: "必要書類を確認",
                        link: "#checklist"
                    },
                    {
                        step: 3,
                        icon: "💹",
                        title: "積立設定をして開始",
                        description: "月額5万円（年60万円）を目安に積立設定。2027年1月から自動で積立スタート。",
                        action: "シミュレーション",
                        link: "/simulator"
                    }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative bg-white p-5 md:p-6 rounded-xl border border-[var(--glass-border)]"
                    >
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[var(--color-emerald)] text-white font-bold flex items-center justify-center text-sm">
                            {item.step}
                        </div>
                        <div className="text-3xl mb-3">{item.icon}</div>
                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-2 text-sm md:text-base">
                            {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[var(--color-text-secondary)] mb-4">
                            {item.description}
                        </p>
                        <Link href={item.link}>
                            <span className="text-xs md:text-sm font-medium text-[var(--color-emerald)] hover:underline">
                                {item.action} →
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Checklist */}
            <div className="mb-10" id="checklist">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm md:text-base flex items-center gap-2">
                    ✅ 準備物チェックリスト
                    <span className="text-xs font-normal text-[var(--color-text-muted)]">
                        ({requiredCompleted}/{requiredCount} 必須項目)
                    </span>
                </h3>
                <div className="bg-white rounded-xl border border-[var(--glass-border)] divide-y divide-[var(--glass-border)]">
                    {checklistItems.map((item) => (
                        <label
                            key={item.id}
                            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-[var(--color-bg-secondary)] transition-colors"
                        >
                            <input
                                type="checkbox"
                                checked={checkedItems.includes(item.id)}
                                onChange={() => toggleCheck(item.id)}
                                className="w-5 h-5 rounded border-2 border-[var(--color-royal-blue)] text-[var(--color-emerald)] focus:ring-[var(--color-emerald)]"
                            />
                            <span className={`flex-1 text-sm ${checkedItems.includes(item.id) ? "text-[var(--color-text-muted)] line-through" : "text-[var(--color-text-primary)]"}`}>
                                {item.label}
                            </span>
                            {item.required && (
                                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded">必須</span>
                            )}
                        </label>
                    ))}
                </div>
                {requiredCompleted === requiredCount && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-4 bg-[var(--color-emerald)]/10 rounded-xl text-center"
                    >
                        <p className="text-[var(--color-emerald)] font-semibold">
                            🎉 必須項目すべて準備完了！口座開設の準備ができました。
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Timeline */}
            <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm md:text-base">
                    📅 2027年制度開始までのスケジュール
                </h3>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--color-royal-blue)]/20" />

                    <div className="space-y-4">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-10"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-[var(--color-royal-blue)] border-4 border-white shadow" />

                                <div className="bg-white p-4 rounded-xl border border-[var(--glass-border)]">
                                    <p className="text-xs font-medium text-[var(--color-royal-blue)] mb-1">
                                        {item.date}
                                    </p>
                                    <h4 className="font-semibold text-[var(--color-text-primary)] text-sm md:text-base mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-[var(--color-text-secondary)]">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
