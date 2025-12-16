import Card from "./Card";

type Props = {
  label: string;
  value: string;
  hint?: string;
};

export default function StatCard({ label, value, hint }: Props) {
  return (
    <Card className="p-4">
      <p className="text-sm text-neutral-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-neutral-900">{value}</p>
      {hint && <p className="mt-2 text-xs text-neutral-500">{hint}</p>}
    </Card>
  );
}
