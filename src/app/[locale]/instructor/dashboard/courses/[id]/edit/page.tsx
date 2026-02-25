"use client";

import Input from "@/app/[locale]/instructor/_components/form/Input";
import Select from "@/app/[locale]/instructor/_components/form/Select";
import Textarea from "@/app/[locale]/instructor/_components/form/Textarea";
import PageHeader from "@/app/[locale]/instructor/_components/PageHeader";
import { load, save } from "@/app/[locale]/instructor/_utils/storage";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  thumbnail: string;
  active: boolean;
  createdAt: string;
};

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const courses = load<Course[]>("courses", []);
    const existing = courses.find((c) => c.id === courseId);

    if (!existing) {
      router.push("/courses");
      return;
    }

    setCourse(existing);
  }, [courseId, router]);

  if (!course) {
    return <p className="text-gray-500">Loading...</p>;
  }

  function handleUpdate() {
    if (!course || !course.title || !course.description) {
      alert("Title and description are required");
      return;
    }

    const courses = load<Course[]>("courses", []);

    const updated = courses.map((c) => (c.id === course.id ? course : c));

    save("courses", updated);
    router.push("/courses");
  }

  return (
    <div>
      <PageHeader title="Edit Course" description="Update course information" />

      <div className="max-w-3xl p-6 space-y-6 bg-white shadow rounded-xl">
        <Input
          label="Course Title"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />

        <Textarea
          label="Description"
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Price ($)"
            type="number"
            value={course.price}
            onChange={(e) =>
              setCourse({
                ...course,
                price: Number(e.target.value),
              })
            }
          />

          <Select
            label="Level"
            value={course.level}
            onChange={(v) => setCourse({ ...course, level: v as any })}
            options={[
              { label: "Beginner", value: "beginner" },
              { label: "Intermediate", value: "intermediate" },
              { label: "Advanced", value: "advanced" },
            ]}
          />
        </div>

        <Input
          label="Category"
          value={course.category}
          onChange={(e) => setCourse({ ...course, category: e.target.value })}
        />

        <Input
          label="Thumbnail URL"
          value={course.thumbnail}
          onChange={(e) => setCourse({ ...course, thumbnail: e.target.value })}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={course.active}
            onChange={(e) => setCourse({ ...course, active: e.target.checked })}
          />
          <label className="text-sm">Course is active</label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            className="px-6 py-2 text-white bg-black rounded-lg"
          >
            Save Changes
          </button>

          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-2 border rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
