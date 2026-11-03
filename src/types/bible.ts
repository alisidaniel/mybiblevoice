export type TranslationId = "KJV" | "WEB" | "ASV" | "BSB";

export interface Translation {
  id: TranslationId;
  name: string;
  license: "public-domain";
}

export interface VerseRef {
  id: string;
  reference: string; // "Psalm 46:10"
  text: string;
  translation: TranslationId;
  book: string;
  chapter: number;
  verse: number;
}

export interface BibleTopic {
  id: string;
  title: string;
  summary: string; // free tier — 2-3 sentences
  aliases: string[]; // search synonyms
  verseCount: number;
  relatedTopics: string[]; // topic ids
  verses: VerseRef[]; // free tier — 3-5 key verses
  gradientClass: string;
  icon: "flame" | "heart" | "shield" | "star" | "waves" | "crown";
}

export type StudyFocus = "context" | "connections" | "application" | "all";

export interface TopicStudyRequest {
  topicId: string;
  focus: StudyFocus;
  translation: TranslationId;
}

export interface TopicStudyResult {
  topicId: string;
  focus: StudyFocus;
  sections: {
    heading: string;
    body: string;
  }[];
  crossReferences: {
    reference: string;
    text: string;
  }[];
  generatedAt: string;
}