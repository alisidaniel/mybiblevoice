export const formatLongDate = (d: Date) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  
  export const formatShortDate = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  
  export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
  
  export const groupJournalByMonth = <T extends { date: string }>(items: T[]) => {
    const groups: Record<string, T[]> = {};
    for (const item of items) {
      const key = item.date.slice(0, 7); // YYYY-MM
      groups[key] = groups[key] ?? [];
      groups[key].push(item);
    }
    return Object.entries(groups).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  };