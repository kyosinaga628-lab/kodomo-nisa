"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "送信に失敗しました");
            }

            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            setStatus("error");
            setErrorMessage(
                error instanceof Error ? error.message : "送信に失敗しました"
            );
        }
    };

    const inputClasses =
        "w-full px-4 py-3 rounded-xl border border-[var(--glass-border)] bg-white/50 focus:bg-white focus:border-[var(--color-royal-blue)] focus:ring-2 focus:ring-[var(--color-royal-blue)]/20 outline-none transition-all duration-200 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]";

    return (
        <div className="w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-12"
                    >
                        <div className="w-16 h-16 rounded-full bg-[var(--color-emerald)]/10 flex items-center justify-center mx-auto mb-4">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--color-emerald)"
                                strokeWidth="2"
                            >
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-xl font-semibold mb-2 text-[var(--color-text-primary)]">
                            送信完了しました
                        </h3>
                        <p className="text-[var(--color-text-secondary)] mb-6">
                            お問い合わせいただきありがとうございます。
                            <br />
                            内容を確認の上、ご連絡いたします。
                        </p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="text-[var(--color-royal-blue)] hover:underline font-medium"
                        >
                            新しいお問い合わせを送る
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                                >
                                    お名前 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="山田 太郎"
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                                >
                                    メールアドレス <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                            >
                                件名 <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className={inputClasses}
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
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                            >
                                お問い合わせ内容 <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="お問い合わせ内容をご記入ください"
                                className={`${inputClasses} resize-none`}
                            />
                        </div>

                        {status === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                            >
                                {errorMessage}
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            disabled={status === "submitting"}
                            whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                            whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {status === "submitting" ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    送信中...
                                </>
                            ) : (
                                <>
                                    送信する
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                </>
                            )}
                        </motion.button>

                        <p className="text-xs text-center text-[var(--color-text-muted)]">
                            ※ 通常2〜3営業日以内にご返信いたします
                        </p>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
