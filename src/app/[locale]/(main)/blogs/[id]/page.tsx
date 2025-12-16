"use client";
import { usePathname } from "@/i18n/navigation";
import Image from "next/image";
import BlogComment from "../_components/BlogComment";
import { blogsData } from "../page";
import BlogSocial from "../_components/BlogSocial";

const Page = () => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[2];

  const blog = blogsData.find((b) => b.id === id);
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="flex-column gap-10">
      <div className="border border-[#d1d1d1] overflow-hidden flex flex-col h-full">
        <div className="w-full h-72 sm:h-92 md:h-110 xl:h-132 relative overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.alt}
            fill
            className="object-cover"
          />
        </div>

        <div className="px-5 py-10 md:p-10 flex flex-col gap-8 flex-1 justify-between">
          <div className="flex flex-wrap gap-3 md:gap-5">
            <div className="flex items-center py-2 sm:py-1 ps-3 sm:ps-1 pe-7 bg-linear-to-r from-[#660afb] to-[#b633ff] rounded-full gap-2 cursor-pointer">
              <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-full overflow-hidden">
                <Image
                  src="/images/homepage/business-man1.jpg"
                  alt="user name"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>

              <span className="text-white text-sm sm:text-base">
                {blog.user}
              </span>
            </div>

            <div className="flex items-center py-2 sm:py-1 px-7 bg-[#1f2b40] rounded-full ">
              <span className="text-white text-sm sm:text-base">
                {blog.date}
              </span>
            </div>

            <div className="flex items-center py-2 sm:py-1 px-7 bg-[#1f2b40] rounded-full ">
              <span className="text-white text-sm sm:text-base">
                {blog.category}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl text-[#3a3636] font-bold">
              {blog.title}
            </h2>
            <p className="text-[#373737] text-base md:text-lg w-full md:w-[90%]">
              Deep learning is a subset of machine learning in artificial
              intelligence that has networks capable of learning unsupervised
              from data that is unstructured or unlabeled. It is also known as
              deep neural learning or deep neural network.
            </p>
          </div>

          <BlogSocial />
        </div>
      </div>

      <BlogComment />
    </div>
  );
};

export default Page;
