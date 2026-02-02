"use client";

export type EntourageRole = "parents" | "roses" | "candles" | "envelopes";

interface EntourageCardProps {
  name: string;
  number?: number;
  role: EntourageRole;
  index: number;
  /** For parents: 0 = first (e.g. father), 1 = second (e.g. mother) */
  parentIndex?: number;
  /** When set, cards in the same designation animate together (same delay) */
  animationGroupDelay?: number;
}

const roleAccent: Record<EntourageRole, string> = {
  parents:
    "border border-warm-taupe/40 bg-ivory/95 shadow-soft hover:border-warm-taupe/60 hover:shadow-glow",
  roses:
    "border border-warm-taupe/40 bg-ivory/95 shadow-soft hover:border-blush-peach/50 hover:shadow-glow",
  candles:
    "border border-warm-taupe/40 bg-ivory/95 shadow-soft hover:border-peach-tan/50 hover:shadow-glow",
  envelopes:
    "border border-warm-taupe/40 bg-ivory/95 shadow-soft hover:border-peach-tan/50 hover:shadow-glow",
};

const roleBadgeBg: Record<EntourageRole, string> = {
  parents: "bg-warm-taupe/20 text-warm-taupe border border-warm-taupe/40",
  roses: "bg-blush-peach/25 text-warm-taupe border border-warm-taupe/40",
  candles: "bg-peach-tan/25 text-warm-taupe border border-warm-taupe/40",
  envelopes: "bg-soft-nude-beige/50 text-warm-taupe border border-warm-taupe/40",
};

const roleIconColor: Record<EntourageRole, string> = {
  parents: "text-warm-taupe",
  roses: "text-blush-peach",
  candles: "text-peach-tan",
  envelopes: "text-warm-taupe",
};

function IconMale({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="14" r="5.5" />
      <path d="M15 3h5v5M17.5 0.5l3 3-3 3" />
    </svg>
  );
}

function IconFemale({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="9" r="5" />
      <path d="M12 14v6M9 17h6" />
    </svg>
  );
}

function IconEnvelope({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function RoleIcon({ role, parentIndex }: { role: EntourageRole; parentIndex?: number }) {
  const iconClass = "w-10 h-10 sm:w-12 sm:h-12 shrink-0";
  if (role === "parents") {
    return parentIndex === 0 ? (
      <IconMale className={`${iconClass} ${roleIconColor.parents}`} />
    ) : (
      <IconFemale className={`${iconClass} ${roleIconColor.parents}`} />
    );
  }
  if (role === "roses") return <IconMale className={`${iconClass} ${roleIconColor.roses}`} />;
  if (role === "candles") return <IconFemale className={`${iconClass} ${roleIconColor.candles}`} />;
  return <IconEnvelope className={`${iconClass} ${roleIconColor.envelopes}`} />;
}

export default function EntourageCard({ name, number, role, index, parentIndex, animationGroupDelay }: EntourageCardProps) {
  const delayMs = animationGroupDelay !== undefined ? animationGroupDelay : index * 30;
  return (
    <article
      className={`
        entourage-card group relative rounded-2xl border px-6 py-6 sm:px-8 sm:py-7
        min-h-[140px] sm:min-h-[160px] h-full flex flex-col
        transition-all duration-300 ease-out
        focus-within:outline-none focus-within:ring-2 focus-within:ring-warm-taupe/50 focus-within:ring-offset-2
        ${roleAccent[role]}
      `}
      style={{ animationDelay: `${delayMs}ms` }}
      tabIndex={0}
    >
      {number != null && (
        <span
          className={`
            absolute top-4 right-4 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full
            text-base font-semibold tabular-nums
            ${roleBadgeBg[role]}
          `}
          aria-hidden
        >
          {number}
        </span>
      )}
      <div className="flex items-start gap-4 pr-14">
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/20 shadow-inner border border-white/25">
          <RoleIcon role={role} parentIndex={parentIndex} />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="font-serif text-lg sm:text-xl font-medium text-white leading-snug">
            {name}
          </p>
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-white/75">
            {role === "parents" ? "Parent" : role === "roses" ? "Rose" : role === "candles" ? "Candle" : "Envelope"}
          </p>
        </div>
      </div>
    </article>
  );
}
