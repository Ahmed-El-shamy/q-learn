import { Link } from "@/i18n/navigation";

type PageHeaderProps = {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function PageHeader({
  title,
  description,
  ctaLabel,
  ctaHref,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && <p className="mt-1 text-gray-500">{description}</p>}
      </div>

      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
