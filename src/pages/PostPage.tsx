import { useEffect, useState } from 'react';
import { ArrowLeft, Github, Link2, Linkedin, MessageSquare, Twitter } from 'lucide-react';
import { authors, posts } from '../data/mockData';
import { useStore } from '../store';
import { fmtDate, navigate } from '../lib';
import ActionButtons from '../components/ActionButtons';
import ArticleBody from '../components/ArticleBody';
import Comments from '../components/Comments';
import { Avatar, Badge, CoverImage } from '../components/Media';
import PostCard from '../components/PostCard';

export default function PostPage({ id }: { id: number }) {
  const post = posts.find((p) => p.id === id);
  const { following, toggleFollow } = useStore();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => { const h = document.documentElement; setProgress(Math.min(100, (h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1)) * 100)); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [id]);

  if (!post) return <main className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-2xl font-bold">Post not found</h1><button onClick={() => navigate('#/')} className="mt-4 text-indigo-500">Back home</button></main>;

  const a = authors[post.authorId];
  const related = posts.filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((x, y) => y.score - x.score).slice(0, 3).map((o) => o.p);
  const copy = async () => { try { await navigator.clipboard.writeText(window.location.href); } catch { /* clipboard unavailable */ } setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <div>
      <div className="fixed left-0 top-0 z-50 h-1 bg-indigo-500 transition-[width]" style={{ width: `${progress}%` }} />
      <article className="mx-auto max-w-3xl animate-fade-up px-4 py-8">
        <button onClick={() => navigate('#/')} className="mb-6 flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-500"><ArrowLeft className="h-4 w-4" /> All articles</button>
        <Badge>{post.category}</Badge>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-3 text-xl text-slate-500">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-3">
          <Avatar author={a} size={48} />
          <div className="text-sm"><div className="font-semibold">{a.name} <span className="font-normal text-slate-500">· {a.role}</span></div><div className="text-slate-500">{fmtDate(post.publishedAt)} · {post.readingTime} min read</div></div>
        </div>
        <CoverImage src={post.cover} alt={post.title} className="mt-8 h-56 w-full rounded-2xl sm:h-96" />

        <div className="sticky bottom-4 z-30 mx-auto mt-6 flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-white/90 px-3 py-1 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-800/90">
          <ActionButtons post={post} />
          <button onClick={copy} className="flex items-center gap-1 rounded-full p-2 text-sm text-slate-500 hover:text-indigo-500"><Link2 className="h-5 w-5" />{copied ? 'Copied!' : 'Share'}</button>
          <a href="#comments" aria-label="Comments" onClick={(e) => { e.preventDefault(); document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' }); }} className="rounded-full p-2 text-slate-500 hover:text-indigo-500"><MessageSquare className="h-5 w-5" /></a>
        </div>

        <div className="mt-4"><ArticleBody blocks={post.content} /></div>
        <div className="mt-8 flex flex-wrap gap-2">{post.tags.map((t) => <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800">#{t}</span>)}</div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-slate-200 p-6 sm:flex-row dark:border-slate-800">
          <Avatar author={a} size={64} />
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-slate-500">Written by</div>
            <h3 className="text-xl font-bold">{a.name}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{a.bio}</p>
            <div className="mt-3 flex gap-3 text-slate-500">
              <a href={a.social.twitter} aria-label="Twitter" className="hover:text-indigo-500"><Twitter className="h-5 w-5" /></a>
              <a href={a.social.github} aria-label="GitHub" className="hover:text-indigo-500"><Github className="h-5 w-5" /></a>
              <a href={a.social.linkedin} aria-label="LinkedIn" className="hover:text-indigo-500"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
          <button onClick={() => toggleFollow(a.id)} className={`rounded-full px-5 py-2 text-sm font-medium ${following[a.id] ? 'border border-slate-300 dark:border-slate-600' : 'bg-indigo-500 text-white'}`}>{following[a.id] ? 'Following' : 'Follow Author'}</button>
        </div>
        <Comments key={post.id} />
      </article>
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="mb-5 text-2xl font-bold">Related articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r, i) => <PostCard key={r.id} post={r} index={i} />)}</div>
      </section>
    </div>
  );
}
