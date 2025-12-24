import React from "react";

type Props = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  title,
  description,
  action,
  children,
  className,
}: Props) {
  return (
    <section
      className={[
        "rounded-2xl border border-neutral-200/70 bg-white shadow-sm",
        "p-4 md:p-5",
        className ?? "",
      ].join(" ")}
    >
      {(title || description || action) && (
        <header className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            {title && (
              <h2 className="text-base md:text-lg font-semibold text-neutral-900">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-neutral-600">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
