'use client';

import { useState } from 'react';
import Button from '../ui/Button';

interface Chat {
  id: string;
  title: string;
  lastMessage?: string;
}

export default function ChatSidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
    };
    setChats([newChat, ...chats]);
  };

  return (
    <div className='w-[300px] h-full flex flex-col border-r border-white/10'>
      <div className='p-4 space-y-4'>
        {/* Header with workspace selector */}
        <div className='flex items-center justify-between'>
          <select className='bg-transparent text-white border border-white/10 rounded px-2 py-1 text-sm w-48'>
            <option value='default'>Select workspace...</option>
          </select>
          <button className='p-2 hover:bg-white/10 rounded'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <div className='flex gap-2'>
          <Button onClick={handleNewChat} className='w-full bg-white/10 hover:bg-white/20 text-white border-0 focus:ring-0'>
            + New Chat
          </Button>
          <Button className='aspect-square p-2 bg-white/10 hover:bg-white/20 text-white border-0 focus:ring-0'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </Button>
        </div>

        {/* Search Box */}
        <div className='relative'>
          <input
            type='text'
            placeholder='Search chats...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/20'
          />
        </div>
      </div>

      {/* Chat List */}
      <div className='flex-1 overflow-y-auto'>
        {chats.length === 0 ? (
          <div className='text-center text-white/50 mt-8 italic'>No chats</div>
        ) : (
          <div className='space-y-1 p-2'>
            {chats.map((chat) => (
              <button key={chat.id} className='w-full text-left px-3 py-2 rounded hover:bg-white/10 transition-colors'>
                <div className='text-sm font-medium'>{chat.title}</div>
                {chat.lastMessage && <div className='text-xs text-white/50 truncate'>{chat.lastMessage}</div>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
