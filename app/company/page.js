export const metadata = {
  title: '会社情報 | 九十九アドバイザリー',
};

export default function CompanyPage() {
  const items = [
    { label: '会社名', value: 'keynes合同会社' },
    { label: '所在地', value: '東京都港区南青山3丁目' },
    { label: '事業内容', value: '中小企業向け財務・経営アドバイザリーサービスの提供' },
    { label: 'メールアドレス', value: '99tsukumo.info@gmail.com' },
    { label: 'サービスサイト', value: '99advisory.jp' },
  ];

  return (
    <section className="page-section">
      <div className="container article-body">
        <h1 className="page-title">会社情報</h1>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 32 }}>
          <tbody>
            {items.map(({ label, value }) => (
              <tr
                key={label}
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <th
                  style={{
                    width: '30%',
                    padding: '16px 12px',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'var(--text-sub)',
                    verticalAlign: 'top',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </th>
                <td
                  style={{
                    padding: '16px 12px',
                    fontSize: 14,
                    color: 'var(--text)',
                    lineHeight: 1.8,
                  }}
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            marginTop: 48,
            padding: '24px 28px',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
          }}
        >
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.9, margin: 0 }}>
            九十九アドバイザリーは、中小企業の経営者・財務担当者を対象に、数字と論点を整理し、
            経営判断を進めやすい形へ整える支援を提供しています。
            財務健康診断・資金繰り診断・月次経営レポートなど、状況に合わせたサービスをご用意しています。
          </p>
        </div>
      </div>
    </section>
  );
}
