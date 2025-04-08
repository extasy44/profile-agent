// import OpenAI from 'openai';
import { ModelOption, ChatMessage } from './types';

// export const openaiClient = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function ollamaClient(model: string = 'llama3.2', messages: ChatMessage[] = []) {
  try {
    // Get the last message content as the prompt
    const lastMessage = messages[messages.length - 1];
    const prompt = lastMessage.content;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama API error: ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error('Ollama client error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to connect to Ollama');
  }
}

export const modelOptions = [
  // { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo', type: 'openai' },
  { label: 'Llama 3.2', value: 'llama3.2', type: 'ollama' },
  { label: 'Llama 2', value: 'llama2', type: 'ollama' },
  { label: 'Mistral', value: 'mistral', type: 'ollama' },
  { label: 'CodeLlama', value: 'codellama', type: 'ollama' },
] as const satisfies readonly ModelOption[];
