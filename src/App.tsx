import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import './App.css';

function App({ initialPath }: { initialPath?: string }) {
  const [language, setLanguage] = useState<'TR' | 'EN'>('TR');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout
      language={language}
      onLanguageChange={setLanguage}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <Home searchQuery={searchQuery} initialPath={initialPath} />
      <Analytics />
    </Layout>
  );
}

export default App;
