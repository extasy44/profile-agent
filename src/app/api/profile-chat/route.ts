import { ollamaClient } from '@/lib/model-clients';
import { ChatMessage } from '@/lib/types';

const systemPrompt: ChatMessage = {
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

Remember: You're representing Heejun in a professional context. Your responses should reflect well on their capabilities and experience.`,
};

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  try {
    const response = await ollamaClient(model, [systemPrompt, ...messages]);
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) throw new Error('No response body');

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(Boolean);

            for (const line of lines) {
              const json = JSON.parse(line);
              if (json.done) break;
              controller.enqueue(new TextEncoder().encode(json.message));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Ollama error:', error);
    return new Response('Error connecting to Ollama', { status: 500 });
  }
}
