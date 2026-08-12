export type Achievement = {
  id: string;
  name: string;
  organizer: string;
  placement: string;
  year?: string;
  url?: string;
  note?: string;
};

export const achievements: Achievement[] = [
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
    placement: "Best Execution — Special Award · 4th place",
    year: "2026",
    url: "https://www.facebook.com/share/p/1DHz1mtpwj/",
    note: "DIWA — Digital Intelligent Wayfinding Assistant",
  },
];
