import { InputHTMLAttributes } from "react";

interface ContactTextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const ContactTextarea = ({ label, error, ...rest }: ContactTextareaProps) => {
  return (
    <div className="relative w-full">
      <textarea
        placeholder=" "
        rows={4}
        className="peer block w-full rounded-md border px-8 py-5 border-gray-300 focus:border-[#373737] outline-none"
        {...rest}
      />

      <label
        className="
          absolute px-2 left-6 top-4 text-lg text-[#373737] bg-white
          transition-all duration-500

          peer-focus:-top-2
          peer-focus:text-sm
          peer-focus:text-[#660afb]

          peer-not-placeholder-shown:-top-2
          peer-not-placeholder-shown:text-sm
          peer-not-placeholder-shown:text-[#660afb]
        "
      >
        {label}
      </label>
    </div>
  );
};

export default ContactTextarea;
