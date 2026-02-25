"use client";

import { useState } from "react";
import { load, save } from "@/app/[locale]/instructor/_utils/storage";
import PageHeader from "@/app/[locale]/instructor/_components/PageHeader";
import Input from "@/app/[locale]/instructor/_components/form/Input";
import Textarea from "@/app/[locale]/instructor/_components/form/Textarea";
import Select from "@/app/[locale]/instructor/_components/form/Select";
import { useRouter } from "@/i18n/navigation";

export default function AddCoursePage() {
  const router = useRouter();
  const id = crypto.randomUUID();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: 0,
    level: "beginner",
    category: "",
    thumbnail: "",
    active: true,
  });

  function handleSubmit() {
    if (!course.title || !course.description) {
      alert("Title and description are required");
      return;
    }

    const courses = load<any[]>("courses", []);

    save("courses", [
      ...courses,
      {
        ...course,
        id,
        createdAt: new Date().toISOString(),
      },
    ]);

    router.push("/instructor/dashboard/courses");
  }

  return (
    <div>
      <PageHeader
        title="Add Course"
        description="Create a new course and start selling it"
      />

      <div className="max-w-3xl p-6 space-y-6 bg-white shadow rounded-xl">
        <Input
          label="Course Title"
          placeholder="React for Beginners"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />

        <Textarea
          label="Description"
          placeholder="What students will learn..."
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
              setCourse({ ...course, price: Number(e.target.value) })
            }
          />

          <Select
            label="Level"
            value={course.level}
            onChange={(v) => setCourse({ ...course, level: v })}
            options={[
              { label: "Beginner", value: "beginner" },
              { label: "Intermediate", value: "intermediate" },
              { label: "Advanced", value: "advanced" },
            ]}
          />
        </div>

        <Input
          label="Category"
          placeholder="Web Development"
          value={course.category}
          onChange={(e) => setCourse({ ...course, category: e.target.value })}
        />

        <Input
          label="Thumbnail URL"
          placeholder="https://image.com/course.jpg"
          value={course.thumbnail}
          onChange={(e) => setCourse({ ...course, thumbnail: e.target.value })}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={course.active}
            onChange={(e) => setCourse({ ...course, active: e.target.checked })}
          />
          <label className="text-sm">Publish course immediately</label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 text-white bg-black rounded-lg"
          >
            Create Course
          </button>

          <button
            onClick={() => router.back()}
            className="px-6 py-2 border rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
