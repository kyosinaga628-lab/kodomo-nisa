import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lazy initialization to avoid build-time errors
function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error("RESEND_API_KEY is not configured");
    }
    return new Resend(apiKey);
}

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();
        const { name, email, subject, message } = body;

        // Validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "すべてのフィールドを入力してください" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "有効なメールアドレスを入力してください" },
                { status: 400 }
            );
        }

        // Initialize Resend client lazily
        const resend = getResendClient();

        // Send email via Resend
        const { error } = await resend.emails.send({
            from: "こどもNISA研究所 <onboarding@resend.dev>",
            to: ["enepen789@gmail.com"],
            replyTo: email,
            subject: `【お問い合わせ】${subject}`,
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
                                ${name}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                                メールアドレス
                            </td>
                            <td style="padding: 10px; border: 1px solid #e5e7eb;">
                                <a href="mailto:${email}">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                                件名
                            </td>
                            <td style="padding: 10px; border: 1px solid #e5e7eb;">
                                ${subject}
                            </td>
                        </tr>
                    </table>
                    
                    <h3 style="color: #374151; margin-top: 30px;">お問い合わせ内容</h3>
                    <div style="padding: 15px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; white-space: pre-wrap;">
${message}
                    </div>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
                    <p style="color: #6b7280; font-size: 12px;">
                        このメールはこどもNISA研究所のお問い合わせフォームから送信されました。
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "メールの送信に失敗しました" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 }
        );
    }
}
