import { Bookmark, Heart } from 'lucide-react';
import { useStore } from '../store';
import type { Post } from '../types';

export default function ActionButtons({ post }: { post: Post }) {
  const { liked, saved, toggleLike, toggleSave } = useStore();
  const l = !!liked[post.id], s = !!saved[post.id];
  return (
    <div className="flex items-center gap-1">
      <button aria-label="Like" onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
        className={`flex items-center gap-1 rounded-full p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 ${l ? 'text-rose-500' : 'text-slate-500'}`}>
        <Heart className="h-5 w-5" fill={l ? 'currentColor' : 'none'} /><span className="text-sm">{post.likes + (l ? 1 : 0)}</span>
      </button>
      <button aria-label="Bookmark" onClick={(e) => { e.stopPropagation(); toggleSave(post.id); }}
        className={`rounded-full p-2 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 ${s ? 'text-indigo-500' : 'text-slate-500'}`}>
        <Bookmark className="h-5 w-5" fill={s ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}
