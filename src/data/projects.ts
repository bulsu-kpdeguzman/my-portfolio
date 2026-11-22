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
    stack: [
      "React.js",
      "Laravel",
      "MySQL",
      "REST API",
      "Docker",
      "CI/CD",
    ],
    tags: ["capstone", "RBAC", "document issuance", "appointments"],
    featured: true,
    status: "shipped",
    externalUrl: "https://www.easecert.website/",
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
      "Implemented document request, appointment, and user-management workflows.",
      "Separated applicant and administrator permissions with Laravel Sanctum RBAC at the API middleware and UI route levels.",
      "Containerized the application with Docker and deployed it to a VPS through an automated GitHub Actions CI/CD pipeline.",
    ],
    results: [
      { label: "deliverable", value: "capstone project" },
      { label: "client context", value: "BJMP Region III" },
      {
        label: "coverage",
        value: "documents + appointments + RBAC",
      },
      { label: "delivery", value: "Docker + automated CI/CD" },
    ],
  },
  {
    slug: "traice",
    name: "TrAIce",
    category: "AI / GovTech",
    tagline:
      "An AI-assisted public fund tracing platform for detecting anomalous government spending.",
    year: "2026",
    stack: ["React.js", "AI / LLM", "Isolation Forest", "Supabase"],
    tags: ["govtech", "anomaly detection", "public funds", "AI"],
    featured: true,
    status: "shipped",
    overview:
      "TrAIce is an AI-assisted public fund tracing platform built for Can You HackIT Clark 2026. It connects government datasets and transaction records to anomaly detection and an LLM analysis layer, presenting findings through citizen-facing dashboards.",
    problem:
      "Government spending data can be difficult for citizens to interpret, and unusual allocations or transactions may be hidden inside large datasets. TrAIce was designed to make those patterns easier to explore and explain.",
    role: "Lead Systems Architect — designed the system architecture, data flow, and separation between government datasets, anomaly detection, LLM-assisted analysis, and citizen-facing dashboards.",
    approach: [
      "Structured a data pipeline connecting government datasets and transaction records.",
      "Applied an Isolation Forest machine-learning model to identify anomalous budget allocations and transactions.",
      "Added an LLM analysis layer to translate technical findings into understandable explanations.",
      "Designed citizen-facing dashboards for exploring public-fund activity.",
      "Separated database access and application roles through Supabase.",
    ],
    results: [
      { label: "event", value: "Can You HackIT Clark 2026" },
      { label: "role", value: "Lead Systems Architect" },
      { label: "analysis", value: "Isolation Forest + LLM" },
      { label: "focus", value: "public-fund transparency" },
    ],
  },
  {
    slug: "bulsu-smart-gate",
    name: "BulSU Smart Gate System",
    category: "Campus System",
    tagline:
      "A real-time campus access-control system with web administration and a native Android client.",
    year: "2025",
    stack: ["React.js", "Java", "Android", "Firebase Firestore"],
    tags: ["access control", "real-time", "Android", "RBAC"],
    status: "shipped",
    overview:
      "The BulSU Smart Gate System combines a React administration dashboard with a native Android client for campus access control. Firebase Firestore keeps gate and administrative workflows synchronized in real time.",
    problem:
      "Campus access decisions need to account for different user roles and class schedules while remaining fast enough for daily gate operations. Manual verification makes that process slow and inconsistent.",
    role: "Full-Stack Developer — developed the React administration experience, the native Android client in Java, and the Firebase-backed real-time workflows.",
    approach: [
      "Built a React web application for campus access administration.",
      "Developed a native Android client using Java for gate operations.",
      "Synchronized access records and status changes through Firebase Firestore.",
      "Implemented role-based workflows for students, guards, faculty, and administrators.",
      "Validated gate eligibility against class schedules using QR and ID-based checks.",
    ],
    results: [
      { label: "clients", value: "React web + Android" },
      { label: "data", value: "real-time Firestore sync" },
      { label: "access", value: "4 role-based workflows" },
    ],
  },
  {
    slug: "study-buddy",
    name: "Study Buddy",
    category: "AI / EdTech",
    tagline:
      "An AI-powered study assistant for PDF-based learning and conversational review.",
    year: "2025",
    stack: ["Next.js", "Prisma", "Neon", "Gemini", "RAG"],
    tags: ["edtech", "PDF learning", "RAG", "Gemini"],
    status: "shipped",
    overview:
      "Study Buddy is an AI-powered learning application that turns PDF source material into a grounded conversational review experience using Gemini and Retrieval-Augmented Generation.",
    problem:
      "Long PDF learning materials are difficult to review interactively. Learners need a way to ask questions and receive responses grounded in the documents they are studying.",
    role: "AI Application Developer — built the Next.js application, document-grounded retrieval workflow, and supporting Prisma and Neon data layer.",
    approach: [
      "Built the application interface and server workflows with Next.js.",
      "Prepared uploaded PDF material for retrieval and grounded question answering.",
      "Used Gemini to provide conversational study assistance.",
      "Connected the application data layer through Prisma and Neon.",
    ],
    results: [
      { label: "learning source", value: "PDF documents" },
      { label: "AI approach", value: "Gemini + RAG" },
      { label: "experience", value: "conversational review" },
    ],
  },
  {
    slug: "diwa",
    name: "DIWA",
    category: "Concept",
    tagline:
      "An AI-assisted itinerary concept — IRCITE Top 4 and Best Execution-Ready Solution.",
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
        value: "IRCITE · Top 4 of 20 regional teams",
      },
      { label: "organized by", value: "PSITE-CL" },
      {
        label: "deliverable",
        value: "Best Execution-Ready Solution",
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
