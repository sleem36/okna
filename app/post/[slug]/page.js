import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import data from '../../../lib/data';

export async function generateStaticParams() {
  const posts = data.getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = data.getPostBySlug(params.slug);
  if (!post) return { title: 'Запись не найдена' };
  return { title: `${post.title} — Мягкие окна Стиль`, description: post.excerpt || '' };
}

export default function PostPage({ params }) {
  const post = data.getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>{post.title}</h1>
      <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
        <time dateTime={post.date}>{post.date}</time>
        {post.categories && post.categories.length > 0 && (
          <span style={{ marginLeft: '1rem' }}>
            Рубрики:{' '}
            {post.categories.map((c) => (
              <Link key={c.slug} href={`/category/${encodeURIComponent(c.slug)}`} style={{ marginRight: '0.5rem', color: '#0066cc' }}>
                {c.name}
              </Link>
            ))}
          </span>
        )}
      </div>
      {post.featured_image && (
        <div style={{ marginBottom: '1.5rem', position: 'relative', aspectRatio: '21/9', borderRadius: '8px', overflow: 'hidden' }}>
          <Image src={post.featured_image} alt={post.title} fill style={{ objectFit: 'cover' }} sizes="800px" />
        </div>
      )}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <p style={{ marginTop: '2rem' }}>
        <Link href="/blog" style={{ color: '#0066cc' }}>← К списку записей</Link>
      </p>
    </article>
  );
}
