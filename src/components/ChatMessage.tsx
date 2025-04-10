/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Message } from 'ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { messageVariants, messageContentVariants, textVariants, linkVariants, codeVariants } from '@/lib/styles';

interface ChatMessageProps {
  role: Message['role'];
  content: string;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';
  const isAssistant = role === 'assistant';

  return (
    <div className={messageVariants({ role })}>
      <div className={messageContentVariants({ role })}>
        <div className='prose prose-sm dark:prose-invert max-w-none'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              code({ inline, className, children, ...props }: CodeProps) {
                return (
                  <code className={codeVariants({ inline, className })} {...props}>
                    {children}
                  </code>
                );
              },
              pre({ children }) {
                return <pre className='p-0 bg-transparent my-4'>{children}</pre>;
              },
              p({ children }) {
                return <p className={textVariants({ role })}>{children}</p>;
              },
              ul({ children }) {
                return <ul className='list-disc list-inside my-3'>{children}</ul>;
              },
              ol({ children }) {
                return <ol className='list-decimal list-inside my-3'>{children}</ol>;
              },
              li({ children }) {
                return <li className='my-1'>{children}</li>;
              },
              a({ children, href }) {
                return (
                  <a href={href} target='_blank' rel='noopener noreferrer' className={linkVariants({ role })}>
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
