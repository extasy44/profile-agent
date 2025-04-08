/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant' | 'system';
}

export default function ChatMessage({ content, role }: ChatMessageProps) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-lg p-3 ${role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className='prose prose-sm dark:prose-invert max-w-none'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              code({
                node,
                inline,
                className,
                children,
                ...props
              }: {
                node: any;
                inline?: boolean;
                className?: string;
                children: React.ReactNode;
              }) {
                return (
                  <code
                    className={`${className} ${
                      inline
                        ? 'bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded'
                        : 'block bg-gray-900 text-gray-100 p-2 rounded-lg overflow-x-auto'
                    }`}
                    {...props}>
                    {children}
                  </code>
                );
              },
              pre({ children }) {
                return <pre className='p-0 bg-transparent my-4'>{children}</pre>;
              },
              p({ children }) {
                return <p className={`${role === 'user' ? 'text-white' : 'text-gray-900'} my-3 whitespace-pre-line`}>{children}</p>;
              },
              ul({ children }) {
                return <ul className='list-disc pl-4 mb-2 last:mb-0'>{children}</ul>;
              },
              ol({ children }) {
                return <ol className='list-decimal pl-4 mb-2 last:mb-0'>{children}</ol>;
              },
              li({ children }) {
                return <li className='mb-1 last:mb-0'>{children}</li>;
              },
              a({ children, href }) {
                return (
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`${role === 'user' ? 'text-white underline' : 'text-blue-600 hover:underline'}`}>
                    {children}
                  </a>
                );
              },
              blockquote({ children }) {
                return <blockquote className='border-l-4 border-gray-300 pl-4 italic'>{children}</blockquote>;
              },
              table({ children }) {
                return (
                  <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-300'>{children}</table>
                  </div>
                );
              },
            }}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
