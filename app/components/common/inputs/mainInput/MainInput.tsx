"use client";
import { Asterisk, Eye, EyeOff, LucideIcon } from "lucide-react";
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
      value,
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

    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    const [localValue, setLocalValue] = useState(value ?? "");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Sunc localValue if parent controlled
    useEffect(() => {
      if (value !== undefined) setLocalValue(value);
    }, [value]);

    // Load autocomplete suggestions from localStorage
    useEffect(() => {
      if (enableAutoComplete && storageKey) {
        const stored = localStorage.getItem(storageKey);
        if (stored) setSuggestions(JSON.parse(stored));
      }
    }, [enableAutoComplete, storageKey]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (enableAutoComplete && storageKey && localValue) {
        const updated = Array.from(
          new Set([localValue as string, ...suggestions])
        ).slice(0, 10);
        setSuggestions(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      onBlur?.(e);
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label htmlFor={inputId} className="block mb-1 font-medium">
            {label}{" "}
            {required && (
              <span>
                <Asterisk className="text-red-500 ml-1" />
              </span>
            )}
          </label>
        )}

        <div
          className={`
            relative flex items-center gap-2 rounded-lg w-full px-3 py-2 bg-gray-50
            ${disabled || readOnly ? "opacity-50 cursor-not-allowed" : ""}
            ${
              error
                ? "ring-2 ring-red-500"
                : "focus-within:ring-2 ring-gray-400"
            }
        `}
        >
          {Icon && (
            <Icon
              className="absolute left-2 text-gray-400"
              width={20}
              hanging={20}
            />
          )}
          <input
            id={inputId}
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                ? `{${inputId}-hent}`
                : undefined
            }
            list={enableAutoComplete ? `${inputId}-list` : undefined}
            className={`
                flex-1 bg-transparent outline-none border-none placeholder-gray-400 ${className} ${
              Icon ? "pl-8" : ""
            }
            `}
            {...rest}
          />

          {/* Password toggle Icon */}
          {isPassword && showPasswordToggle && (
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
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
              {error}
            </p>
          )}
          {!error && hint && (
            <p id={`${inputId}-hint`} className="text-gray-500 text-xs mt-1">
              {hint}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default MainInput;
