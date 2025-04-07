'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatMain from '@/components/chat/ChatMain';
import { useAuth } from '@/contexts/AuthContext';
import type { Chat } from '@/components/chat/ChatSidebar';

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center bg-[#0D0D0D]'>
        <div className='flex gap-2'>
          <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
          <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
          <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce'></span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // return null;
  }

  return (
    <div className='flex h-screen bg-[#0D0D0D] text-white'>
      <ChatSidebar onSelectChat={setSelectedChat} />
      <ChatMain selectedChat={selectedChat} />
    </div>
  );
}
