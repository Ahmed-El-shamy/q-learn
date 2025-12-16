import React from "react";
import BlogCard from "./_components/BlogCard";

export const blogsData = [
  {
    id: "1",
    title: "Advanced Laravel Techniques",
    image: "/images/blogs/10.jpg",
    alt: "Blog 1",
    category: "PHP",
    user: "Super admin",
    date: "16th Dec, 2025",
    time: "10 Min To Read",
  },
  {
    id: "2",
    title: "Deep Learning: An Overview",
    image: "/images/blogs/9.jpg",
    alt: "Blog 2",
    category: "Data Science",
    user: "Super admin",
    date: "16th Dec, 2025",
    time: "10 Min To Read",
  },
  {
    id: "3",
    title: "Introduction to Machine Learning",
    image: "/images/blogs/8.jpg",
    alt: "Blog 3",
    category: "Data Science",
    user: "Super admin",
    date: "16th Dec, 2025",
    time: "10 Min To Read",
  },
  {
    id: "4",
    title: "A Guide to Responsive Web Design",
    image: "/images/blogs/7.jpg",
    alt: "Blog 4",
    category: "Web Development",
    user: "Super admin",
    date: "16th Dec, 2025",
    time: "10 Min To Read",
  },
  {
    id: "5",
    title: "Understanding JavaScript Promises",
    image: "/images/blogs/6.jpg",
    alt: "Blog 5",
    category: "Web Development",
    user: "Super admin",
    date: "16th Dec, 2025",
    time: "10 Min To Read",
  },
  {
    id: "6",
    title: "Introduction to PHP for Web Developers",
    image: "/images/blogs/5.jpg",
    alt: "Blog 6",
    category: "PHP",
    user: "Super admin",
    date: "16th Dec, 2025",
    time: "10 Min To Read",
  },
  {
    id: "7",
    title: "Everything About Python — Beginner To Advanced",
    image: "/images/blogs/4.jpg",
    alt: "Blog 7",
    category: "Python",
    user: "Super admin",
    date: "16th Dec, 2025",
    time: "10 Min To Read",
  },
  {
    id: "8",
    title: "Learning Python: From Zero to Hero",
    image: "/images/blogs/3.jpg",
    alt: "Blog 8",
    category: "Python",
    user: "Super admin",
    date: "16th Dec, 2025",
    time: "10 Min To Read",
  },
  {
    id: "9",
    title: "Laravel From Scratch: Intro, Setup, MVC Basics, and Views.",
    image: "/images/blogs/2.jpg",
    alt: "Blog 9",
    category: "PHP",
    user: "Super admin",
    date: "16th Dec, 2025",
    time: "10 Min To Read",
  },
  {
    id: "10",
    title: "Learn Laravel (Best Laravel Tutorials for Beginners)",
    image: "/images/blogs/1.jpg",
    alt: "Blog 10",
    category: "Laravel",
    user: "Super admin",
    date: "16th Dec, 2025",
    time: "10 Min To Read",
  },
];

const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {blogsData.map((blog, i) => (
        <BlogCard
          key={i}
          id={blog.id}
          title={blog.title}
          image={blog.image}
          category={blog.category}
          user={blog.user}
          date={blog.date}
          time={blog.time}
        />
      ))}
    </div>
  );
};

export default Page;
