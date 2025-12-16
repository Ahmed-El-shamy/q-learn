import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  cta?: { label: string; href: string };
};

export default function EmptyState({ title, description, cta }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center">
      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-neutral-600">{description}</p>
      )}
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex mt-4 items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
