'use client';

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '40vh' }}>
      <h2 style={{ marginBottom: '1rem' }}>Что-то пошло не так</h2>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>{error?.message || 'Произошла ошибка'}</p>
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
  );
}
