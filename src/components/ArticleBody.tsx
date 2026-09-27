import type { Block } from '../types';
import { CoverImage } from './Media';

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h': return <h2 key={i} className="mb-3 mt-10 text-2xl font-bold">{b.text}</h2>;
          case 'p': return <p key={i} className="my-4 text-lg leading-8 text-slate-700 dark:text-slate-300">{b.text}</p>;
          case 'quote': return <blockquote key={i} className="my-6 border-l-4 border-indigo-500 pl-5 text-xl italic text-slate-600 dark:text-slate-300">{b.text}</blockquote>;
          case 'callout': return <div key={i} className="my-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">💡 {b.text}</div>;
          case 'code': return <pre key={i} className="my-6 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-emerald-300"><code>{b.text}</code></pre>;
          case 'image': return (
            <figure key={i} className="my-8"><CoverImage src={b.src} alt={b.caption} className="h-64 w-full rounded-xl sm:h-80" />
              <figcaption className="mt-2 text-center text-sm text-slate-500">{b.caption}</figcaption></figure>
          );
        }
      })}
    </div>
  );
}
