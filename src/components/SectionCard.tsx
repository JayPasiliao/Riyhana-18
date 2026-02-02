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
        card-glass card-group-curved-frame p-6 sm:p-8 relative
        ${className}
      `}
    >
      {title && (
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-gray-800 mb-6 pb-3 section-title-underline w-fit">
          {title}
        </h2>
      )}
      {children}
    </article>
  );
}
