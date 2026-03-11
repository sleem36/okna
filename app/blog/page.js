import Link from 'next/link';
import data from '../../lib/data';
import Card from '../../components/Card';

export const metadata = {
  title: 'Блог — Мягкие окна Стиль',
  description: 'Записи блога',
};

export default function BlogPage() {
  const posts = data.getPosts();

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>Блог</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            date={post.date}
            featured_image={post.featured_image}
          />
        ))}
      </div>
      {posts.length === 0 && <p style={{ color: '#666' }}>Записей пока нет. Запустите <code>npm run parse</code> для загрузки данных из XML.</p>}
    </div>
  );
}
