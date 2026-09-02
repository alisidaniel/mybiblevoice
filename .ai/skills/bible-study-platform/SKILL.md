# Bible Study Platform Skill

## Purpose

Use this skill when implementing functionality related to Bible studies,
Bible stories, personalized recommendations, onboarding, progress,
study groups, reminders or Bible content.

## Domain model

The core domain relationship is:

Bible
→ Books
→ Passages
→ Stories
→ Characters
→ Themes
→ Study Plans
→ Study Days
→ User Progress

Do not design features that bypass this model without a good reason.

## Main entities

### User

A user has:

- profile
- Bible experience level
- interests
- preferred study duration
- study frequency
- reminder preferences
- study history

### BibleStory

Represents a biblical story.

Example:

Joseph

Associated data:

characters:
- Joseph
- Jacob
- Pharaoh

themes:
- faithfulness
- forgiveness
- God's providence

passages:
- Genesis 37
- Genesis 39
- Genesis 40
- Genesis 41
- Genesis 42-50

### BibleCharacter

Examples:

- Abraham
- Joseph
- Moses
- Ruth
- David
- Esther
- Daniel
- Peter
- Paul

Characters may belong to multiple stories and themes.

### BibleTopic

Examples:

- Faith
- Marriage
- Forgiveness
- Prayer
- Leadership
- Anxiety
- Purpose
- Parenting
- Temptation

### StudyPlan

A StudyPlan contains multiple StudyDays.

Example:

{
  title: "Joseph: Trusting God Through Difficult Seasons",
  difficulty: "BEGINNER",
  audience: "INDIVIDUAL",
  durationDays: 7
}

### StudyDay

A study day contains:

{
  title,
  passages,
  summary,
  keyVerses,
  reflectionQuestions,
  discussionQuestions,
  prayerPrompt,
  takeaway
}

## Recommendation system

Recommendations must initially be deterministic.

Score recommendations using:

topic match
character match
audience match
experience level
previous study history

Do not introduce machine learning before deterministic recommendations
have been implemented and measured.

Suggested weighting:

topic = 40%
character = 20%
audience = 20%
difficulty = 10%
history = 10%

## User onboarding

Collect:

study type:
- individual
- couple
- family
- new believer
- group

experience:
- beginner
- intermediate
- advanced

topics

Bible characters

preferred study duration

study frequency

reminder time

timezone

Users must be able to modify preferences later.

## Study experience

A study screen should prioritize this order:

1. Study title
2. Scripture reading
3. Summary
4. Key lessons
5. Reflection
6. Discussion
7. Prayer
8. Notes
9. Complete study

## Couple/group study

Groups contain users.

A StudyGroup should support:

- owner
- members
- current study plan
- shared progress
- shared discussion
- private notes

Never expose private notes to other group members.

## Progress

Track:

study days completed
study plans completed
current streak
Bible stories completed
characters studied
Bible books encountered
passages read

Do not calculate progress entirely on the frontend.

The backend should eventually be the authoritative source.

## AI usage

AI can produce:

- study summaries
- simple explanations
- reflection questions
- discussion questions
- prayer prompts
- recommendations

AI must NOT be treated as the authoritative Bible source.

Never display AI-generated Bible verse text without retrieving/verifying
the corresponding reference from the Bible provider.

Prefer structured AI output.

Example:

{
  "summary": "",
  "lessons": [],
  "reflectionQuestions": [],
  "discussionQuestions": [],
  "prayerPrompt": "",
  "relatedPassages": []
}

## Feature implementation process

When asked to build a feature:

1. Identify the feature domain.
2. Define TypeScript domain types.
3. Define API/service boundaries.
4. Build hooks.
5. Build UI components.
6. Add loading/empty/error states.
7. Add validation.
8. Add tests.
9. Verify responsive behavior.