'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatMain() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  return (
    <div className='flex-1 flex flex-col h-full'>
      {/* Chat Header */}
      <div className='border-b border-white/10 p-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center'>
            <span className='text-lg'>UI</span>
          </div>
          <h1 className='text-xl font-semibold'>Chatbot UI</h1>
        </div>
        <button className='p-2 hover:bg-white/10 rounded'>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
            />
          </svg>
        </button>
      </div>

      {/* Chat Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center text-white/50'>
            <Image src='/ui-icon.png' alt='Chatbot UI' width={64} height={64} className='mb-4 opacity-50' />
            <h2 className='text-2xl font-semibold mb-2'>Welcome to Chatbot UI</h2>
            <p className='text-center max-w-md'>Start a conversation by typing a message below.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white/10 text-white'}`}>
                <p>{message.content}</p>
                <span className='text-xs opacity-50 mt-1 block'>{message.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className='border-t border-white/10 p-4'>
        <form onSubmit={handleSendMessage} className='flex gap-2'>
          <div className='flex-1 relative'>
            <input
              type='text'
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder='Send a message...'
              className='w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/20'
            />
            <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
            </button>
          </div>
          <button type='submit' className='bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-colors'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
