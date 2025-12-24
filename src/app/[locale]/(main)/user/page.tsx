import Link from "next/link";
import SectionHeader from "../user/_components/SectionHeader";
import Card from "../user/_components/Card";
import StatCard from "../user/_components/StatCard";
import ProgressBar from "../user/_components/ProgressBar";
import EmptyState from "../user/_components/EmptyState";

type Course = {
  id: string;
  title: string;
  lastLessonTitle: string;
  progress: number;
};

async function getDashboardData() {
  // TODO: replace with real fetch (DB/API)
  const courses: Course[] = [
    {
      id: "react-101",
      title: "React Fundamentals",
      lastLessonTitle: "Hooks Overview",
      progress: 42,
    },
    {
      id: "ts-bootcamp",
      title: "TypeScript Bootcamp",
      lastLessonTitle: "Generics Basics",
      progress: 18,
    },
  ];

  return {
    userName: "Omar",
    stats: {
      activeCourses: courses.length,
      completedLessonsThisWeek: 6,
      pendingAssignments: 2,
      streakDays: 4,
    },
    continueLearning: courses[0] ?? null,
    courses,
    announcements: [
      { id: "a1", title: "New quiz is available", date: "Today" },
      {
        id: "a2",
        title: "Course update: TypeScript section 3",
        date: "Yesterday",
      },
    ],
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <SectionHeader
        title={`Welcome back, ${data.userName}`}
        subtitle="Here’s what’s happening with your learning today."
        right={
          <Link
            href="/dashboard/courses"
            className="rounded-xl px-4 py-2 text-sm font-medium main-background text-white"
          >
            View all courses
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active courses"
          value={`${data.stats.activeCourses}`}
        />
        <StatCard
          label="Lessons this week"
          value={`${data.stats.completedLessonsThisWeek}`}
        />
        <StatCard
          label="Pending assignments"
          value={`${data.stats.pendingAssignments}`}
        />
        <StatCard label="Streak" value={`${data.stats.streakDays} days`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card
          title="Continue learning"
          description={
            data.continueLearning
              ? data.continueLearning.title
              : "No active course yet"
          }
          action={
            data.continueLearning ? (
              <Link
                href={`/dashboard/courses`}
                className="text-sm font-medium text-neutral-900 underline underline-offset-4"
              >
                Open
              </Link>
            ) : null
          }
        >
          {data.continueLearning ? (
            <div className="space-y-3">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-sm text-neutral-600">Last lesson</p>
                <p className="mt-1 font-medium text-neutral-900">
                  {data.continueLearning.lastLessonTitle}
                </p>
              </div>
              <ProgressBar value={data.continueLearning.progress} />
            </div>
          ) : (
            <EmptyState
              title="Start your first course"
              description="Browse courses and enroll to see your progress here."
              cta={{ label: "Browse courses", href: "/dashboard/courses" }}
            />
          )}
        </Card>

        <Card
          title="Announcements"
          description="Latest updates from your courses"
        >
          <ul className="space-y-3">
            {data.announcements.map((a) => (
              <li key={a.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {a.title}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">{a.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Your courses" description="Pick up where you left off">
        {data.courses.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {data.courses.map((c) => (
              <Link
                key={c.id}
                href="/dashboard/courses"
                className="rounded-2xl border border-neutral-200 bg-white p-4 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">
                      {c.title}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600 truncate">
                      Last: {c.lastLessonTitle}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-600">
                    {Math.round(c.progress)}%
                  </span>
                </div>
                <div className="mt-3">
                  <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full bg-neutral-900"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No courses yet"
            description="Enroll in a course to start learning."
          />
        )}
      </Card>
    </div>
  );
}
