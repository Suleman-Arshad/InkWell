import { useState } from 'react';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { categories } from '../data/mockData';
import { useStore } from '../store';
import { navigate } from '../lib';
import type { Category } from '../types';

export default function Navbar() {
  const { dark, toggleDark, query, setQuery, category, setCategory } = useStore();
  const [open, setOpen] = useState(false);
  const pick = (c: Category | 'All') => { setCategory(c); setOpen(false); navigate('#/'); };
  const onSearch = (v: string) => { setQuery(v); navigate('#/'); };
  const search = (cls: string) => (
    <label className={`items-center gap-2 rounded-full bg-slate-100 px-3 focus-within:ring-2 focus-within:ring-indigo-500 dark:bg-slate-800 ${cls}`}>
      <Search className="h-4 w-4 text-slate-400" />
      <input aria-label="Search articles" value={query} onChange={(e) => onSearch(e.target.value)} placeholder="Search articles…" className="h-10 w-full bg-transparent text-sm outline-none" />
    </label>
  );
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <button onClick={() => pick('All')} className="text-xl font-black tracking-tight">Ink<span className="text-indigo-500">well</span></button>
        <nav className="ml-4 hidden gap-1 lg:flex">
          {categories.map((c) => (
            <button key={c} onClick={() => pick(c)} className={`rounded-lg px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${category === c ? 'font-semibold text-indigo-500' : ''}`}>{c}</button>
          ))}
        </nav>
        <div className="flex-1" />
        {search('hidden w-56 sm:flex')}
        <button aria-label="Toggle theme" onClick={toggleDark} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-full p-2 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      <div className={`overflow-hidden transition-all duration-300 lg:hidden ${open ? 'max-h-[28rem]' : 'max-h-0'}`}>
        <div className="flex flex-col gap-1 px-4 pb-4">
          {search('mb-2 flex sm:hidden')}
          {(['All', ...categories] as const).map((c) => (
            <button key={c} onClick={() => pick(c)} className={`rounded-lg px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${category === c ? 'font-semibold text-indigo-500' : ''}`}>{c}</button>
          ))}
        </div>
      </div>
    </header>
  );
}
