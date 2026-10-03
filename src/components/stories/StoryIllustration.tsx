// src/components/stories/StoryIllustration.tsx
import type { StoryIcon } from "../../types";

interface Props {
  id: string;
  icon: StoryIcon;
  className?: string;
}

const PALETTES: Record<string, [string, string]> = {
  s_storm: ["#2A2A2E", "#131316"],
  s_david: ["#3A3A3E", "#1C1C1F"],
  s_daniel: ["#4A4A4E", "#242427"],
  s_creation: ["#3E3E42", "#1A1A1D"],
  s_prodigal: ["#343438", "#17171A"],
  s_creation_fall: ["#2E2E32", "#151518"],
  s_esther: ["#3A3A3E", "#1C1C1F"],
  s_resurrection: ["#404044", "#1F1F22"],
};

export function StoryIllustration({ id, icon, className = "" }: Props) {
  const [from, to] = PALETTES[id] ?? ["#3A3A3E", "#1C1C1F"];
  const gradId = `grad-${id}`;

  return (
    <svg
      viewBox="0 0 320 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>

      <rect width="320" height="160" fill={`url(#${gradId})`} />
      <g fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1">
        {artFor(id)}
      </g>
      <g fill="rgba(255,255,255,0.22)">{accentFor(icon)}</g>
    </svg>
  );
}

// ─── per-story line art ────────────────────────────────────────────
function artFor(id: string) {
  switch (id) {
    case "s_storm":
      // rolling waves + small boat
      return (
        <>
          <path d="M-10 110 Q 40 90 90 110 T 190 110 T 290 110 T 390 110" />
          <path d="M-10 130 Q 40 115 90 130 T 190 130 T 290 130 T 390 130" />
          <path d="M120 105 L 155 105 L 148 118 L 127 118 Z" />
          <path d="M137 105 L 137 88 L 150 100" />
        </>
      );
    case "s_david":
      // mountains + small figure
      return (
        <>
          <path d="M0 140 L 60 90 L 110 130 L 180 70 L 250 120 L 320 80" />
          <path d="M0 145 H 320" />
          <circle cx="240" cy="60" r="4" />
          <path d="M240 64 V 78 M 234 70 L 246 70" />
        </>
      );
    case "s_daniel":
      // lion silhouette
      return (
        <>
          <path d="M0 140 H 320" />
          <circle cx="160" cy="90" r="26" />
          <path d="M140 90 L 130 82 L 140 78" />
          <path d="M180 90 L 190 82 L 180 78" />
          <path d="M150 106 V 120 M 170 106 V 120" />
          <path d="M160 96 Q 165 100 160 104" />
        </>
      );
    case "s_creation":
      // sun + tree
      return (
        <>
          <circle cx="80" cy="60" r="20" />
          <path d="M60 60 H 100 M 80 40 V 80 M 66 46 L 94 74 M 94 46 L 66 74" />
          <path d="M220 140 V 90" />
          <path d="M220 90 Q 190 80 200 60 Q 220 55 240 60 Q 250 80 220 90" />
        </>
      );
    case "s_prodigal":
      // embrace arc + smaller figure
      return (
        <>
          <path d="M100 120 Q 100 60 160 60 Q 220 60 220 120" />
          <circle cx="160" cy="80" r="10" />
          <path d="M160 90 V 120 M 148 100 L 172 100" />
          <path d="M40 140 H 280" />
        </>
      );
    case "s_creation_fall":
      // tree + serpent
      return (
        <>
          <path d="M160 140 V 60" />
          <path d="M160 60 Q 130 50 120 30 M 160 60 Q 190 50 200 30 M 160 80 Q 140 70 130 55 M 160 80 Q 180 70 190 55" />
          <path d="M180 40 Q 200 50 210 70 Q 200 90 220 100" />
        </>
      );
    case "s_esther":
      // crown
      return (
        <>
          <path d="M100 90 L 220 90 L 210 130 L 110 130 Z" />
          <path d="M100 90 L 120 60 L 145 80 L 160 50 L 175 80 L 200 60 L 220 90" />
          <circle cx="120" cy="58" r="3" />
          <circle cx="160" cy="48" r="3" />
          <circle cx="200" cy="58" r="3" />
        </>
      );
    case "s_resurrection":
      // empty tomb
      return (
        <>
          <path d="M60 140 L 60 70 Q 160 40 260 70 L 260 140 Z" />
          <path d="M120 140 L 120 90 Q 160 80 200 90 L 200 140 Z" />
          <circle cx="160" cy="112" r="6" />
        </>
      );
    default:
      return <path d="M0 140 H 320" />;
  }
}

function accentFor(icon: StoryIcon) {
  switch (icon) {
    case "waves":
      return (
        <>
          <circle cx="250" cy="40" r="8" opacity="0.4" />
        </>
      );
    case "star":
      return (
        <polygon points="260,30 264,40 275,42 266,49 269,60 260,54 251,60 254,49 245,42 256,40" />
      );
    case "shield":
      return (
        <path d="M40 30 L 60 38 V 55 C 60 68 50 76 40 80 C 30 76 20 68 20 55 V 38 Z" />
      );
    case "crown":
      return (
        <path d="M30 40 L 50 30 L 60 45 L 70 30 L 90 40 L 85 55 L 35 55 Z" opacity="0.5" />
      );
    case "flame":
      return (
        <path d="M50 60 C 40 50 42 35 50 25 C 52 35 58 40 60 50 C 62 42 58 32 62 25 C 72 38 70 55 60 65 Z" />
      );
    case "heart":
      return (
        <path d="M50 60 C 30 45 30 30 40 28 C 47 27 50 33 50 36 C 50 33 53 27 60 28 C 70 30 70 45 50 60 Z" />
      );
  }
}