"use client";
import { Asterisk, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useId, useState } from "react";

interface MainInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  required?: boolean;
  storageKey?: string;
  hint?: string;
  showPasswordToggle?: boolean;
  loading?: boolean;
  enableAutoComplete?: boolean;
}

const MainInput = React.forwardRef<HTMLInputElement, MainInputProps>(
  (
    {
      id,
      name,
      label,
      type = "text",
      value: controlledValue,
      placeholder,
      error,
      Icon,
      storageKey,
      disabled = false,
      required = false,
      readOnly = false,
      hint,
      enableAutoComplete = false,
      showPasswordToggle = true,
      loading = false,
      className,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;
    const t = useTranslations();

    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    // Use internal state only for uncontrolled mode (when value prop is not provided)
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Get the current value based on controlled/uncontrolled mode
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    // Load autocomplete suggestions from localStorage
    useEffect(() => {
      if (enableAutoComplete && storageKey) {
        const stored = localStorage.getItem(storageKey);
        if (stored) setSuggestions(JSON.parse(stored));
      }
    }, [enableAutoComplete, storageKey]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only update internal state if uncontrolled
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      // Always call the provided onChange (from react-hook-form or parent)
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (enableAutoComplete && storageKey && e.target.value) {
        const updated = Array.from(
          new Set([e.target.value, ...suggestions])
        ).slice(0, 10);
        setSuggestions(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      // Always call the provided onBlur (from react-hook-form or parent)
      onBlur?.(e);
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label htmlFor={inputId} className="flex font-medium mb-1">
            {t(label)}{" "}
            {required && (
              <span>
                <Asterisk className="text-red-500 ml-1" size={12} />
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {Icon && <Icon className="absolute start-0" width={18} height={18} />}

          <input
            id={inputId}
            ref={ref}
            name={name}
            type={isPassword && showPassword ? "text" : type}
            {...(isControlled
              ? { value: currentValue }
              : { defaultValue: currentValue })}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={
              placeholder && required
                ? `${t(placeholder) || ""} *`
                : t(placeholder || "")
            }
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            list={enableAutoComplete ? `${inputId}-list` : undefined}
            className={`
              flex-1 text-sm mt-1 outline-none border-b border-b-[#d1d1d1]  placeholder:text-[#373737] 
              ${label ? "py-0" : "py-3"}
              ${disabled || readOnly ? "opacity-50 cursor-not-allowed" : ""}
              ${error ? " border-b-red-500" : "border-b-[#d1d1d1]"}
              ${Icon ? "ps-8" : ""} 
              ${isPassword && showPasswordToggle ? "pe-8" : ""}
              ${className || ""}
            `}
            {...rest}
          />

          {/* Password toggle Icon */}
          {isPassword && showPasswordToggle && (
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute end-2 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          )}
        </div>

        {/* AutoComplete Suggestions */}
        {enableAutoComplete && suggestions.length > 0 && (
          <datalist id={`${inputId}-list`}>
            {suggestions.map((s, i) => (
              <option key={i} value={s} />
            ))}
          </datalist>
        )}

        {/* Error and hint message */}
        <div
          className={`
            transition-all duration-300 ease-in-out overflow-hidden ${
              error
                ? "max-h-10 opacity-100 mt-1"
                : hint
                ? "max-h-10 opacity-100"
                : "max-h-0"
            }    
        `}
        >
          {error && (
            <p
              id={`${inputId}-error`}
              role="alert"
              className="text-red-500 text-xs"
            >
              {t(error)}
            </p>
          )}
          {!error && hint && (
            <p id={`${inputId}-hint`} className="text-[#d1d1d1] text-xs mt-1">
              {hint}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default MainInput;
