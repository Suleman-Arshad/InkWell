import { useEffect, useState } from 'react';
export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
export const navigate = (hash: string) => { window.location.hash = hash; window.scrollTo({ top: 0 }); };
export type Route = { name: 'home' } | { name: 'post'; id: number };
export function useRoute(): Route {
  const parse = (): Route => { const m = window.location.hash.match(/^#\/post\/(\d+)/); return m ? { name: 'post', id: Number(m[1]) } : { name: 'home' }; };
  const [route, setRoute] = useState<Route>(parse);
  useEffect(() => { const f = () => setRoute(parse()); window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f); }, []);
  return route;
}
