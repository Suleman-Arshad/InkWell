# Inkwell

Inkwell is a modern, responsive blog web app built with React, TypeScript, and Tailwind CSS. It has a searchable, filterable article feed, a full article reading view with progress tracking, likes, bookmarks, comments, and related posts, plus dark mode and a newsletter box.

This project uses mock data only — there is no backend, database, or authentication. It's meant as a polished front-end example / starting point.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [State Management](#state-management)
- [Mock Data](#mock-data)
- [Styling](#styling)
- [Limitations](#limitations)
- [License](#license)

## Features

**Navigation**
- Responsive navbar with logo, category links, search bar, and dark/light mode toggle
- Mobile hamburger menu with smooth open/close transition

**Home Page**
- Hero section highlighting the most-viewed post as a "Featured Post"
- Live search across post titles, content, tags, and author names
- Category pill filters ("All", "Engineering", "Design", "Productivity", "AI", "Career") with post-count badges
- Sort by Latest, Most Popular, or Trending
- Responsive article grid (3 columns desktop, 2 tablet, 1 mobile)
- Skeleton loading state on initial load
- Empty state UI when a search or filter returns no results

**Article Page**
- Full width header image, title, excerpt, category badge, and author info
- Fixed reading-progress bar tied to scroll position
- Floating action bar: like (with count), bookmark, copy link to share, jump to comments
- Rich article body: headings, paragraphs, blockquotes, code blocks, callout boxes, and images
- Author bio card with social links and a "Follow" button
- Related articles grid, matched by shared category and tags
- Comments section with a working "Add Comment" form

**Other**
- Newsletter subscription box in the footer with email validation
- Light/dark theme toggle, applied site-wide
- Subtle fade-in and hover-lift animations throughout

## Tech Stack
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) — styling, including dark mode
- [Zustand](https://github.com/pmndrs/zustand) — lightweight global state
- [lucide-react](https://lucide.dev/) — icon set

## Getting Started

**Requirements:** Node.js 18 or later.

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open the URL printed in your terminal, usually `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server with hot reload |
| `npm run build` | Type-check the project, then build a production bundle to `dist/` |
| `npm run preview` | Serve the production build locally to test it |

## Project Structure

```
inkwell/
├── index.html              Entry HTML file
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── src/
    ├── main.tsx             App entry point
    ├── App.tsx              Top-level layout and route switch
    ├── index.css            Tailwind imports and base styles
    ├── types.ts             Shared TypeScript types
    ├── store.ts             Zustand store (theme, search, filters, likes, etc.)
    ├── lib.ts                Small helpers: date formatting, hash-based routing
    ├── data/
    │   └── mockData.ts       Sample posts, authors, and comments
    ├── components/
    │   ├── Navbar.tsx
    │   ├── PostCard.tsx      Article card + loading skeleton
    │   ├── ActionButtons.tsx Like / bookmark buttons
    │   ├── ArticleBody.tsx   Renders article content blocks
    │   ├── Comments.tsx
    │   ├── Media.tsx         Avatar, cover image, badge components
    │   └── Footer.tsx        Newsletter box
    └── pages/
        ├── Home.tsx          Landing page: hero, filters, grid
        └── PostPage.tsx      Full article view
```

## Routing

Inkwell uses simple hash-based routing (`#/` for home, `#/post/:id` for an article) instead of a router library. This keeps the project dependency-light and needs no server configuration for client-side routes.

## State Management

Global UI state (theme, search query, active category, sort order, and which posts are liked/bookmarked/followed) lives in a single Zustand store at `src/store.ts`. Local, page-specific state (like loading skeletons or form inputs) uses React's `useState` directly in each component.

All of this state is in-memory only. Refreshing the page resets likes, bookmarks, follows, and any added comments.

## Mock Data

All content is defined in `src/data/mockData.ts`:
- 9 blog posts across 5 categories (Engineering, Design, Productivity, AI, Career)
- 4 authors, each with a name, role, bio, avatar, and social links
- A small set of starter comments

Post bodies are arrays of typed content blocks (`p`, `h`, `quote`, `code`, `callout`, `image`), rendered by `ArticleBody.tsx`. To add a new post, add an entry to the `posts` array following the existing shape defined in `src/types.ts`.

Cover images and avatars are loaded from Unsplash and pravatar.cc; if an image URL ever fails to load, the UI falls back to a gradient block or the author's initials.

## Styling

Tailwind CSS handles all styling, with dark mode enabled via the `class` strategy (toggled by the store's `dark` flag on `<html>`). There is no separate CSS-in-JS or component library beyond Tailwind utility classes.

## Limitations

- No backend, database, or real authentication — everything is mock data and local state
- No persistence: likes, bookmarks, comments, and follows reset on page reload
- Search and filtering run entirely client-side over the in-memory post list

## License

This project is provided as-is for learning and demonstration purposes. Feel free to fork and adapt it.