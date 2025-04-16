'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { mockApiService } from '@/services/mockApi';
import { useAuth } from '@/contexts/AuthContext';

export interface Chat {
  id: string;
  title: string;
  lastMessage?: string;
}

export default function ChatSidebar({ onSelectChat }: { onSelectChat: (chat: Chat) => void }) {
  const { user, logout } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const history = await mockApiService.getChatHistory();
      setChats(
        history.map((chat, index) => ({
          id: `history-${index}`,
          title: chat.title,
          lastMessage: chat.lastMessage,
        }))
      );
    } catch (error) {
      console.error('Failed to load chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
    };
    setChats([newChat, ...chats]);
    onSelectChat(newChat);
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChats(chats.filter((chat) => chat.id !== chatId));
  };

  const startEditing = (chat: Chat, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditingTitle(chat.title);
  };

  const handleEditSubmit = (chatId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (editingTitle.trim()) {
      setChats(chats.map((chat) => (chat.id === chatId ? { ...chat, title: editingTitle.trim() } : chat)));
      setEditingChatId(null);
    }
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) || chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='w-[300px] h-full flex flex-col bg-[#0a192f] text-gray-300'>
      <div className='p-6 space-y-6'>
        {/* User Profile */}
        <div className='flex items-center gap-4'>
          {user?.image ? (
            <Image src={user.image} alt={user.name} width={40} height={40} className='rounded-full ring-2 ring-blue-500/20' />
          ) : (
            <div className='w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center ring-2 ring-blue-500/20'>
              <span className='text-base font-medium text-blue-400'>{user?.name?.[0]}</span>
            </div>
          )}
          <div className='flex-1 min-w-0'>
            <h2 className='text-lg font-semibold text-gray-100'>{user?.name}</h2>
            <p className='text-sm text-gray-400 truncate'>{user?.email}</p>
          </div>
          <button onClick={() => logout()} className='p-2 hover:bg-blue-500/10 rounded-lg transition-colors' title='Logout'>
            <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
          </button>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2'>
          <Button
            onClick={handleNewChat}
            className='w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-0 focus:ring-1 focus:ring-blue-500/30'>
            + New Chat
          </Button>
          <Button className='aspect-square p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-0 focus:ring-1 focus:ring-blue-500/30'>
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
            className='w-full bg-blue-500/5 border border-blue-500/10 rounded-lg px-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/30'
          />
        </div>
      </div>

      {/* Chat List */}
      <div className='flex-1 overflow-y-auto px-4'>
        {isLoading ? (
          <div className='flex items-center justify-center h-32'>
            <div className='flex gap-2'>
              <span className='w-2 h-2 bg-blue-400/50 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
              <span className='w-2 h-2 bg-blue-400/50 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
              <span className='w-2 h-2 bg-blue-400/50 rounded-full animate-bounce'></span>
            </div>
          </div>
        ) : filteredChats.length === 0 ? (
          <div className='text-center text-gray-500 mt-8 italic'>{searchQuery ? 'No chats found' : 'No chats'}</div>
        ) : (
          <div className='space-y-2 pb-4'>
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat)}
                className='w-full text-left px-4 py-3 rounded-lg hover:bg-blue-500/5 transition-colors group'>
                <div className='flex items-center justify-between'>
                  {editingChatId === chat.id ? (
                    <form onSubmit={(e) => handleEditSubmit(chat.id, e)} className='flex-1'>
                      <input
                        type='text'
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className='w-full bg-blue-500/10 border border-blue-500/20 rounded px-3 py-1.5 text-sm text-gray-200'
                        autoFocus
                        onBlur={() => setEditingChatId(null)}
                      />
                    </form>
                  ) : (
                    <div className='flex-1 min-w-0'>
                      <div className='text-sm font-medium text-gray-200'>{chat.title}</div>
                      {chat.lastMessage && <div className='text-xs text-gray-500 truncate mt-0.5'>{chat.lastMessage}</div>}
                    </div>
                  )}
                  <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button
                      onClick={(e) => startEditing(chat, e)}
                      className='p-1.5 hover:bg-blue-500/10 rounded-md text-gray-400 hover:text-gray-300'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                      className='p-1.5 hover:bg-red-500/10 rounded-md text-gray-400 hover:text-red-400'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
