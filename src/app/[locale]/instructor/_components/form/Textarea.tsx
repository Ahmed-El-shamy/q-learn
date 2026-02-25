type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export default function Textarea({ label, ...props }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <textarea
        {...props}
        className="w-full border rounded-lg px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
