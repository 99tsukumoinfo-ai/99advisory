'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM = { company: '', name: '', email: '', message: '', inquiryType: '' };
const INITIAL_ERRORS = { company: '', name: '', email: '', message: '' };

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageInner />
    </Suspense>
  );
}

function ContactPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inquiryType = searchParams.get('type') || '';
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    setForm((prev) => ({ ...prev, inquiryType }));
  }, [inquiryType]);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const next = { ...INITIAL_ERRORS };
    if (!form.company.trim()) next.company = '会社名を入力してください';
    if (!form.name.trim()) next.name = 'お名前を入力してください';
    if (!form.email.trim()) next.email = 'メールアドレスを入力してください';
    else if (!EMAIL_RE.test(form.email)) next.email = 'メールアドレスの形式が正しくありません';
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/form-submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          serviceSlug: 'contact',
          formType: 'general',
          sourcePath: '/contact',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.detail || data.error || '送信に失敗しました');
      router.push('/thanks?service=contact');
    } catch (err) {
      setSubmitError(err.message || '送信に失敗しました。時間を置いて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        .ct-header {
          background: var(--bg);
          padding: 80px 40px 0;
        }
        .ct-wrap {
          max-width: 640px;
          margin: 0 auto;
        }
        .ct-eyebrow {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 16px;
        }
        .ct-heading {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          color: var(--navy);
          line-height: 1.3;
          margin: 0 0 16px;
        }
        .ct-lead {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.8;
          margin: 0 0 24px;
        }
        .ct-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 0;
        }
        .ct-badge {
          font-size: 12px;
          font-weight: 600;
          color: var(--faint);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 5px 14px;
        }

        .ct-form-section {
          background: var(--bg);
          padding: 48px 40px 96px;
        }
        .ct-form-wrap {
          max-width: 640px;
          margin: 0 auto;
        }
        .ct-submit-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: var(--radius-sm);
          padding: 14px 18px;
          color: #b91c1c;
          font-size: 14px;
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ct-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
        }
        .ct-required {
          color: #e53e3e;
          margin-left: 4px;
        }
        .ct-input {
          width: 100%;
          padding: 12px 14px;
          font-size: 15px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: var(--bg);
          color: var(--text);
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.15s;
        }
        .ct-input:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
        }
        .ct-input-error {
          border-color: #fca5a5;
        }
        .ct-input-error:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
        }
        .ct-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .ct-field-error {
          font-size: 13px;
          color: #b91c1c;
          margin: 0;
        }
        .ct-submit-btn {
          width: 100%;
          padding: 16px;
          background: var(--navy);
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: opacity 0.2s;
          font-family: inherit;
        }
        .ct-submit-btn:hover:not(:disabled) { opacity: 0.88; }
        .ct-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .ct-form-note {
          font-size: 13px;
          color: var(--hint);
          text-align: center;
          margin-top: 16px;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .ct-header { padding: 60px 20px 0; }
          .ct-form-section { padding: 40px 20px 72px; }
        }
      `}</style>

      {/* Section 1: Header */}
      <section className="ct-header">
        <div className="ct-wrap">
          <span className="ct-eyebrow">Contact</span>
          <h1 className="ct-heading">まずは、状況を聞かせてください</h1>
          <p className="ct-lead">
            サービスをご検討中の方、どこに相談すべきか迷っている方、
            どちらもお気軽にどうぞ。内容を確認したうえで、2営業日以内にご連絡します。
          </p>
          <div className="ct-badges">
            {['秘密厳守・NDA締結可', '初回相談は無料', '売り込みは行いません'].map((badge) => (
              <span key={badge} className="ct-badge">{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Form */}
      <section className="ct-form-section">
        <div className="ct-form-wrap">
          {submitError && (
            <div className="ct-submit-error">{submitError}</div>
          )}

          <form onSubmit={handleSubmit} noValidate className="ct-form">
            {form.inquiryType && (
              <div className="ct-field">
                <label className="ct-label">お問い合わせの種類</label>
                <input
                  type="text"
                  value={form.inquiryType}
                  readOnly
                  className="ct-input"
                  style={{ background: 'var(--surface)', color: 'var(--muted)', cursor: 'default' }}
                />
              </div>
            )}
            <div className="ct-field">
              <label className="ct-label">
                会社名<span className="ct-required">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="株式会社〇〇"
                className={`ct-input${errors.company ? ' ct-input-error' : ''}`}
              />
              {errors.company && <p className="ct-field-error">{errors.company}</p>}
            </div>

            <div className="ct-field">
              <label className="ct-label">
                お名前<span className="ct-required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="山田 太郎"
                className={`ct-input${errors.name ? ' ct-input-error' : ''}`}
              />
              {errors.name && <p className="ct-field-error">{errors.name}</p>}
            </div>

            <div className="ct-field">
              <label className="ct-label">
                メールアドレス<span className="ct-required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="taro@example.com"
                className={`ct-input${errors.email ? ' ct-input-error' : ''}`}
              />
              {errors.email && <p className="ct-field-error">{errors.email}</p>}
            </div>

            <div className="ct-field">
              <label className="ct-label">ご相談内容</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="例：利益は出ているが現金が残らない理由を整理したい"
                className="ct-input ct-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="ct-submit-btn"
            >
              {submitting ? '送信中...' : '相談内容を送る'}
            </button>
          </form>

          <p className="ct-form-note">
            送信後、受付確認メールをお送りします。メールが届かない場合は
            info@99advisory.jp までご連絡ください。
          </p>
        </div>
      </section>
    </>
  );
}
