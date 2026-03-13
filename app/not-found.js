import Link from 'next/link';

export const metadata = {
  title: 'Страница не найдена — Мягкие окна Стиль',
};

export default function NotFound() {
  return (
    <section id="win_main" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="main__wrapper" style={{ textAlign: 'center', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <h1 style={{ fontSize: '96px', color: '#FF5C00', margin: 0 }}>404</h1>
          <p style={{ fontSize: '24px', marginBottom: '8px' }}>Страница не найдена</p>
          <p style={{ color: '#666', maxWidth: '480px', margin: '0 auto 32px' }}>
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn" style={{ display: 'inline-block' }}>
              На главную
            </Link>
            <Link href="/our_works" className="btn cost-btn" style={{ display: 'inline-block' }}>
              Наши работы
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
