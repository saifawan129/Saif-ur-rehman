import { GoogleGenAI, FunctionDeclaration, Type, Tool } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Define Tool Schemas
const checkAvailabilityTool: FunctionDeclaration = {
  name: 'checkAvailability',
  description: 'Get a list of available meeting slots for the next few days.',
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

const bookMeetingTool: FunctionDeclaration = {
  name: 'bookMeeting',
  description: 'Book a specific meeting slot.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      slotId: {
        type: Type.STRING,
        description: 'The ID of the meeting slot to book.',
      },
      name: {
        type: Type.STRING,
        description: 'The name of the visitor booking the meeting.',
      },
      email: {
        type: Type.STRING,
        description: 'The email of the visitor (optional).',
      },
    },
    required: ['slotId', 'name'],
  },
};

const tools: Tool[] = [{
  functionDeclarations: [checkAvailabilityTool, bookMeetingTool]
}];

export const createChatSession = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Chat functionality will be disabled.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  return ai.chats.create({
    model: 'gemini-1.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: tools,
    },
  });
};
