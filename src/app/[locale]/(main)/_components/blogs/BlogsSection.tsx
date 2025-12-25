// import React from "react";
// import BlogCard from "./BlogCard";
// import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";

// const blogsData = [
//   {
//     id: "1",
//     course: "Python",
//     image: "/images/homepage/code.jpg",
//     avatar: "/images/homepage/business-man1.jpg",
//     name: "Super Admin",
//     date: "9th Dec, 2025",
//     blogTitle: "Learning Python: from zero to hero",
//     blogContent:
//       "For me, the first reason to learn Python was that it is, in fact , a beautiful programming language. It was really natural to code in it and express my thoughts and I'm very happy to learn this language.",
//   },
//   {
//     id: "2",
//     course: "PHP",
//     image: "/images/homepage/php.jpg",
//     avatar: "/images/homepage/business-man1.jpg",
//     name: "Super Admin",
//     date: "9th Dec, 2025",
//     blogTitle: "Learning PHP: from zero to hero",
//     blogContent:
//       "For me, the first reason to learn Python was that it is, in fact , a beautiful programming language. It was really natural to code in it and express my thoughts and I'm very happy to learn this language.",
//   },
//   {
//     id: "3",
//     course: "Data Science",
//     image: "/images/homepage/data-science.jpg",
//     avatar: "/images/homepage/business-man1.jpg",
//     name: "Super Admin",
//     date: "9th Dec, 2025",
//     blogTitle: "Learning Data Science: from zero to hero",
//     blogContent:
//       "For me, the first reason to learn Python was that it is, in fact , a beautiful programming language. It was really natural to code in it and express my thoughts and I'm very happy to learn this language.",
//   },
//   {
//     id: "4",
//     course: "React",
//     image: "/images/homepage/code 2.jpg",
//     avatar: "/images/homepage/business-man1.jpg",
//     name: "Super Admin",
//     date: "9th Dec, 2025",
//     blogTitle: "Learning Data Science: from zero to hero",
//     blogContent:
//       "For me, the first reason to learn Python was that it is, in fact , a beautiful programming language. It was really natural to code in it and express my thoughts and I'm very happy to learn this language.",
//   },
//   {
//     id: "5",
//     course: "Laravel",
//     image: "/images/homepage/php 2.jpg",
//     avatar: "/images/homepage/business-man1.jpg",
//     name: "Super Admin",
//     date: "9th Dec, 2025",
//     blogTitle: "Learning Data Science: from zero to hero",
//     blogContent:
//       "For me, the first reason to learn Python was that it is, in fact , a beautiful programming language. It was really natural to code in it and express my thoughts and I'm very happy to learn this language.",
//   },
//   {
//     id: "6",
//     course: "Node",
//     image: "/images/homepage/node.jpg",
//     avatar: "/images/homepage/business-man1.jpg",
//     name: "Super Admin",
//     date: "9th Dec, 2025",
//     blogTitle: "Learning Data Science: from zero to hero",
//     blogContent:
//       "For me, the first reason to learn Python was that it is, in fact , a beautiful programming language. It was really natural to code in it and express my thoughts and I'm very happy to learn this language.",
//   },
// ];

// const BlogsSection = () => {
//   return (

//   );
// };

// export default BlogsSection;
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { blogsOptions } from "../../blogs/_quires/blogsOptions";
import ShowBlogs from "./ShowBlogs";
const BlogsSection = async () => {
  const qc = new QueryClient();
  await qc.prefetchQuery(blogsOptions());
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <ShowBlogs />
    </HydrationBoundary>
  );
};

export default BlogsSection;
