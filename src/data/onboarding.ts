export const contentTypes = [
    { id: "verse", label: "Scripture Verse", icon: "book" },
    { id: "story", label: "Bible Story", icon: "library" },
    { id: "devotional", label: "Devotional Reflection", icon: "journal" },
    { id: "prayer", label: "Prayer Prompt", icon: "heart" },
    { id: "audio", label: "Audio Reading", icon: "play" },
    { id: "study", label: "Study Notes & Context", icon: "library" },
  ] as const;
  
  export const translations = [
    "ESV",
    "NIV",
    "KJV",
    "NLT",
    "MSG",
    "NASB",
    "AMP",
    "CSB",
  ] as const;