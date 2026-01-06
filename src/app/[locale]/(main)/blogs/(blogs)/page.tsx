import BlogCard from "../_components/BlogCard";
import api, { Api } from "@/_lib/api/api";
import { Blog } from "../_types/blogs.types";
import { Metadata } from "next";

// Helper function to format date
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
};

// Helper function to calculate reading time (rough estimate)
const calculateReadingTime = (description: string): string => {
  const wordsPerMinute = 200;
  const text = description.replace(/<[^>]*>/g, ""); // Remove HTML tags
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} Min To Read`;
};

export const metadata: Metadata = {
  title: "Blogs",
};

const Page = async () => {
  const response = await api.get<Blog[]>(Api.routes.site.blogs);
  const blogs = response?.data || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={String(blog.id)}
            title={blog.name}
            image={blog.image}
            alt={blog.name}
            category="Blog" // Default category - adjust based on your API response
            user={blog.author || "Admin"}
            date={formatDate(blog.published_at || blog.created_at)}
            time={calculateReadingTime(blog.description)}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500 py-10">
          No blogs available at the moment.
        </p>
      )}
    </div>
  );
};

export default Page;
