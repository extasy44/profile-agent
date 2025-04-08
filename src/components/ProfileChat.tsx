'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import ChatMessage from './ChatMessage';
import { modelOptions } from '@/lib/model-clients';
import { ModelOption } from '@/lib/types';
import ChatLoader from './ui/ChatLoader';

export default function ProfileChat() {
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelOption>(modelOptions[0]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/profile-chat',
    body: {
      model: selectedModel.value,
      type: selectedModel.type,
    },
    onFinish: () => setIsTyping(false),
    onResponse: () => setIsTyping(true),
  });

  return (
    <div className='bg-white rounded-lg shadow-lg p-4'>
      <div className='mb-4'>
        <label htmlFor='model-select' className='block text-sm font-medium text-gray-700 mb-1'>
          Select AI Model
        </label>
        <select
          id='model-select'
          value={selectedModel.value}
          onChange={(e) => {
            const model = modelOptions.find((m) => m.value === e.target.value);
            if (model) setSelectedModel(model);
          }}
          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'>
          {modelOptions.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>

      <div className='h-[500px] overflow-y-auto mb-4 space-y-4'>
        {messages.length === 0 && (
          <div className='text-center text-gray-500 mt-4'>
            <p>👋 Hi! I'm an AI assistant trained to discuss Heejun&apos;s professional background.</p>
            <p className='mt-2'>You can ask me about:</p>
            <ul className='list-disc list-inside mt-2'>
              <li>Technical skills and expertise</li>
              <li>Work experience and projects</li>
              <li>Education and certifications</li>
              <li>Professional achievements</li>
            </ul>
          </div>
        )}
        {messages.map((message) => {
          // Filter out data messages which aren't supported by ChatMessage
          if (message.role === 'data') return null;
          return <ChatMessage key={message.id} role={message.role} content={message.content} />;
        })}

        {isTyping && (
          <div className='flex justify-start'>
            <ChatLoader />
            <div className='bg-gray-100 rounded-lg p-3'>
              <div className='flex space-x-2'>
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' />
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]' />
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]' />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className='flex gap-2'>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything about Heejun's background..."
          className='flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors'>
          Send
        </button>
      </form>
    </div>
  );
}
