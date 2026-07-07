// ホームページ「最新の政策動向」のニュースデータ
// 更新方法: このファイルに新しい項目を先頭に追加する（表示は配列順）
// isExternal: true は外部リンク、false はサイト内リンク

export interface NewsItem {
    id: number;
    date: string; // "YYYY.MM.DD"
    category: string;
    title: string;
    excerpt: string;
    href: string;
    isExternal: boolean;
}

export const newsItems: NewsItem[] = [
    {
        id: 7,
        date: "2026.06.16",
        category: "金融政策",
        title: "日銀、政策金利を1.0%に引き上げ — 預金金利も上昇へ",
        excerpt: "6月の金融政策決定会合で0.75%から1.0%への追加利上げを決定。メガバンクは8月から普通預金金利を0.40%に引き上げ。預金と積立投資の使い分けが一層重要に。",
        href: "https://www.boj.or.jp/mopo/mpmdeci/index.htm",
        isExternal: true,
    },
    {
        id: 6,
        date: "2026.05.26",
        category: "専門家解説",
        title: "大和総研が「こどもNISAの概要」レポートを公表",
        excerpt: "払出しルール（中学入学前は災害等のみ、入学年以降は教育費・生活費で可能）や定時・定額買付への限定など、確定した制度詳細を整理した解説レポート。",
        href: "https://www.dir.co.jp/report/research/law-research/tax/20260526_025774.html",
        isExternal: true,
    },
    {
        id: 5,
        date: "2026.03.31",
        category: "税制改正",
        title: "令和8年度税制改正法が成立、こどもNISAの2027年1月開始が確定",
        excerpt: "参院本会議で可決・成立。年間60万円・非課税保有限度額600万円の「こどもNISA（未成年者特定累積投資勘定）」が法律上確定しました。",
        href: "https://www.mof.go.jp/tax_policy/tax_reform/outline/fy2026/index.html",
        isExternal: true,
    },
    {
        id: 4,
        date: "2026.07.07",
        category: "解説記事",
        title: "【2026年7月更新】こどもNISAの確定した制度内容と今からの準備",
        excerpt: "法成立で確定した制度スペックと払出しルール、口座開設までのスケジュールを最新情報で整理しました。",
        href: "/policy-curation/kodomo-nisa-2026-july-update",
        isExternal: false,
    },
];
