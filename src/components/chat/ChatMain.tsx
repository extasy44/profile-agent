'use client';

import { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import type { Chat } from './ChatSidebar';

interface ChatMainProps {
  selectedChat?: Chat;
}

export default function ChatMain({ selectedChat }: ChatMainProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatTitle = selectedChat?.title || 'AI Chat';

  // Reset messages when changing chats
  useEffect(() => {
    // Note: useChat doesn't provide a reset function in the current version
    // This is handled by the chat selection logic
  }, [selectedChat?.id]);

  // Scroll to bottom when messages change or when AI is loading
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <section aria-labelledby='chat-title' className='flex-1 flex flex-col h-full max-w-4xl mx-auto w-full items-center'>
      {/* Chat Header */}
      <header className='border-b border-white/10 p-4 w-full flex items-center justify-center'>
        <div className='flex items-center gap-2'>
          <div aria-hidden='true' className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center'>
            <span className='text-lg'>🤖</span>
          </div>
          <h1 id='chat-title' className='text-xl font-semibold'>
            {chatTitle}
          </h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div role='log' aria-live='polite' aria-relevant='additions' className='flex-1 w-full overflow-y-auto p-4 md:p-6'>
        {messages.length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center text-white/60 px-4 text-center'>
            <div className='w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4'>
              <span aria-hidden='true' className='text-2xl'>
                🤖
              </span>
            </div>
            <h2 className='text-2xl font-semibold mb-2'>Welcome to {chatTitle}</h2>
            <p className='max-w-md'>I&apos;m your AI assistant. Ask me anything, and I&apos;ll help you find answers!</p>
          </div>
        ) : (
          <div className='min-h-full flex flex-col justify-end'>
            <ul className='space-y-4'>
              {messages.map((message) => (
                <li key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 md:p-4 leading-relaxed ${
                      message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white/10 text-white'
                    }`}>
                    <p className='whitespace-pre-wrap'>{message.content}</p>
                  </div>
                </li>
              ))}
              {isLoading && (
                <li aria-live='polite' className='flex justify-start'>
                  <div className='bg-muted/50 backdrop-blur-sm rounded-lg p-4 max-w-[80%] border border-border/50'>
                    <div className='flex items-center gap-3'>
                      <div className='flex gap-1'>
                        <span
                          aria-hidden='true'
                          className='w-2 h-2 bg-primary/60 rounded-full animate-pulse [animation-delay:0ms] [animation-duration:1.5s]'></span>
                        <span
                          aria-hidden='true'
                          className='w-2 h-2 bg-primary/60 rounded-full animate-pulse [animation-delay:200ms] [animation-duration:1.5s]'></span>
                        <span
                          aria-hidden='true'
                          className='w-2 h-2 bg-primary/60 rounded-full animate-pulse [animation-delay:400ms] [animation-duration:1.5s]'></span>
                      </div>
                      <span className='text-sm text-muted-foreground font-medium'>AI is thinking...</span>
                    </div>
                  </div>
                </li>
              )}
            </ul>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <footer className='border-t border-white/10 p-4 md:p-6'>
        <form onSubmit={handleSubmit} aria-label='Send a message' className='flex gap-2'>
          <div className='flex-1 relative'>
            <input
              type='text'
              value={input}
              onChange={handleInputChange}
              placeholder='Send a message...'
              className='w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-3 md:py-3.5 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/20'
              disabled={isLoading}
              aria-label='Message input'
            />
            <button
              type='button'
              className='absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full disabled:opacity-50'
              disabled={isLoading}>
              <svg aria-hidden='true' className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
            </button>
          </div>
          <button
            type='submit'
            className='bg-white/10 hover:bg-white/20 rounded-lg p-3 md:p-3.5 transition-colors disabled:opacity-50'
            disabled={isLoading}>
            <span className='sr-only'>Send</span>
            <svg aria-hidden='true' className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
            </svg>
          </button>
        </form>
      </footer>
    </section>
  );
}
