import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// 送信元・送信先は環境変数で上書き可能。
// 注意: onboarding@resend.dev（Resendのテスト用ドメイン）からは、Resendアカウント登録メールアドレス宛てにしか送れない。
// 独自ドメインを Resend で認証したら CONTACT_FROM_EMAIL を "こどもNISA研究所 <info@kodomo-nisa.jp>" などに変更する。
const DEFAULT_FROM = "こどもNISA研究所 <onboarding@resend.dev>";
const DEFAULT_TO = "enepen789@gmail.com";

const MAX_LENGTH = { name: 100, email: 254, subject: 100, message: 5000 } as const;

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function errorResponse(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

// 一時的な不具合時にユーザーへ返す共通メッセージ
const UNAVAILABLE_MESSAGE =
    "現在、お問い合わせフォームが一時的にご利用いただけません。お手数ですが、時間をおいて再度お試しください。";

export async function POST(request: NextRequest) {
    let body: Partial<ContactFormData>;
    try {
        body = await request.json();
    } catch {
        return errorResponse("送信内容を読み取れませんでした。ページを再読み込みしてお試しください。", 400);
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    // Validation
    if (!name || !email || !subject || !message) {
        return errorResponse("すべての項目を入力してください", 400);
    }

    if (
        name.length > MAX_LENGTH.name ||
        email.length > MAX_LENGTH.email ||
        subject.length > MAX_LENGTH.subject ||
        message.length > MAX_LENGTH.message
    ) {
        return errorResponse(`お問い合わせ内容は${MAX_LENGTH.message}文字以内でご入力ください`, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return errorResponse("有効なメールアドレスを入力してください", 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("[contact] RESEND_API_KEY is not configured. Set it in Vercel → Settings → Environment Variables and redeploy.");
        return errorResponse(UNAVAILABLE_MESSAGE, 503);
    }

    const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
    const to = (process.env.CONTACT_TO_EMAIL || DEFAULT_TO)
        .split(",")
        .map((address) => address.trim())
        .filter(Boolean);

    const safe = {
        name: escapeHtml(name),
        email: escapeHtml(email),
        subject: escapeHtml(subject),
        message: escapeHtml(message),
    };

    try {
        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
            from,
            to,
            replyTo: email,
            // 件名ヘッダーへの改行混入を防ぐ
            subject: `【お問い合わせ】${subject.replace(/[\r\n]+/g, " ")}`,
            text: `お名前: ${name}\nメールアドレス: ${email}\n件名: ${subject}\n\n${message}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
                        こどもNISA研究所 お問い合わせ
                    </h2>

                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style="padding: 10px; background: #f3f4f6; border: 1px solid #e5e7eb; width: 120px; font-weight: bold;">
                                お名前
                            </td>
                            <td style="padding: 10px; border: 1px solid #e5e7eb;">
                                ${safe.name}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                                メールアドレス
                            </td>
                            <td style="padding: 10px; border: 1px solid #e5e7eb;">
                                <a href="mailto:${safe.email}">${safe.email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                                件名
                            </td>
                            <td style="padding: 10px; border: 1px solid #e5e7eb;">
                                ${safe.subject}
                            </td>
                        </tr>
                    </table>

                    <h3 style="color: #374151; margin-top: 30px;">お問い合わせ内容</h3>
                    <div style="padding: 15px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; white-space: pre-wrap;">
${safe.message}
                    </div>

                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
                    <p style="color: #6b7280; font-size: 12px;">
                        このメールはこどもNISA研究所のお問い合わせフォームから送信されました。
                    </p>
                </div>
            `,
        });

        if (error) {
            // 401/403: APIキー失効・権限不足、または onboarding@resend.dev からアカウント外のアドレスへ送ろうとした
            console.error("[contact] Resend rejected the email:", JSON.stringify(error));
            return errorResponse(UNAVAILABLE_MESSAGE, 502);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[contact] Unexpected error while sending:", error);
        return errorResponse(UNAVAILABLE_MESSAGE, 500);
    }
}
