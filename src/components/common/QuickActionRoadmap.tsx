"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/common/ui";

// チェックリスト項目
const checklistItems = [
    { id: 1, label: "マイナンバーカード（または通知カード）", required: true },
    { id: 2, label: "本人確認書類（運転免許証、パスポート等）", required: true },
    { id: 3, label: "銀行口座情報（入出金用）", required: true },
    { id: 4, label: "メールアドレス", required: true },
    { id: 5, label: "お子様のマイナンバー", required: true },
    { id: 6, label: "お子様の健康保険証（本人確認用）", required: false },
    { id: 7, label: "お子様のマイナンバー記載の住民票の写し（楽天証券など提出を求める会社あり）", required: false },
];

// タイムラインデータ
const timeline = [
    {
        date: "2026年 10月1日",
        title: "口座開設（事前）受付開始",
        description: "SBI・楽天・マネックス・松井・三菱UFJ eスマート・PayPayなど主要ネット証券で受付開始済み。親権者の口座とお子様の未成年口座が必要",
        status: "completed",
    },
    {
        date: "2026年 10〜12月",
        title: "申込・書類提出・税務署審査",
        description: "マイナンバー確認書類等を提出し、金融機関と税務署の審査へ。積立金額・投資商品・引落口座の設定もこの期間に",
        status: "current",
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

const steps = [
    {
        title: "証券口座を開設",
        description: "まず親名義の証券口座を開設。SBI証券や楽天証券などネット証券がおすすめ。",
        action: "口座開設はこちら",
        link: "#affiliate",
    },
    {
        title: "子ども名義の口座を準備",
        description: "こどもNISA口座の事前受付を実施中（2026年10月1日〜）。お子様名義の未成年口座を開設し、必要書類を提出する。",
        action: "必要書類を確認",
        link: "#checklist",
    },
    {
        title: "積立設定をして開始",
        description: "月額5万円（年60万円）を目安に積立設定。2027年1月から自動で積立スタート。",
        action: "シミュレーション",
        link: "/simulator",
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

    const requiredCount = checklistItems.filter(item => item.required).length;
    const requiredCompleted = checklistItems.filter(item => item.required && checkedItems.includes(item.id)).length;

    if (variant === "compact") {
        return (
            <div className="card-base p-5 md:p-6">
                <h3 className="heading-card">今すぐ始めたい方へ</h3>
                <p className="note mt-1 mb-4">3ステップで準備完了</p>
                <ol className="flex gap-4 mb-4 text-[0.875rem]">
                    {["口座開設", "子ども口座", "積立開始"].map((label, index) => (
                        <li key={label} className="flex-1">
                            <span className="figure block text-[1.125rem] text-[var(--color-text-muted)]">{index + 1}</span>
                            {label}
                        </li>
                    ))}
                </ol>
                <Link href="/about#roadmap" className="link-arrow">
                    詳細を見る
                    <ArrowIcon />
                </Link>
            </div>
        );
    }

    return (
        <div id="roadmap">
            <div className="max-w-[44rem]">
                <h3 className="text-[1.5rem] md:text-[1.75rem]">最短3ステップの実行ロードマップ</h3>
                <p className="mt-3 text-[var(--color-text-secondary)]">
                    口座開設の事前受付は2026年10月1日から各社で実施中。2027年1月の制度開始に向けて、年内に申込みを済ませておきましょう。
                </p>
            </div>

            {/* 3 Steps */}
            <ol className="mt-8 md:mt-10 grid md:grid-cols-3 md:gap-10 border-t border-[var(--color-line-strong)]">
                {steps.map((item, index) => (
                    <li key={item.title} className="py-5 md:py-6 border-b md:border-b-0 border-[var(--color-line)] flex flex-col">
                        <span className="figure text-[1.75rem] text-[var(--color-text-muted)]" aria-hidden="true">{index + 1}</span>
                        <h4 className="heading-card mt-1">{item.title}</h4>
                        <p className="mt-1.5 mb-3 text-[0.9375rem] text-[var(--color-text-secondary)]">{item.description}</p>
                        <Link href={item.link} className="link-arrow mt-auto">
                            {item.action}
                            <ArrowIcon />
                        </Link>
                    </li>
                ))}
            </ol>

            <div className="mt-10 md:mt-14 grid lg:grid-cols-2 gap-10 lg:gap-14">
                {/* Timeline */}
                <div>
                    <h4 className="heading-card pb-3 border-b border-[var(--color-line-strong)]">2027年制度開始までのスケジュール</h4>
                    <ol className="mt-5">
                        {timeline.map((item, index) => (
                            <li key={item.date} className="relative pl-7 pb-6 last:pb-0">
                                {index < timeline.length - 1 && (
                                    <span className="absolute left-[5px] top-3 bottom-0 w-px bg-[var(--color-line-strong)]" aria-hidden="true" />
                                )}
                                <span
                                    className={`absolute left-0 top-[0.45rem] w-[11px] h-[11px] rounded-full border-2 ${item.status === "completed"
                                        ? "bg-[var(--color-royal-blue)] border-[var(--color-royal-blue)]"
                                        : item.status === "current"
                                            ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                                            : "bg-[var(--color-bg-secondary)] border-[var(--color-line-strong)]"
                                        }`}
                                    aria-hidden="true"
                                />
                                <p className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
                                    <span className="tnum">{item.date}</span>
                                    {item.status === "current" && <span className="font-bold text-[var(--color-accent)]">いまここ</span>}
                                    {item.status === "completed" && <span className="text-[var(--color-text-muted)]">完了</span>}
                                </p>
                                <h5 className="font-sans font-semibold text-[0.9375rem] mt-0.5">{item.title}</h5>
                                <p className="note mt-0.5">{item.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Checklist */}
                <div id="checklist">
                    <h4 className="heading-card pb-3 border-b border-[var(--color-line-strong)] flex items-baseline justify-between gap-3">
                        準備物チェックリスト
                        <span className="font-sans font-normal text-xs text-[var(--color-text-muted)] tnum flex-shrink-0">
                            必須 {requiredCompleted}/{requiredCount}
                        </span>
                    </h4>
                    <div>
                        {checklistItems.map((item) => {
                            const checked = checkedItems.includes(item.id);
                            return (
                                <label
                                    key={item.id}
                                    className="flex items-start gap-3 py-3 border-b border-[var(--color-line)] cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleCheck(item.id)}
                                        className="w-[18px] h-[18px] mt-[3px] flex-shrink-0 accent-[var(--color-royal-blue)]"
                                    />
                                    <span className={`flex-1 text-[0.9375rem] leading-relaxed ${checked ? "text-[var(--color-text-muted)] line-through" : ""}`}>
                                        {item.label}
                                    </span>
                                    <span className={`chip flex-shrink-0 mt-0.5 ${item.required ? "" : "chip-outline"}`}>
                                        {item.required ? "必須" : "任意"}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                    {requiredCompleted === requiredCount && (
                        <p className="mt-4 text-[0.9375rem] font-semibold text-[var(--color-emerald)]" role="status">
                            必須項目すべて準備完了。口座開設の準備ができました。
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
