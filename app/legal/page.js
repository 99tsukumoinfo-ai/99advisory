export const metadata = {
  title: '特定商取引法に基づく表記 | 九十九アドバイザリー',
};

export default function LegalPage() {
  const items = [
    { label: '販売業者', value: 'keynes合同会社' },
    { label: '所在地', value: '東京都港区南青山3丁目' },
    { label: '電話番号', value: '請求があり次第、遅滞なく開示します' },
    { label: 'メールアドレス', value: '99tsukumo.info@gmail.com' },
    {
      label: '役務の対価',
      value: '各サービスページに記載の金額（¥110,000〜）。税込価格は別途ご案内します。',
    },
    { label: '対価以外の必要料金', value: 'なし' },
    { label: '支払い方法', value: '銀行振込' },
    {
      label: '支払い時期',
      value: 'ご請求書発行後、指定期日までにお支払いください。',
    },
    {
      label: '役務の提供時期',
      value: '契約締結後2〜4週間を目安にご提供します。',
    },
    {
      label: 'キャンセル・返金について',
      value:
        '役務提供開始前のキャンセルはお申し出いただいた時点で受け付けます。役務提供開始後のキャンセル・返金には応じかねます。詳細は契約締結時にご案内します。',
    },
  ];

  return (
    <section className="page-section">
      <div className="container article-body">
        <h1 className="page-title">特定商取引法に基づく表記</h1>

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
      </div>
    </section>
  );
}
