export interface TourStep {
    id: string;
    target: string; // matches [data-tour="..."]
    title: string;
    body: string;
    placement?: "top" | "bottom" | "left" | "right";
    optional?: boolean; // skip if target missing
  }
  
  export const tourSteps: TourStep[] = [
    {
      id: "welcome",
      target: "verse-card",
      title: "Your verse of the day",
      body:
        "Every morning you'll get a verse chosen from your topics and reading history. Tap Listen to hear it read aloud.",
      placement: "bottom",
    },
    {
      id: "why",
      target: "why-card",
      title: "Why this verse?",
      body:
        "The AI explains its reasoning. You always know why you're seeing what you're seeing.",
      placement: "bottom",
    },
    {
      id: "ask-ai",
      target: "ask-ai",
      title: "Ask anything",
      body:
        "Tap here to open a chat about today's verse — context, meaning, or how to apply it.",
      placement: "top",
    },
    {
      id: "streak",
      target: "streak-card",
      title: "Your streak",
      body:
        "Show up daily and your streak grows. Miss a day and a freeze saves you — you start with one.",
      placement: "left",
      optional: true,
    },
    {
      id: "sidebar",
      target: "sidebar-nav",
      title: "Your library",
      body:
        "Jump between Today, Reading Plans, Saved, Stories, and Journal from here.",
      placement: "right",
      optional: true,
    },
    {
      id: "community",
      target: "community-picks",
      title: "Community",
      body:
        "See what others are reading. Add your own reflection anytime.",
      placement: "left",
      optional: true,
    },
  ];