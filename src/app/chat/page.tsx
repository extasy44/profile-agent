import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatMain from '@/components/chat/ChatMain';

export default function ChatPage() {
  return (
    <div className='flex h-screen bg-[#0D0D0D] text-white'>
      <ChatSidebar />
      <ChatMain />
    </div>
  );
}
