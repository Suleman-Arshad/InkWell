import { useEffect } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import { useRoute } from './lib';
import { useStore } from './store';

export default function App() {
  const route = useRoute();
  const dark = useStore((s) => s.dark);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">{route.name === 'post' ? <PostPage key={route.id} id={route.id} /> : <Home />}</div>
      <Footer />
    </div>
  );
}
