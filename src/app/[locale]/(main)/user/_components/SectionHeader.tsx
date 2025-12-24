type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export default function SectionHeader({ title, subtitle, right }: Props) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-neutral-900">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm md:text-base text-neutral-600">
            {subtitle}
          </p>
        )}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
