'use client';

import { useState, useRef, useEffect } from 'react';
import { OpenAI } from 'openai';
import ChatMessage from './ChatMessage';
import ChatLoader from './ui/ChatLoader';
import { buttonVariants, inputVariants } from '@/lib/styles';
import { profileChunk } from '@/docs/profile';
import { ChatMessage as ChatMessageType } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function findRelevantChunks(query: string): string[] {
  // Simple semantic search implementation
  const queryLower = query.toLowerCase();
  return profileChunk.filter((chunk) => chunk.text.toLowerCase().includes(queryLower)).map((chunk) => chunk.text);
}

const systemPrompt: ChatMessageType = {
  role: 'system',
  content: `You are an AI assistant representing Heejun Seo, a Frontend / Web Developer with Fullstack Capability. Your role is to professionally and accurately answer questions about Heejun's background, skills, and experience.

Key Information:
- Frontend / Web Developer with expertise in TypeScript, React, Next.js, Node.js, and cloud technologies
- Strong focus on building scalable web applications and improving developer experience
- Passionate about clean code, testing, and modern development practices

When answering:
1. Be professional and concise
2. Focus on highlighting relevant skills and experiences
3. Use specific examples when appropriate
4. Be honest - if you're not sure about something, say so
5. Maintain a friendly but professional tone
6. Use the provided context to give accurate and detailed responses

Remember: You're representing Heejun in a professional context. Your responses should reflect well on their capabilities and experience.`,
};

export default function ProfileChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Only auto-scroll to bottom when new messages are added, not on initial load
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  useEffect(() => {
    // Scroll to bottom when loading state changes (new message being typed)
    if (isLoading) {
      scrollToBottom();
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const relevantChunks = findRelevantChunks(input);
    const context = relevantChunks.join('\n\n');

    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          systemPrompt,
          {
            role: 'system',
            content: `Here is the relevant context about Heejun Seo:\n\n${context}`,
          },
          ...messages,
          userMessage,
        ],
        stream: true,
      });

      let assistantMessage = '';
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          assistantMessage += content;
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.role === 'assistant') {
              return [...prev.slice(0, -1), { role: 'assistant', content: assistantMessage }];
            }
            return [...prev, { role: 'assistant', content: assistantMessage }];
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-[600px] max-w-4xl mx-auto'>
      <div className='flex-1 overflow-y-auto p-6 space-y-4 relative'>
        {messages.length === 0 && !isLoading && (
          <div className='text-center text-muted-foreground space-y-4 w-full'>
            <div className='bg-card rounded-lg p-6 max-w-2xl mx-auto border border-border'>
              <p className='text-lg mb-4 text-foreground'>
                Hi! I&apos;m an AI assistant trained to discuss Heejun&apos;s professional background.
              </p>
              <p className='font-medium mb-2 text-foreground'>You can ask me about:</p>
              <ul className='space-y-2 text-left'>
                <li className='flex items-center'>Technical skills and expertise</li>
                <li className='flex items-center'>Work experience and projects</li>
                <li className='flex items-center'>Education and certifications</li>
                <li className='flex items-center'>Professional achievements</li>
              </ul>
            </div>
          </div>
        )}
        {messages.length > 0 && (
          <div className='w-full space-y-4 pt-4'>
            {/* Conversation start indicator */}
            <div className='flex items-center justify-center py-2'>
              <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                <div className='h-px bg-border flex-1'></div>
                <span className='px-2 bg-background'>Conversation started</span>
                <div className='h-px bg-border flex-1'></div>
              </div>
            </div>
            <div className='space-y-4'>
              {messages.map((message, index) => (
                <div key={index} className={index === 0 ? 'relative' : ''}>
                  <ChatMessage role={message.role} content={message.content} />
                </div>
              ))}
              {isLoading && <ChatLoader />}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className='border-t border-border p-4 bg-muted/30'>
        <form onSubmit={handleSubmit} className='flex gap-2'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Heejun's background..."
            className={`${inputVariants()} text-foreground placeholder:text-muted-foreground bg-background border-border focus:border-primary focus:ring-primary`}
            disabled={isLoading}
          />
          <button type='submit' disabled={isLoading} className={buttonVariants({ variant: isLoading ? 'secondary' : 'default' })}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
