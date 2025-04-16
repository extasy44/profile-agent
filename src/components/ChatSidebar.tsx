import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Chat } from '@/types/chat';
import { Button } from './ui/Button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { buttonVariants } from '@/lib/styles';

interface ChatSidebarProps {
  chats: Chat[];
  onChatSelect: (chat: Chat) => void;
  onChatDelete: (chatId: string) => void;
  onChatRename: (chatId: string, newName: string) => void;
}

export function ChatSidebar({ chats, onChatSelect, onChatDelete, onChatRename }: ChatSidebarProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const router = useRouter();

  const handleRename = (chatId: string) => {
    setIsRenaming(true);
    setSelectedChatId(chatId);
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setRenameValue(chat.name);
    }
  };

  const handleRenameSubmit = () => {
    if (selectedChatId && renameValue.trim()) {
      onChatRename(selectedChatId, renameValue.trim());
    }
    setIsRenaming(false);
    setSelectedChatId(null);
    setRenameValue('');
  };

  return (
    <div className='flex flex-col h-full bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800'>
      <div className='p-4 border-b border-gray-200 dark:border-gray-800'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-xl font-bold text-gray-900 dark:text-white'>Chats</h1>
          <div className='flex items-center gap-2'>
            <ThemeSwitcher />
            <Button onClick={() => router.push('/new-chat')} className={buttonVariants({ variant: 'primary' })}>
              New Chat
            </Button>
          </div>
        </div>
        <div className='space-y-2'>
          {chats.map((chat) => (
            <div key={chat.id} className='flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800'>
              {isRenaming && selectedChatId === chat.id ? (
                <input
                  type='text'
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={handleRenameSubmit}
                  onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit()}
                  className='flex-1 px-2 py-1 text-sm bg-transparent border rounded'
                  autoFocus
                />
              ) : (
                <button onClick={() => onChatSelect(chat)} className='flex-1 text-left text-sm text-gray-700 dark:text-gray-300'>
                  {chat.name}
                </button>
              )}
              <div className='flex gap-2'>
                <button
                  onClick={() => handleRename(chat.id)}
                  className='p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
                  ✏️
                </button>
                <button
                  onClick={() => onChatDelete(chat.id)}
                  className='p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
