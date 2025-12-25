"use client";
import CourseCard from "../../courses/_components/CourseCard";
import FetchHandler from "@/_components/common/fetchHandler/FetchHandler";
import useGetMyWhishlist from "./_services/useGetMyWhishlist";
import EmptyState from "../_components/EmptyState";
import SectionHeader from "../_components/SectionHeader";
const data = [
  {
    id: 1,
    title: "course 1",
    image: "/images/courses/course-hero.jpg",
    level: "level one",
    details: "this is the course details",
    price: 80,
    oldPrice: 120,
    rating: 3,
    students: 3,
  },
  {
    id: 2,
    title: "course 2",
    image: "/images/courses/course-hero.jpg",
    level: "level one",
    details: "this is the course details",
    price: 80,
    oldPrice: 120,
    rating: 3,
    students: 3,
  },
  {
    id: 3,
    title: "course 3",
    image: "/images/courses/course-hero.jpg",
    level: "level one",
    details: "this is the course details",
    price: 80,
    oldPrice: 120,
    rating: 3,
    students: 3,
  },
  {
    id: 4,
    title: "course 4",
    image: "/images/courses/course-hero.jpg",
    level: "level one",
    details: "this is the course details",
    price: 80,
    oldPrice: 120,
    rating: 3,
    students: 3,
  },
  {
    id: 5,
    title: "course 5",
    image: "/images/courses/course-hero.jpg",
    level: "level one",
    details: "this is the course details",
    price: 80,
    oldPrice: 120,
    rating: 3,
    students: 3,
  },
  {
    id: 6,
    title: "course 6",
    image: "/images/courses/course-hero.jpg",
    level: "level one",
    details: "this is the course details",
    price: 80,
    oldPrice: 120,
    rating: 3,
    students: 3,
  },
];
const Page = () => {
  const query = useGetMyWhishlist();
  return (
    <FetchHandler queryResult={query} skeletonType="blog">
      <div className="space-y-6">
        <SectionHeader title="My favourites" />
        {query?.data ? (
          query?.data?.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {query?.data.map((c) => (
                // <Card
                //   key={c.id}
                //   title={c.title}
                //   description={`${c.category} • ${c.lessonsCount} lessons`}
                //   action={<Link href={`/courses/${c?.id}`}>Open</Link>}
                // >
                //   <ProgressBar value={c.progress} />
                //   <div className="mt-4 flex gap-2">
                //     <Link
                //       href={`/courses/${c?.id}/lessons/${c.lastLessonId}`}
                //       className="inline-flex items-center justify-center rounded-xl main-background px-4 py-2 text-sm font-medium text-white "
                //     >
                //       Continue
                //     </Link>
                //     <button
                //       type="button"
                //       className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                //     >
                //       View syllabus
                //     </button>
                //   </div>
                // </Card>
                <CourseCard
                  key={c?.id}
                  id={c?.id}
                  title={c?.title}
                  thumbnail={c?.image}
                  level={c?.level}
                  description={c?.details}
                  price={c?.price}
                  oldPrice={c?.oldPrice}
                  rating={c?.rating}
                  students={c?.students}
                  category={c?.category}
                  progress={c?.progress}
                  lessonsCount={c?.lessonsCount}
                  lastLessonId={c?.lastLessonId}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="no courses in the wishlist yet"
              cta={{ label: "Browse courses", href: "/courses" }}
            />
          )
        ) : null}
      </div>
    </FetchHandler>
  );
};

export default Page;
