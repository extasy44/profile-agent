'use client';

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: 'init',
        role: 'system',
        content: 'You are a helpful AI assistant. You provide clear, concise, and accurate responses.',
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
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
                }`}>
                <p className='whitespace-pre-wrap'>{message.content}</p>
              </div>
            </div>
          ))}
        {isLoading && (
          <div className='flex justify-start'>
            <div className='bg-gray-100 rounded-lg p-3 max-w-[80%]'>
              <div className='flex gap-2'>
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' />
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.3s]' />
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.5s]' />
              </div>
            </div>
          </div>
        )}
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
