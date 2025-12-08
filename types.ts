export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  tags: string[];
  imageUrl: string;
  link: string;
  githubLink?: string;
}

export interface MeetingSlot {
  id: string;
  datetime: string; // ISO String
  available: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  isThinking?: boolean;
}

export enum TechStack {
  ANGULAR = 'Angular',
  JAVA = 'Java Spring Boot',
  REACT = 'React',
  TYPESCRIPT = 'TypeScript',
  POSTGRESQL = 'PostgreSQL',
  AI = 'AI/ML'
}