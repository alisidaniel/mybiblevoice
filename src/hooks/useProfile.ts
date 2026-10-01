import { useApp } from "../context/AppContext";

export function useProfile() {
  const {
    user,
    topics,
    preferences,
    savedVerses,
    journal,
    toggleTopic,
    addTopic,
    completeOnboarding,
  } = useApp();

  const stats = {
    saved: savedVerses.length,
    journal: journal.length,
    streak: user.streak,
    topics: topics.filter((t) => t.active).length,
  };

  return {
    user,
    topics,
    preferences,
    stats,
    toggleTopic,
    addTopic,
    updatePreferences: completeOnboarding,
  };
}