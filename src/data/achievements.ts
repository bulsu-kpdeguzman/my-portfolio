export type Achievement = {
  id: string;
  name: string;
  organizer: string;
  placement: string;
  year?: string;
  url?: string;
  note?: string;
  recent?: boolean;
};

export const achievements: Achievement[] = [
  {
    id: "a0",
    name: "GCash ImaGnation",
    organizer: "GCash",
    placement: "4th Runner-Up of 366 teams nationwide",
    year: "2026",
    note: "Led development of the functional system prototype",
    recent: true,
  },
  {
    id: "a1",
    name: "eGov PH Hackathon",
    organizer: "DICT",
    placement: "Top 30 Finalist",
    year: "2026",
    url: "https://www.facebook.com/share/p/1CsUQw1mGm/",
    note: "eSkolar — a unified scholarship platform",
  },
  {
    id: "a2",
    name: "IT Marketing Challenge",
    organizer: "IRCITE",
    placement: "Top 4 of 20 regional teams · Best Execution-Ready Solution",
    year: "2026",
    url: "https://www.facebook.com/share/p/1DHz1mtpwj/",
    note: "Coordinated development and project direction for an AI-assisted itinerary planner",
  },
];
