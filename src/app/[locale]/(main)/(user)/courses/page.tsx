import Link from "next/link";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import ProgressBar from "../_components/ProgressBar";
import EmptyState from "../_components/EmptyState";

type Course = {
  id: string;
  title: string;
  category: string;
  progress: number;
  lessonsCount: number;
};

async function getMyCourses() {
  // TODO: replace with real fetch
  const courses: Course[] = [
    {
      id: "react-101",
      title: "React Fundamentals",
      category: "Frontend",
      progress: 42,
      lessonsCount: 24,
    },
    {
      id: "ts-bootcamp",
      title: "TypeScript Bootcamp",
      category: "Programming",
      progress: 18,
      lessonsCount: 30,
    },
  ];
  return courses;
}

export default async function CoursesPage() {
  const courses = await getMyCourses();

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My courses"
        subtitle="All enrolled courses and your current progress."
        right={
          <Link
            href="/courses" // لو عندك Public catalog
            className="rounded-xl main-background text-white px-4 py-2"
          >
            Browse catalog
          </Link>
        }
      />

      {courses.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {courses.map((c) => (
            <Card
              key={c.id}
              title={c.title}
              description={`${c.category} • ${c.lessonsCount} lessons`}
              action={
                <Link
                  href={`/dashboard/courses`} // لو عندك صفحة تفاصيل كورس داخل الداش: `/dashboard/courses/${c.id}`
                  className="text-sm font-medium text-neutral-900 underline underline-offset-4"
                >
                  Open
                </Link>
              }
            >
              <ProgressBar value={c.progress} />
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/dashboard/courses`} // أو continue: `/dashboard/courses/${c.id}/lessons/${lastLessonId}`
                  className="inline-flex items-center justify-center rounded-xl main-background px-4 py-2 text-sm font-medium text-white "
                >
                  Continue
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                >
                  View syllabus
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You’re not enrolled yet"
          description="Browse courses and enroll to start learning."
          cta={{ label: "Browse catalog", href: "/courses" }}
        />
      )}
    </div>
  );
}
