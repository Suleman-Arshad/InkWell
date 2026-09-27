import { FormEvent, useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const submit = (e: FormEvent) => { e.preventDefault(); setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'ok' : 'error'); };
  return (
    <footer className="mt-10 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div><div className="text-xl font-black">Ink<span className="text-indigo-500">well</span></div>
          <p className="mt-2 text-sm text-slate-500">Thoughtful writing on engineering, design, AI and how we work.</p></div>
        <div>
          <h4 className="font-bold">Get the weekly digest</h4>
          <form onSubmit={submit} noValidate className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }} placeholder="you@example.com" aria-invalid={status === 'error'}
              className={`h-11 flex-1 rounded-full bg-slate-100 px-4 outline-none focus:ring-2 dark:bg-slate-800 ${status === 'error' ? 'ring-2 ring-rose-500' : 'ring-indigo-500'}`} />
            <button className="h-11 rounded-full bg-indigo-500 px-6 font-medium text-white">Subscribe</button>
          </form>
          {status === 'error' && <p className="mt-2 text-sm text-rose-500">Please enter a valid email address.</p>}
          {status === 'ok' && <p className="mt-2 animate-fade-up text-sm text-emerald-500">You're in! Check {email} to confirm.</p>}
        </div>
      </div>
    </footer>
  );
}
