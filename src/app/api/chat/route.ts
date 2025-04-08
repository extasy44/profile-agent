/* eslint-disable @typescript-eslint/no-explicit-any */

// Ollama API endpoint (default for local installation)
const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Get the last message content as the prompt
  const lastMessage = messages[messages.length - 1];
  const prompt = lastMessage.content;

  // Create the fetch request to Ollama
  const response = await fetch(OLLAMA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3.2',
      prompt,
      stream: true,
    }),
  });

  // Create a readable stream from the response
  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          // Decode the chunk and split into lines
          const chunk = decoder.decode(value);
          const lines = chunk.split('\\n').filter(Boolean);

          for (const line of lines) {
            try {
              const { response } = JSON.parse(line);
              if (response) {
                // Send the response as a chunk
                const chunk = new TextEncoder().encode(response);
                controller.enqueue(chunk);
              }
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error reading stream:', error);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });

  // Return the stream as a streaming response
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
