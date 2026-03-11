import Link from 'next/link';
import Image from 'next/image';

export default function Card({ title, slug, excerpt, date, featured_image, href = null }) {
  const url = href != null ? href : `/post/${slug}`;

  return (
    <article style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', maxWidth: '360px' }}>
      {featured_image && (
        <Link href={url} style={{ display: 'block', position: 'relative', aspectRatio: '16/10', background: '#f0f0f0' }}>
          <Image src={featured_image} alt={title || ''} fill style={{ objectFit: 'cover' }} sizes="360px" />
        </Link>
      )}
      <div style={{ padding: '1rem' }}>
        <time style={{ fontSize: '0.85rem', color: '#666' }} dateTime={date}>{date}</time>
        <h2 style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
          <Link href={url}>{title}</Link>
        </h2>
        {excerpt && <p style={{ fontSize: '0.95rem', color: '#444' }} dangerouslySetInnerHTML={{ __html: excerpt }} />}
      </div>
    </article>
  );
}
