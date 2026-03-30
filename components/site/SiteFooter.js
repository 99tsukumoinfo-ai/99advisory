import Link from 'next/link';
import navigation from '../../content/site/navigation';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-title">九十九アドバイザリー</div>
            <p className="page-lead" style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
              中小企業向けに、管理会計・資金繰り・事業計画・経営判断の整理を支援する
              CFOアドバイザリーサービスです。
            </p>
          </div>

          <div>
            <div className="footer-title">Services</div>
            <div className="footer-links">
              {navigation.footerServices.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-title">Legal</div>
            <div className="footer-links">
              {navigation.footerLegal.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-copy">© 2026 九十九アドバイザリー</div>
      </div>
    </footer>
  );
}
