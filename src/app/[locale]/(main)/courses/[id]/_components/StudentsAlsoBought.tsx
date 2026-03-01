import { Star, ShieldUser, ShoppingCart, Stars, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
export interface Course {
  id: string;
  title: string;
  image: string;
  alt?: string;
  level: string;
  details: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  students?: number;
  lectures?: number;
  duration?: string;
}

export const mockCourses: Course[] = [
  {
    id: "mern-full-stack-web-development",
    title: "MERN - Full Stack Web Development",
    image: "/images/600x600.jpg",
    alt: "MERN - Full Stack Web Development",
    level: "Beginner",
    details:
      "Learn full stack web development using MongoDB, Express, React, and Node.js",
    price: 5.0,
    oldPrice: 417.0,
    rating: 0,
    students: 1,
    lectures: 9,
    duration: "27 Min",
  },
  {
    id: "learn-wordpress-theme-development",
    title: "Learn WordPress Theme Development with WordPress",
    image: "/images/600x600.jpg",
    alt: "Learn WordPress Theme Development",
    level: "Intermediate",
    details: "Master WordPress theme development and customization",
    price: 5.0,
    oldPrice: 493.0,
    rating: 0,
    students: 1,
    lectures: 7,
    duration: "14 Min",
  },
  {
    id: "learn-english-in-30-days",
    title: "Learn English in 30 Days",
    image: "/images/600x600.jpg",
    alt: "Learn English in 30 Days",
    level: "Intermediate",
    details:
      "Comprehensive English language course designed for quick learning",
    price: 5.0,
    oldPrice: 229.0,
    rating: 0,
    students: 1,
    lectures: 6,
    duration: "29 Min",
  },
  {
    id: "mastering-in-laravel",
    title: "Mastering in Laravel",
    image: "/images/600x600.jpg",
    alt: "Mastering in Laravel",
    level: "Beginner",
    details:
      "Complete Laravel framework course for building modern web applications",
    price: 154.0,
    oldPrice: 313.0,
    rating: 0,
    students: 1,
    lectures: 7,
    duration: "14 Min",
  },
  {
    id: "mastering-docker-for-software-developers",
    title: "Mastering in Docker for Software Developers",
    image: "/images/600x600.jpg",
    alt: "Mastering in Docker",
    level: "Intermediate",
    details: "Learn Docker containerization and deployment strategies",
    price: 129.0,
    oldPrice: 492.0,
    rating: 0,
    students: 1,
    lectures: 7,
    duration: "14 Min",
  },
  {
    id: "python-programming-quiz",
    title: "Python Programming Quiz",
    image: "/images/600x600.jpg",
    alt: "Python Programming Quiz",
    level: "Pro",
    details: "Advanced Python programming quiz to test your skills",
    price: 164.0,
    oldPrice: 280.0,
    rating: 0,
    students: 0,
    lectures: 0,
    duration: "N/A",
  },
];

const StudentsAlsoBought = () => {
  const t = useTranslations("courses");
  return (
    <section className="flex flex-col gap-4 sm:gap-5 md:gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">
          {t("Students Also Bought")}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          {t("More courses you might like")}
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          {/* Table Rows */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {mockCourses.map((course) => (
              <div
                key={course.id}
                className="border flex flex-col sm:flex-row border-gray-200 w-full hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-2 p-2 w-full sm:w-[60%] sm:border-e sm:border-e-gray-200">
                  <Image
                    src={course.image}
                    alt="course-image"
                    height={70}
                    width={70}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] flex-shrink-0"
                  />
                  <div className="text-xs sm:text-sm flex-1 min-w-0">
                    <p className="line-clamp-2 sm:line-clamp-1 font-semibold">
                      {course.title}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center mt-1 sm:mt-2">
                      <div className="bg-primary text-white p-0.5 sm:p-1 text-xs">
                        {course.level}
                      </div>
                      <p className="text-xs sm:text-sm">
                        {course.lectures} {t("lectures")}
                      </p>
                      <p className="text-xs sm:text-sm">•</p>
                      <p className="text-xs sm:text-sm">{course.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col w-full sm:w-[25%] [&>div]:py-1 [&>div]:px-2 sm:[&>div]:px-4 md:[&>div]:px-8 [&>div]:flex-1 [&>div]:gap-1.5 sm:[&>div]:gap-2 [&>div]:flex [&>div]:justify-center [&>div]:items-center sm:border-e sm:border-e-gray-200 border-t sm:border-t-0 border-t-gray-200">
                  <div className="border-r sm:border-r-0 sm:border-b sm:border-b-gray-200 border-r-gray-200">
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <Star
                        size={12}
                        className="sm:w-4 sm:h-4 text-purple-500"
                        fill="rgba(182,51,255, 0.4)"
                      />{" "}
                      {course.rating} <p>{t("ratings")}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <User
                        size={12}
                        className="sm:w-4 sm:h-4 text-purple-500"
                        fill="rgba(182,51,255, 0.4)"
                      />{" "}
                      {course.students} <p>{t("students")}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col w-full sm:w-[15%] px-3 sm:px-4 md:px-5 py-2 items-center justify-between sm:justify-center sm:border-e sm:border-e-gray-200 border-t sm:border-t-0 border-t-gray-200">
                  <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                    {course.price} $
                  </p>
                  <p className="line-through font-bold text-gray-500 text-sm sm:text-base md:text-lg">
                    {course.oldPrice} $
                  </p>
                </div>
                <div className="w-full sm:w-[10%] flex justify-center items-center py-2 sm:py-0 border-t sm:border-t-0 border-t-gray-200">
                  <ShoppingCart
                    size={20}
                    className="sm:w-6 sm:h-6 text-purple-500 cursor-pointer"
                    fill="var(--color-purple-500)"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentsAlsoBought;
