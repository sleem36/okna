'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default function SearchTrigger() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setItems([]);
      return;
    }
    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((d) => {
          setItems(d.items || []);
          setLoading(false);
        })
        .catch(() => {
          setItems([]);
          setLoading(false);
        });
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('click', onClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClickOutside);
    };
  }, [open]);

  return (
    <div className="header-search" ref={wrapRef}>
      <button
        type="button"
        className="header-search__btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Поиск"
        aria-expanded={open}
      >
        <SearchIcon />
      </button>
      {open && (
        <div className="search-overlay">
          <div className="search-overlay__box">
            <input
              ref={inputRef}
              type="search"
              className="search-overlay__input"
              placeholder="Поиск по сайту..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {loading && <span className="search-overlay__loading">Поиск…</span>}
          </div>
          <div className="search-overlay__results">
            {!query.trim() && (
              <p className="search-overlay__hint">Введите минимум 2 символа</p>
            )}
            {query.trim().length > 0 && !loading && items.length === 0 && (
              <p className="search-overlay__hint">Ничего не найдено</p>
            )}
            {items.length > 0 && (
              <ul className="search-results">
                {items.map((item, i) => (
                  <li key={`${item.href}-${i}`}>
                    <Link
                      href={item.href}
                      className="search-results__link"
                      onClick={() => setOpen(false)}
                    >
                      <span className="search-results__title">{item.title}</span>
                      {item.type && (
                        <span className={`search-results__type search-results__type--${item.type}`}>
                          {item.type === 'post' && 'Статья'}
                          {item.type === 'page' && 'Страница'}
                          {item.type === 'menu' && 'Раздел'}
                          {item.type === 'work' && 'Работа'}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
