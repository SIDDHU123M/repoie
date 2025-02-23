import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { categories } from './data';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(categories[0].items[0].id);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const currentItem = categories
    .flatMap(category => category.items)
    .find(item => item.id === selectedItem);

  useEffect(() => {
    const loadContent = async () => {
      if (currentItem) {
        setIsLoading(true);
        try {
          const path = currentItem.path.startsWith('/') 
            ? currentItem.path.slice(1) 
            : currentItem.path;
          const response = await fetch(path);
          const text = await response.text();
          setContent(text);
        } catch (error) {
          console.error('Error loading markdown content:', error);
          setContent('# Error\nFailed to load content. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadContent();
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.5),rgba(17,24,39,0.7))] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-500 hover:bg-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-sm font-medium text-white/70">Documentation Explorer</span>
          </div>
        </div>
        <Sidebar
          categories={categories}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
        />
        <Content 
          content={content} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}