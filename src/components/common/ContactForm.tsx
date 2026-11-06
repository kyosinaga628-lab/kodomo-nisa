"use client";

import { useState } from "react";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        let response: Response;
        try {
            response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
        } catch {
            setStatus("error");
            setErrorMessage("通信に失敗しました。インターネット接続をご確認のうえ、再度お試しください。");
            return;
        }

        // エラー時にHTMLが返ってきても落ちないよう、JSONの解析失敗は許容する
        const result: { error?: string } = await response.json().catch(() => ({}));

        if (!response.ok) {
            setStatus("error");
            setErrorMessage(
                result.error ||
                    "送信に失敗しました。お手数ですが、時間をおいて再度お試しください。"
            );
            return;
        }

        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    if (status === "success") {
        return (
            <div className="py-10" role="status">
                <h2 className="heading-section !text-[1.5rem]">送信完了しました</h2>
                <p className="mt-3 text-[var(--color-text-secondary)]">
                    お問い合わせいただきありがとうございます。内容を確認の上、ご連絡いたします。
                </p>
                <button onClick={() => setStatus("idle")} className="link-arrow mt-5">
                    新しいお問い合わせを送る
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="input-label">
                        お名前 <span className="text-[var(--color-accent)]" aria-label="必須">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={100}
                        placeholder="山田 太郎"
                        className="input-field"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="input-label">
                        メールアドレス <span className="text-[var(--color-accent)]" aria-label="必須">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className="input-field"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="subject" className="input-label">
                    件名 <span className="text-[var(--color-accent)]" aria-label="必須">*</span>
                </label>
                <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                >
                    <option value="">選択してください</option>
                    <option value="制度に関するご質問">制度に関するご質問</option>
                    <option value="サイトへのご意見・ご要望">サイトへのご意見・ご要望</option>
                    <option value="取材のご依頼">取材のご依頼</option>
                    <option value="コラボレーションのご提案">コラボレーションのご提案</option>
                    <option value="その他">その他</option>
                </select>
            </div>

            <div>
                <label htmlFor="message" className="input-label">
                    お問い合わせ内容 <span className="text-[var(--color-accent)]" aria-label="必須">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={5000}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="お問い合わせ内容をご記入ください"
                    className="input-field resize-y"
                />
            </div>

            {status === "error" && (
                <p className="notice-caution" role="alert">{errorMessage}</p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary sm:min-w-[12rem] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {status === "submitting" ? "送信中..." : "送信する"}
                </button>
                <p className="note">※ 通常2〜3営業日以内にご返信いたします</p>
            </div>
        </form>
    );
}
