import { useTranslations } from "next-intl";

type Props = { value: number }; // 0..100

export default function ProgressBar({ value }: Props) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const t = useTranslations();
  return (
    <div className="w-full">
      <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className="h-full rounded-full main-background transition-[width] duration-300"
          style={{ width: `${v}%` }}
          aria-label={`Progress ${v}%`}
          role="progressbar"
          aria-valuenow={v}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <p className="mt-2 text-xs text-neutral-600">{v}% {t("completed")}</p>
    </div>
  );
}