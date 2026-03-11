'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2>Критическая ошибка</h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>{error?.message || 'Произошла ошибка приложения'}</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: '0.5rem 1rem',
              background: '#FF5C00',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Попробовать снова
          </button>
        </div>
      </body>
    </html>
  );
}
