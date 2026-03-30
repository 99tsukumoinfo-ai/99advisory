import Link from 'next/link';

export const metadata = {
  title: 'サービス一覧 | 九十九アドバイザリー',
  description:
    '診断支援・月次整理支援・継続的な伴走支援まで、状況に合わせて選べる3つの支援をご案内します。',
};

const SERVICES = [
  {
    tier: '診断支援',
    name: '財務健康診断',
    desc: '今の数字を整理し、優先論点をまとめる入口支援',
    href: '/seizo/',
  },
  {
    tier: '診断支援',
    name: '資金繰り診断',
    desc: '現金の流れと注意点を整理する診断サービス',
    href: '/cashflow/',
  },
  {
    tier: '整理支援',
    name: '銀行向け事業計画',
    desc: '銀行説明に使いやすい計画・月次資料を整備する',
    href: '/bank-plan/',
  },
  {
    tier: '整理支援',
    name: '月次経営レポート',
    desc: '毎月の数字を整理した資料として納品する継続支援',
    href: '/monthly-report/',
  },
  {
    tier: '伴走支援',
    name: '月次経営レビュー',
    desc: '月に一度、数字を読んで判断と行動を整理するセッション',
    href: '/monthly-review/',
  },
  {
    tier: '継続支援（上位）',
    name: '予実管理伴走',
    desc: '計画と実績の差異を分析し、次の判断材料に変える',
    href: '/yojitsu/',
  },
  {
    tier: 'スポット設計',
    name: '経営会議設計',
    desc: '判断が動く会議の型を一度設計するスポット支援',
    href: '/meeting-design/',
  },
];

export default function ServicesPage() {
  return (
    <>
      <style>{`
        /* ========== Layout ========== */
        .sv-section {
          padding: 72px 40px;
        }
        .sv-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }
        .sv-wrap-narrow {
          max-width: 720px;
          margin: 0 auto;
        }

        /* ========== Section 1: Header ========== */
        .sv-header {
          background: var(--bg);
          padding: 80px 40px 64px;
        }
        .sv-eyebrow {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 20px;
        }
        .sv-h1 {
          font-size: clamp(32px, 5vw, 48px);
          color: var(--navy);
          font-weight: 800;
          line-height: 1.25;
          margin: 0 0 24px;
        }
        .sv-lead {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.85;
          max-width: 640px;
          margin: 0;
        }

        /* ========== Section 2: Menu cards ========== */
        .sv-menu-section {
          background: var(--surface);
          padding: 72px 40px;
        }
        .sv-section-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 12px;
        }
        .sv-section-heading {
          font-size: clamp(22px, 3.5vw, 32px);
          font-weight: 800;
          color: var(--navy);
          line-height: 1.3;
          margin: 0 0 8px;
        }
        .sv-section-sub {
          font-size: 15px;
          color: var(--muted);
          margin: 0 0 36px;
        }
        .sv-menu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: start;
        }
        .sv-menu-card {
          border-radius: 24px;
          padding: 36px 28px 32px;
          display: flex;
          flex-direction: column;
          min-height: 440px;
        }
        .sv-menu-card-a { background: #f1f5f9; }
        .sv-menu-card-b { background: #eff6ff; }
        .sv-menu-card-c { background: #0f1f3d; }

        .sv-menu-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          border-radius: 9999px;
          padding: 4px 12px;
          margin-bottom: 18px;
          align-self: flex-start;
        }
        .sv-menu-card-a .sv-menu-badge {
          color: var(--faint);
          background: var(--bg);
          border: 1px solid var(--border);
        }
        .sv-menu-card-b .sv-menu-badge {
          color: var(--blue);
          background: var(--blue-pale);
          border: 1px solid var(--blue-pale);
        }
        .sv-menu-card-c .sv-menu-badge {
          color: #93c5fd;
          background: rgba(147,197,253,0.12);
          border: 1px solid rgba(147,197,253,0.25);
        }

        .sv-menu-title {
          font-size: 26px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .sv-menu-card-a .sv-menu-title { color: var(--blue-dark, #1d4ed8); }
        .sv-menu-card-b .sv-menu-title { color: var(--blue); }
        .sv-menu-card-c .sv-menu-title { color: #60a5fa; }

        .sv-menu-problems {
          list-style: none;
          margin: 0 0 20px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
        }
        .sv-menu-problem {
          font-size: 13px;
          line-height: 1.6;
          display: flex;
          gap: 8px;
        }
        .sv-menu-problem::before {
          content: '・';
          flex-shrink: 0;
        }
        .sv-menu-card-a .sv-menu-problem,
        .sv-menu-card-b .sv-menu-problem { color: var(--text-sub); }
        .sv-menu-card-c .sv-menu-problem { color: rgba(255,255,255,0.7); }

        .sv-menu-links {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 24px;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid;
        }
        .sv-menu-card-a .sv-menu-links { border-color: var(--border); }
        .sv-menu-card-b .sv-menu-links { border-color: var(--blue-pale); }
        .sv-menu-card-c .sv-menu-links { border-color: rgba(255,255,255,0.12); }

        .sv-menu-link {
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .sv-menu-link:hover { opacity: 0.75; }
        .sv-menu-card-a .sv-menu-link { color: var(--blue); }
        .sv-menu-card-b .sv-menu-link { color: var(--blue); }
        .sv-menu-card-c .sv-menu-link { color: #93c5fd; }

        .sv-menu-btn {
          display: block;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          border-radius: 9999px;
          padding: 13px 20px;
          transition: opacity 0.15s;
          margin-top: 0;
        }
        .sv-menu-btn:hover { opacity: 0.88; }
        .sv-menu-card-a .sv-menu-btn {
          background: var(--navy);
          color: #fff;
        }
        .sv-menu-card-b .sv-menu-btn {
          background: #2563eb;
          color: #fff;
        }
        .sv-menu-card-c .sv-menu-btn {
          background: #3b82f6;
          color: #fff;
        }

        /* ========== Section 3: All services ========== */
        .sv-list-section {
          background: var(--bg);
          padding: 72px 40px;
        }
        .sv-list-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 36px;
        }
        .sv-svc-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .sv-svc-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37,99,235,0.07);
        }
        .sv-svc-tier {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          writing-mode: vertical-rl;
          color: var(--blue);
          opacity: 0.6;
          flex-shrink: 0;
          padding-top: 2px;
          line-height: 1.2;
        }
        .sv-svc-body { flex: 1; min-width: 0; }
        .sv-svc-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 4px;
          line-height: 1.4;
        }
        .sv-svc-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .sv-svc-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--blue);
        }

        /* ========== Section 4: Final CTA ========== */
        .sv-cta-section {
          background: var(--navy);
          padding: 72px 40px;
          text-align: center;
        }
        .sv-cta-heading {
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 700;
          color: #fff;
          line-height: 1.55;
          margin: 0 0 16px;
        }
        .sv-cta-body {
          font-size: 15px;
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          margin: 0;
        }
        .sv-cta-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 36px;
        }
        .sv-cta-primary {
          background: #2563eb;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          border-radius: 9999px;
          padding: 15px 32px;
          transition: opacity 0.15s;
        }
        .sv-cta-primary:hover { opacity: 0.88; }
        .sv-cta-secondary {
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          text-decoration: underline;
          text-underline-offset: 3px;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .sv-cta-secondary:hover { color: rgba(255,255,255,0.9); }

        /* ========== Mobile ========== */
        @media (max-width: 768px) {
          .sv-header { padding: 60px 20px 48px; }
          .sv-menu-section,
          .sv-list-section,
          .sv-cta-section { padding: 56px 20px; }
          .sv-menu-grid { grid-template-columns: 1fr; }
          .sv-menu-card { min-height: unset; }
          .sv-list-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Section 1: Page header */}
      <section className="sv-header">
        <div className="sv-wrap-narrow">
          <span className="sv-eyebrow">Services</span>
          <h1 className="sv-h1">数字を整理して、<br />経営判断を進めやすい形へ。</h1>
          <p className="sv-lead">
            財務の現状把握から、資料整備、月次の判断伴走まで。
            九十九アドバイザリーでは、中小企業の経営管理に関わる支援を段階別に整理しています。
            課題が明確な方も、まだ整理しきれていない方も、そのままご覧ください。
          </p>
        </div>
      </section>

      {/* Section 2: 3-card service menu */}
      <section className="sv-menu-section">
        <div className="sv-wrap">
          <div className="sv-section-kicker">3つの支援カテゴリ</div>
          <h2 className="sv-section-heading">支援は、大きく3段階に分かれています</h2>
          <p className="sv-section-sub">現状整理のための診断支援、資料を整える整理支援、毎月の判断に入る伴走支援の3段階で構成しています。単独でのご利用も可能です。</p>

          <div className="sv-menu-grid">
            {/* Card A: 診断 */}
            <div className="sv-menu-card sv-menu-card-a">
              <span className="sv-menu-badge">まずはこちらから</span>
              <div className="sv-menu-title">診断</div>
              <ul className="sv-menu-problems">
                <li className="sv-menu-problem">利益は出ているのに現金が残らない</li>
                <li className="sv-menu-problem">何から手をつければよいかわからない</li>
                <li className="sv-menu-problem">まずは今の数字を整理したい</li>
              </ul>
              <div className="sv-menu-links">
                <Link href="/seizo/" className="sv-menu-link">財務健康診断 →</Link>
                <Link href="/cashflow/" className="sv-menu-link">資金繰り診断 →</Link>
              </div>
              <Link href="/contact/" className="sv-menu-btn">診断を申し込む →</Link>
            </div>

            {/* Card B: 月次整理 */}
            <div className="sv-menu-card sv-menu-card-b">
              <span className="sv-menu-badge">人気</span>
              <div className="sv-menu-title">月次整理</div>
              <ul className="sv-menu-problems">
                <li className="sv-menu-problem">毎月の数字が経営判断に活かせていない</li>
                <li className="sv-menu-problem">銀行や社内への説明資料が弱い</li>
                <li className="sv-menu-problem">資料づくりに時間がかかっている</li>
              </ul>
              <div className="sv-menu-links">
                <Link href="/monthly-report/" className="sv-menu-link">月次経営レポート →</Link>
                <Link href="/bank-plan/" className="sv-menu-link">銀行向け事業計画 →</Link>
              </div>
              <Link href="/contact/" className="sv-menu-btn">月次整理を申し込む →</Link>
            </div>

            {/* Card C: 月次レビュー */}
            <div className="sv-menu-card sv-menu-card-c">
              <span className="sv-menu-badge">継続支援</span>
              <div className="sv-menu-title">月次レビュー</div>
              <ul className="sv-menu-problems">
                <li className="sv-menu-problem">数字を見ながら次の一手を整理したい</li>
                <li className="sv-menu-problem">継続的に伴走してほしい</li>
                <li className="sv-menu-problem">会議や月次の振り返りを判断につなげたい</li>
              </ul>
              <div className="sv-menu-links">
                <Link href="/monthly-review/" className="sv-menu-link">月次経営レビュー →</Link>
                <Link href="/yojitsu/" className="sv-menu-link">予実管理伴走 →</Link>
                <Link href="/meeting-design/" className="sv-menu-link">経営会議設計 →</Link>
              </div>
              <Link href="/contact/" className="sv-menu-btn">月次レビューを申し込む →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: All 7 services */}
      <section className="sv-list-section">
        <div className="sv-wrap">
          <div className="sv-section-kicker">個別サービス</div>
          <h2 className="sv-section-heading">各サービスの詳細を見る</h2>
          <div className="sv-list-grid">
            {SERVICES.map((svc) => (
              <Link key={svc.href} href={svc.href} className="sv-svc-card">
                <span className="sv-svc-tier">{svc.tier}</span>
                <div className="sv-svc-body">
                  <div className="sv-svc-name">{svc.name}</div>
                  <div className="sv-svc-desc">{svc.desc}</div>
                  <span className="sv-svc-link">詳しく見る →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Final CTA */}
      <section className="sv-cta-section">
        <div className="sv-wrap-narrow">
          <h2 className="sv-cta-heading">
            どれが自社に合うかわからない場合も、<br />
            そのままフォームからお送りください
          </h2>
          <p className="sv-cta-body">
            ご相談内容を確認し、内容に応じてご案内いたします。<br />
            まだ課題が整理しきれていない段階でも問題ありません。
          </p>
          <div className="sv-cta-btns">
            <Link href="/contact/" className="sv-cta-primary">
              お問い合わせフォームへ
            </Link>
            <Link href="/" className="sv-cta-secondary">
              トップページを見る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
