import React, { useEffect, useState } from "react";
import MainSelect from "../main-select-input/MainSelect";
import MainInput from "../mainInput/MainInput";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

interface CountryOption {
  id: number;
  name: string;
  code: string;
}

const options: CountryOption[] = [
  { id: 1, name: "Egypt", code: "+20" },
  { id: 2, name: "Saudi Arabia", code: "+966" },
  { id: 3, name: "UAE", code: "+971" },
  { id: 4, name: "United States", code: "+1" },
];

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, placeholder, required = false, error, ...rest }, ref) => {
    const [selectValue, setSelectValue] = useState<CountryOption | null>(options[0]);

    return (
      <>
        <div className="flex gap-5">
          <MainSelect
            className="flex-1"
            placeholder="Select a country"
            options={options.map((o) => ({
              id: o.id,
              name: `${o.name} (${o.code})`,
            }))}
            value={selectValue?.id || null}
            onChange={(id) => {
              const country = options.find((o) => o.id === id) || null;
              setSelectValue(country);
            }}
          />

          <MainInput
            className="flex-2"
            label={label}
            placeholder={placeholder}
            required={required}
            value={rest.value || ""}
            onChange={rest.onChange}
            onBlur={rest.onBlur}
            error={error}
          />
        </div>
      </>
    );
  }
);

export default PhoneInput;
