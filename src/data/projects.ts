export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  year: string;
  stack: string[];
  tags: string[];
  featured?: boolean;
  status: "shipped" | "in progress" | "archived" | "concept";
  externalUrl?: string;
  overview: string;
  problem: string;
  role: string;
  approach: string[];
  architecture?: string;
  results: ProjectMetric[];
  retro?: string;
};

export const projects: Project[] = [
  {
    slug: "eskolar",
    name: "eSkolar",
    category: "eGov PH",
    tagline:
      "An integrated digital scholarship platform — eGovPH Hackathon Top 30 finalist.",
    year: "2026",
    stack: ["eGovSSO", "eMessage", "eGovAI", "Face Liveness"],
    tags: ["scholarship", "govtech", "api integration"],
    featured: true,
    status: "shipped",
    overview:
      "An integrated digital scholarship platform developed for the eGovPH Hackathon, designed to streamline scholarship applications and student assistance services. eSkolar integrates multiple government APIs — eGovSSO for authentication, eMessage for notifications, eGovAI for AI-powered assistance, and Face Liveness for identity verification — creating a more secure and connected digital experience.",
    problem:
      "Students often have to navigate different processes and services when applying for scholarships and educational assistance. Separate authentication, communication, verification, and assistance systems make these processes fragmented. eSkolar was designed to bring these capabilities together into a more connected digital scholarship experience.",
    role: "API Integration Lead — led the integration of the government-provided APIs used by eSkolar. Independently implemented and connected eGovSSO, eMessage, eGovAI, and Face Liveness into the application's authentication, communication, AI assistance, and identity verification workflows.",
    approach: [
      "Integrated eGovSSO for centralized government authentication.",
      "Integrated eMessage for digital notifications and communication.",
      "Integrated eGovAI to provide AI-powered assistance within the platform.",
      "Integrated Face Liveness for identity verification.",
      "Connected the government services into a unified scholarship application experience.",
      "Handled the API integration required to make the government services work within the application.",
    ],
    results: [
      { label: "competition", value: "eGovPH Hackathon · Top 30 Finalist" },
      { label: "eGov services integrated", value: "4 APIs" },
      {
        label: "deliverable",
        value: "functional hackathon prototype",
      },
    ],
  },
  {
    slug: "easecert",
    name: "EaseCert",
    category: "Capstone",
    tagline:
      "A web-based document issuance and appointment management system for BJMP Region III.",
    year: "2026",
    stack: ["React.js", "Laravel", "PHP", "MySQL"],
    tags: ["capstone", "document issuance", "appointments"],
    featured: true,
    status: "shipped",
    overview:
      "A full-stack document issuance and appointment management system developed for BJMP Region III. EaseCert digitizes document requests, appointment scheduling, and administrative workflows, providing a centralized platform that makes the issuance process more organized and efficient.",
    problem:
      "Document requests and appointment processes involved multiple manual steps, making it difficult for applicants and personnel to efficiently manage requests and schedules. There was also a need for a centralized system that could organize document issuance workflows while providing better visibility for administrative personnel. EaseCert was developed to address these challenges within the context of BJMP Region III.",
    role: "Lead Developer · Project Manager · Capstone Leader — led the development and overall execution of EaseCert as the capstone leader. Responsible for coordinating the project, translating requirements into system features, overseeing the development workflow, and serving as the primary developer building the full-stack application.",
    approach: [
      "Led the planning, development, and coordination of the capstone project.",
      "Developed the user interface and application workflows using React.js.",
      "Built RESTful backend functionality using Laravel and PHP.",
      "Designed and implemented the MySQL database and system data relationships.",
      "Implemented document request and appointment management workflows.",
      "Configured and deployed the application for actual system use and testing.",
    ],
    results: [
      { label: "deliverable", value: "capstone project" },
      { label: "client context", value: "BJMP Region III" },
      {
        label: "coverage",
        value: "document issuance + appointment workflows",
      },
    ],
  },
  {
    slug: "diwa",
    name: "DIWA",
    category: "Concept",
    tagline:
      "A smart tourism wayfinding concept — IRCITE IT Marketing Challenge 4th place.",
    year: "2026",
    stack: ["AI", "Predictive Analytics", "GIS", "Real-Time Data"],
    tags: ["concept", "tourism", "marketing"],
    featured: true,
    status: "concept",
    overview:
      "A smart tourism infrastructure concept designed to address fragmented tourism information and improve decision-making for both tourists and tourism stakeholders. DIWA integrates real-time crowd indexing, predictive analytics, GIS-based spatial visualization, and AI-powered itinerary assistance to transform tourism data into proactive insights and personalized travel experiences. It was entered in the IT Marketing Challenge of the International Research Conference on Information Technology Education (IRCITE) — an annual event organized by the Philippine Society of Information Technology Educators - Central Luzon (PSITE-CL) that gathers educators, researchers, and students to share technology innovations and research.",
    problem:
      "Tourists and tourism stakeholders rely on fragmented information when deciding where to go, when to visit, and how to plan their activities. Existing tourism information often fails to reflect changing crowd conditions or provide personalized recommendations based on real-time circumstances. DIWA was conceptualized to address this systemic gap by combining tourism data, spatial intelligence, and AI-assisted decision-making.",
    role: "Marketing Plan Lead — crafted the marketing plan and business strategy for DIWA as an IT marketing competition entry. Developed the product positioning, target market, value proposition, marketing strategy, and presentation used to communicate DIWA's potential as a smart tourism infrastructure solution.",
    approach: [
      "Developed the marketing plan and overall business strategy for DIWA.",
      "Defined the target users, market positioning, and value proposition of the proposed platform.",
      "Designed the proposed real-time crowd indexing concept for understanding tourism destination conditions.",
      "Incorporated predictive analytics and GIS-based spatial visualization into the proposed solution.",
      "Proposed an AI-powered itinerary assistant for personalized travel recommendations.",
      "Developed the concept and supporting pitch presentation around smart tourism infrastructure.",
    ],
    results: [
      {
        label: "competition",
        value: "IRCITE IT Marketing Challenge · 4th place",
      },
      { label: "organized by", value: "PSITE-CL" },
      {
        label: "deliverable",
        value: "concept + marketing proposal",
      },
      { label: "claim level", value: "concept only — no fabricated metrics" },
    ],
    retro:
      "DIWA is explicitly a concept and marketing proposal, not a deployed production system — no implementation metrics or performance claims are made.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
