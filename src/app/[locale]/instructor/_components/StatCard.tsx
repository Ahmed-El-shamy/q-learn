"use client";

import { useEffect, useState } from "react";

type Props = {
  title: string;
  value: number;
  suffix?: string;
};

export default function StatCard({ title, value, suffix }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const stepTime = 16;
    const increment = value / (duration / stepTime);

    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <p className="mb-2 text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold">
        {count}
        {suffix}
      </p>
    </div>
  );
}
