import { useEffect, useMemo, useState } from 'react';
import { Clock, Inbox } from 'lucide-react';
import { authors, categories, posts } from '../data/mockData';
import { useStore } from '../store';
import { fmtDate, navigate } from '../lib';
import type { Post, SortKey } from '../types';
import { Avatar, CoverImage } from '../components/Media';
import PostCard, { CardSkeleton } from '../components/PostCard';

const DAY = 864e5;
const NOW = new Date('2026-09-23').getTime();

export default function Home() {
  const { query, category, sort, setCategory, setSort, resetFilters } = useStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

  const featured = useMemo(() => posts.reduce((a, b) => (b.views > a.views ? b : a)), []);
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: posts.length };
    categories.forEach((k) => { c[k] = posts.filter((p) => p.category === k).length; });
    return c;
  }, []);

  const list = useMemo(() => {
    const s = query.trim().toLowerCase();
    const match = (text: string) => text.toLowerCase().includes(s);
    const key: Record<SortKey, (p: Post) => number> = {
      Latest: (p) => +new Date(p.publishedAt),
      'Most Popular': (p) => p.views,
      Trending: (p) => p.views / Math.max(1, (NOW - +new Date(p.publishedAt)) / DAY),
    };
    return posts
      .filter((p) => (category === 'All' || p.category === category) &&
        (!s || match([p.title, p.excerpt, authors[p.authorId].name, p.tags.join(' '), p.content.map((b) => ('text' in b ? b.text : b.caption)).join(' ')].join(' '))))
      .sort((a, b) => key[sort](b) - key[sort](a));
  }, [query, category, sort]);

  const fa = authors[featured.authorId];
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section onClick={() => navigate(`#/post/${featured.id}`)} className="group relative flex min-h-[22rem] animate-fade-up cursor-pointer items-end overflow-hidden rounded-3xl text-white">
        <CoverImage src={featured.cover} alt={featured.title} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative max-w-2xl space-y-4 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-white/20 px-3 py-1 font-semibold backdrop-blur">Featured · {featured.category}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{fmtDate(featured.publishedAt)} · {featured.readingTime} min read</span>
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-5xl">{featured.title}</h1>
          <p className="text-white/85 sm:text-lg">{featured.excerpt}</p>
          <div className="flex items-center gap-3"><Avatar author={fa} size={40} /><div className="text-sm"><div className="font-semibold">{fa.name}</div><div className="text-white/70">{fa.role}</div></div></div>
        </div>
      </section>

      <section className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['All', ...categories] as const).map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${category === c ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-200 hover:border-indigo-400 dark:border-slate-700'}`}>
              {c}<span className={`ml-2 rounded-full px-1.5 py-0.5 text-xs ${category === c ? 'bg-white/25' : 'bg-slate-100 dark:bg-slate-800'}`}>{counts[c]}</span>
            </button>
          ))}
        </div>
        <select aria-label="Sort posts" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm sm:w-44 dark:border-slate-700 dark:bg-slate-900">
          {(['Latest', 'Most Popular', 'Trending'] as SortKey[]).map((s) => <option key={s}>{s}</option>)}
        </select>
      </section>

      {query && <p className="mt-4 text-sm text-slate-500">{list.length} result{list.length === 1 ? '' : 's'} for “{query}”</p>}

      <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? [0, 1, 2, 3, 4, 5].map((i) => <CardSkeleton key={i} />) : list.map((p, i) => <PostCard key={p.id} post={p} index={i} />)}
      </section>

      {!loading && list.length === 0 && (
        <div className="animate-fade-up py-20 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800"><Inbox className="h-8 w-8" /></div>
          <h3 className="mt-4 text-xl font-bold">No articles found</h3>
          <p className="mt-1 text-slate-500">Try a different keyword or category.</p>
          <button onClick={resetFilters} className="mt-4 rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-white">Clear filters</button>
        </div>
      )}
    </main>
  );
}
