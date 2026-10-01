export interface PlanDay {
    day: number;
    title: string;
    reference: string;
    verse: string;
    reflection: string;
  }
  
  export interface ReadingPlan {
    id: string;
    title: string;
    subtitle: string;
    durationDays: number;
    theme: string;
    gradientClass: string;
    days: PlanDay[];
  }
  
  function day(
    dayNum: number,
    title: string,
    reference: string,
    verse: string,
    reflection: string
  ): PlanDay {
    return { day: dayNum, title, reference, verse, reflection };
  }
  
  export const readingPlans: ReadingPlan[] = [
    {
      id: "p_stillness_7",
      title: "7 Days of Stillness",
      subtitle: "Learning to quiet the noise and hear God",
      durationDays: 7,
      theme: "peace",
      gradientClass: "from-[#2A2A2E] to-[#131316]",
      days: [
        day(1, "Be Still", "Psalm 46:10", "Be still, and know that I am God.", "Stillness is a posture, not a feeling. Begin by physically stopping."),
        day(2, "Cease Striving", "Exodus 14:14", "The Lord will fight for you; you need only to be still.", "Where are you fighting a battle God has already claimed?"),
        day(3, "Wait in Hope", "Lamentations 3:25-26", "The Lord is good to those who wait for him.", "Waiting is not passive — it's active trust."),
        day(4, "Quiet the Soul", "Psalm 131:2", "I have calmed and quieted my soul.", "A weaned child doesn't strive. That's the image."),
        day(5, "Rest in Him", "Matthew 11:28", "Come to me, all who labor and are heavy laden, and I will give you rest.", "Rest is a gift offered, not a state earned."),
        day(6, "Listen", "1 Kings 19:12", "And after the fire, a still small voice.", "God rarely shouts. Slow down enough to hear the whisper."),
        day(7, "Know", "John 17:3", "And this is eternal life, that they know you.", "Stillness ends in knowing — deeper than information."),
      ],
    },
    {
      id: "p_trust_7",
      title: "7 Days of Trust",
      subtitle: "Releasing what you cannot control",
      durationDays: 7,
      theme: "faith",
      gradientClass: "from-[#3A3A3E] to-[#1C1C1F]",
      days: [
        day(1, "Trust His Heart", "Proverbs 3:5-6", "Trust in the Lord with all your heart, and do not lean on your own understanding.", "Trust is a decision before it's a feeling."),
        day(2, "Lean Not", "Psalm 20:7", "Some trust in chariots and some in horses, but we trust in the name of the Lord.", "What are your 'chariots'?"),
        day(3, "Cast Anxiety", "1 Peter 5:7", "Cast all your anxiety on him because he cares for you.", "Casting is an action verb. Do it today."),
        day(4, "Fear Not", "Isaiah 41:10", "Fear not, for I am with you.", "The antidote to fear is presence — His presence."),
        day(5, "In the Dark", "Psalm 23:4", "Even though I walk through the valley of the shadow of death, I will fear no evil.", "The Shepherd doesn't remove the valley — He walks through it."),
        day(6, "Hold Fast", "Hebrews 10:23", "Let us hold fast the confession of our hope without wavering, for he who promised is faithful.", "The anchor is His faithfulness, not yours."),
        day(7, "Rest", "Matthew 6:34", "Therefore do not be anxious about tomorrow.", "Tomorrow has its own Shepherd. You have today's."),
      ],
    },
    {
      id: "p_grace_30",
      title: "30 Days of Grace",
      subtitle: "A month in the unearned love of God",
      durationDays: 30,
      theme: "grace",
      gradientClass: "from-[#404044] to-[#1F1F22]",
      days: Array.from({ length: 30 }, (_, i) =>
        day(
          i + 1,
          `Day ${i + 1}`,
          "Romans 5:20",
          "Where sin increased, grace abounded all the more.",
          "Grace is not a doctrine to master but a person to trust."
        )
      ),
    },
  ];