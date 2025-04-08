'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatLoader from './ui/ChatLoader';
import { modelOptions } from '@/lib/model-clients';
import { ModelOption } from '@/lib/types';
import { buttonVariants, inputVariants, selectVariants } from '@/lib/styles';

export default function ProfileChat() {
  const [selectedModel, setSelectedModel] = useState<ModelOption>(modelOptions[0]);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      model: selectedModel.value,
      type: selectedModel.type,
    },
  });

  return (
    <div className='flex flex-col h-[600px]'>
      <div className='flex-1 overflow-y-auto p-6 space-y-4'>
        {messages.length === 0 && (
          <div className='text-center text-gray-500 space-y-4'>
            <div className='bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto'>
              <p className='text-lg mb-4'>👋 Hi! I&apos;m an AI assistant trained to discuss Heejun&apos;s professional background.</p>
              <p className='font-medium mb-2'>You can ask me about:</p>
              <ul className='space-y-2 text-left'>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                  Technical skills and expertise
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                  Work experience and projects
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                  Education and certifications
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                  Professional achievements
                </li>
              </ul>
            </div>
          </div>
        )}
        {messages.map((message) => {
          if (message.role === 'data') return null;
          return <ChatMessage key={message.id} role={message.role} content={message.content} />;
        })}
        {isLoading && <ChatLoader />}
      </div>

      <div className='border-t border-gray-200 p-4 bg-gray-50'>
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
            className={selectVariants()}>
            {modelOptions.map((model) => (
              <option key={model.value} value={model.value}>
                {model.label}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit} className='flex gap-2'>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything about Heejun's background..."
            className={inputVariants()}
          />
          <button type='submit' disabled={isLoading} className={buttonVariants({ variant: isLoading ? 'disabled' : 'primary' })}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
