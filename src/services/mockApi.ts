// Mock responses for the chatbot
const MOCK_RESPONSES = [
  'Hello! How can I help you today?',
  "That's an interesting question. Let me help you with that.",
  "I understand what you're asking. Here's what I think...",
  "Based on what you've said, I would suggest...",
  'Could you please provide more details about your question?',
  "I'm here to help! Let me know if you need any clarification.",
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ChatResponse {
  id: string;
  content: string;
  sender: 'bot';
  timestamp: Date;
}

export const mockApiService = {
  // Simulate sending a message to the API and getting a response
  async sendMessage(message: string): Promise<ChatResponse> {
    // Simulate API delay between 500ms and 2000ms
    await delay(Math.random() * 1500 + 500);

    // Randomly select a response
    const responseIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
    const responseContent = MOCK_RESPONSES[responseIndex];

    // Add some context from the user's message if it's long enough
    const contextualResponse = message.length > 10 ? `Regarding "${message.slice(0, 30)}..."... ${responseContent}` : responseContent;

    return {
      id: Date.now().toString(),
      content: contextualResponse,
      sender: 'bot',
      timestamp: new Date(),
    };
  },

  // Simulate getting chat history
  async getChatHistory(): Promise<{ title: string; lastMessage: string }[]> {
    await delay(1000);
    return [
      {
        title: 'Previous Chat 1',
        lastMessage: 'This is the last message from the previous chat.',
      },
      {
        title: 'AI Discussion',
        lastMessage: "Let's continue our discussion about artificial intelligence.",
      },
      {
        title: 'Project Planning',
        lastMessage: 'We should schedule a follow-up meeting.',
      },
    ];
  },
};
