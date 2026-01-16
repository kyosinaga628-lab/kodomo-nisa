// NISA Calculator Logic with Enhanced Features
// Based on 2026 Tax Reform (令和8年度税制改正大綱)

export interface SimulationInput {
    monthlyAmount: number;      // 月額積立額（円）
    childAge: number;           // 子どもの現在年齢
    expectedReturn: number;     // 期待リターン（%）
}

export interface SimulationResult {
    totalInvestment: number;    // 投資元本
    finalValue: number;         // 最終評価額
    totalGain: number;          // 運用益
    taxSaved: number;           // 節税額（約20%）
    yearlyData: YearlyData[];   // 年別データ
    investmentYears: number;    // 実際の投資可能年数
    limitReachedYear: number | null; // 600万円上限到達年
}

export interface YearlyData {
    year: number;
    age: number;
    invested: number;
    value: number;
    gain: number;
    canWithdraw: boolean;       // 払出し可能か
    withdrawReason: string;     // 払出し条件
}

// 比較用のデータ型
export interface ComparisonData {
    year: number;
    bankDeposit: number;
    nisaGlobal: number;
    highYieldBank: number;
}

// 税制大綱に基づく定数
const TAX_RATE = 0.20315;           // 所得税15.315% + 住民税5%
const ANNUAL_LIMIT = 600000;        // 年間投資上限: 60万円
const TOTAL_LIMIT = 6000000;        // 非課税保有限度額: 600万円
const MAX_AGE = 17;                 // 最大投資可能年齢（18歳未満）
const ADULT_TRANSITION_AGE = 18;    // 成人NISA移行年齢
const WITHDRAWAL_AGE = 12;          // 教育費払出し可能年齢

// 銀行預金金利・参考利回り
const BANK_RATE = 0.001;            // 銀行預金金利 0.001%
const GLOBAL_STOCK_RATE = 5;        // 全世界株式平均リターン
const HIGH_YIELD_BANK_RATE = 0.3;   // ネット銀行（高金利）預金金利

export function calculateNISA(input: SimulationInput): SimulationResult {
    const { monthlyAmount, childAge, expectedReturn } = input;

    const monthlyRate = expectedReturn / 100 / 12;
    const yearlyData: YearlyData[] = [];

    let currentValue = 0;
    let totalInvested = 0;
    let limitReachedYear: number | null = null;

    // 投資可能年数を計算（現在年齢から17歳まで）
    const investmentYears = Math.max(0, MAX_AGE - childAge + 1);

    for (let year = 1; year <= investmentYears; year++) {
        const currentAge = childAge + year - 1;

        // 年間投資額を計算（上限チェック）
        const plannedYearlyInvestment = monthlyAmount * 12;
        const remainingLimit = TOTAL_LIMIT - totalInvested;
        const actualYearlyInvestment = Math.min(
            plannedYearlyInvestment,
            ANNUAL_LIMIT,
            remainingLimit
        );

        // 600万円上限に達した場合
        if (remainingLimit <= 0) {
            if (!limitReachedYear) {
                limitReachedYear = year - 1;
            }
            // 運用のみ継続（新規投資なし）
            for (let month = 0; month < 12; month++) {
                currentValue = currentValue * (1 + monthlyRate);
            }
        } else {
            // 月次計算
            const monthlyInvestment = actualYearlyInvestment / 12;
            for (let month = 0; month < 12; month++) {
                currentValue = (currentValue + monthlyInvestment) * (1 + monthlyRate);
                totalInvested += monthlyInvestment;

                // 上限到達チェック
                if (totalInvested >= TOTAL_LIMIT && !limitReachedYear) {
                    limitReachedYear = year;
                }
            }
        }

        // 払出し条件の判定
        let canWithdraw = false;
        let withdrawReason = "";

        if (currentAge < WITHDRAWAL_AGE) {
            canWithdraw = false;
            withdrawReason = "災害時のみ払出し可能";
        } else if (currentAge < ADULT_TRANSITION_AGE) {
            canWithdraw = true;
            withdrawReason = "教育費・生活費での払出し可能";
        } else {
            canWithdraw = true;
            withdrawReason = "成人NISA移行後、自由に払出し可能";
        }

        yearlyData.push({
            year,
            age: currentAge,
            invested: Math.round(totalInvested),
            value: Math.round(currentValue),
            gain: Math.round(currentValue - totalInvested),
            canWithdraw,
            withdrawReason,
        });
    }

    // 18歳到達後も成人NISAで運用継続（追加で5年分表示）
    for (let year = investmentYears + 1; year <= investmentYears + 5; year++) {
        const currentAge = childAge + year - 1;

        // 成人NISA移行後は運用継続（新規投資なし、元本維持）
        for (let month = 0; month < 12; month++) {
            currentValue = currentValue * (1 + monthlyRate);
        }

        yearlyData.push({
            year,
            age: currentAge,
            invested: Math.round(totalInvested),
            value: Math.round(currentValue),
            gain: Math.round(currentValue - totalInvested),
            canWithdraw: true,
            withdrawReason: "成人NISA移行後、自由に払出し可能",
        });
    }

    const finalValue = Math.round(currentValue);
    const totalGain = finalValue - totalInvested;
    const taxSaved = Math.round(totalGain * TAX_RATE);

    return {
        totalInvestment: Math.round(totalInvested),
        finalValue,
        totalGain,
        taxSaved,
        yearlyData,
        investmentYears,
        limitReachedYear,
    };
}

// 比較データの生成
export function generateComparisonData(monthlyAmount: number, years: number): ComparisonData[] {
    const data: ComparisonData[] = [];

    let bankValue = 0;
    let globalValue = 0;
    let highYieldValue = 0;

    const bankMonthlyRate = BANK_RATE / 100 / 12;
    const globalMonthlyRate = GLOBAL_STOCK_RATE / 100 / 12;
    const highYieldMonthlyRate = HIGH_YIELD_BANK_RATE / 100 / 12;

    for (let year = 1; year <= years; year++) {
        for (let month = 0; month < 12; month++) {
            bankValue = (bankValue + monthlyAmount) * (1 + bankMonthlyRate);
            globalValue = (globalValue + monthlyAmount) * (1 + globalMonthlyRate);
            highYieldValue = (highYieldValue + monthlyAmount) * (1 + highYieldMonthlyRate);
        }

        data.push({
            year,
            bankDeposit: Math.round(bankValue),
            nisaGlobal: Math.round(globalValue),
            highYieldBank: Math.round(highYieldValue),
        });
    }

    return data;
}

// 利回りに応じた専門家コメント
export function getExpertComment(expectedReturn: number): {
    title: string;
    comment: string;
    context: string;
    riskLevel: "low" | "medium" | "high";
} {
    if (expectedReturn <= 2) {
        return {
            title: "超保守的なシナリオ",
            comment: "この利回りは、先進国の国債や定期預金に相当します。",
            context: "インフレ率（年2%前後）を考慮すると、実質的な資産価値は目減りする可能性があります。長期投資では株式を含むポートフォリオの方が有利な場合が多いです。",
            riskLevel: "low"
        };
    } else if (expectedReturn <= 4) {
        return {
            title: "保守的なシナリオ",
            comment: "この利回りは、バランス型ファンド（債券中心）や高格付け社債に相当します。",
            context: "安定性を重視した運用で、大きな値動きは抑えられますが、インフレに対する備えとしては十分とは言えません。",
            riskLevel: "low"
        };
    } else if (expectedReturn <= 6) {
        return {
            title: "世界経済の標準成長シナリオ",
            comment: "この利回りは、全世界株式インデックスファンドの長期平均リターンに相当します。",
            context: "過去30年の全世界株式の平均リターンは年率約5〜7%です。こどもNISAで最も多く選ばれる「オルカン」などのインデックスファンドが該当します。",
            riskLevel: "medium"
        };
    } else if (expectedReturn <= 8) {
        return {
            title: "やや積極的なシナリオ",
            comment: "この利回りは、米国株式や新興国株式を含むグロース重視のポートフォリオに相当します。",
            context: "米国S&P500の過去30年平均は年10%程度。短期的な変動は大きいですが、18年という長期運用期間を活かせる設定です。",
            riskLevel: "medium"
        };
    } else {
        return {
            title: "積極運用シナリオ",
            comment: "この利回りは、米国株式（S&P500やNASDAQ）の過去平均リターンに近い水準です。",
            context: "高いリターンが期待できる反面、リスクも相応に高くなります。十分な運用期間を確保できる場合に向いています。",
            riskLevel: "high"
        };
    }
}

// こどもNISA制度の基本情報
export const KODOMO_NISA_INFO = {
    name: "こどもNISA",
    officialName: "未成年者特定累積投資勘定",
    annualLimit: ANNUAL_LIMIT,
    totalLimit: TOTAL_LIMIT,
    targetAge: { min: 0, max: 17 },
    eligibleProducts: [
        "公募等株式投資信託（つみたて投資枠対象商品）",
        "金融庁が定める基準を満たすインデックスファンド",
        "一部のアクティブファンド"
    ],
    withdrawalRules: [
        { ageRange: "0〜11歳", rule: "災害時のみ払出し可能", detail: "居住家屋の全壊など、税務署長の確認を受けた場合" },
        { ageRange: "12〜17歳", rule: "教育費・生活費での払出し可能", detail: "入学金、授業料、生活費等の支払いに限定。親権者等の手続きと本人同意が必要" },
        { ageRange: "18歳以降", rule: "自由に払出し可能", detail: "成人NISAへ自動移行。非課税のまま運用継続または売却が可能" }
    ],
    startDate: "2027年1月1日（令和9年）予定",
    taxBenefit: "運用益・配当金が非課税（通常は約20%課税）"
};

export function formatCurrency(value: number): string {
    if (value >= 100000000) {
        return `${(value / 100000000).toFixed(1)}億円`;
    } else if (value >= 10000) {
        return `${Math.round(value / 10000).toLocaleString()}万円`;
    }
    return `${value.toLocaleString()}円`;
}

export function formatCurrencyFull(value: number): string {
    return `${value.toLocaleString()}円`;
}
