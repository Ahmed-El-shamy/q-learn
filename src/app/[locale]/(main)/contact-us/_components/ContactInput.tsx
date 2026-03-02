import { InputHTMLAttributes } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("contact");
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
          absolute px-2 start-6 top-4 text-lg text-[#373737] bg-[#faf5ff]
          transition-all duration-150

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

      {error && <p className="mt-1 text-sm text-red-500 text-start">{t(error)}</p>}
    </div>
  );
};

export default ContactInput;
