"use client";

import { useEffect, useState } from "react";
import DataTable from "@/app/[locale]/instructor/_components/DataTable";
import PageHeader from "@/app/[locale]/instructor/_components/PageHeader";
import { load, save } from "@/app/[locale]/instructor/_utils/storage";
import { useRouter } from "@/i18n/navigation";
type Course = {
  id: string;
  title: string;
  price: number;
  active: boolean;
};

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(load<Course[]>("courses", []));
  }, []);

  function persist(data: Course[]) {
    setCourses(data);
    save("courses", data);
  }

  return (
    <div>
      <PageHeader
        title="Courses"
        description="Manage all your courses in one place"
        ctaLabel="Add Course"
        ctaHref="/instructor/dashboard/courses/add"
      />

      <DataTable<Course>
        data={courses}
        columns={[
          { key: "title", label: "Title" },
          { key: "price", label: "Price", render: (c) => `$${c.price}` },
          {
            key: "active",
            label: "Status",
            render: (c) => (
              <span
                className={`px-2 py-1 rounded text-xs ${
                  c.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {c.active ? "Active" : "Inactive"}
              </span>
            ),
          },
        ]}
        onToggle={(course) =>
          persist(
            courses.map((c) =>
              c.id === course.id ? { ...c, active: !c.active } : c,
            ),
          )
        }
        onEdit={(course) =>
          router.push(`/instructor/dashboard/courses/${course.id}/edit`)
        }
        onDelete={(course) =>
          persist(courses.filter((c) => c.id !== course.id))
        }
      />
    </div>
  );
}
