"use client";

import React from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
      <div className="max-w-md space-y-4 p-6">
        <h2 className="text-2xl font-bold text-[#1f2b40]">
          Something went wrong!
        </h2>
        <p className="text-gray-600">
          We encountered an error while loading the course content. Please try again.
        </p>
        {error?.message && (
          <p className="text-sm text-gray-500">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#660afb] hover:bg-[#5508d9] text-white rounded-lg transition-colors duration-200 font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default Error;


