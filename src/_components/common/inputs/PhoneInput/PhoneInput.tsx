import React, { useEffect, useState } from "react";
import MainSelect from "../main-select-input/MainSelect";
import MainInput from "../mainInput/MainInput";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  ({ label, placeholder, required = false, onChange, ...rest }, ref) => {
    const [phone, setPhone] = useState("");
    const [selectValue, setSelectValue] = useState<CountryOption | null>(null);
    const [error, setError] = useState("");

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;

      if (/\D/.test(val)) {
        setError("This field accepts numbers only");
        return;
      }

      if (val.length > 11) {
        setError("Phone number cannot exceed 11 digits");
        setPhone(val.slice(0, 11));
        return;
      } else {
        setError("");
      }

      setPhone(val);
      onChange?.(e);
    };

    const handleBlur = () => {
      if (required && phone.length < 11) {
        setError("Phone number must be 11 digits");
      }
    };

    return (
      <>
        <div className="flex gap-2">
          <MainSelect
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
            label={label}
            placeholder={placeholder}
            required={required}
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            inputMode="numeric"
            pattern="\d*"
            error={error || undefined}
          />
        </div>
      </>
    );
  }
);

export default PhoneInput;
