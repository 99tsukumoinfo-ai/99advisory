import Link from 'next/link';
import LatestArticles from '@/components/home/LatestArticles';

export const metadata = {
  title: '九十九アドバイザリー | 中小企業向けCFO型アドバイザリー',
  description:
    '数字と論点を整理し、経営判断を進めやすい形へ整える支援を行っています。財務健康診断・資金繰り診断・月次経営レビューなど、中小企業の経営者・財務担当者向けサービス。',
};

const PROBLEMS = [
  {
    tag: '資金繰り',
    text: '利益は出ているのに、現金が思ったほど残らない',
  },
  {
    tag: '優先判断',
    text: '毎月の数字を見ても、何を優先すべきか決めきれない',
  },
  {
    tag: '説明準備',
    text: '銀行や社内への説明資料づくりが、いつも後回しになる',
  },
  {
    tag: '状況整理',
    text: '資金繰りに不安はあるが、どこから整理すればいいか見えない',
  },
  {
    tag: '継続相談',
    text: '単発の相談だけでなく、継続的に相談できる先が欲しい',
  },
];

export default function HomePage() {
  return (
    <>
      <style>{`
        /* ===== layout ===== */
        .hp-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .hp-wrap-narrow {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .hp-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 10px;
        }
        .hp-heading {
          font-size: clamp(24px, 3.5vw, 32px);
          font-weight: 700;
          color: var(--navy);
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
        }
        .hp-lead {
          font-size: 15px;
          color: var(--faint);
          line-height: 1.75;
          margin-bottom: 44px;
          max-width: 600px;
        }

        /* ===== Hero ===== */
        .hp-hero {
          background: #fff;
          padding: 80px 40px 72px;
          text-align: center;
        }
        .hp-hero-inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .hp-eyebrow {
          display: block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 20px;
        }
        .hp-h1 {
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 800;
          color: var(--navy);
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0 0 28px;
        }
        .hp-hero-lead {
          font-size: 17px;
          color: var(--muted);
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto 10px;
        }
        .hp-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 24px;
        }
        .hp-badge {
          font-size: 13px;
          color: var(--faint);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 6px 16px;
          white-space: nowrap;
        }
        .hp-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          justify-content: center;
          margin-top: 32px;
        }
        .hp-btn-primary {
          background: var(--navy);
          color: #fff !important;
          padding: 15px 32px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          display: inline-block;
          transition: opacity 0.15s;
        }
        .hp-btn-primary:hover { opacity: 0.85; }
        .hp-btn-secondary {
          color: var(--navy) !important;
          border: 1.5px solid var(--navy);
          padding: 15px 32px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          display: inline-block;
          background: transparent;
          transition: background 0.15s;
        }
        .hp-btn-secondary:hover { background: rgba(15,31,61,0.05); }

        /* ===== Problems ===== */
        .hp-problems {
          background: var(--surface);
          padding: 72px 40px;
        }
        .hp-problems-inner {
          max-width: 1040px;
          margin: 0 auto;
        }
        .hp-problem-shell {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: calc(var(--radius-xl) + 4px);
          padding: 16px;
          display: grid;
          grid-template-columns: minmax(240px, 288px) minmax(0, 1fr);
          gap: 16px;
        }
        .hp-problem-side {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 28px 24px;
        }
        .hp-problem-side-badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: var(--radius-pill);
          background: #fff;
          border: 1px solid var(--border);
          color: var(--blue);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .hp-problem-side-title {
          font-size: 28px;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.3;
          letter-spacing: -0.03em;
          margin: 0 0 12px;
        }
        .hp-problem-side-body {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.85;
          margin: 0 0 24px;
        }
        .hp-problem-side-note {
          border-top: 1px solid var(--border);
          padding-top: 18px;
        }
        .hp-problem-side-note-title {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-sub);
          letter-spacing: .04em;
          margin-bottom: 8px;
        }
        .hp-problem-side-note-text {
          font-size: 13px;
          color: var(--faint);
          line-height: 1.75;
          margin: 0;
        }
        .hp-problem-list {
          list-style: none;
          margin: 0;
          padding: 6px 0;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .hp-problem-row {
          display: grid;
          grid-template-columns: 92px minmax(0, 1fr);
          gap: 18px;
          align-items: center;
          padding: 22px 24px;
          border-bottom: 1px solid var(--border);
        }
        .hp-problem-row:last-child {
          border-bottom: none;
        }
        .hp-problem-meta {
          display: grid;
          gap: 8px;
          justify-items: start;
        }
        .hp-problem-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 52px;
          height: 30px;
          padding: 0 12px;
          border-radius: var(--radius-pill);
          background: var(--blue-light);
          color: var(--blue);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
        }
        .hp-problem-tag {
          font-size: 12px;
          font-weight: 700;
          color: var(--hint);
          letter-spacing: .04em;
        }
        .hp-problem-text {
          font-size: 18px;
          font-weight: 600;
          color: var(--navy);
          line-height: 1.55;
          letter-spacing: -0.02em;
          margin: 0;
        }

        /* ===== About ===== */
        .hp-about {
          background: #fff;
          padding: 72px 40px;
        }
        .hp-about-inner {
          max-width: 640px;
          margin: 0 auto;
        }
        .hp-body {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.9;
          margin: 0 0 20px;
        }
        .hp-body-note {
          font-size: 13px;
          color: var(--hint);
          margin-top: 20px;
        }

        /* ===== Services ===== */
        .hp-services {
          background: var(--surface);
          padding: 72px 40px;
        }
        .hp-services-inner {
          max-width: 1040px;
          margin: 0 auto;
        }
        .hp-svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .hp-svc-card {
          border-radius: 24px;
          padding: 36px 28px 32px;
          display: flex;
          flex-direction: column;
        }
        .hp-svc-card-a { background: #f1f5f9; }
        .hp-svc-card-b { background: #eff6ff; }
        .hp-svc-card-c { background: #0f1f3d; }
        .hp-svc-badge-wrap { margin-bottom: 20px; }
        .hp-svc-badge-a {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          padding: 4px 14px;
        }
        .hp-svc-badge-b {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          background: #2563eb;
          border-radius: 9999px;
          padding: 4px 14px;
        }
        .hp-svc-badge-c {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          color: #93c5fd;
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 9999px;
          padding: 4px 14px;
        }
        .hp-svc-title-a {
          font-size: 26px;
          font-weight: 800;
          color: #1d4ed8;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .hp-svc-title-b {
          font-size: 26px;
          font-weight: 800;
          color: #2563eb;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .hp-svc-title-c {
          font-size: 26px;
          font-weight: 800;
          color: #60a5fa;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .hp-svc-sub-a {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.5;
          margin-bottom: 6px;
        }
        .hp-svc-sub-c {
          font-size: 14px;
          font-weight: 600;
          color: #e2e8f0;
          line-height: 1.5;
          margin-bottom: 6px;
        }
        .hp-svc-desc-a {
          font-size: 13px;
          color: #64748b;
          line-height: 1.65;
          margin-bottom: 32px;
          flex: 1;
        }
        .hp-svc-desc-c {
          font-size: 13px;
          color: rgba(255,255,255,.6);
          line-height: 1.65;
          margin-bottom: 32px;
          flex: 1;
        }
        .hp-svc-btn-a {
          display: block;
          background: #1d4ed8;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          padding: 14px 20px;
          border-radius: 9999px;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .hp-svc-btn-a:hover { opacity: 0.85; }
        .hp-svc-btn-b {
          display: block;
          background: #2563eb;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          padding: 14px 20px;
          border-radius: 9999px;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .hp-svc-btn-b:hover { opacity: 0.85; }
        .hp-svc-btn-c {
          display: block;
          background: #3b82f6;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          padding: 14px 20px;
          border-radius: 9999px;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .hp-svc-btn-c:hover { opacity: 0.85; }

        /* ===== Deliverables ===== */
        .hp-deliv {
          background: #fff;
          padding: 72px 40px;
        }
        .hp-deliv-inner {
          max-width: 1040px;
          margin: 0 auto;
        }
        .hp-deliv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .hp-deliv-card {
          border-radius: 24px;
          padding: 32px 24px;
        }
        .hp-deliv-card-blue  { background: #eff6ff; }
        .hp-deliv-card-green { background: #f0fdf4; }
        .hp-deliv-card-purple { background: #faf5ff; }
        .hp-deliv-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .hp-deliv-icon-blue   { background: #dbeafe; }
        .hp-deliv-icon-green  { background: #dcfce7; }
        .hp-deliv-icon-purple { background: #ede9fe; }
        .hp-deliv-title-blue   { font-size: 17px; font-weight: 800; color: #1d4ed8; margin-bottom: 10px; line-height: 1.3; }
        .hp-deliv-title-green  { font-size: 17px; font-weight: 800; color: #15803d; margin-bottom: 10px; line-height: 1.3; }
        .hp-deliv-title-purple { font-size: 17px; font-weight: 800; color: #6d28d9; margin-bottom: 10px; line-height: 1.3; }
        .hp-deliv-body {
          font-size: 13px;
          color: #475569;
          line-height: 1.7;
          margin: 0;
        }

        /* ===== Final CTA ===== */
        .hp-final {
          background: #0f1f3d;
          padding: 72px 40px;
          color: #fff;
        }
        .hp-final-inner {
          max-width: 820px;
          margin: 0 auto;
        }
        .hp-final-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #60a5fa;
          margin-bottom: 10px;
        }
        .hp-final-heading {
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .hp-final-body {
          font-size: 15px;
          color: rgba(255,255,255,.7);
          line-height: 1.8;
          margin: 0;
          max-width: 640px;
        }
        .hp-trust-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 44px;
        }
        .hp-trust-card {
          background: rgba(255,255,255,.06);
          border-radius: 20px;
          padding: 28px 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .hp-trust-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255,255,255,.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hp-trust-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }
        .hp-trust-desc {
          font-size: 13px;
          color: rgba(255,255,255,.55);
          line-height: 1.6;
        }
        .hp-final-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-top: 40px;
        }
        .hp-btn-cta-primary {
          background: var(--blue);
          color: #fff !important;
          padding: 15px 32px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          display: inline-block;
          transition: opacity 0.15s;
        }
        .hp-btn-cta-primary:hover { opacity: 0.85; }
        .hp-btn-cta-secondary {
          color: rgba(255,255,255,.7) !important;
          font-size: 14px;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .hp-btn-cta-secondary:hover { color: #fff !important; }

        /* ===== Responsive ===== */
        @media (max-width: 768px) {
          .hp-hero { padding: 60px 20px 52px; }
          .hp-problems { padding: 52px 20px; }
          .hp-about { padding: 52px 20px; }
          .hp-services { padding: 52px 20px; }
          .hp-deliv { padding: 52px 20px; }
          .hp-final { padding: 52px 20px; }
          .hp-wrap, .hp-wrap-narrow, .hp-problems-inner,
          .hp-about-inner, .hp-services-inner, .hp-deliv-inner, .hp-final-inner {
            padding: 0;
          }
          .hp-problem-shell {
            grid-template-columns: 1fr;
            padding: 14px;
          }
          .hp-problem-side {
            padding: 24px 20px;
          }
          .hp-problem-side-title {
            font-size: 24px;
          }
          .hp-problem-list {
            padding: 0;
          }
          .hp-problem-row {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 18px 20px;
            align-items: flex-start;
          }
          .hp-problem-text {
            font-size: 16px;
          }
          .hp-svc-grid,
          .hp-deliv-grid {
            grid-template-columns: 1fr;
          }
          .hp-trust-grid {
            grid-template-columns: 1fr;
          }
          .hp-h1 { font-size: 32px; }
          .hp-cta-row, .hp-final-btns { flex-direction: column; align-items: stretch; }
          .hp-btn-primary, .hp-btn-secondary, .hp-btn-cta-primary { text-align: center; }
        }
      `}</style>

      {/* Section 1: Hero */}
      <section className="hp-hero">
        <div className="hp-hero-inner">
          <span className="hp-eyebrow">複雑な経理財務をシンプルに・わかりやすく</span>
          <h1 className="hp-h1">
            数字を見ているのに、<br />
            次の判断に迷う会社へ。
          </h1>
          <p className="hp-hero-lead">
            利益は出てるはず。毎月経理データも作ってる。でも、資金繰り、投資アクション、中長期的な成長への不安。
          </p>
          <p className="hp-hero-lead">
            九十九アドバイザリーは、数字と論点を整理し、経営判断を進めやすい形へ整えるための支援を行っています。
          </p>
          <div className="hp-badges">
            <span className="hp-badge">秘密厳守</span>
            <span className="hp-badge">NDA締結可</span>
            <span className="hp-badge">初回相談受付</span>
          </div>
          <div className="hp-cta-row">
            <Link href="/contact/" className="hp-btn-primary">
              相談フォームへ
            </Link>
            <Link href="/services/" className="hp-btn-secondary">
              サービス一覧を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: よくある悩み */}
      <section className="hp-problems">
        <div className="hp-problems-inner">
          <p className="hp-kicker">よくある悩み</p>
          <h2 className="hp-heading">こんな状態で、止まっていませんか</h2>
          <p className="hp-lead">経営者・経理担当者からよくお聞きする5つの課題です。</p>
          <div className="hp-problem-shell">
            <div className="hp-problem-side">
              <span className="hp-problem-side-badge">5つの相談テーマ</span>
              <p className="hp-problem-side-title">
                数字は見えていても、
                <br />
                判断材料の整理で止まりやすい場面です。
              </p>
              <p className="hp-problem-side-body">
                資金繰り、優先順位、社内外への説明準備。
                課題はひとつだけでなく、複数が重なって現れることがよくあります。
              </p>
            </div>
            <ul className="hp-problem-list">
              {PROBLEMS.map(({ tag, text }, i) => (
                <li key={text} className="hp-problem-row">
                  <div className="hp-problem-meta">
                    <span className="hp-problem-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="hp-problem-tag">{tag}</span>
                  </div>
                  <p className="hp-problem-text">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: 会社説明 */}
      <section className="hp-about">
        <div className="hp-about-inner">
          <p className="hp-kicker">九十九アドバイザリーとは</p>
          <h2 className="hp-heading">現代の経営では、経理・財務は単なるバックオフィスではありません。</h2>
          <p className="hp-body">
            決算書、試算表、資金繰り表。必要な情報が手元にあっても、判断しやすい形に整理されていなければ、次の一手は決めにくくなります。
          </p>
          <p className="hp-body">
            九十九アドバイザリーは、数字をただ並べるのではなく、いま見るべき論点を整理し、経営判断につながる形へ整える支援を行っています。
          </p>
          <p className="hp-body-note">
            ※ 記帳・税務申告・融資手続きの代行は行っていません。
          </p>
        </div>
      </section>

      {/* Section 4: 支援メニュー */}
      <section className="hp-services">
        <div className="hp-services-inner">
          <p className="hp-kicker">支援メニュー</p>
          <h2 className="hp-heading">状況に合わせて、単独でご利用いただけます</h2>
          <p className="hp-lead">診断だけ、月次整理だけ、レビューだけの利用も可能です。</p>
          <div className="hp-svc-grid">
            {/* Card A: 診断 */}
            <div className="hp-svc-card hp-svc-card-a">
              <div className="hp-svc-badge-wrap">
                <span className="hp-svc-badge-a">まずはこちらから</span>
              </div>
              <p className="hp-svc-title-a">診断</p>
              <p className="hp-svc-sub-a">財務健康診断<br />資金繰り診断</p>
              <p className="hp-svc-desc-a">今の数字を整理し、何が問題でどこから手をつけるべきかを明確にする入口支援。</p>
              <Link href="/contact/" className="hp-svc-btn-a">診断を申し込む →</Link>
            </div>
            {/* Card B: 月次整理 */}
            <div className="hp-svc-card hp-svc-card-b">
              <div className="hp-svc-badge-wrap">
                <span className="hp-svc-badge-b">人気</span>
              </div>
              <p className="hp-svc-title-b">月次整理</p>
              <p className="hp-svc-sub-a">月次経営レポート<br />銀行向け事業計画</p>
              <p className="hp-svc-desc-a">毎月の数字を、会議・銀行説明・判断に使いやすい形へ整理して納品する継続支援。</p>
              <Link href="/contact/" className="hp-svc-btn-b">月次整理を申し込む →</Link>
            </div>
            {/* Card C: 月次レビュー */}
            <div className="hp-svc-card hp-svc-card-c">
              <div className="hp-svc-badge-wrap">
                <span className="hp-svc-badge-c">New</span>
              </div>
              <p className="hp-svc-title-c">月次レビュー</p>
              <p className="hp-svc-sub-c">月次経営レビュー<br />予実管理伴走</p>
              <p className="hp-svc-desc-c">数字を一緒に読み解き、判断と次の行動まで毎月整理する継続的な伴走支援。</p>
              <Link href="/monthly-review/" className="hp-svc-btn-c">月次レビューを申し込む →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 成果物 */}
      <section className="hp-deliv">
        <div className="hp-deliv-inner">
          <p className="hp-kicker">お渡しするもの</p>
          <h2 className="hp-heading">使える形に整えた資料を、お返しします</h2>
          <p className="hp-lead">感覚的なコメントではなく、実務で使いやすい形で整理してお渡しします。</p>
          <div className="hp-deliv-grid">
            {/* 青: 財務健康診断レポート */}
            <div className="hp-deliv-card hp-deliv-card-blue">
              <div className="hp-deliv-icon hp-deliv-icon-blue">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="3" y="2" width="16" height="18" rx="3" stroke="#2563eb" strokeWidth="1.5"/>
                  <line x1="7" y1="8" x2="15" y2="8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="7" y1="11.5" x2="12" y2="11.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="7" y1="15" x2="14" y2="15" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="hp-deliv-title-blue">財務健康<br />診断レポート</p>
              <p className="hp-deliv-body">現状の数字を整理し、優先論点をまとめたメモ</p>
            </div>
            {/* 緑: 資金繰り整理資料 */}
            <div className="hp-deliv-card hp-deliv-card-green">
              <div className="hp-deliv-icon hp-deliv-icon-green">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <polyline points="3,16 7,10 12,13 19,5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <line x1="3" y1="19" x2="19" y2="19" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="hp-deliv-title-green">資金繰り<br />整理資料</p>
              <p className="hp-deliv-body">現金の動きと注意点をまとめた一覧</p>
            </div>
            {/* 紫: 月次レポート */}
            <div className="hp-deliv-card hp-deliv-card-purple">
              <div className="hp-deliv-icon hp-deliv-icon-purple">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="4" width="18" height="14" rx="3" stroke="#7c3aed" strokeWidth="1.5"/>
                  <line x1="7" y1="9" x2="15" y2="9" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="7" y1="13" x2="11" y2="13" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="hp-deliv-title-purple">月次レポート・<br />事業計画資料</p>
              <p className="hp-deliv-body">銀行説明や社内共有に使える形式</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: 新着記事 */}
      <LatestArticles />

      {/* Section 7: 最終CTA */}
      <section className="hp-final">
        <div className="hp-final-inner">
          <p className="hp-final-kicker">CONTACT</p>
          <h2 className="hp-final-heading">まずは、今の状況をフォームからお送りください</h2>
          <p className="hp-final-body">
            ご相談内容を確認のうえ、2営業日以内にご連絡いたします。まだ整理しきれていない段階でも、そのままお送りいただいて問題ありません。
          </p>

          <div className="hp-trust-grid">
            {/* カード1 */}
            <div className="hp-trust-card">
              <div className="hp-trust-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="#60a5fa" strokeWidth="1.5"/>
                  <path d="M6 9l2.5 2.5L13 7" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="hp-trust-title">オンライン対応（全国）</p>
                <p className="hp-trust-desc">場所を問わずご相談いただけます</p>
              </div>
            </div>
            {/* カード2 */}
            <div className="hp-trust-card">
              <div className="hp-trust-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="#60a5fa" strokeWidth="1.5"/>
                  <path d="M6 9l2.5 2.5L13 7" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="hp-trust-title">初回相談は無料</p>
                <p className="hp-trust-desc">まず話を聞くだけでも構いません</p>
              </div>
            </div>
            {/* カード3 */}
            <div className="hp-trust-card">
              <div className="hp-trust-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2l1 3h3l-2.5 2 1 3L9 8.5 6.5 10l1-3L5 5h3z" stroke="#60a5fa" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="hp-trust-title">秘密厳守・NDA締結可</p>
                <p className="hp-trust-desc">情報管理を徹底します</p>
              </div>
            </div>
            {/* カード4 */}
            <div className="hp-trust-card">
              <div className="hp-trust-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="7" r="3" stroke="#60a5fa" strokeWidth="1.5"/>
                  <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="hp-trust-title">専門家が直接担当</p>
                <p className="hp-trust-desc">専門性の高いプロフェッショナルが対応します</p>
              </div>
            </div>
          </div>

          <div className="hp-final-btns">
            <Link href="/contact/" className="hp-btn-cta-primary">
              相談フォームへ
            </Link>
            <Link href="/services/" className="hp-btn-cta-secondary">
              サービス一覧を見る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
