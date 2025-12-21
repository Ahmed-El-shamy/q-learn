import Link from "next/link";
import SectionHeader from "../../user/_components/SectionHeader";
import Card from "../../user/_components/Card";
import EmptyState from "../../user/_components/EmptyState";
import ProgressBar from "../../user/_components/ProgressBar";

type CertificateStatus = "issued" | "locked";

type CertificateItem = {
  id: string;
  courseId: string;
  courseTitle: string;
  instructorName?: string;
  status: CertificateStatus;

  // for issued
  issuedAt?: string; // e.g. "Dec 16, 2025"
  certificateNo?: string;
  downloadUrl?: string; // signed URL or route
  shareUrl?: string; // public verification link

  // for locked
  progress?: number; // 0..100
};

async function getCertificates() {
  // TODO: replace with real fetch
  const items: CertificateItem[] = [
    {
      id: "cert_1",
      courseId: "react-101",
      courseTitle: "React Fundamentals",
      instructorName: "Ahmed Ali",
      status: "issued",
      issuedAt: "Dec 10, 2025",
      certificateNo: "NE-REACT-2025-00192",
      downloadUrl: "/api/certificates/cert_1/download",
      shareUrl: "/certificates/cert_1",
    },
    {
      id: "cert_2",
      courseId: "ts-bootcamp",
      courseTitle: "TypeScript Bootcamp",
      instructorName: "Sara Mohamed",
      status: "locked",
      progress: 72,
    },
  ];

  return items;
}

function StatusBadge({ status }: { status: CertificateStatus }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border";
  const map = {
    issued: "bg-emerald-50 text-emerald-700 border-emerald-200",
    locked: "bg-neutral-50 text-neutral-700 border-neutral-200",
  } as const;

  return <span className={`${base} ${map[status]}`}>{status}</span>;
}

export default async function CertificatesPage() {
  const items = await getCertificates();

  const issued = items.filter((i) => i.status === "issued");
  const locked = items.filter((i) => i.status === "locked");

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Certificates"
        subtitle="Download your certificates and track what’s still locked."
        right={
          <Link
            href="/dashboard/courses"
            className="rounded-xl  px-4 py-2 text-sm font-medium main-background text-white"
          >
            Go to courses
          </Link>
        }
      />

      <Card
        title="Available certificates"
        description="Issued and ready to download"
      >
        {issued.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {issued.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-neutral-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">
                      {c.courseTitle}
                    </p>
                    {c.instructorName ? (
                      <p className="mt-1 text-sm text-neutral-600 truncate">
                        Instructor: {c.instructorName}
                      </p>
                    ) : null}
                    {c.certificateNo ? (
                      <p className="mt-2 text-xs text-neutral-500">
                        Certificate #: {c.certificateNo}
                      </p>
                    ) : null}
                  </div>
                  <StatusBadge status={c.status} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {c.shareUrl ? (
                    <Link
                      href={c.shareUrl}
                      className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                    >
                      View
                    </Link>
                  ) : null}

                  {c.downloadUrl ? (
                    <a
                      href={c.downloadUrl}
                      className="inline-flex items-center justify-center rounded-xl main-background px-4 py-2 text-sm font-medium text-white "
                    >
                      Download PDF
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white opacity-60 cursor-not-allowed"
                      disabled
                    >
                      Download PDF
                    </button>
                  )}

                  {c.shareUrl ? (
                    <a
                      href={c.shareUrl}
                      className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                    >
                      Share link
                    </a>
                  ) : null}
                </div>

                <p className="mt-4 text-xs text-neutral-500">
                  Issued: {c.issuedAt ?? "—"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No certificates yet"
            description="Complete a course to unlock your first certificate."
            cta={{ label: "Continue learning", href: "/dashboard" }}
          />
        )}
      </Card>

      <Card
        title="Locked certificates"
        description="Complete the course to unlock"
      >
        {locked.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {locked.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-neutral-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">
                      {c.courseTitle}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                      Keep going to unlock your certificate.
                    </p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>

                <div className="mt-4">
                  <ProgressBar value={c.progress ?? 0} />
                </div>

                <div className="mt-4">
                  <Link
                    href="/dashboard/courses"
                    className="inline-flex items-center justify-center rounded-xl  px-4 py-2 text-sm font-medium text-white  main-background"
                  >
                    Continue course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nothing locked"
            description="Any course that offers a certificate will appear here until you complete it."
          />
        )}
      </Card>
    </div>
  );
}
