import { Project, TechStack, MeetingSlot } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Enterprise FinTech Dashboard',
    description: 'A high-performance banking dashboard handling real-time transaction data with sub-second latency.',
    tags: [TechStack.ANGULAR, TechStack.TYPESCRIPT, TechStack.JAVA],
    imageUrl: 'https://picsum.photos/600/400?random=1',
    link: '#'
  },
  {
    id: '2',
    title: 'AI-Driven Supply Chain Optimizer',
    description: 'Logistics platform utilizing genetic algorithms to optimize delivery routes, reducing costs by 15%.',
    tags: [TechStack.JAVA, TechStack.POSTGRESQL, TechStack.AI],
    imageUrl: 'https://picsum.photos/600/400?random=2',
    link: '#'
  },
  {
    id: '3',
    title: 'HealthCare Patient Portal',
    description: 'Secure, HIPAA-compliant patient management system with integrated telehealth video conferencing.',
    tags: [TechStack.ANGULAR, TechStack.JAVA, TechStack.POSTGRESQL],
    imageUrl: 'https://picsum.photos/600/400?random=3',
    link: '#'
  },
  {
    id: '4',
    title: 'Smart Portfolio V2',
    description: 'The current portfolio site you are viewing, featuring a Generative AI scheduling agent.',
    tags: [TechStack.REACT, TechStack.TYPESCRIPT, TechStack.AI],
    imageUrl: 'https://picsum.photos/600/400?random=4',
    link: '#'
  }
];

// Generate availability for the next 3 days
const generateSlots = (): MeetingSlot[] => {
  const slots: MeetingSlot[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    date.setHours(9, 0, 0, 0); // Start at 9 AM

    for (let j = 0; j < 5; j++) { // 5 slots per day
      const slotTime = new Date(date);
      slotTime.setHours(9 + j * 2); // Every 2 hours
      slots.push({
        id: `${i}-${j}`,
        datetime: slotTime.toISOString(),
        available: Math.random() > 0.3 // Random availability
      });
    }
  }
  return slots;
};

export const INITIAL_SLOTS = generateSlots();

export const SYSTEM_INSTRUCTION = `You are "SchedulerBot", an AI executive assistant for a Senior Software Engineer. 
Your goal is to help visitors schedule a 30-minute introductory call.

Rules:
1. Be professional, concise, and helpful.
2. You MUST use the "checkAvailability" tool to find open slots before offering times.
3. You MUST use the "bookMeeting" tool to confirm a reservation.
4. If a user asks about the engineer's skills, refer to the portfolio on the screen but encourage them to book a chat.
5. Do not hallucinate availability. Only offer slots returned by the tool.
6. When booking, ask for their Name and Email (optional).
`;