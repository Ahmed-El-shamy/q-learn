// import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
// import TeacherCard from "./TeacherCard";

// const teachers = [
//   {
//     id: 1,
//     name: "John Doe",
//     title: "Senior IT Specialist",
//     photo: "/images/teachers/te-01.jpg",
//     gradient: "blue" as const,
//   },
//   {
//     id: 2,
//     name: "Alice Johnson",
//     title: "Software Engineer",
//     photo: "/images/teachers/te-02.jpg",
//     gradient: "purple" as const,
//   },
//   {
//     id: 3,
//     name: "Bob Williams",
//     title: "Cloud Architect",
//     photo: "/images/teachers/te-03.jpg",
//     gradient: "blue" as const,
//   },
//   {
//     id: 4,
//     name: "Michael Brown",
//     title: "Data Science Specialist",
//     photo: "/images/teachers/te-01.jpg",
//     gradient: "pink" as const,
//   },
//   {
//     id: 5,
//     name: "John Doe",
//     title: "Senior IT Specialist",
//     photo: "/images/teachers/te-01.jpg",
//     gradient: "blue" as const,
//   },
//   {
//     id: 6,
//     name: "Alice Johnson",
//     title: "Software Engineer",
//     photo: "/images/teachers/te-02.jpg",
//     gradient: "purple" as const,
//   },
//   {
//     id: 7,
//     name: "Bob Williams",
//     title: "Cloud Architect",
//     photo: "/images/teachers/te-03.jpg",
//     gradient: "blue" as const,
//   },
//   {
//     id: 8,
//     name: "Michael Brown",
//     title: "Data Science Specialist",
//     photo: "/images/teachers/te-01.jpg",
//     gradient: "pink" as const,
//   },
// ];
// const TeachersSection = () => {
//   return (
//     <section aria-labelledby="teachers-heading">
//       <div>
//         {/* العنوان الرئيسي لو حابب */}

//         {/* السلايدر */}
//         <HorizontalCarousel ariaLabel="Students testimonials slider">
//           {teachers.map((item) => (
//             <TeacherCard
//               key={item.id}
//               name={item.name}
//               title={item.title}
//               photo={item.photo}
//               gradient={item.gradient}
//               socialLinks={[
//                 { platform: "facebook", href: "https://facebook.com" },
//                 { platform: "twitter", href: "https://x.com" },
//                 { platform: "linkedin", href: "https://linkedin.com" },
//               ]}
//             />
//           ))}
//         </HorizontalCarousel>
//       </div>
//     </section>
//   );
// };

// export default TeachersSection;
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { instructorsOptions } from "./_quires/teachersOptions";
import ShowTeachers from "./ShowTeachers";
const TeachersSection = async () => {
  const qc = new QueryClient();
  await qc.prefetchQuery(instructorsOptions());
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <ShowTeachers />
    </HydrationBoundary>
  );
};

export default TeachersSection;
