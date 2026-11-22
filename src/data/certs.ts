export type TextCert = {
  id: string;
  name: string;
  issuer?: string;
  year?: string;
  url?: string;
};

export const certs: TextCert[] = [
  {
    id: "java",
    name: "IT Specialist — Java",
    issuer: "Certiport",
    year: "2026",
  },
  {
    id: "google-ai-professional",
    name: "Google AI Professional Certificate",
    issuer: "Google",
    year: "2026",
  },
  {
    id: "c1",
    name: "Google AI Fundamentals",
    issuer: "Coursera",
    year: "2026",
    url: "https://www.credly.com/earner/earned/badge/e81b6e9a-59c4-45bb-8025-b7d32fec9147",
  },
  {
    id: "c2",
    name: "Google AI for Writing and Communicating",
    issuer: "Coursera",
    year: "2026",
    url: "https://www.credly.com/earner/earned/badge/b63819ac-7d22-4db9-884a-26de4a0d3bcb",
  },
  {
    id: "c3",
    name: "Google AI for Content Creation",
    issuer: "Coursera",
    year: "2026",
    url: "https://www.credly.com/earner/earned/badge/bc9848e6-c8e3-4034-9c4a-6cdabf7050f8",
  },
];
