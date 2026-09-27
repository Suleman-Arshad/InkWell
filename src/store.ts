import { create } from 'zustand';
import type { Category, SortKey } from './types';

interface State {
  dark: boolean; toggleDark: () => void;
  query: string; setQuery: (q: string) => void;
  category: Category | 'All'; setCategory: (c: Category | 'All') => void;
  sort: SortKey; setSort: (s: SortKey) => void;
  resetFilters: () => void;
  liked: Record<number, boolean>; saved: Record<number, boolean>; following: Record<string, boolean>;
  toggleLike: (id: number) => void; toggleSave: (id: number) => void; toggleFollow: (id: string) => void;
}

export const useStore = create<State>((set) => ({
  dark: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches,
  toggleDark: () => set((s) => ({ dark: !s.dark })),
  query: '', setQuery: (query) => set({ query }),
  category: 'All', setCategory: (category) => set({ category }),
  sort: 'Latest', setSort: (sort) => set({ sort }),
  resetFilters: () => set({ query: '', category: 'All', sort: 'Latest' }),
  liked: {}, saved: {}, following: {},
  toggleLike: (id) => set((s) => ({ liked: { ...s.liked, [id]: !s.liked[id] } })),
  toggleSave: (id) => set((s) => ({ saved: { ...s.saved, [id]: !s.saved[id] } })),
  toggleFollow: (id) => set((s) => ({ following: { ...s.following, [id]: !s.following[id] } })),
}));
