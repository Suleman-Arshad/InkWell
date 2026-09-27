import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { initialComments } from '../data/mockData';
import type { Comment } from '../types';

const field = 'w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700';

export default function Comments() {
  const [list, setList] = useState<Comment[]>(initialComments);
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const valid = name.trim() !== '' && text.trim() !== '';
  const add = () => { if (!valid) return; setList([{ id: Date.now(), name: name.trim(), text: text.trim(), date: 'Just now' }, ...list]); setText(''); };
  return (
    <section id="comments" className="mt-12 scroll-mt-24">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-2xl font-bold"><MessageSquare /> Comments ({list.length})</button>
      {open && (
        <div className="mt-4 animate-fade-up space-y-3">
          <div className="space-y-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea className={field} rows={3} placeholder="Join the discussion…" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={add} disabled={!valid} className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-white disabled:opacity-40">Post comment</button>
          </div>
          {list.map((c) => (
            <div key={c.id} className="flex animate-fade-up gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-500 text-xs font-bold text-white">{c.name[0].toUpperCase()}</span>
              <div><div className="text-sm"><b>{c.name}</b> <span className="text-slate-500">· {c.date}</span></div><p className="mt-1 text-sm">{c.text}</p></div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
