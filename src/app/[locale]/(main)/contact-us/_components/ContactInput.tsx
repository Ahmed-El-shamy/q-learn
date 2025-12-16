import { InputHTMLAttributes } from "react";

interface ContactInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label: string;
  error?: string;
}

const ContactInput = ({
  type = "text",
  label,
  error,
  ...rest
}: ContactInputProps) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder=" "
        autoComplete="on"
        className={`
          peer block w-full rounded-md border px-8 py-5 focus:border-[#373737] outline-none
          ${error ? "border-red-500" : "border-gray-300"}
          `}
        {...rest}
      />

      <label
        className="
          absolute px-2 left-6 top-4 text-lg text-[#373737] bg-[#faf5ff]
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

      {error && <p className="mt-1 text-sm text-red-500 text-left">{error}</p>}
    </div>
  );
};

export default ContactInput;
