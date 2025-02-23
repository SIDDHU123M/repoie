import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setActiveIds(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(entry.target.id);
            } else {
              newSet.delete(entry.target.id);
            }
            return newSet;
          });
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: [0, 1]
      }
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      window.history.pushState({}, '', `#${id}`);
    }
  };

  return (
    <div className="fixed right-4 top-4 bottom-4 w-72">
      <div className="h-full glassmorphic rounded-2xl relative overflow-hidden group/toc">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 transition-opacity duration-500 group-hover/toc:opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover/toc:opacity-100"></div>
        <div className="relative h-full flex flex-col p-6 z-10">
          <h3 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            Table of Contents
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
            {items.map((item, index) => {
              const isActive = activeIds.has(item.id);
              const isHovered = hoveredId === item.id;
              
              const levelClasses = {
                1: 'font-medium text-[15px]',
                2: 'pl-4 text-[14px]',
                3: 'pl-8 text-[13px]'
              }[item.level] || '';

              return (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {isActive && (
                    <div className="absolute left-0 w-full h-full bg-blue-500/5 rounded-lg transition-all duration-300" />
                  )}
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToHeading(e, item.id)}
                    className={`
                      relative flex items-center gap-2 py-1.5 px-3 rounded-lg
                      transition-all duration-300 group-hover:bg-blue-500/5
                      ${levelClasses}
                      ${isActive ? 'text-blue-400' : 'text-white/70 hover:text-blue-400'}
                    `}
                  >
                    <ChevronRight 
                      className={`
                        w-3 h-3 transition-all duration-300
                        ${isActive || isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                        ${isActive ? 'text-blue-400' : 'text-white/50'}
                      `}
                    />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {item.text}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}