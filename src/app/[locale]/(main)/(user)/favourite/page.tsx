import React from "react";
import CourseCard from "@/_components/common/courses/CourseCard";
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {data?.map((item) => (
        <CourseCard
          key={item?.id}
          title={item?.title}
          image={item?.image}
          alt={item?.title}
          level={item?.level}
          details={item?.details}
          price={item?.price}
          oldPrice={item?.oldPrice}
          rating={item?.rating}
          students={item?.students}
          id={String(item?.id)}
        />
      ))}
    </div>
  );
};

export default Page;
