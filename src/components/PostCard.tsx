import { Clock } from 'lucide-react';
import { authors } from '../data/mockData';
import { fmtDate, navigate } from '../lib';
import type { Post } from '../types';
import ActionButtons from './ActionButtons';
import { Avatar, Badge, CoverImage } from './Media';

export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const a = authors[post.authorId];
  return (
    <article onClick={() => navigate(`#/post/${post.id}`)} style={{ animationDelay: `${(index % 6) * 60}ms` }}
      className="group flex cursor-pointer animate-fade-up flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="h-44 overflow-hidden"><CoverImage src={post.cover} alt={post.title} className="h-full w-full transition duration-500 group-hover:scale-110" /></div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge>{post.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="h-3.5 w-3.5" />{post.readingTime} min · {fmtDate(post.publishedAt)}</span>
        </div>
        <h3 className="text-lg font-bold leading-snug transition group-hover:text-indigo-500">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <Avatar author={a} />
          <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{a.name}</div><div className="truncate text-xs text-slate-500">{a.role}</div></div>
          <ActionButtons post={post} />
        </div>
      </div>
    </article>
  );
}

export const CardSkeleton = () => (
  <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
    <div className="h-44 bg-slate-200 dark:bg-slate-800" />
    <div className="space-y-3 p-5"><div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" /><div className="h-5 rounded bg-slate-200 dark:bg-slate-800" /><div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" /></div>
  </div>
);
