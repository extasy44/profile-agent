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

  // Reset messages when changing chats
  useEffect(() => {
    // Note: useChat doesn't provide a reset function in the current version
    // This is handled by the chat selection logic
  }, [selectedChat?.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex-1 flex flex-col h-full'>
      {/* Chat Header */}
      <div className='border-b border-white/10 p-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center'>
            <span className='text-lg'>AI</span>
          </div>
          <h1 className='text-xl font-semibold'>{selectedChat?.title || 'AI Chat'}</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center text-white/50'>
            <div className='w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4'>
              <span className='text-2xl'>🤖</span>
            </div>
            <h2 className='text-2xl font-semibold mb-2'>Welcome to {selectedChat?.title || 'AI Chat'}</h2>
            <p className='text-center max-w-md'>I'm your AI assistant. Ask me anything, and I&apos;ll help you find answers!</p>
          </div>
        ) : (
          <>
            <div className='space-y-4'>
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white/10 text-white'
                    }`}>
                    <p className='whitespace-pre-wrap'>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            {isLoading && (
              <div className='flex justify-start'>
                <div className='bg-white/10 text-white rounded-lg p-4 max-w-[80%] flex items-center gap-2'>
                  <div className='flex gap-2'>
                    <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
                    <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
                    <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce'></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className='border-t border-white/10 p-4'>
        <form onSubmit={handleSubmit} className='flex gap-2'>
          <div className='flex-1 relative'>
            <input
              type='text'
              value={input}
              onChange={handleInputChange}
              placeholder='Send a message...'
              className='w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/20'
              disabled={isLoading}
            />
            <button
              type='button'
              className='absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full disabled:opacity-50'
              disabled={isLoading}>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
            </button>
          </div>
          <button
            type='submit'
            className='bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-colors disabled:opacity-50'
            disabled={isLoading}>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
