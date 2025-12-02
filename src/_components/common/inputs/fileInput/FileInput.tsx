"use client";
import { Asterisk } from "lucide-react";
import React, { useId, useRef, useState } from "react";

interface FileInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  multiple?: boolean;
  required?: boolean;
  accept?: string;
  onFileChange?: (files: FileList | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  placeholder = "Select a file",
  hint,
  error,
  Icon,
  multiple = false,
  required = false,
  disabled = false,
  readOnly = false,
  accept = "*",
  onFileChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = id || autoId;

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleClick = () => {
    if (!disabled && !readOnly) inputRef.current?.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    onFileChange?.(e.target.files);
  };

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedFiles(null);
    onFileChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="flex mb-1 font-medium">
          {label}
          {required && (
            <span>
              <Asterisk className="text-red-500 ml-1" size={15} />
            </span>
          )}
        </label>
      )}

      <div
        onClick={handleClick}
        className={`
        relative flex items-center justify-between gap-2 rounded-lg w-full p-3 bg-gray-50
        ${
          disabled || readOnly
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }
        error
                ? "ring-2 ring-red-500"
                : "focus-within:ring-2 ring-gray-400"
        `}
      >
        {Icon && (
          <Icon
            className="absolute left-2 text-gray-400"
            width={20}
            hanging={20}
          />
        )}

        <span className={`flex-1 truncate ${Icon ? "pl-8" : ""} text-gray-600`}>
          {selectedFiles
            ? multiple
              ? `${selectedFiles.length} file(s) selected`
              : selectedFiles[0].name ?? placeholder
            : placeholder}
        </span>

        {selectedFiles && (
          <button
            type="button"
            onClick={handleRemoveFile}
            className="ml-2 text-red-500 text-xs hover:underline"
          >
            Remove
          </button>
        )}

        <input
          id={inputId}
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          accept={accept}
          onChange={handleChangeFile}
        />
      </div>

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
};

export default FileInput;
