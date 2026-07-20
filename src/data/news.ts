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
        id: 11,
        date: "2026.07.15",
        category: "日本銀行",
        title: "金融政策決定会合議事録等（2016年1月～6月開催分）",
        excerpt: "日本銀行の公式発表です。詳細はリンク先をご確認ください。",
        href: "http://www.boj.or.jp/mopo/mpmsche_minu/record_2016/gjrk.htm",
        isExternal: true,
    },
    {
        id: 8,
        date: "2026.07.13",
        category: "金融庁",
        title: "金融経済教育イベント「ワニーサと学ぶ 未来のためのお金の教室 in旭川」の開催について公表しました。",
        excerpt: "金融経済教育イベント「ワニーサと学ぶ 未来のためのお金の教室 in旭川」の開催について公表しました。詳しくは特設サイトをご覧ください。",
        href: "https://www.fsa.go.jp/news/r8/sonota/20260713/20260713.html",
        isExternal: true,
    },
    {
        id: 9,
        date: "2026.07.09",
        category: "財務省",
        title: "令和８年度　税制改正の解説",
        excerpt: "財務省の公式発表です。詳細はリンク先をご確認ください。",
        href: "https://www.mof.go.jp/tax_policy/tax_reform/outline/fy2026/explanation/index.html",
        isExternal: true,
    },
    {
        id: 10,
        date: "2026.07.08",
        category: "財務省",
        title: "「令和８年度税制改正」（令和８年４月発行）",
        excerpt: "財務省の公式発表です。詳細はリンク先をご確認ください。",
        href: "https://www.mof.go.jp/tax_policy/publication/brochure/zeisei26.html",
        isExternal: true,
    },
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
