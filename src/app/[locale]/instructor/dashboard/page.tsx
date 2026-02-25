"use client";

import { useEffect, useState } from "react";
import StatCard from "@/app/[locale]/instructor/_components/StatCard";
import { load } from "../_utils/storage";
type Course = {
  id: string;
  title: string;
};

export default function Page() {
  const [coursesCount, setCoursesCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    const courses = load<Course[]>("courses", []);
    setCoursesCount(courses.length);

    // مؤقتًا (لحد ما نعمل backend)
    setStudentsCount(128);
  }, []);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Overview</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard title="Total Courses" value={coursesCount} />
        <StatCard title="Total Students" value={studentsCount} />
        <StatCard title="Instructor Rating" value={5} suffix=" ⭐" />
      </div>
    </div>
  );
}
