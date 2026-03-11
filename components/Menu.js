'use client';

import Link from 'next/link';
import { useState } from 'react';

function MenuItem({ item }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className="menu-item" style={{ listStyle: 'none', position: 'relative' }}>
      {item.url && item.url !== '#' ? (
        <Link href={item.url} style={{ padding: '0.5rem 1rem', display: 'block' }}>
          {item.title}
        </Link>
      ) : (
        <span style={{ padding: '0.5rem 1rem', display: 'block', cursor: 'default' }}>{item.title}</span>
      )}
      {hasChildren && (
        <>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            style={{ marginLeft: '0.5rem', padding: '0.25rem', cursor: 'pointer' }}
          >
            {open ? '▼' : '▶'}
          </button>
          {open && (
            <ul style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>
              {item.children.map((child) => (
                <MenuItem key={child.id} item={child} />
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  );
}

export default function Menu({ items = [], className = '' }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className={className}>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none' }}>
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}
