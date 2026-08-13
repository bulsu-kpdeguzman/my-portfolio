export type OngoingItem = {
  id: string;
  type: "build" | "event";
  title: string;
  tagline: string;
  points: string[];
  status: "in progress" | "participating";
};

export const ongoing: OngoingItem[] = [
  {
    id: "bjmp-rag",
    type: "build",
    title: "Centralized RAG Chatbot for BJMP Offices",
    tagline:
      "A centralized RAG chatbot for BJMP — officers ask questions and get answers grounded in the knowledge base each office uploads.",
    points: [
      "Centralized platform covering all BJMP offices — each office uploads its own knowledge base.",
      "Retrieval-Augmented Generation: answers are grounded in that office's uploaded documents, not generic responses.",
      "Built to answer questions in plain language about processes, policies and procedures.",
    ],
    status: "in progress",
  },
  {
    id: "cyh-clark",
    type: "event",
    title: "Can You Hack It — Clark",
    tagline:
      "Hackathon participation organized by ITBPAP — the IT Business Process Association of the Philippines.",
    points: [
      "Currently competing as a participant.",
      "Details of the build will land here once the hackathon wraps.",
    ],
    status: "participating",
  },
];
