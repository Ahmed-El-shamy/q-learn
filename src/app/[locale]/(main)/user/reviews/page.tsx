import Link from "next/link";
import SectionHeader from "../../user/_components/SectionHeader";
import Card from "../../user/_components/Card";
import EmptyState from "../../user/_components/EmptyState";

type ReviewStatus = "pending" | "published";

type ReviewItem = {
  id: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  status: ReviewStatus;
  rating?: number; // 1..5
  comment?: string;
  updatedAt?: string; // e.g. "Dec 16, 2025"
};

async function getReviewsData() {
  // TODO: replace with real fetch
  const items: ReviewItem[] = [
    {
      id: "r1",
      courseId: "react-101",
      courseTitle: "React Fundamentals",
      instructorName: "Ahmed Ali",
      status: "published",
      rating: 5,
      comment: "Clear explanations and practical examples.",
      updatedAt: "Dec 12, 2025",
    },
    {
      id: "r2",
      courseId: "react-101",
      courseTitle: "React Fundamentals",
      instructorName: "Ahmed Ali",
      status: "published",
      rating: 5,
      comment: "Clear explanations and practical examples.",
      updatedAt: "Dec 12, 2025",
    },
    {
      id: "r3",
      courseId: "react-101",
      courseTitle: "React Fundamentals",
      instructorName: "Ahmed Ali",
      status: "published",
      rating: 5,
      comment: "Clear explanations and practical examples.",
      updatedAt: "Dec 12, 2025",
    },
    {
      id: "r4",
      courseId: "react-101",
      courseTitle: "React Fundamentals",
      instructorName: "Ahmed Ali",
      status: "published",
      rating: 5,
      comment: "Clear explanations and practical examples.",
      updatedAt: "Dec 12, 2025",
    },
    {
      id: "r2",
      courseId: "ts-bootcamp",
      courseTitle: "TypeScript Bootcamp",
      instructorName: "Sara Mohamed",
      status: "pending",
    },
  ];

  return {
    items,
  };
}

function Stars({ value }: { value: number }) {
  const v = Math.max(1, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1" aria-label={`${v} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={[
            "text-sm",
            i < v ? "text-neutral-900" : "text-neutral-300",
          ].join(" ")}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border";
  const map = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  } as const;

  return <span className={`${base} ${map[status]}`}>{status}</span>;
}

export default async function ReviewsPage() {
  const { items } = await getReviewsData();

  const pending = items.filter((i) => i.status === "pending");
  const published = items.filter((i) => i.status === "published");

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Reviews"
        subtitle="Rate courses you completed and manage your feedback."
        right={
          <Link
            href="/dashboard/courses"
            className="rounded-xl  px-4 py-2 text-sm font-medium text-white  main-background"
          >
            Go to courses
          </Link>
        }
      />

      <Card
        title="Pending reviews"
        description="Courses waiting for your rating"
      >
        {pending.length ? (
          <ul className="divide-y divide-neutral-200">
            {pending.map((r) => (
              <li
                key={r.id}
                className="py-4 flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-neutral-900 truncate">
                    {r.courseTitle}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 truncate">
                    Instructor: {r.instructorName}
                  </p>
                  <p className="mt-2 text-xs text-neutral-500">
                    Share your experience to help others choose.
                  </p>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-2">
                  <StatusBadge status={r.status} />
                  <Link
                    href={`/dashboard/reviews`} // لو عندك صفحة تفاصيل: `/dashboard/reviews/${r.id}`
                    className="text-sm font-medium text-neutral-900 underline underline-offset-4"
                  >
                    Write review
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No pending reviews"
            description="When you finish a course, it will show up here for rating."
          />
        )}
      </Card>

      <Card title="Your reviews" description="Published feedback">
        {published.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {published.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-neutral-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">
                      {r.courseTitle}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600 truncate">
                      Instructor: {r.instructorName}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>

                <div className="mt-3">
                  <Stars value={r.rating ?? 5} />
                </div>

                {r.comment ? (
                  <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                    {r.comment}
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-neutral-600">No comment.</p>
                )}

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs text-neutral-500">
                    Updated: {r.updatedAt ?? "—"}
                  </p>
                  <Link
                    href={`/dashboard/reviews`} // لو عندك edit: `/dashboard/reviews/${r.id}/edit`
                    className="text-sm font-medium text-neutral-900 underline underline-offset-4"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No reviews yet"
            description="Once you submit feedback, it will appear here."
          />
        )}
      </Card>
    </div>
  );
}
