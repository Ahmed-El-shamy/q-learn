"use client";

import { useId, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSubmitNewsLetter } from "./_quires/useSubmitNewsLetter";
function isValidEmail(email: string) {
  // lightweight validation (مش RFC كامل، لكن عملي)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

const NewsLetter = () => {
  const formId = useId();
  const errorId = `${formId}-error`;

  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submitMutation = useSubmitNewsLetter();
  const isSubmitting = submitMutation.isPending;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const normalized = email.trim().toLowerCase();

    // client validation
    if (!normalized) {
      setLocalError("Email is required");
      inputRef.current?.focus();
      return;
    }
    if (!isValidEmail(normalized)) {
      setLocalError("Please enter a valid email");
      inputRef.current?.focus();
      return;
    }

    setLocalError(null);

    try {
      const data = await submitMutation.mutateAsync(normalized);
      toast.success(data?.message || "Subscribed successfully");
      setEmail(""); // reset
    } catch (err: any) {
      // حاول تقرأ رسالة من الباك لو موجودة
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to subscribe. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div>
      <p className="font-normal mb-2 lg:text-md">
        Subscribe to get our latest news!
      </p>

      <form
        onSubmit={onSubmit}
        aria-busy={isSubmitting}
        className="border flex w-full max-w-xl bg-white text-black font-normal"
      >
        <label htmlFor={formId} className="sr-only">
          Email address
        </label>

        <input
          ref={inputRef}
          id={formId}
          className="appearance-none flex-1 outline-none font-bold px-3 py-2 w-full"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            if (!email.trim()) return;
            if (!isValidEmail(email.trim()))
              setLocalError("Please enter a valid email");
            else setLocalError(null);
          }}
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(localError)}
          aria-describedby={localError ? errorId : undefined}
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="flex main-background justify-center cursor-pointer hover:bg-primary/90 duration-100 items-center px-3"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" color="white" />
          ) : (
            <Send color="white" />
          )}
          <span className="sr-only">Subscribe</span>
        </button>
      </form>

      {/* Error text for a11y */}
      {localError && (
        <p id={errorId} className="mt-2 text-sm text-red-600">
          {localError}
        </p>
      )}
    </div>
  );
};

export default NewsLetter;
