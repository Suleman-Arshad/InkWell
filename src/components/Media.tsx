import { useState } from 'react';
import type { Author } from '../types';

export function CoverImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`bg-gradient-to-br from-indigo-500 to-fuchsia-600 ${className}`} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}

export function Avatar({ author, size = 36 }: { author: Author; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initials = author.name.split(' ').map((w) => w[0]).join('');
  const style = { width: size, height: size };
  return failed
    ? <span style={style} className="grid shrink-0 place-items-center rounded-full bg-indigo-500 text-xs font-bold text-white">{initials}</span>
    : <img src={author.avatar} alt={author.name} style={style} onError={() => setFailed(true)} className="shrink-0 rounded-full object-cover" />;
}

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">{children}</span>
);
