import { Project, TechStack, MeetingSlot } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Enterprise FinTech Dashboard',
    description: 'A high-performance banking dashboard handling real-time transaction data with sub-second latency.',
    longDescription: 'Developed a comprehensive financial analytics platform for a Tier-1 bank. The system processes millions of transactions daily, providing real-time visualization of cash flows, fraud detection alerts, and liquidity metrics. We replaced a legacy monolithic system with a micro-frontend architecture.',
    features: [
      'Real-time WebSocket data streaming',
      'Custom charting library for high-frequency updates',
      'Role-based access control (RBAC) with JWT',
      'Automated reporting pipeline'
    ],
    challenges: [
      'Reducing initial load time by 60% using lazy loading and code splitting.',
      'Handling 10k+ concurrent socket connections without server degradation.',
      'Ensuring strict regulatory compliance and audit trails.'
    ],
    tags: [TechStack.ANGULAR, TechStack.TYPESCRIPT, TechStack.JAVA],
    imageUrl: 'https://picsum.photos/600/400?random=1',
    link: '#',
    githubLink: 'https://github.com/example/fintech-dashboard'
  },
  {
    id: '2',
    title: 'AI-Driven Supply Chain Optimizer',
    description: 'Logistics platform utilizing genetic algorithms to optimize delivery routes, reducing costs by 15%.',
    longDescription: 'A machine-learning powered application that analyzes historical traffic patterns, weather data, and delivery windows to propose optimal routes for a fleet of 500+ vehicles. The system continuously learns and adapts to improved efficiency over time.',
    features: [
      'Genetic Algorithm for Route Optimization (TSP Solver)',
      'Integration with Google Maps API and Traffic Data',
      'Driver mobile app for real-time navigation updates',
      'Predictive maintenance alerts for fleet vehicles'
    ],
    challenges: [
      'Processing massive geospatial datasets in real-time.',
      'Balancing computational complexity with response time requirements.',
      'Handling offline syncing for drivers in remote areas.'
    ],
    tags: [TechStack.JAVA, TechStack.POSTGRESQL, TechStack.AI],
    imageUrl: 'https://picsum.photos/600/400?random=2',
    link: '#',
    githubLink: 'https://github.com/example/supply-chain-ai'
  },
  {
    id: '3',
    title: 'HealthCare Patient Portal',
    description: 'Secure, HIPAA-compliant patient management system with integrated telehealth video conferencing.',
    longDescription: 'Created a secure portal for patients to view medical records, book appointments, and attend virtual consultations. The system is fully compliant with HIPAA regulations, ensuring end-to-end encryption for all sensitive data.',
    features: [
      'WebRTC-based secure video consultations',
      'HL7 / FHIR standard integration for EMR interoperability',
      'Two-factor authentication (2FA) for patient login',
      'Automated appointment reminders via SMS/Email'
    ],
    challenges: [
      'Implementing end-to-end encryption for video streams.',
      'Integrating with legacy hospital mainframe systems.',
      'Designing an accessible UI for elderly patients.'
    ],
    tags: [TechStack.ANGULAR, TechStack.JAVA, TechStack.POSTGRESQL],
    imageUrl: 'https://picsum.photos/600/400?random=3',
    link: '#',
    githubLink: 'https://github.com/example/patient-portal'
  },
  {
    id: '4',
    title: 'Smart Portfolio V2',
    description: 'The current portfolio site you are viewing, featuring a Generative AI scheduling agent.',
    longDescription: 'This portfolio is not just a showcase of work but a demonstration of modern agentic AI. It features an integrated Gemini-powered chatbot that can intelligently discuss my skills, check my real calendar availability, and book meetings on my behalf.',
    features: [
      'Google Gemini AI integration for natural language conversations',
      'Custom tool calling architecture for calendar actions',
      'Glassmorphism UI design with Tailwind CSS',
      'Full Stack implementation with Spring Boot backend'
    ],
    challenges: [
      'Designing a seamless tool-calling loop between frontend and LLM.',
      'Prompt engineering to ensure the bot behaves professionally.',
      'Managing state consistency between the chat UI and backend database.'
    ],
    tags: [TechStack.REACT, TechStack.TYPESCRIPT, TechStack.AI],
    imageUrl: 'https://picsum.photos/600/400?random=4',
    link: '#',
    githubLink: 'https://github.com/devfolio/portfolio-v2'
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