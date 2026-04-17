import Link from 'next/link';
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/content';
import { notFound } from 'next/navigation';

const serviceLabel = {
  cashflow:         { label: '資金繰り診断',     href: '/cashflow/' },
  'bank-plan':      { label: '銀行向け事業計画', href: '/bank-plan/' },
  seizo:            { label: '財務健康診断',     href: '/seizo/' },
  'monthly-report': { label: '月次経営レポート', href: '/monthly-report/' },
  'monthly-review': { label: '月次経営レビュー', href: '/monthly-review/' },
  yojitsu:          { label: '予実管理伴走',     href: '/yojitsu/' },
  'meeting-design': { label: '経営会議設計',     href: '/meeting-design/' },
};

const categoryLabel = {
  cashflow:   '資金繰り',
  bank:       '銀行・融資',
  management: '経営管理',
  marketing:  '広告・マーケ',
  seizo:      '財務診断',
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | 九十九アドバイザリー`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.published) {
    notFound();
  }

  const related = article.relatedService
    ? await getRelatedArticles(article.relatedService, article.slug)
    : [];

  const service = article.relatedService
    ? serviceLabel[article.relatedService]
    : null;

  const Content = article.Content;

  return (
    <>
      <div className="ad-page">

        {/* 1. パンくず */}
        <div className="ad-breadcrumb-bar">
          <div className="ad-breadcrumb-inner">
            <Link href="/">ホーム</Link>
            <span className="ad-breadcrumb-sep">/</span>
            <Link href="/articles/">記事一覧</Link>
            <span className="ad-breadcrumb-sep">/</span>
            <span className="ad-breadcrumb-current">{article.title}</span>
          </div>
        </div>

        {/* 2. 記事ヘッダー */}
        <header className="ad-header">
          <div className="ad-header-inner">
            <div className="ad-meta-row">
              {article.category && (
                <span className="ad-category-pill">
                  {categoryLabel[article.category] || article.category}
                </span>
              )}
              <span className="ad-date">{article.date}</span>
            </div>
            <h1 className="ad-title">{article.title}</h1>
            <p className="ad-description">{article.description}</p>
          </div>
        </header>

        {/* 3. 2カラムレイアウト */}
        <div className="ad-body-wrap">

          {/* 本文（左） */}
          <main className="ad-main">
            <div className="ad-article-card">
              <article className="article-body">
                <Content />
              </article>
            </div>
          </main>

          {/* サイドバー（右） */}
          <aside className="ad-sidebar">

            {/* メタ情報カード */}
            <div className="ad-sidebar-card">
              <div className="ad-sidebar-label">この記事について</div>
              <div className="ad-sidebar-meta-row">
                {article.category && (
                  <div className="ad-sidebar-meta-item">
                    <span className="ad-sidebar-meta-key">分類</span>
                    <span className="ad-sidebar-meta-val">
                      {categoryLabel[article.category] || article.category}
                    </span>
                  </div>
                )}
                <div className="ad-sidebar-meta-item">
                  <span className="ad-sidebar-meta-key">公開</span>
                  <span className="ad-sidebar-meta-val">{article.date}</span>
                </div>
              </div>
              <hr className="ad-sidebar-divider" />
              <p className="ad-sidebar-summary">{article.description}</p>
            </div>

            {/* 関連サービスCTAカード */}
            {service && (
              <div className="ad-sidebar-service">
                <div className="ad-sidebar-service-label">関連サービス</div>
                <div className="ad-sidebar-service-title">{service.label}</div>
                <p className="ad-sidebar-service-body">
                  この記事のテーマについて、詳しく整理したい場合はこちらをご覧ください。
                </p>
                <Link href={service.href} className="ad-sidebar-service-btn">
                  {service.label}を見る →
                </Link>
              </div>
            )}

            {/* 記事一覧に戻るリンク */}
            <Link href="/articles/" className="ad-sidebar-back">
              ← 記事一覧に戻る
            </Link>

          </aside>
        </div>

        {/* 4. 関連記事（3カラム） */}
        {related.length > 0 && (
          <div className="ad-related-wrap">
            <div className="ad-related-inner">
              <div className="ad-related-heading">関連記事</div>
              <div className="ad-related-grid">
                {related.map((r) => (
                  <Link key={r.slug} href={`/articles/${r.slug}/`} className="ad-related-card">
                    <div className="ad-related-meta">
                      {r.category && (
                        <span className="ad-related-pill">
                          {categoryLabel[r.category] || r.category}
                        </span>
                      )}
                      <span className="ad-related-date">{r.date}</span>
                    </div>
                    <div className="ad-related-title">{r.title}</div>
                    <div className="ad-related-desc">{r.description}</div>
                    <div className="ad-related-arrow">読む →</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. フッターナビ */}
        <div className="ad-footer-nav">
          <div className="ad-footer-nav-inner">
            <Link href="/articles/" className="ad-back-link">← 記事一覧に戻る</Link>
            <Link href="/contact/" className="ad-contact-link">相談する →</Link>
          </div>
        </div>

      </div>
    </>
  );
}
