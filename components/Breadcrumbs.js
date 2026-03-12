import Link from "next/link";

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="container">
      <div style={{ paddingTop: "100px" }} />
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Мягкие окна</Link>
        {items.map((item, i) => (
          <span key={i}>
            <span className="breadcrumb-sep"> / </span>
            {i < items.length - 1 && item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span className="breadcrumb-current">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
