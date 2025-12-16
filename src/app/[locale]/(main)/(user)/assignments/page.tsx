import Link from "next/link";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import EmptyState from "../_components/EmptyState";

type Assignment = {
  id: string;
  title: string;
  courseTitle: string;
  dueDate: string; // format as you like
  status: "pending" | "submitted" | "graded";
  score?: number;
};

async function getAssignments() {
  // TODO: replace with real fetch
  const items: Assignment[] = [
    {
      id: "as1",
      title: "Hooks Quiz",
      courseTitle: "React Fundamentals",
      dueDate: "Dec 18, 2025",
      status: "pending",
    },
    {
      id: "as2",
      title: "TypeScript Types Test",
      courseTitle: "TypeScript Bootcamp",
      dueDate: "Dec 20, 2025",
      status: "submitted",
    },
    {
      id: "as3",
      title: "Final Project Review",
      courseTitle: "React Fundamentals",
      dueDate: "Dec 10, 2025",
      status: "graded",
      score: 92,
    },
  ];
  return items;
}

function StatusBadge({ status }: { status: Assignment["status"] }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border";
  const map = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    submitted: "bg-blue-50 text-blue-700 border-blue-200",
    graded: "bg-emerald-50 text-emerald-700 border-emerald-200",
  } as const;

  return <span className={`${base} ${map[status]}`}>{status}</span>;
}

export default async function AssignmentsPage() {
  const items = await getAssignments();

  const pending = items.filter((i) => i.status === "pending");
  const rest = items.filter((i) => i.status !== "pending");

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Assignments"
        subtitle="Track quizzes, homework, and submissions."
        right={
          <Link
            href="/dashboard/courses"
            className="rounded-xl   px-4 py-2 text-sm font-medium  main-background text-white"
          >
            Go to courses
          </Link>
        }
      />

      <Card title="Due soon" description="Things you should complete next">
        {pending.length ? (
          <ul className="divide-y divide-neutral-200">
            {pending.map((a) => (
              <li
                key={a.id}
                className="py-4 flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-neutral-900 truncate">
                    {a.title}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 truncate">
                    {a.courseTitle}
                  </p>
                  <p className="mt-2 text-xs text-neutral-500">
                    Due: {a.dueDate}
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <StatusBadge status={a.status} />
                  <Link
                    href="/dashboard/assignments" // لو عندك تفاصيل: `/dashboard/assignments/${a.id}`
                    className="text-sm font-medium text-neutral-900 underline underline-offset-4"
                  >
                    Open
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No pending assignments"
            description="You're all caught up. Nice."
          />
        )}
      </Card>

      <Card title="History" description="Submitted and graded work">
        {rest.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-neutral-600">
                <tr className="border-b border-neutral-200">
                  <th className="py-3 pr-4 font-medium">Title</th>
                  <th className="py-3 pr-4 font-medium">Course</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Score</th>
                </tr>
              </thead>
              <tbody className="text-neutral-900">
                {rest.map((a) => (
                  <tr key={a.id} className="border-b border-neutral-100">
                    <td className="py-3 pr-4">{a.title}</td>
                    <td className="py-3 pr-4 text-neutral-600">
                      {a.courseTitle}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="py-3 pr-4 text-neutral-600">
                      {a.score ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No submissions yet"
            description="Once you submit work, it will appear here."
          />
        )}
      </Card>
    </div>
  );
}
