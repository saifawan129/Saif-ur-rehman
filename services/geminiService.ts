import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from '../constants';

export const createChatSession = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Chat functionality will be disabled.");
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
    tools: [
      {
        functionDeclarations: [
          {
            name: 'checkAvailability',
            description: 'Get a list of available meeting slots for the next few days.',
            // No parameters for this tool
          },
          {
            name: 'bookMeeting',
            description: 'Book a specific meeting slot.',
            parameters: {
              type: "OBJECT",
              properties: {
                slotId: {
                  type: "STRING",
                  description: 'The ID of the meeting slot to book.',
                },
                name: {
                  type: "STRING",
                  description: 'The name of the visitor booking the meeting.',
                },
                email: {
                  type: "STRING",
                  description: 'The email of the visitor (optional).',
                },
              },
              required: ['slotId', 'name'],
            },
          }
        ]
      }
    ]
  });

  return model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });
};
