import { OpenAI } from 'openai';
import { ChatMessage } from '@/lib/types';

const dataChunk = [
  {
    id: 'chunk_1_summary',
    text: 'Heejun Seo is a Senior Front-End / Web Developer with over 6 years of experience in JavaScript (ES6+), TypeScript, React.js, and other modern web technologies. He is passionate about building scalable, high-performance applications with a strong focus on user experience, accessibility, and security. He is known for being reliable, punctual, and someone you can trust in high-pressure environments. He consistently gets to solutions quickly and is a fast learner who adapts to new technologies with ease. He is also enthusiastic about AI integration in frontend development to enhance automation and intelligent user interactions.',
  },
  {
    id: 'chunk_2_lmi_senior',
    text: 'At LMI Group (Nov 2023 – Present), Heejun leads frontend development using React and TypeScript, ensuring scalable and maintainable architecture. He collaborates with product teams to define new features and optimize performance, while integrating REST APIs efficiently and managing Azure cloud infrastructure for reliable deployments.',
  },
  {
    id: 'chunk_3_lmi_frontend',
    text: 'As a Front-End Developer at LMI Group (July 2021 – Nov 2023), Heejun developed responsive web apps using React, Redux, and Next.js. He refactored legacy systems into component-based architecture, built accessible UI components, implemented CI/CD pipelines using Azure DevOps, and resolved performance bottlenecks.',
  },
  {
    id: 'chunk_4_cpl',
    text: 'From Apr 2013 to Jun 2021, Heejun worked at Computers and Parts Land (CPL) as an eCommerce Developer. He managed Magento-based platforms with 30,000+ products, built tools for inventory, pricing, and admin workflows, and created custom POS integrations to automate order and dispatch processes. He also maintained AWS environments and contributed to SEO/SEM strategies.',
  },
  {
    id: 'chunk_5_dotping',
    text: 'At Dotping Design (2010 – 2012), Heejun developed and maintained responsive websites for SMEs. He integrated eCommerce solutions with third-party APIs and consulted with clients to deliver tailored web solutions that met their business goals.',
  },
  {
    id: 'chunk_6_education',
    text: 'Heejun holds a Bachelor of Information and Communication Technology with a major in Network Security and Design from Swinburne University (2011–2013). He also completed a Diploma of IT in Software Development from Holmesglen Institute (2009–2011) and a Data Analytics and Visualization Bootcamp from Monash University in 2021.',
  },
  {
    id: 'chunk_7_cover_letter',
    text: 'In his cover letter, Heejun expresses a strong interest in frontend roles, highlighting his experience with React, problem-solving skills, and ability to design intuitive interfaces. He emphasizes his passion for learning, adaptability across industries, and eagerness to contribute meaningfully to new challenges. He positions himself as a dependable and proactive professional who can be trusted to deliver quality work.',
  },
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function findRelevantChunks(query: string): string[] {
  // Simple semantic search implementation
  const queryLower = query.toLowerCase();
  return dataChunk.filter((chunk) => chunk.text.toLowerCase().includes(queryLower)).map((chunk) => chunk.text);
}

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
6. Use the provided context to give accurate and detailed responses

Remember: You're representing Heejun in a professional context. Your responses should reflect well on their capabilities and experience.`,
};

export async function POST(req: Request) {
  const { messages, model = 'gpt-4o-mini' } = await req.json();
  const lastUserMessage = messages[messages.length - 1];

  try {
    // Find relevant context chunks
    const relevantChunks = findRelevantChunks(lastUserMessage.content);
    const context = relevantChunks.join('\n\n');

    const response = await openai.chat.completions.create({
      model,
      messages: [
        systemPrompt,
        {
          role: 'system',
          content: `Here is the relevant context about Heejun Seo:\n\n${context}`,
        },
        ...messages,
      ],
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
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
    console.error('OpenAI error:', error);
    return new Response('Error connecting to OpenAI', { status: 500 });
  }
}
