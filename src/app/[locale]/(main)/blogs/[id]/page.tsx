import Image from "next/image";
import BlogSocial from "../_components/BlogSocial";
import api, { Api } from "@/_lib/api/api";
import { Blog } from "../_types/blogs.types";
import { notFound } from "next/navigation";
import HTMLConvertor from "@/_components/common/HTMLConvertor";
import TOC from "./_components/TOC";

export default async function Page({
  params
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params;
  const response = await api.get<Blog>(`${Api.routes.site.blogs}/${id}`);
  if (response && response.data) {
    const blog = response.data;
    return (
      <div className="containerr space-between-sections ">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">
            {/* --------------------- Main Content --------------------- */}
            <article className="border border-[#d1d1d1] overflow-hidden flex flex-col h-full bg-white">
              <div className="w-full h-72 sm:h-92 md:h-110 xl:h-132 relative overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="px-5 py-10 md:p-10 flex flex-col gap-8 flex-1">
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
                      {blog.author}
                    </span>
                  </div>

                  <div className="flex items-center py-2 sm:py-1 px-7 bg-[#1f2b40] rounded-full">
                    <span className="text-white text-sm sm:text-base">
                      {blog.created_at}
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  <h1 className="text-2xl md:text-3xl text-[#3a3636] font-bold">
                    {blog.name}
                  </h1>
                  <HTMLConvertor id="blog_content" html={blog.description} />
                </div>
                <BlogSocial />
              </div>
            </article>
            <TOC />
          </div>
        </div>
      </div>
    );
  }
  notFound();
}
