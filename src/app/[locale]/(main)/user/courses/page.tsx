"use client";
import SectionHeader from "../../user/_components/SectionHeader";
import Card from "../../user/_components/Card";
import ProgressBar from "../../user/_components/ProgressBar";
import EmptyState from "../../user/_components/EmptyState";
import FetchHandler from "@/_components/common/fetchHandler/FetchHandler";
import useGetMyCourses from "./_services/useGetMyCourses";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function CoursesPage() {
  const queryResult = useGetMyCourses();
  const tMyCourses = useTranslations("my-courses");
  const t = useTranslations();

  return (
    <FetchHandler queryResult={queryResult} skeletonType="blog">
      <div className="space-y-6">
        <SectionHeader
          title="my-courses.title"
          subtitle="my-courses.description"
          right={
            <Link
              href="/courses"
              className="rounded-xl main-background text-white px-4 py-2"
            >
              {tMyCourses("browse_catalog")}              
            </Link>
          }
        />
        {queryResult?.data ? (
          queryResult?.data?.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {queryResult?.data.map((c) => (
                <Card
                  key={c.id}
                  title={t(c.title)}
                  description={`${c.category.name} • ${`${c.level}`}`}
                >
                  <ProgressBar value={Math.floor(Math.random() * 100)} />
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/course-content/${c.id}`}
                      className="inline-flex items-center justify-center rounded-xl main-background px-4 py-2 text-sm font-medium text-white "
                    >
                      {tMyCourses("continue")}
                    </Link>
                    <Link
                      href={`/courses/${c.id}`}
                      type="button"
                      className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                    >
                      {tMyCourses("view_details")}
                    </Link>
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
          )
        ) : null}
      </div>
    </FetchHandler>
  );
}
