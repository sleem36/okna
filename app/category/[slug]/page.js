import { notFound } from "next/navigation";
import Link from "next/link";
import data from "../../../lib/data";
import Card from "../../../components/Card";

export async function generateStaticParams() {
  const categories = data.getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const categories = data.getCategories();
  const cat = categories.find(
    (c) => decodeURIComponent(params.slug) === c.slug,
  );
  if (!cat) return { title: "Рубрика не найдена" };
  return { title: `${cat.name} — Мягкие окна Стиль` };
}

export default function CategoryPage({ params }) {
  const slug = decodeURIComponent(params.slug);
  const posts = data.getPostsByCategorySlug(slug);
  const categories = data.getCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Рубрика: {cat.name}</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
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
      {posts.length === 0 && (
        <p style={{ color: "#666" }}>В этой рубрике пока нет записей.</p>
      )}
      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/blog" style={{ color: "#0066cc" }}>
          ← Все записи
        </Link>
      </p>
    </div>
  );
}
