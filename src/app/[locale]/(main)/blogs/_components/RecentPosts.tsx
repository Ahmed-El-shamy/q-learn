import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React from "react";

const recentPosts = [
  {
    image: "/images/blogs/1.jpg",
    alt: "recent post 1",
    link: "Learn Laravel (Best Laravel Tutorials for Beginners)",
    url: "#",
  },
  {
    image: "/images/blogs/2.jpg",
    alt: "recent post 2",
    link: "Laravel From Scratch: Intro, Setup, MVC Basics, and Views.",
    url: "#",
  },
  {
    image: "/images/blogs/3.jpg",
    alt: "recent post 3",
    link: "Learning Python: From Zero to Hero",
    url: "#",
  },
];

const RecentPosts = () => {
  return (
    <div className="border border-[#d1d1d1] p-4">
      <h2 className="text-2xl text-[#202e3b] font-medium">Recent Posts</h2>

      <div className="mt-5 space-y-5 divide-y divide-[#d1d1d1]">
        {recentPosts.map((post, i) => (
          <div key={i} className="flex gap-3 pb-4">
            <Image width={100} height={100} src={post.image} alt={post.alt} />

            <Link
              href={post.url}
              className="text-[#1f2b40] line-clamp-2 w-full leading-8 hover:underline"
            >
              {" "}
              {post.link}{" "}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
