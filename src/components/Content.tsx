import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Copy, Check, ChevronRight, Loader2 } from 'lucide-react';
import Prism from 'prismjs';
import TableOfContents from './TableOfContents';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';

interface ContentProps {
  content: string;
  isLoading: boolean;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

function CodeBlock({ children, className }: { children: string, className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const language = className?.replace('language-', '') || 'text';
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <div className="relative group/code my-6">
      <div className="absolute -top-2.5 left-4 px-4 py-1 font-mono text-sm font-medium text-blue-300 bg-[#1a1a2e] rounded-lg border border-blue-400/50 shadow-lg z-10">
        {language}
      </div>
      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover/code:opacity-100 transition-opacity duration-200">
        <button
          onClick={copyToClipboard}
          className={`group/button relative p-2.5 rounded-lg transition-all duration-300 
            ${copied 
              ? 'bg-green-500/10 border-green-500/50' 
              : 'bg-[#1a1a2e] border-white/10 hover:border-yellow-400/50'
            } border`}
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400 transition-all duration-300" />
          ) : (
            <Copy className="w-4 h-4 text-white/70 transition-all duration-300 group-hover/button:text-yellow-400 group-hover/button:scale-110" />
          )}
          <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium rounded bg-[#1a1a2e] border border-white/10 whitespace-nowrap opacity-0 group-hover/button:opacity-100 transition-opacity duration-200 pointer-events-none ${copied ? 'text-green-400' : 'text-white/70'}`}>
            {copied ? 'Copied!' : 'Copy code'}
          </span>
        </button>
      </div>
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/5 to-purple-500/5">
        <div className="absolute inset-0 bg-[#1a1a2e] border border-blue-400/20 rounded-xl"></div>
        <div className="relative !mt-0 !bg-transparent !pt-8 !pr-14 !pl-6 !pb-6 overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <pre className="!m-0 !p-0 !bg-transparent">
              <code className={`language-${language} !font-mono !text-[13px] leading-relaxed`}>
                {children}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Content({ content, isLoading }: ContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h1, h2, h3');
      const items: TableOfContentsItem[] = [];
      
      headings.forEach((heading) => {
        const level = parseInt(heading.tagName[1]);
        const text = heading.textContent || '';
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        heading.id = id;
        items.push({ id, text, level });
      });
      
      setToc(items);
      Prism.highlightAllUnder(contentRef.current);

      if (window.location.hash) {
        const id = window.location.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          setTimeout(() => {
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    }
  }, [content]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
    }
  }, [isLoading]);

  return (
    <>
      <main className="mx-80 p-4 min-h-screen">
        <div className="max-w-none mx-auto">
          <div className={`glassmorphic rounded-2xl relative overflow-hidden transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                  <p className="text-white/50 animate-pulse">Loading content...</p>
                </div>
              </div>
            ) : (
              <div className="relative p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
                
                <div ref={contentRef} className="prose prose-invert prose-headings:text-white/90 prose-p:text-white/70 prose-strong:text-white/90 prose-code:text-blue-300 max-w-none relative z-10 scroll-mt-20">
                  <ReactMarkdown
                    children={content}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      h1: ({ children }) => (
                        <div className="relative mb-12 scroll-mt-20 group">
                          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent pb-4">
                            {children}
                          </h1>
                          <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left transition-transform duration-300 group-hover:scale-x-125"></div>
                        </div>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-3xl font-semibold mb-6 text-white/90 flex items-center gap-3 group/heading scroll-mt-20">
                          <ChevronRight className="w-5 h-5 text-blue-400 transition-transform duration-300 group-hover/heading:translate-x-1" />
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-2xl font-semibold mb-4 text-white/85 pl-6 border-l-2 border-blue-500/30 scroll-mt-20 relative group">
                          <div className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-blue-500 transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100"></div>
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-xl font-semibold mb-3 text-white/80 flex items-center gap-2 scroll-mt-20 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 transition-all duration-300 group-hover:scale-150 group-hover:bg-blue-300"></div>
                          {children}
                        </h4>
                      ),
                      p: ({ children, node }) => {
                        if (node?.children[0]?.type === 'element' && node.children[0].tagName === 'img') {
                          return children;
                        }
                        return (
                          <p className="mb-6 text-white/70 leading-relaxed hover:text-white/90 transition-colors duration-300">
                            {children}
                          </p>
                        );
                      },
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="relative text-blue-400 hover:text-blue-300 transition-all duration-300 hover:underline decoration-2 underline-offset-4 hover:glow-sm after:content-['_↗'] after:opacity-50 after:text-sm group"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="relative z-10 group-hover:translate-x-0.5 inline-block transition-transform duration-300">
                            {children}
                          </span>
                          <div className="absolute inset-0 bg-blue-400/10 rounded-md -z-10 opacity-0 transform scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></div>
                        </a>
                      ),
                      img: ({ src, alt }) => (
                        <figure className="my-8">
                          <div className="relative group/img rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
                            <img
                              src={src}
                              alt={alt}
                              className="w-full rounded-xl shadow-lg transition-all duration-500 group-hover/img:scale-[1.02] hover:glow-md"
                              loading="lazy"
                            />
                            {alt && (
                              <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-sm text-white/70 opacity-0 transform translate-y-4 group-hover/img:opacity-100 group-hover/img:translate-y-0 transition-all duration-300">
                                {alt}
                              </figcaption>
                            )}
                          </div>
                        </figure>
                      ),
                      code: ({ inline, className, children }) => {
                        if (inline) {
                          return (
                            <code className="bg-white/5 rounded-md px-2 py-1 text-blue-300 font-mono text-sm border border-white/5">
                              {children}
                            </code>
                          );
                        }
                        return <CodeBlock className={className}>{String(children).trim()}</CodeBlock>;
                      },
                      ul: ({ children }) => (
                        <ul className="mb-6 space-y-2 text-white/70">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-6 space-y-2 text-white/70">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="flex items-start gap-2 group/list">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover/list:bg-blue-400 transition-colors duration-300"></span>
                          <span className="text-white/70 group-hover/list:text-white/90 transition-colors duration-200">
                            {children}
                          </span>
                        </li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="relative my-8 group">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl transition-opacity duration-300 group-hover:opacity-75"></div>
                          <div className="relative border-l-4 border-blue-500/50 pl-6 py-4 px-5 rounded-r-xl italic text-white/60">
                            <div className="absolute -left-0.5 top-0 bottom-0 w-1 bg-blue-400 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
                            {children}
                          </div>
                        </blockquote>
                      ),
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <TableOfContents items={toc} />
    </>
  );
}