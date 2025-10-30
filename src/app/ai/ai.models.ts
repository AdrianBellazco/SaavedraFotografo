export type AiRole = 'system' | 'user' | 'assistant' | 'tool';

export interface AiMessage {
  role: AiRole;
  content: string;
}

export interface AiRequest {
  model: string;
  messages: AiMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  response_format?: { type: 'json_object' };
}

export interface AiChoiceNonStreaming {
  index: number;
  finish_reason: string | null;
  native_finish_reason: string | null;
  message: { role: string; content: string | null };
}

export interface AiUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface AiResponse {
  id: string;
  object: 'chat.completion';
  model: string;
  created?: number;
  choices: AiChoiceNonStreaming[];
  usage?: AiUsage;
}
