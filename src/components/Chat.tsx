'use client';

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from 'react';
import ChatLoader from './ui/ChatLoader';
import ChatMessage from './ChatMessage';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: 'init',
        role: 'system',
        content: `You are a helpful AI assistant. You provide clear, concise, and accurate responses.
When appropriate, use markdown formatting to make your responses more readable:
- Use **bold** for emphasis
- Use \`code\` for technical terms
- Use code blocks for code examples
- Use bullet points for lists
- Use tables when comparing items
- Use > for quotes`,
      },
    ],
  });

  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setError(null);
      await handleSubmit(e);
    } catch (err) {
      setError('Failed to send message. Please make sure Ollama is running locally.');
      console.error('Chat error:', err);
    }
  };

  return (
    <div className='flex flex-col h-[600px] max-w-2xl mx-auto p-4 bg-white rounded-lg shadow'>
      {/* Messages */}
      <div className='flex-1 overflow-y-auto mb-4 space-y-4'>
        {messages
          .filter((m) => m.role !== 'system')
          .map((message) => (
            <ChatMessage key={message.id} content={message.content} role={message.role as 'user' | 'assistant'} />
          ))}
        {isLoading && <ChatLoader />}
        {error && <div className='bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm'>{error}</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={onSubmit} className='flex gap-2'>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder='Ask anything...'
          className='flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={isLoading}
        />
        <button
          type='submit'
          disabled={isLoading || !input.trim()}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
