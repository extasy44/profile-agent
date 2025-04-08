// import OpenAI from 'openai';
import { ModelOption, ChatMessage } from './types';

// export const openaiClient = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function ollamaClient(model: string = 'llama2', messages: ChatMessage[] = []) {
  const response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      stream: true,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to connect to Ollama');
  }

  return response;
}

export const modelOptions = [
  // { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo', type: 'openai' },
  { label: 'Llama 2', value: 'llama2', type: 'ollama' },
  { label: 'Mistral', value: 'mistral', type: 'ollama' },
  { label: 'CodeLlama', value: 'codellama', type: 'ollama' },
] as const satisfies readonly ModelOption[];
