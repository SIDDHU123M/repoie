import React, { useState } from 'react';
import { Category } from '../types';
import { BookCopy as BookCode, Blocks, Wrench, ChevronDown } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedItem: string;
  onSelectItem: (id: string) => void;
}

const categoryIcons = {
  'BookCode': BookCode,
  'Blocks': Blocks,
  'Wrench': Wrench,
};

export default function Sidebar({ categories, selectedItem, onSelectItem }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['programming']));

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <div className="fixed left-4 top-4 bottom-4 w-72">
      <div className="h-full glassmorphic rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white/90 mb-8 flex items-center">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Dev Docs
            </span>
          </h1>
          <nav className="space-y-4">
            {categories.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const Icon = categoryIcons[category.icon as keyof typeof categoryIcons];

              return (
                <div key={category.id} className="space-y-2">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`space-y-1 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                    {category.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onSelectItem(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                          selectedItem === item.id
                            ? 'bg-white/10 text-white shadow-lg border border-white/10 glow-sm'
                            : 'text-white/70 hover:bg-white/[0.07] hover:text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.99]'
                        }`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 ${
                          selectedItem === item.id ? 'opacity-100' : 'group-hover:opacity-50'
                        }`} />
                        <i 
                          className={`${item.icon} text-xl transition-all duration-300 group-hover:scale-110 relative z-10`}
                        />
                        <span className="font-medium tracking-wide relative z-10">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}