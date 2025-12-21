"use client";
import React, { useState } from "react";
import BlogCard from "./_components/BlogCard";
import SearchComponent from "./_components/SearchComponent";
import FilterComponent from "./_components/FilterComponent";
import { Menu, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      <div
        className="bg-[url('/images/about-us/about-hero.webp')]
             bg-cover bg-center bg-no-repeat
             h-64 w-full text-center"
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold translate-y-24">
          Explore Our Blog Posts
        </h1>
      </div>

      <div className="containerr mt-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
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
          </div>

          <div className="hidden md:block lg:col-span-3">
            <div className="sticky top-6 space-y-5">
              <SearchComponent />
              <FilterComponent />
            </div>
          </div>
        </div>

        <div className="lg:hidden z-50">
          <div className="flex items-center gap-3 absolute -top-12 start-2">
            <button
              className=" p-1 hover:bg-gray-200 rounded duration-100 cursor-pointer"
              onClick={toggleMenu}
            >
              <Menu stroke="#1f2b40" />
            </button>
            <p className="text-xl text-[#1f2b40]">Search and Filters</p>
          </div>

          {isOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-10"
              onClick={() => setIsOpen(false)}
            />
          )}

          <aside
            className={`z-50 bg-white border-l-[#d1d1d1] w-2/3 px-4 py-4 flex flex-col max-w-lg h-screen overflow-y-auto fixed top-0 left-0 duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-centerborder-b border-b-[#d1d1d1] pb-4">
              <p className="text-xl text-[#1f2b40]">Filters</p>
              <button
                onClick={toggleMenu}
                className="cursor-pointer p-1 hover:bg-gray-100 duration-100 rounded"
              >
                <X size={18} stroke="#1f2b40" />
              </button>
            </div>
            <div className="space-y-5">
              <SearchComponent />
              <FilterComponent />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Page;
