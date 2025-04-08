export interface ModelOption {
  label: string;
  value: string;
  type: 'openai' | 'ollama';
}

export interface ModelClient {
  type: 'openai' | 'ollama';
  model: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
