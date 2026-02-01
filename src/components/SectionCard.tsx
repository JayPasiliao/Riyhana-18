"use client";

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionCard({
  title,
  children,
  className = "",
  id,
}: SectionCardProps) {
  return (
    <article
      id={id}
      className={`
        rounded-2xl border border-gold/30 bg-white/80 backdrop-blur-sm
        shadow-soft p-6 sm:p-8
        transition-all duration-300 hover:scale-[1.01] hover:shadow-glow hover:border-gold/50
        ${className}
      `}
    >
      {title && (
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-gray-800 mb-6 border-b border-gold/20 pb-3">
          {title}
        </h2>
      )}
      {children}
    </article>
  );
}
