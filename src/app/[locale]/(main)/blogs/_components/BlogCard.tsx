import { Link } from "@/i18n/navigation";
import React from "react";
import MainBtn from "@/_components/common/buttons/MainBtn";
import Image from "next/image";

interface BlogCardProps {
  id: string;
  title: string;
  image: string;
  alt?: string;
  category: string;
  user?: string;
  date?: string;
  time?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  image,
  alt,
  category,
  user,
  date,
  time,
}) => {
  return (
    <div className="border border-[#d1d1d1] group overflow-hidden flex flex-col h-full">
      <Link href={`/blogs/${id}`}>
        <div className="w-full h-52 relative overflow-hidden">
          <p className="text-[10px] bg-black/50 text-white py-2 px-4 rounded-full absolute top-3 start-3 z-1">
            {category}
          </p>
          <Image
            src={image}
            alt={alt || "Blog Image"}
            fill
            className="object-cover transition-transform duration-500  group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="data space-y-2">
          <p className="text-[#737887]">
            {user} . {date}
          </p>

          <Link href={`/blogs/${id}`}>
            <h3 className="text-[#1f2b40] text-2xl line-clamp-2 transition-colors ease-linear duration-500 hover:text-[#660afb]">
              {title}
            </h3>
          </Link>
        </div>

        <div className="flex flex-row lg:flex-col xl:flex-row items-center lg:items-start xl:items-center gap-8 lg:gap-5 xl:gap-8 mt-5">
          <MainBtn title="Read More" className="py-3 text-sm font-normal" />
          <p className="gradient-background bg-clip-text text-transparent">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
