import React from "react";

interface ContactInputProps {
  type?: string;
  label: string;
}

const ContactInput = ({ type, label }: ContactInputProps) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id="name"
        placeholder=" "
        className="peer block w-full rounded-md border border-gray-300 px-8 py-5 focus:border-[#373737] outline-none"
      />
      <label
        htmlFor="name"
        className="absolute px-2 left-6 top-3 text-[#373737] transition-all duration-500 ease-in-out 
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-[#373737] peer-placeholder-shown:text-lg 
               peer-focus:-top-2 bg-white peer-focus:text-[#660afb] peer-focus:text-sm"
      >
        {label}
      </label>
    </div>
  );
};

export default ContactInput;
