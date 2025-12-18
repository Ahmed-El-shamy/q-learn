/* eslint-disable react/display-name */
"use client";

import { Asterisk } from "lucide-react";
import React, { useEffect, useId, useState } from "react";

interface MainTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  storageKey?: string;
  hint?: string;
  loading?: boolean;
  enableAutoComplete?: boolean;
}

const MainTextArea = React.forwardRef<HTMLTextAreaElement, MainTextAreaProps>(
  (
    {
      id,
      name,
      label,
      value: controlledValue,
      placeholder,
      error,
      storageKey,
      disabled = false,
      required = false,
      readOnly = false,
      hint,
      enableAutoComplete = false,
      loading = false,
      className,
      onChange,
      onBlur,
      rows = 4,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;

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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Only update internal state if uncontrolled
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      // Always call the provided onChange (from react-hook-form or parent)
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (enableAutoComplete && storageKey && e.target.value) {
        const updated = Array.from(new Set([e.target.value, ...suggestions])).slice(
          0,
          10
        );
        setSuggestions(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      // Always call the provided onBlur (from react-hook-form or parent)
      onBlur?.(e);
    };

    return (
      <div className={`w-full ${className || ""}`}>
        {label && (
          <label htmlFor={inputId} className="flex font-medium mb-1">
            {label}{" "}
            {required && (
              <span>
                <Asterisk className="text-red-500 ml-1" size={12} />
              </span>
            )}
          </label>
        )}

        <div className="relative w-full">
          <textarea
            id={inputId}
            ref={ref}
            name={name}
            rows={rows}
            {...(isControlled
              ? { value: currentValue }
              : { defaultValue: currentValue })}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={
              placeholder && required ? `${placeholder || ""} *` : placeholder
            }
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            className={`
              mt-1 w-full text-sm outline-none border-b border-b-[#d1d1d1] placeholder:text-[#373737]
              resize-none
              max-h-[72px] overflow-y-auto
              ${disabled || readOnly ? "opacity-50 cursor-not-allowed" : ""}
              ${error ? " border-b-red-500" : "border-b-[#d1d1d1]"}
              ${className || ""}
            `}
            {...rest}
          />
        </div>

        {/* AutoComplete Suggestions (used via datalist-like pattern if needed) */}
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
            <p id={`${inputId}-hint`} className="text-[#d1d1d1] text-xs mt-1">
              {hint}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default MainTextArea;




