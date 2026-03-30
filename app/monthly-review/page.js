'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LPHero from '@/components/lp/LPHero';
import LPProblemSection from '@/components/lp/LPProblemSection';
import LPSection from '@/components/lp/LPSection';
import { LPStepFlow, LPFitGrid } from '@/components/lp/LPCardGrid';
import LPFaq from '@/components/lp/LPFaq';
import LPLeadForm from '@/components/lp/LPLeadForm';
import LPBottomBar from '@/components/lp/LPBottomBar';
import LPTrustNote from '@/components/lp/LPTrustNote';

const PROBLEMS = [
  {
    no: '01',
    title: '税理士から毎月試算表が届くが、どう役立ててていいか困ってる',
    body: '数字は出ているが、何が良くて何が悪いのか、どう判断すればよいかまで整理できていない。'
  },
  {
    no: '02',
    title: '経営数字を見ているが、感覚的に理解できてない',
    body: '月次の数字は把握しているが、それをもとに何を動かすかの優先順位がつけられていない。'
  },
  {
    no: '03',
    title: '月次ミーティングが数字の確認で終わり、行動につながらない',
    body: '毎月同じ資料を確認するだけで終わり、何が決まったかが曖昧なまま次の月へ進んでいる。'
  },
  {
    no: '04',
    title: '利益は出ていても、残る現金が少ない気がする',
    body: '試算表では黒字でも、なぜ手元に残らないかを整理できておらず、判断の根拠が曖昧。'
  },
  {
    no: '05',
    title: '経営者目線を持つ社員育成は難しく、一人で考えてても名案が浮かばない',
    body: '内部だけでは見えにくいことを、月次で整理・指摘してくれる外部の目が欲しい。'
  }
];

const DELIVERABLES = [
  {
    color: 'blue',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: '今月の論点サマリー',
    body: '今月何が起きたかを3点以内で整理したメモ。セッション前にお送りし、議論の起点にします。'
  },
  {
    color: 'green',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: '判断・確認事項リスト',
    body: 'セッションで出た次にやること・次回確認することを箇条書きで整理した議事メモ。'
  },
  {
    color: 'purple',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: '次月の注視ポイント',
    body: '来月のレビューで特に確認すべき数字・論点を1〜2点に絞って添付します。'
  }
];

const STEPS = [
  {
    title: '前月の経理データを共有いただく（試算表・資金繰り表など）',
    body: '毎月決まったタイミングで数字資料をお送りいただきます。'
  },
  {
    title: '論点を事前に整理（論点サマリーを送付）',
    body: '資料を確認し、セッションで扱う今月の論点を事前にお送りします。'
  },
  {
    title: 'オンラインで60分のレビューセッション',
    body: '数字の動きと判断の整理をオンラインで行います。Zoom等に対応しています。'
  },
  {
    title: '翌営業日に議事メモ・確認事項リストを送付',
    body: '論点・判断内容・次回確認事項を整理してお送りします。'
  }
];

const INCLUDED = [
  '月次レビューセッション（60分 × 月1回）',
  '事前論点整理・論点サマリー送付',
  'セッション後の議事メモ・確認事項リスト',
  '月中の簡易相談（メール）'
];

const NOT_INCLUDED = [
  '記帳・税務申告',
  '予算策定・中期計画の立案'
];

const FAQS = [
  {
    q: '月次経営レポートと両方使えますか？',
    a: 'はい。資料整理は月次経営レポート、読み解きと判断整理は月次経営レビューと役割を分けてご利用いただけます。'
  },
  {
    q: '税理士や顧問がいても使えますか？',
    a: '税務・記帳は税理士の領域です。このサービスは数字を判断につなげる役割なので重複しません。'
  },
  {
    q: 'オンラインのみですか？',
    a: '基本はオンライン（Zoom等）です。対面をご希望の場合はご相談ください。'
  }
];

const INITIAL_FORM = {
  company: '',
  name: '',
  email: '',
  industry: '',
  revenue: '',
  message: '',
};

export default function MonthlyReviewPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const canSubmit = useMemo(() => {
    return form.company && form.name && form.email && form.industry && form.revenue && !isSubmitting;
  }, [form, isSubmitting]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const res = await fetch('/api/form-submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: 'monthly-review',
          formType: 'monthly_review_contact',
          sourcePath: '/monthly-review',
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.detail || data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setForm(INITIAL_FORM);
      router.push('/thanks?service=monthly-review');
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.message || '送信に失敗しました。時間を置いて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  }

  function toggleFaq(index) {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }

  return (
    <>
      <style>{`
        .rv-diff-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
        }
        .rv-diff-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 16px;
        }
        .rv-diff-col-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--faint);
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .rv-diff-col-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 4px;
        }
        .rv-diff-col-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
        }
        .rv-diff-col-current {
          border-left: 3px solid var(--blue);
          padding-left: 14px;
        }
        .rv-diff-note {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 12px;
        }
        .rv-diff-link {
          font-size: 13px;
          color: var(--blue);
          text-decoration: none;
        }
        .rv-diff-link:hover { text-decoration: underline; }
        .rv-deliv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .rv-deliv-card {
          border-radius: var(--radius-lg);
          padding: 28px 24px;
        }
        .rv-deliv-card-blue { background: var(--blue-light); border: 1px solid var(--blue-pale); }
        .rv-deliv-card-green { background: var(--green-light); border: 1px solid var(--green-pale); }
        .rv-deliv-card-purple { background: var(--purple-light); border: 1px solid var(--purple-pale); }
        .rv-deliv-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .rv-deliv-card-blue .rv-deliv-icon { background: var(--blue-pale); color: var(--blue); }
        .rv-deliv-card-green .rv-deliv-icon { background: var(--green-pale); color: var(--green); }
        .rv-deliv-card-purple .rv-deliv-icon { background: var(--purple-pale); color: var(--purple); }
        .rv-deliv-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .rv-deliv-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .rv-price-block {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .rv-price-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--faint);
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .rv-price-amount {
          font-size: 36px;
          font-weight: 800;
          color: var(--navy);
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .rv-price-unit {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 8px;
        }
        .rv-price-note {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          padding: 12px 16px;
          background: var(--surface);
          border-radius: var(--radius-sm);
        }
        .rv-check-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .rv-check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-sub);
          line-height: 1.5;
        }
        .rv-check-item::before {
          content: '✓';
          color: var(--green);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .rv-cross-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }
        .rv-cross-item::before {
          content: '−';
          color: var(--hint);
          font-weight: 700;
          flex-shrink: 0;
        }
        .rv-price-right-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
        }
        .rv-cross-label {
          font-size: 12px;
          color: var(--faint);
          font-weight: 600;
          margin: 16px 0 8px;
        }
        .rv-next-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .rv-next-card {
          display: block;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .rv-next-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37,99,235,0.08);
        }
        .rv-next-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--blue);
          background: var(--blue-light);
          border: 1px solid var(--blue-pale);
          border-radius: 9999px;
          padding: 3px 10px;
          margin-bottom: 10px;
        }
        .rv-next-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
        }
        .rv-next-body {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .rv-diff-row { grid-template-columns: 1fr; }
          .rv-deliv-grid { grid-template-columns: 1fr; }
          .rv-price-block { grid-template-columns: 1fr; gap: 20px; }
          .rv-next-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <LPHero
        eyebrow="月次経営レビュー｜継続支援"
        title="経営判断を、大幅に軽減します。"
        lead="資料はある。数字も出ている。でも「今月何が起きたか」「次に何をすべきか」まで整理しきれていない。月に一度、数字を一緒に読み解き、次の判断と行動を整理する時間をつくります。"
        ctaLabel="お問い合わせ・ご相談"
        ctaHref="#form"
        note="最低契約期間3ヶ月。3ヶ月以降は1ヶ月前の連絡で解約可能です"
      />

      <LPSection tone="stone" kicker="月次経営レポートとの違い" title="2つのサービスの役割">
        <div className="rv-diff-card">
          <div className="rv-diff-row">
            <div>
              <div className="rv-diff-col-label">月次経営レポート</div>
              <div className="rv-diff-col-title">資料を整えて納品する</div>
              <div className="rv-diff-col-body">試算表・資金繰り表を受け取り、会議や説明に使いやすい形に整えて毎月納品します。</div>
            </div>
            <div className="rv-diff-col-current">
              <div className="rv-diff-col-label" style={{color:'var(--blue)'}}>月次経営レビュー（このページ）</div>
              <div className="rv-diff-col-title">資料を一緒に読んで、判断を決める</div>
              <div className="rv-diff-col-body">月次の数字を共に読み解き、今月の論点と次のアクションまで整理します。</div>
            </div>
          </div>
          <div className="rv-diff-note">両方ご利用いただくことも可能です。</div>
          <Link href="/monthly-report/" className="rv-diff-link">月次経営レポートを見る →</Link>
        </div>
      </LPSection>

      <LPProblemSection
        tone="white"
        kicker="こんな状態が続いていませんか"
        title="月次レビューが必要な5つの状態"
        items={PROBLEMS}
      />

      <LPSection tone="stone" kicker="お渡しするもの" title="毎月得られる3つの成果物">
        <div className="rv-deliv-grid">
          {DELIVERABLES.map((d) => (
            <div className={`rv-deliv-card rv-deliv-card-${d.color}`} key={d.title}>
              <div className="rv-deliv-icon">{d.icon}</div>
              <div className="rv-deliv-title">{d.title}</div>
              <div className="rv-deliv-body">{d.body}</div>
            </div>
          ))}
        </div>
      </LPSection>

      <LPSection tone="white" kicker="進め方" title="毎月の流れ">
        <LPStepFlow items={STEPS} />
      </LPSection>

      <LPSection tone="stone" kicker="向いている会社" title="このサービスが向いている会社・向いていない会社">
        <LPFitGrid
          yesTitle="向いている会社"
          yesItems={[
            '売上1億〜30億円規模',
            '経営者または財務担当者が月1回、数字に向き合える',
            '資料はあるが、そこから判断につなげる時間と視点が足りない',
            '継続的に数字を見る外部の目が欲しい'
          ]}
          noTitle="向いていない会社"
          noItems={[
            '記帳・税務申告の代行を求めている会社',
            '単発の診断だけを求めていて、継続的な見直しは想定していない会社',
            'まず月次数字の資料整備から必要な会社（→月次経営レポートへ）'
          ]}
        />
      </LPSection>

      <LPSection tone="white" kicker="料金" title="費用と含まれる内容">
        <div className="rv-price-block">
          <div>
            <div className="rv-price-label">月額・継続契約</div>
            <div className="rv-price-amount">250,000<span style={{fontSize:'18px',fontWeight:600}}>円</span></div>
            <div className="rv-price-unit">税別 / 月額</div>
            <div className="rv-price-note">最低契約期間：3ヶ月。3ヶ月以降は1ヶ月前のご連絡で解約可能です。</div>
          </div>
          <div>
            <div className="rv-price-right-title">含まれる内容</div>
            <ul className="rv-check-list">
              {INCLUDED.map((item) => (
                <li className="rv-check-item" key={item}>{item}</li>
              ))}
            </ul>
            <div className="rv-cross-label">含まれないもの</div>
            {NOT_INCLUDED.map((item) => (
              <div className="rv-cross-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </LPSection>

      <LPSection tone="stone" kicker="FAQ" title="よくあるご質問">
        <LPFaq items={FAQS} openIndex={openFaqIndex} onToggle={toggleFaq} />
      </LPSection>

      <LPSection tone="white" kicker="次のステップ" title="より深い経営支援が必要な場合">
        <div className="rv-next-grid">
          <Link href="/yojitsu/" className="rv-next-card">
            <div className="rv-next-badge">上位支援</div>
            <div className="rv-next-title">予実管理伴走</div>
            <div className="rv-next-body">計画と実績の差異を毎月分析し、次の判断材料に変えます。月次経営レビューとの併用も可能です。</div>
          </Link>
          <Link href="/meeting-design/" className="rv-next-card">
            <div className="rv-next-badge">スポット支援</div>
            <div className="rv-next-title">経営会議設計</div>
            <div className="rv-next-body">会議の型を一度整えることで、月次の判断が動きやすくなります。</div>
          </Link>
        </div>
      </LPSection>

      <LPSection
        tone="dark"
        kicker="お問い合わせ"
        title="まずは現状をお聞かせください。"
        subtitle="送信後、受付確認メールをお送りします。2営業日以内にご連絡いたします。"
        narrow
        id="form"
      >
        <LPTrustNote
          items={[
            '秘密厳守・NDA締結可',
            'まず状況確認からお聞きします',
            '無理な提案・売り込みはしません'
          ]}
        />

        <LPLeadForm
          serviceSlug="monthly-review"
          formType="monthly_review_contact"
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
          message={message}
          isSuccess={isSuccess}
          submitLabel="相談内容を送る"
          helpText={
            <>
              送信後、受付確認メールをお送りします。届かない場合は迷惑メールフォルダもご確認ください。<br />
              <a href="/privacy/">プライバシーポリシー</a>に同意のうえご送信ください。
            </>
          }
          fields={[
            { name: 'company', label: '会社名', required: true, placeholder: '株式会社○○' },
            { name: 'name', label: 'お名前', required: true, placeholder: '山田 太郎' },
            { name: 'email', label: 'メールアドレス', type: 'email', required: true, placeholder: 'info@example.com' },
            { name: 'industry', label: '業種', required: true, placeholder: '例：製造業、小売業、サービス業' },
            { name: 'revenue', label: '売上規模（概算）', required: true, placeholder: '例：1〜3億円' },
            { name: 'message', label: 'ご相談内容・現在の課題（任意）', type: 'textarea', required: false, placeholder: '例：毎月試算表は届くが、読み方と次のアクションがわからない。' }
          ]}
        />
      </LPSection>

      <LPBottomBar
        primaryLabel="お問い合わせ"
        primaryHref="#form"
        secondaryLabel="相談する"
        secondaryHref="/contact/"
      />
    </>
  );
}
