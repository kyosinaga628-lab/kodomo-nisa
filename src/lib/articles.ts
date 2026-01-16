// 記事データの型定義と構造化データ対応

export interface Article {
    id: number;
    slug: string;
    date: string;
    category: string;
    title: string;
    excerpt: string;
    content?: string; // Full article content in HTML or Markdown
    featured: boolean;
    importance: 1 | 2 | 3 | 4 | 5; // ★の数（重要度）
    tags: ArticleTag[]; // "速報", "深掘り", "政府資料" など
    tldr: string; // AI向けの要約（TL;DR）
    keyTakeaways: string[]; // 重要な結論（強調表示用）
    author: {
        name: string;
        title: string;
    };
    readTime: number; // 読了時間（分）
    externalUrl?: string; // 外部リンク（note記事など）
    source?: string; // 情報源（"note", "公式サイト", "YouTube" など）
    thumbnail?: string; // サムネイル画像パス
}

export type ArticleTag = "速報" | "深掘り" | "政府資料" | "データ分析" | "実践ガイド" | "専門家解説" | "口座開設" | "初心者向け" | "おすすめ記事" | "動画解説" | "リスク管理" | "制度解説" | "家計診断" | "攻略・ポイ活" | "速報・実務" | "公式資料";

// サンプル記事データ
export const articles: Article[] = [
    // === こどもNISA概要解説 ===
    {
        id: 100,
        slug: "kodomo-nisa-overview",
        date: "2025.12.01",
        category: "制度解説",
        title: "こどもNISAとは？2026年スタート予定の新制度を徹底解説",
        excerpt: "子どもの資産形成を支援する新NISA制度「こどもNISA」の概要と活用ポイントを詳しく解説します。",
        content: `
        <p class="lead">「こどもNISA」は、2027年1月からスタートが予定されている、未成年者向けの少額投資非課税制度です。子どもの将来のための資産形成を、税制面から支援します。</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-[var(--color-royal-blue)]">こどもNISAの基本スペック</h2>
        
        <div class="overflow-x-auto">
            <table class="w-full border-collapse my-4">
                <tbody>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 px-4 py-3 text-left font-semibold">対象年齢</th>
                        <td class="border border-gray-300 px-4 py-3">0歳〜17歳の日本居住者</td>
                    </tr>
                    <tr>
                        <th class="border border-gray-300 px-4 py-3 text-left font-semibold">年間投資上限</th>
                        <td class="border border-gray-300 px-4 py-3">60万円（月5万円相当）</td>
                    </tr>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 px-4 py-3 text-left font-semibold">非課税保有限度額</th>
                        <td class="border border-gray-300 px-4 py-3">600万円（10年分）</td>
                    </tr>
                    <tr>
                        <th class="border border-gray-300 px-4 py-3 text-left font-semibold">非課税期間</th>
                        <td class="border border-gray-300 px-4 py-3">無期限（18歳到達後も継続）</td>
                    </tr>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 px-4 py-3 text-left font-semibold">対象商品</th>
                        <td class="border border-gray-300 px-4 py-3">金融庁が定める基準を満たす投資信託（つみたて投資枠と同様）</td>
                    </tr>
                    <tr>
                        <th class="border border-gray-300 px-4 py-3 text-left font-semibold">払出し</th>
                        <td class="border border-gray-300 px-4 py-3">12歳以降可能（検討中）</td>
                    </tr>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 px-4 py-3 text-left font-semibold">18歳到達時</th>
                        <td class="border border-gray-300 px-4 py-3">成人NISAへ自動移行</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-[var(--color-royal-blue)]">なぜ「こどもNISA」が注目されるのか？</h2>
        
        <div class="bg-emerald-50 p-5 rounded-lg my-6 border-l-4 border-emerald-500">
            <h4 class="font-bold text-emerald-800 mb-3">3つの大きなメリット</h4>
            <ul class="space-y-2 text-emerald-900">
                <li><strong>① 長期投資の威力</strong>：0歳から始めれば18年間の運用期間。複利効果を最大限に活かせます。</li>
                <li><strong>② 金融教育の実践</strong>：お子様と一緒に投資を学ぶきっかけになります。</li>
                <li><strong>③ 親NISA枠の温存</strong>：お子様専用の非課税枠ができることで、世帯全体の非課税投資枠が拡大します。</li>
            </ul>
        </div>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-[var(--color-royal-blue)]">シミュレーション例</h2>
        <p class="mb-4">月5万円を10年間（非課税枠上限600万円）、その後も年利5%で運用した場合の試算：</p>
        
        <div class="grid grid-cols-2 gap-4 my-6">
            <div class="bg-blue-50 p-4 rounded-lg text-center">
                <p class="text-sm text-blue-600 mb-1">元本（積立総額）</p>
                <p class="text-2xl font-bold text-blue-800">600万円</p>
            </div>
            <div class="bg-emerald-50 p-4 rounded-lg text-center">
                <p class="text-sm text-emerald-600 mb-1">18歳時の予想資産</p>
                <p class="text-2xl font-bold text-emerald-800">約940万円</p>
            </div>
        </div>
        <p class="text-center font-bold text-lg">運用益：約340万円（非課税）</p>
        <p class="text-sm text-gray-500 text-center mt-2">※あくまでシミュレーションであり、将来のリターンを保証するものではありません。</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-[var(--color-royal-blue)]">今から準備できること</h2>
        <ul class="list-disc list-inside space-y-2 mb-6">
            <li>親御さん自身の新NISA枠（年間360万円）の活用状況を確認</li>
            <li>家計の中でお子様分の積立余力を試算</li>
            <li>証券会社の口座開設の流れを把握しておく</li>
            <li>投資先の候補（低コストインデックスファンド）を調べておく</li>
        </ul>

        <div class="bg-yellow-50 p-5 rounded-lg my-6 border-l-4 border-yellow-500">
            <h4 class="font-bold text-yellow-800 mb-2">ご注意</h4>
            <p class="text-yellow-900 text-sm">本記事は2025年12月時点の情報に基づいています。制度の詳細は今後の法改正により変更される可能性があります。最新情報は金融庁の公式発表をご確認ください。</p>
        </div>
        `,
        featured: true,
        importance: 5,
        tags: ["制度解説", "初心者向け"],
        tldr: "こどもNISAは2027年1月開始予定の未成年向け非課税投資制度。年間60万円、非課税保有限度額600万円。0歳から18年運用で複利効果を最大化。12歳からの払出しも検討中。",
        keyTakeaways: [
            "年間投資上限60万円（月5万円相当）",
            "非課税保有限度額600万円（10年分）",
            "18歳到達時に成人NISAへ自動移行"
        ],
        author: {
            name: "こどもNISA研究所",
            title: "編集部"
        },
        readTime: 5,
        thumbnail: "/images/articles/guide.png"
    },

    // === 政策・制度解説 ===
    {
        id: 1,
        slug: "2026-tax-reform-kodomo-nisa",
        date: "2026.01.10",
        category: "税制改正",
        title: "政府資料を読み解く：2026年度税制改正の核心",
        excerpt: "政府・与党は2026年度税制改正大綱を決定。こどもNISA（未成年者特定累積投資勘定）の創設と、手続きのデジタル化が明記されました。実務への影響を読み解きます。",
        content: `
        <p class="lead">2025年12月26日、政府・与党は「令和8年度（2026年度）税制改正大綱」を決定しました。本改正は、資産所得倍増プランの総仕上げとして、若年層の資産形成支援を強力に推し進める内容となっています。</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-[var(--color-royal-blue)]">1. こどもNISA（未成年者特定累積投資勘定）の創設</h2>
        <p class="mb-4">最大の焦点は、こどもNISA（未成年者特定累積投資勘定）の創設です。大綱では、0歳〜17歳を対象に<strong>年間投資上限60万円、非課税保有限度額600万円</strong>の制度が明記されました。</p>
        <p class="mb-4">月額換算で5万円の積立が可能となり、10年間で非課税枠の上限に達することができます。18歳到達時には成人NISAへ自動移行し、非課税のまま運用を継続できます。</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-[var(--color-royal-blue)]">2. 対象商品と指数（インデックス）連動ファンド</h2>
        <p class="mb-4">こどもNISAでは、成人のつみたて投資枠と同様、<strong>金融庁が定める基準を満たした投資信託</strong>が対象となります。その中心は「インデックスファンド」と呼ばれる、特定の株価指数に連動する投資信託です。</p>
        
        <div class="bg-emerald-50 p-4 rounded-lg my-6 border-l-4 border-emerald-500">
            <h4 class="font-bold text-emerald-800 mb-2">指数（インデックス）とは？</h4>
            <p class="text-emerald-900 mb-2">株価指数とは、複数の株式の価格を一定のルールで平均化した数値です。市場全体の動きを把握するための「ものさし」として使われます。</p>
        </div>

        <h3 class="text-xl font-bold mt-6 mb-3 text-[var(--color-text-primary)]">代表的な指数</h3>
        <div class="overflow-x-auto">
            <table class="w-full border-collapse my-4">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 px-4 py-2 text-left">指数名</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">対象地域</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">特徴</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border border-gray-300 px-4 py-2 font-semibold">MSCI ACWI</td>
                        <td class="border border-gray-300 px-4 py-2">全世界</td>
                        <td class="border border-gray-300 px-4 py-2">先進国23カ国＋新興国24カ国、約3,000銘柄。「オルカン」の連動対象</td>
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="border border-gray-300 px-4 py-2 font-semibold">S&P500</td>
                        <td class="border border-gray-300 px-4 py-2">米国</td>
                        <td class="border border-gray-300 px-4 py-2">米国を代表する大型株500銘柄。Apple、Microsoft等を含む</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 px-4 py-2 font-semibold">MSCI Kokusai</td>
                        <td class="border border-gray-300 px-4 py-2">先進国（日本除く）</td>
                        <td class="border border-gray-300 px-4 py-2">日本を除く先進国22カ国、約1,300銘柄</td>
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="border border-gray-300 px-4 py-2 font-semibold">TOPIX</td>
                        <td class="border border-gray-300 px-4 py-2">日本</td>
                        <td class="border border-gray-300 px-4 py-2">東証プライム市場の全銘柄、約2,000社</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="bg-yellow-50 p-4 rounded-lg my-6 border-l-4 border-yellow-500">
            <h4 class="font-bold text-yellow-800 mb-2">なぜインデックスファンドが推奨されるのか？</h4>
            <ul class="list-disc list-inside text-yellow-900 space-y-1">
                <li><strong>低コスト</strong>：信託報酬（運用手数料）が年0.1%以下のものも多い</li>
                <li><strong>分散投資</strong>：1本で数百〜数千の企業に自動分散</li>
                <li><strong>透明性</strong>：指数に連動するため、値動きの理由がわかりやすい</li>
                <li><strong>長期実績</strong>：過去30年、全世界株式は年平均約5〜7%のリターン</li>
            </ul>
        </div>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-[var(--color-royal-blue)]">3. 手続きの「デジタル化」推進</h2>
        <p class="mb-4">実務面での大きな変更点は、口座開設プロセスの簡素化です。マイナンバーカードを用いた公的個人認証サービスとの連携により、住民票の写し等の書類提出が不要になる方向で調整が進んでいます。</p>
        <div class="bg-blue-50 p-4 rounded-lg my-6 border-l-4 border-blue-500">
            <h4 class="font-bold text-blue-800 mb-2">改正後の手続きイメージ</h4>
            <ul class="list-disc list-inside text-blue-900 space-y-1">
                <li>親による代理申請のオンライン完結</li>
                <li>住民票等の紙書類の提出撤廃</li>
                <li>金融機関間の口座変更手続きの迅速化</li>
            </ul>
        </div>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-[var(--color-royal-blue)]">4. 制度開始に向けた準備</h2>
        <p class="mb-4">こどもNISAは2027年1月1日からの開始が予定されています。口座開設の受付は2026年秋頃から各証券会社で開始される見込みです。</p>
        <p class="mb-4">親御さんへのアドバイスとしては、まずはご自身の新NISA枠（年間360万円）の活用状況を見直し、お子様分の資金余力がどの程度あるかを試算しておくことをお勧めします。</p>

        <hr class="my-8 border-gray-200">
        
        <h3 class="text-lg font-bold mb-2">参考資料</h3>
        <p class="text-sm text-gray-600">
            <a href="https://www.mof.go.jp/tax_policy/tax_reform/outline/fy2026/20251226taikou.pdf" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline flex items-center gap-1">
                令和8年度税制改正大綱（PDF） - 財務省
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
        </p>
        `,
        featured: true,
        importance: 5,
        tags: ["政府資料", "速報", "制度解説"],
        tldr: "2026年度税制改正でこどもNISA（未成年者特定累積投資勘定）が創設。年間60万円、非課税保有限度額600万円。2027年1月開始予定。",
        keyTakeaways: [
            "年間投資上限は60万円（月5万円）",
            "非課税保有限度額は600万円",
            "2027年1月からの施行を目指して制度設計が進行中"
        ],
        author: {
            name: "こどもNISA研究所",
            title: "編集部"
        },
        readTime: 8,
        thumbnail: "/images/articles/official.png"
    },

    // === メディア掲載・外部記事 ===
    {
        id: 101,
        slug: "diamond-online-nisa-risk",
        date: "2026.01.14",
        category: "おすすめ記事",
        title: "「大学資金の全額NISA依存」を禁じ手と断じるリスク啓蒙",
        excerpt: "出口戦略としての「暴落時の対応」や金融所得課税増税への備えとしてのNISA活用論。リスク管理を重視する親御さん必読。",
        featured: true,
        importance: 5,
        tags: ["リスク管理", "専門家解説", "おすすめ記事"],
        tldr: "大学資金を全てNISAで用意するリスクについて解説。暴落時の対応や、税制変更への備えなど、批判的視点からの分析。",
        keyTakeaways: [
            "大学資金の全額をNISAに依存するのはリスクが高い",
            "出口戦略としての暴落時の対応策について詳説",
            "金融所得課税増税への備えとしてNISAを活用する視点"
        ],
        author: {
            name: "深野康彦",
            title: "ファイナンシャルプランナー"
        },
        readTime: 5,
        externalUrl: "https://diamond.jp/articles/-/379200",
        source: "Diamond Online",
        thumbnail: "/images/articles/risk.png"
    },
    {
        id: 201,
        slug: "asset-expo-nisa-comparison",
        date: "2026.01.14",
        category: "制度解説",
        title: "資産形成EXPO：旧ジュニアNISAと新制度のスペック比較",
        excerpt: "旧ジュニアNISAと新制度のスペックを表形式で並列させ、一目で違いが分かる構成。「いつから？」という検索意図に即答するスタイル。",
        featured: false,
        importance: 4,
        tags: ["制度解説", "初心者向け"],
        tldr: "新旧NISA制度の比較表。利用開始時期や非課税枠の違いなど、スペック面での差異を明確に整理。",
        keyTakeaways: [
            "新旧制度のスペック比較表",
            "利用開始時期の明確化",
            "制度移行のポイント"
        ],
        author: {
            name: "資産形成EXPO",
            title: "編集部"
        },
        readTime: 3,
        externalUrl: "https://www.am-expo.jp/hub/ja-jp/blog/article_62.html",
        source: "資産形成EXPO",
        thumbnail: "/images/articles/comparison.png"
    },
    {
        id: 202,
        slug: "moneyforward-financial-planning",
        date: "2026.01.14",
        category: "家計診断",
        title: "Money Forward：教育資金設計としてのNISA活用判断",
        excerpt: "FP（ファイナンシャルプランナー）の視点から「利用すべきか？」という判断基準を提示。教育資金設計の一部としてNISAを位置づける。",
        featured: false,
        importance: 4,
        tags: ["実践ガイド", "専門家解説", "家計診断"],
        tldr: "FP視点でのNISA活用判断ガイド。家計全体のバランスを見た上での教育資金設計のアドバイス。",
        keyTakeaways: [
            "利用可否の判断基準チャート",
            "教育資金設計におけるNISAの位置付け",
            "家計診断との連携"
        ],
        author: {
            name: "Money Forward",
            title: "編集部"
        },
        readTime: 4,
        externalUrl: "https://media.moneyforward.com/articles/10475/summary",
        source: "Money Forward",
        thumbnail: "/images/articles/family.png"
    },
    {
        id: 203,
        slug: "nikkin-online-system",
        date: "2026.01.14",
        category: "速報・実務",
        title: "ニッキンONLINE：金融業界から見たNISAの裏側",
        excerpt: "金融業界紙ならではの「システム対応」「遡及課税」といった裏側の事情に言及。情報の深度が深く、実務的な側面を知りたい方向け。",
        featured: false,
        importance: 4,
        tags: ["速報", "深掘り", "専門家解説", "速報・実務"],
        tldr: "金融機関のシステム対応状況や税制の実務的詳細など、業界紙ならではの深い情報。",
        keyTakeaways: [
            "システム対応の現状と課題",
            "遡及課税などの実務的リスク",
            "金融業界の動向分析"
        ],
        author: {
            name: "ニッキンONLINE",
            title: "編集部"
        },
        readTime: 6,
        externalUrl: "https://www.nikkinonline.com/report-toushin/article/353110",
        source: "ニッキンONLINE",
        thumbnail: "/images/articles/risk.png"
    },
    {
        id: 102,
        slug: "gentosha-nisa-strategy",
        date: "2026.01.13",
        category: "攻略・ポイ活",
        title: "幻冬舎ゴールドオンライン：SBI証券×クレカ積立のお得度徹底検証",
        excerpt: "「SBI証券」「クレカ積立」などのキーワードを多用し、お得度を強調。具体的な証券会社選びまで誘導する実践的な内容。",
        featured: false,
        importance: 4,
        tags: ["おすすめ記事", "実践ガイド", "攻略・ポイ活"],
        tldr: "ポイ活視点でのNISA活用術。SBI証券とクレカ積立の組み合わせによるポイント還元効果を試算。",
        keyTakeaways: [
            "クレカ積立のポイント還元率比較",
            "SBI証券の具体的な活用メリット",
            "お得に資産形成するテクニック"
        ],
        author: {
            name: "幻冬舎ゴールドオンライン",
            title: "編集部"
        },
        readTime: 4,
        externalUrl: "https://gentosha-go.com/articles/-/74488",
        source: "Gentosha",
        thumbnail: "/images/articles/comparison.png"
    },
    {
        id: 204,
        slug: "mof-tax-reform-2026",
        date: "2025.12.26",
        category: "公式資料",
        title: "【財務省】令和8年度税制改正大綱（PDF）",
        excerpt: "一次情報としての財務省公式資料。税制改正の正確な原文を確認したい方向け。こどもNISA関連の記述を含む。",
        featured: false,
        importance: 5,
        tags: ["政府資料", "データ分析", "公式資料"],
        tldr: "令和8年度税制改正大綱の原文PDF。NISA制度拡充に関する正確な文言と法的根拠を確認可能。",
        keyTakeaways: [
            "税制改正の正確な原文",
            "制度変更の法的根拠",
            "公式発表の詳細確認"
        ],
        author: {
            name: "財務省",
            title: "公式資料"
        },
        readTime: 20,
        externalUrl: "https://www.mof.go.jp/tax_policy/tax_reform/outline/fy2026/20251226taikou.pdf",
        source: "財務省",
        thumbnail: "/images/articles/official.png"
    },
    {
        id: 103,
        slug: "moneyplus-nisa-merit",
        date: "2026.01.12",
        category: "おすすめ記事",
        title: "12歳払出し開始の実生活へのメリット（中学受験等）",
        excerpt: "12歳からの払出しが可能になることでの実生活（中学受験など）へのメリットや、児童手当の運用活用法を提案。",
        featured: false,
        importance: 4,
        tags: ["実践ガイド", "おすすめ記事"],
        tldr: "12歳からの払出し開始が家計にもたらすメリットと、児童手当を活用した運用法の提案。",
        keyTakeaways: [
            "中学受験の費用などに充てられる12歳払出しのメリット",
            "アプリでの資産「見える化」との連携",
            "児童手当を原資とした無理のない運用"
        ],
        author: {
            name: "MONEY PLUS",
            title: "編集部"
        },
        readTime: 3,
        externalUrl: "https://media.moneyforward.com/articles/10483",
        source: "MONEY PLUS",
        thumbnail: "/images/articles/family.png"
    },

    // === NISA口座開設ガイド（証券会社リンク更新） ===
    {
        id: 7,
        slug: "sbi-nisa-account-guide",
        date: "2026.01.14",
        category: "口座開設",
        title: "SBI証券：未成年口座開設ガイドと公式サイト",
        excerpt: "【最大手・網羅性】未成年口座開設の複雑なパターン別ガイドや商品ラインナップの広さを確認。親権者口座との連携必須要件など。",
        featured: false,
        importance: 5,
        tags: ["口座開設", "実践ガイド"],
        tldr: "SBI証券の未成年口座開設ページ。パターン別ガイドや親権者口座要件など詳細情報。",
        keyTakeaways: [
            "未成年口座開設の複雑なパターン別ガイド",
            "商品ラインナップの広さ",
            "親権者口座との連携必須要件の解説"
        ],
        author: {
            name: "SBI証券",
            title: "公式サイト"
        },
        readTime: 1,
        externalUrl: "https://go.sbisec.co.jp/account/sogoflow_underage_01.html",
        source: "SBI証券",
        thumbnail: "/images/articles/guide.png"
    },
    {
        id: 8,
        slug: "rakuten-nisa-account-guide",
        date: "2026.01.14",
        category: "口座開設",
        title: "楽天証券：未成年口座開設ガイド（クレカ積立不可等の注意点）",
        excerpt: "【経済圏連携】楽天銀行との資金移動連携やポイント活用。未成年口座でのクレカ積立不可の明記など、重要事項を確認。",
        featured: false,
        importance: 4,
        tags: ["口座開設", "実践ガイド"],
        tldr: "楽天証券の未成年口座開設ページ。楽天銀行連携やポイント活用、未成年口座の注意点など。",
        keyTakeaways: [
            "楽天銀行との資金移動連携",
            "未成年口座でのクレカ積立不可の明記",
            "初心者向けのわかりやすいUI"
        ],
        author: {
            name: "楽天証券",
            title: "公式サイト"
        },
        readTime: 1,
        externalUrl: "https://www.rakuten-sec.co.jp/web/under_age/",
        source: "楽天証券",
        thumbnail: "/images/articles/guide.png"
    },
    {
        id: 104,
        slug: "matsui-nisa-account-guide",
        date: "2026.01.14",
        category: "口座開設",
        title: "松井証券：手厚いサポートと未成年口座開設",
        excerpt: "【サポート・独自性】郵送手続きの手厚いガイドや電話サポートの繋がりやすさ。貸株など独自機能の提案も。",
        featured: false,
        importance: 4,
        tags: ["口座開設", "初心者向け"],
        tldr: "松井証券の未成年口座開設ページ。手厚いサポートや独自機能について。",
        keyTakeaways: [
            "郵送手続きの手厚いガイド",
            "電話サポートの繋がりやすさ",
            "（枠外での）貸株など独自機能の提案"
        ],
        author: {
            name: "松井証券",
            title: "公式サイト"
        },
        readTime: 1,
        externalUrl: "https://www.matsui.co.jp/apply/under-age.html",
        source: "松井証券",
        thumbnail: "/images/articles/guide.png"
    },
    {
        id: 11,
        slug: "youtube-nisa-education-fund",
        date: "2026.01.06",
        category: "おすすめ記事",
        title: "【YouTube】両学長が解説！新NISAで教育資金を準備する方法",
        excerpt: "登録者数240万人超の人気YouTuber「両学長」が、新NISAを活用した教育資金の準備方法をわかりやすく解説。月3万円18年で1000万円の試算も。",
        featured: false,
        importance: 4,
        tags: ["おすすめ記事", "初心者向け", "動画解説"],
        tldr: "両学長による新NISAで教育資金を準備する方法。0歳から月3万円を18年間積み立て、年利5%で運用すれば約1000万円の資産形成が可能。親名義のNISAを活用する戦略を推奨。",
        keyTakeaways: [
            "まず親の新NISA枠（年360万円）を優先活用",
            "月3万円×18年×年利5%で約1000万円",
            "祖父母からの贈与（年110万円非課税）も戦略的に活用"
        ],
        author: {
            name: "両学長",
            title: "リベラルアーツ大学"
        },
        readTime: 15,
        externalUrl: "https://www.youtube.com/watch?v=QW_bPNyZN5U",
        source: "YouTube",
        thumbnail: "/images/articles/family.png"
    },

    // === 既存記事 ===
    {
        id: 9,
        slug: "best-investment-funds-for-kodomo-nisa",
        date: "2026.01.11",
        category: "投資商品",
        title: "こどもNISAにおすすめの投資信託5選【2026年版】",
        excerpt: "長期投資に最適な低コストインデックスファンドを厳選。eMAXIS Slim、楽天・全世界株式など、人気ファンドを徹底比較。",
        featured: true,
        importance: 5,
        tags: ["実践ガイド", "初心者向け", "専門家解説"],
        tldr: "こどもNISA向け投資信託TOP5：1位eMAXIS Slim全世界株式、2位楽天・全世界株式、3位SBI・V・全米株式、4位eMAXIS Slim米国株式、5位ニッセイ外国株式。信託報酬0.1%以下のファンドを選ぶのが鉄則。",
        keyTakeaways: [
            "信託報酬0.1%以下の低コストファンドを選ぶ",
            "全世界株式型なら分散投資が自動で実現",
            "18年の長期運用なら、短期の値動きを気にしない"
        ],
        author: {
            name: "こどもNISA研究所",
            title: "Policy Analyst"
        },
        readTime: 10,
        thumbnail: "/images/articles/comparison.png"
    },
    {
        id: 2,
        slug: "gx-investment-children-future",
        date: "2026.01.12",
        category: "経済分析",
        title: "GX投資と子供の未来：エネルギー転換が生む長期投資機会",
        excerpt: "グリーントランスフォーメーション（GX）投資は、子供たちの将来に大きな影響を与えます。エネルギー専門家の視点から、長期投資との結びつきを解説。",
        content: `<p>日本政府が推進するGX投資は、今後10年間で150兆円規模に達する見込みです...</p>`,
        featured: false,
        importance: 4,
        tags: ["深掘り", "データ分析", "専門家解説"],
        tldr: "GX投資は今後10年で150兆円規模。再生可能エネルギー、蓄電池、水素関連企業への長期投資が、こどもNISAと相性が良い。カーボンニュートラル達成に向けた制度設計と市場の成長が、子供世代の資産形成を後押し。",
        keyTakeaways: [
            "再生可能エネルギー関連企業の成長期待は年率8-12%と試算",
            "蓄電池市場は2030年までに現在の5倍に拡大する見込み",
            "長期保有前提のこどもNISAは、GX関連投資と極めて相性が良い"
        ],
        author: {
            name: "こどもNISA研究所",
            title: "Energy Economist"
        },
        readTime: 12,
        thumbnail: "/images/articles/family.png"
    },
    {
        id: 3,
        slug: "nisa-2026-changes",
        date: "2026.01.05",
        category: "制度解説",
        title: "【徹底解説】2026年からのNISA制度変更点まとめ",
        excerpt: "新年に伴う制度変更のポイントを整理。投資初心者にもわかりやすく解説します。",
        featured: false,
        importance: 3,
        tags: ["実践ガイド", "初心者向け"],
        tldr: "2026年のNISA制度運用における実務的な変更点を網羅。口座開設手続きの簡素化、金融機関のサービス拡充、スマホ完結型の投資環境整備が進展。",
        keyTakeaways: [
            "マイナンバーカード連携で口座開設が最短即日に",
            "主要ネット証券でこどもNISA専用アプリが登場",
            "投資信託の最低購入金額が100円からに統一"
        ],
        author: {
            name: "こどもNISA研究所",
            title: "Policy Analyst"
        },
        readTime: 6,
        thumbnail: "/images/articles/guide.png"
    },
    {
        id: 4,
        slug: "kodomo-nisa-usage-survey",
        date: "2025.12.28",
        category: "調査レポート",
        title: "こどもNISA利用状況調査：認知度は向上も、活用率に課題",
        excerpt: "当研究所独自調査により、制度認知と実際の活用にギャップがあることが判明。",
        featured: false,
        importance: 3,
        tags: ["データ分析"],
        tldr: "制度認知度は68%に達したが、実際の口座開設率は12%にとどまる。「何に投資すれば良いか分からない」が未開設理由の47%を占める。教育コンテンツとシミュレーターの充実が急務。",
        keyTakeaways: [
            "制度認知度68%に対し口座開設率は12%と大きなギャップ",
            "「投資先が分からない」が未開設理由の第1位（47%）",
            "金融教育と具体的な投資ガイドの整備が課題"
        ],
        author: {
            name: "こどもNISA研究所",
            title: "Policy Analyst"
        },
        readTime: 10,
        thumbnail: "/images/articles/risk.png"
    },
    {
        id: 5,
        slug: "fsa-asset-formation-youth",
        date: "2025.12.20",
        category: "政策分析",
        title: "金融庁の資産形成推進策：若年層へのアプローチを読み解く",
        excerpt: "金融庁が発表した報告書から、若年層の資産形成支援に向けた政策意図を探ります。",
        featured: false,
        importance: 4,
        tags: ["政府資料", "専門家解説"],
        tldr: "金融庁は「資産所得倍増プラン」の一環として、若年層の投資教育とNISA制度の普及を重点施策に位置づけ。高校での金融教育義務化と連動した制度設計を推進中。",
        keyTakeaways: [
            "高校での金融教育必修化に合わせNISA制度の認知拡大を図る",
            "デジタルネイティブ世代向けのUI/UX改善を金融機関に要請",
            "親世代への投資教育も並行して強化する方針"
        ],
        author: {
            name: "こどもNISA研究所",
            title: "Policy Analyst"
        },
        readTime: 9,
        thumbnail: "/images/articles/official.png"
    },
    {
        id: 6,
        slug: "uk-junior-isa-comparison",
        date: "2025.12.15",
        category: "比較分析",
        title: "海外の子ども向け投資優遇制度：英国ISAとの比較",
        excerpt: "英国のJunior ISAを参考に、日本のこどもNISA制度の特徴と今後の発展可能性を考察。",
        featured: false,
        importance: 3,
        tags: ["深掘り", "データ分析"],
        tldr: "英国Junior ISAは年間上限9,000ポンド（約180万円）で日本の3倍。ただし日本は非課税保有期間が無期限である点で優位。両制度の良い点を組み合わせた進化が期待される。",
        keyTakeaways: [
            "英国の年間投資上限は日本の約3倍（9,000ポンド）",
            "日本は非課税保有期間が無期限で長期投資に有利",
            "制度の成熟度では英国が先行、日本は拡充の余地が大きい"
        ],
        author: {
            name: "こどもNISA研究所",
            title: "Policy Analyst"
        },
        readTime: 11,
        thumbnail: "/images/articles/comparison.png"
    }
];

// Article Schema（JSON-LD）の生成
export function generateArticleSchema(article: Article) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "image": `https://kodomo-nisa-lab.jp/og-images/${article.slug}.jpg`,
        "datePublished": new Date(article.date.replace(/\./g, '-')).toISOString(),
        "dateModified": new Date(article.date.replace(/\./g, '-')).toISOString(),
        "author": {
            "@type": "Person",
            "name": article.author.name,
            "jobTitle": article.author.title
        },
        "publisher": {
            "@type": "Organization",
            "name": "こどもNISA研究所",
            "logo": {
                "@type": "ImageObject",
                "url": "https://kodomo-nisa-lab.jp/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://kodomo-nisa-lab.jp/policy-curation/${article.slug}`
        }
    };
}

// 重要度に応じたスターアイコンを返す
export function getImportanceStars(importance: number): string {
    return "★".repeat(importance) + "☆".repeat(5 - importance);
}

// タグに応じた色を返す
export function getTagColor(tag: ArticleTag): string {
    const colorMap: Record<ArticleTag, string> = {
        "速報": "bg-red-100 text-red-700",
        "深掘り": "bg-blue-100 text-blue-700",
        "政府資料": "bg-purple-100 text-purple-700",
        "データ分析": "bg-green-100 text-green-700",
        "実践ガイド": "bg-yellow-100 text-yellow-700",
        "専門家解説": "bg-indigo-100 text-indigo-700",
        "口座開設": "bg-emerald-100 text-emerald-700",
        "初心者向け": "bg-sky-100 text-sky-700",
        "おすすめ記事": "bg-pink-100 text-pink-700",
        "動画解説": "bg-orange-100 text-orange-700",
        "リスク管理": "bg-rose-100 text-rose-700",
        "制度解説": "bg-cyan-100 text-cyan-700",
        "家計診断": "bg-lime-100 text-lime-700",
        "攻略・ポイ活": "bg-amber-100 text-amber-700",
        "速報・実務": "bg-slate-100 text-slate-700",
        "公式資料": "bg-gray-100 text-gray-800"
    };
    return colorMap[tag] || "bg-gray-100 text-gray-700";
}
