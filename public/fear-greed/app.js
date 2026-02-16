/* ============================================================
   Fear & Greed Index 日本版 - Application (Light Theme / CNN Style)
   ============================================================ */

(function () {
    'use strict';

    // ============================================================
    // Constants
    // ============================================================

    const SENTIMENT_CONFIG = {
        'extreme_fear': { label: '極度の恐怖', labelEn: 'EXTREME FEAR', class: 'extreme-fear', color: '#b71c1c' },
        'fear': { label: '恐怖', labelEn: 'FEAR', class: 'fear', color: '#e65100' },
        'neutral': { label: '中立', labelEn: 'NEUTRAL', class: 'neutral', color: '#757575' },
        'greed': { label: '貪欲', labelEn: 'GREED', class: 'greed', color: '#2e7d32' },
        'extreme_greed': { label: '極度の貪欲', labelEn: 'EXTREME GREED', class: 'extreme-greed', color: '#1b5e20' },
    };

    function getSentimentKey(score) {
        if (score <= 25) return 'extreme_fear';
        if (score <= 45) return 'fear';
        if (score <= 55) return 'neutral';
        if (score <= 75) return 'greed';
        return 'extreme_greed';
    }

    function getSentimentColor(score) {
        return SENTIMENT_CONFIG[getSentimentKey(score)].color;
    }

    function getSentimentClass(score) {
        return SENTIMENT_CONFIG[getSentimentKey(score)].class;
    }

    function getLabelForScore(score) {
        return SENTIMENT_CONFIG[getSentimentKey(score)].label;
    }

    // ============================================================
    // Gauge Drawing (Light Theme)
    // ============================================================

    function drawGauge(canvas, score) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const width = 400;
        const height = 250;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);

        const cx = width / 2;
        const cy = height - 30;
        const radius = 160;
        const startAngle = Math.PI;

        ctx.clearRect(0, 0, width, height);

        // Background arc segments
        const segments = [
            { start: 0, end: 0.25, color: '#b71c1c' },
            { start: 0.25, end: 0.45, color: '#e65100' },
            { start: 0.45, end: 0.55, color: '#9e9e9e' },
            { start: 0.55, end: 0.75, color: '#2e7d32' },
            { start: 0.75, end: 1.0, color: '#1b5e20' },
        ];

        ctx.lineWidth = 20;
        ctx.lineCap = 'round';

        // Draw full arc (lighter)
        segments.forEach(seg => {
            const a1 = startAngle + seg.start * Math.PI;
            const a2 = startAngle + seg.end * Math.PI;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, a1, a2);
            ctx.strokeStyle = seg.color + '40';
            ctx.stroke();
        });

        // Active arc
        segments.forEach(seg => {
            const targetFraction = score / 100;
            const segEnd = Math.min(seg.end, targetFraction);
            if (seg.start >= targetFraction) return;

            const a1 = startAngle + seg.start * Math.PI;
            const a2 = startAngle + segEnd * Math.PI;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, a1, a2);
            ctx.strokeStyle = seg.color;
            ctx.lineWidth = 20;
            ctx.lineCap = 'round';
            ctx.stroke();
        });

        // Needle
        const needleAngle = startAngle + (score / 100) * Math.PI;
        const needleLen = radius - 30;
        const nx = cx + Math.cos(needleAngle) * needleLen;
        const ny = cy + Math.sin(needleAngle) * needleLen;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = '#1a1a2e';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#1a1a2e';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
        ctx.fillStyle = getSentimentColor(score);
        ctx.fill();

        // Scale labels
        ctx.font = '600 12px Inter, Noto Sans JP, sans-serif';
        ctx.textAlign = 'center';

        const labels = [
            { value: 0, text: '0' },
            { value: 25, text: '25' },
            { value: 50, text: '50' },
            { value: 75, text: '75' },
            { value: 100, text: '100' },
        ];

        labels.forEach(l => {
            const a = startAngle + (l.value / 100) * Math.PI;
            const lx = cx + Math.cos(a) * (radius + 26);
            const ly = cy + Math.sin(a) * (radius + 26);
            ctx.fillStyle = '#999999';
            ctx.fillText(l.text, lx, ly + 4);
        });

        // Bottom labels
        ctx.font = '700 11px Inter, Noto Sans JP, sans-serif';
        ctx.fillStyle = '#b71c1c';
        ctx.textAlign = 'left';
        ctx.fillText('恐怖', cx - radius - 10, cy + 28);
        ctx.fillStyle = '#1b5e20';
        ctx.textAlign = 'right';
        ctx.fillText('貪欲', cx + radius + 10, cy + 28);
    }

    // ============================================================
    // Indicator Cards (CNN Style)
    // ============================================================

    function renderIndicators(indicators) {
        const container = document.getElementById('indicators');
        container.innerHTML = '';

        const subtitles = {
            'market_momentum': '日経225 vs 125日移動平均',
            'stock_strength': '52週高値・安値近辺の銘柄数',
            'breadth': '騰落レシオ（上昇 vs 下落銘柄数）',
            'put_call': '5日平均プット・コール比率',
            'volatility': '日経VIとその50日移動平均',
            'safe_haven': '株式 vs 国債の20日リターン差',
            'junk_bond': '社債 vs 安全資産のリターン差',
        };

        indicators.forEach((ind) => {
            const section = document.createElement('div');
            section.className = 'indicator-section';

            const sentClass = getSentimentClass(ind.score);
            const subtitle = subtitles[ind.id] || ind.name_en;
            const hasChart = ind.chart && Object.keys(ind.chart).length > 0;

            // Build detail items
            let detailHtml = '';
            if (ind.detail && Object.keys(ind.detail).length > 0) {
                const detailLabels = {
                    current: '現在値', ma125: '125日MA', ma50: '50日MA',
                    deviation: '乖離率', highs: '高値圏', lows: '安値圏',
                    total: '対象銘柄', ratio: '比率', advances: '上昇',
                    declines: '下落', estimated_pc_ratio: '推定P/C',
                    avg_5d_return: '5日平均リターン',
                    bond_20d_return: '国債20日リターン',
                    stock_20d_return: '株式20日リターン',
                    hy_20d_return: '社債20日リターン',
                    safe_20d_return: '安全資産20日リターン',
                    diff: '差分',
                };

                for (const [key, val] of Object.entries(ind.detail)) {
                    const label = detailLabels[key] || key;
                    let displayVal = val;
                    if (key.includes('return') || key === 'deviation' || key === 'diff') {
                        displayVal = val + '%';
                    }
                    detailHtml += `<div class="detail-item"><span class="detail-label">${label}:</span> <span class="detail-value">${displayVal}</span></div>`;
                }
            }

            const chartHtml = hasChart
                ? `<div class="indicator-chart-side">
                       <div class="indicator-chart-container"><canvas id="chart-${ind.id}"></canvas></div>
                   </div>`
                : '';

            section.innerHTML = `
                <div class="indicator-top">
                    <div class="indicator-title-group">
                        <div class="indicator-name">${ind.name}</div>
                        <div class="indicator-subtitle">${subtitle}</div>
                    </div>
                    <span class="indicator-badge badge-${sentClass}">${ind.label}</span>
                </div>
                <div class="indicator-content">
                    ${chartHtml}
                    <div class="indicator-text-side">
                        <p class="indicator-description">${ind.description}</p>
                        <div class="indicator-detail">${detailHtml}</div>
                    </div>
                </div>
            `;

            if (!hasChart) {
                section.classList.add('indicator-no-chart');
            }

            container.appendChild(section);

            if (hasChart) {
                setTimeout(() => drawIndicatorChart(ind), 100);
            }
        });
    }

    function drawIndicatorChart(indicator) {
        const canvas = document.getElementById(`chart-${indicator.id}`);
        if (!canvas) return;

        const chart = indicator.chart;
        const datasets = [];
        const labels = chart.dates || [];

        if (chart.close) {
            datasets.push({
                label: '終値',
                data: chart.close,
                borderColor: '#1a73e8',
                backgroundColor: 'rgba(26, 115, 232, 0.05)',
                borderWidth: 1.8,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
            });
        }

        if (chart.ma125) {
            datasets.push({
                label: '125日MA',
                data: chart.ma125,
                borderColor: '#e65100',
                borderWidth: 1.5,
                borderDash: [6, 3],
                fill: false,
                tension: 0.3,
                pointRadius: 0,
            });
        }

        if (chart.vi) {
            datasets.push({
                label: '日経VI',
                data: chart.vi,
                borderColor: '#1a73e8',
                backgroundColor: 'rgba(26, 115, 232, 0.05)',
                borderWidth: 1.8,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
            });
        }

        if (chart.ma50) {
            datasets.push({
                label: '50日MA',
                data: chart.ma50,
                borderColor: '#e65100',
                borderWidth: 1.5,
                borderDash: [6, 3],
                fill: false,
                tension: 0.3,
                pointRadius: 0,
            });
        }

        new Chart(canvas, {
            type: 'line',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'start',
                        labels: {
                            color: '#666666',
                            font: { size: 11, family: 'Inter, Noto Sans JP' },
                            padding: 12,
                            usePointStyle: true,
                            pointStyleWidth: 8,
                        },
                    },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        borderColor: '#e0e0e0',
                        borderWidth: 1,
                        titleColor: '#1a1a1a',
                        bodyColor: '#666666',
                        titleFont: { weight: '600' },
                        padding: 10,
                        displayColors: true,
                    },
                },
                scales: {
                    x: {
                        display: true,
                        grid: { display: false },
                        ticks: {
                            color: '#999999',
                            font: { size: 10 },
                            maxTicksLimit: 6,
                            maxRotation: 0,
                        },
                        border: { color: '#e0e0e0' },
                    },
                    y: {
                        display: true,
                        position: 'right',
                        grid: {
                            color: 'rgba(0, 0, 0, 0.06)',
                        },
                        ticks: {
                            color: '#999999',
                            font: { size: 10 },
                            maxTicksLimit: 5,
                        },
                        border: { display: false },
                    },
                },
            },
        });
    }

    // ============================================================
    // Timeline Chart
    // ============================================================

    let timelineChart = null;

    function drawTimeline(timeline) {
        const canvas = document.getElementById('timeline-chart');
        if (!canvas || !timeline || timeline.length === 0) return;

        const labels = timeline.map(t => t.date);
        const data = timeline.map(t => t.score);

        if (timelineChart) timelineChart.destroy();

        timelineChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Fear & Greed Index',
                    data,
                    borderColor: '#1a73e8',
                    backgroundColor: function (ctx) {
                        const chart = ctx.chart;
                        const { ctx: c, chartArea } = chart;
                        if (!chartArea) return 'rgba(26, 115, 232, 0.06)';
                        const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        gradient.addColorStop(0, 'rgba(26, 115, 232, 0.15)');
                        gradient.addColorStop(1, 'rgba(26, 115, 232, 0)');
                        return gradient;
                    },
                    borderWidth: 1.8,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#1a73e8',
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        borderColor: '#e0e0e0',
                        borderWidth: 1,
                        titleColor: '#1a1a1a',
                        bodyColor: '#666666',
                        titleFont: { weight: '600' },
                        padding: 12,
                        callbacks: {
                            label: function (ctx) {
                                const score = ctx.parsed.y;
                                return `スコア: ${score} (${getLabelForScore(score)})`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        display: true,
                        grid: { display: false },
                        ticks: {
                            color: '#999999',
                            font: { size: 10 },
                            maxTicksLimit: 8,
                            maxRotation: 0,
                        },
                        border: { color: '#e0e0e0' },
                    },
                    y: {
                        display: true,
                        min: 0,
                        max: 100,
                        position: 'right',
                        grid: { color: 'rgba(0, 0, 0, 0.06)' },
                        ticks: {
                            color: '#999999',
                            font: { size: 10 },
                            stepSize: 25,
                            callback: function (value) {
                                const labels = { 0: '極度の恐怖', 25: '恐怖', 50: '中立', 75: '貪欲', 100: '極度の貪欲' };
                                return labels[value] || value;
                            },
                        },
                        border: { display: false },
                    },
                },
            },
        });
    }

    // ============================================================
    // UI Updates
    // ============================================================

    function updateTicker(market) {
        if (market.nikkei225) {
            document.getElementById('nikkei-value').textContent =
                market.nikkei225.value.toLocaleString('ja-JP');
            const changeEl = document.getElementById('nikkei-change');
            const change = market.nikkei225.change;
            const pct = market.nikkei225.change_pct;
            changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)} (${pct >= 0 ? '+' : ''}${pct}%)`;
            changeEl.className = `ticker-change ${change >= 0 ? 'up' : 'down'}`;
        }

        if (market.topix) {
            document.getElementById('topix-value').textContent =
                market.topix.value.toLocaleString('ja-JP');
            const changeEl = document.getElementById('topix-change');
            const change = market.topix.change;
            const pct = market.topix.change_pct;
            changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)} (${pct >= 0 ? '+' : ''}${pct}%)`;
            changeEl.className = `ticker-change ${change >= 0 ? 'up' : 'down'}`;
        }
    }

    function updateScoreHistory(overall) {
        const items = [
            { key: 'prev', value: overall.previous_close },
            { key: 'week', value: overall.week_ago },
            { key: 'month', value: overall.month_ago },
            { key: 'year', value: overall.year_ago },
        ];

        items.forEach(item => {
            const valEl = document.getElementById(`score-${item.key}`);
            const labelEl = document.getElementById(`label-${item.key}`);
            if (valEl) {
                valEl.textContent = item.value;
                valEl.className = `score-history-value sentiment-${getSentimentClass(item.value)}`;
            }
            if (labelEl) {
                labelEl.textContent = getLabelForScore(item.value);
                labelEl.className = `score-history-label label-bg-${getSentimentClass(item.value)}`;
            }
        });
    }

    // ============================================================
    // Tab Switching
    // ============================================================

    function setupTabs() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const target = tab.dataset.tab;
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                document.getElementById(`content-${target}`).classList.add('active');
            });
        });
    }

    // ============================================================
    // FAQ Accordion
    // ============================================================

    function setupFAQ() {
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item');
                const answer = item.querySelector('.faq-answer');
                const isOpen = item.classList.contains('open');

                // Close all
                document.querySelectorAll('.faq-item').forEach(fi => {
                    fi.classList.remove('open');
                    fi.querySelector('.faq-answer').style.maxHeight = '0';
                });

                // Toggle current
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // ============================================================
    // Animated Score Counter
    // ============================================================

    function animateScore(targetScore, duration = 1200) {
        const scoreEl = document.getElementById('gauge-score');
        const labelEl = document.getElementById('gauge-label');
        const descEl = document.getElementById('gauge-description');
        const canvas = document.getElementById('gauge-canvas');

        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentScore = Math.round(eased * targetScore);

            scoreEl.textContent = currentScore;
            scoreEl.className = `gauge-score sentiment-${getSentimentClass(currentScore)}`;

            if (progress >= 1) {
                scoreEl.textContent = targetScore;
                labelEl.textContent = getLabelForScore(targetScore);
                labelEl.className = `gauge-label sentiment-${getSentimentClass(targetScore)}`;
                descEl.innerHTML = `<strong>${getLabelForScore(targetScore)}</strong>が日本市場を動かしています`;
                drawGauge(canvas, targetScore);
                return;
            }

            labelEl.textContent = getLabelForScore(currentScore);
            labelEl.className = `gauge-label sentiment-${getSentimentClass(currentScore)}`;
            drawGauge(canvas, currentScore);
            requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // ============================================================
    // Main Init
    // ============================================================

    async function init() {
        setupTabs();
        setupFAQ();

        try {
            const response = await fetch('/fear-greed/data.json');
            if (!response.ok) throw new Error('データの取得に失敗しました');
            const data = await response.json();

            // Update timestamp
            document.getElementById('last-updated').textContent = `最終更新: ${data.updated}`;

            // Update ticker
            updateTicker(data.market);

            // Animate gauge
            animateScore(data.overall.score);

            // Score history
            updateScoreHistory(data.overall);

            // Render indicators
            renderIndicators(data.indicators);

            // Timeline chart
            drawTimeline(data.timeline);

        } catch (error) {
            console.error('Error loading data:', error);
            document.getElementById('gauge-score').textContent = 'ERROR';
            document.getElementById('gauge-label').textContent = 'データ取得エラー';
        }
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
