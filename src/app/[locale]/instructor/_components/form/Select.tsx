type Option = { label: string; value: string };

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
};

export default function Select({ label, options, value, onChange }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white border rounded-lg"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
