import Image from "next/image";
import BlogSocial from "../_components/BlogSocial";
import api, { Api } from "@/_lib/api/api";
import { Blog } from "../_types/blogs.types";
import { notFound } from "next/navigation";
import HTMLConvertor from "@/_components/common/HTMLConvertor";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await api.get<Blog>(`${Api.routes.site.blogs}/${id}`);
  const blog = response?.data;

  return {
    title: blog?.name,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const tCommon = await getTranslations("common");
  const response = await api.get<Blog>(`${Api.routes.site.blogs}/${id}`);
  if (response && response.data) {
    const blog = response.data;
    return (
      <div className="containerr space-between-sections ">
        <article className="mx-auto max-w-3xl border border-[#d1d1d1] overflow-hidden flex flex-col h-full bg-white">
          <div className="w-full h-72 sm:h-92 md:h-110 xl:h-132 relative overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="px-5 py-10 md:p-10 flex flex-col gap-8 flex-1">
            <div className="flex flex-wrap gap-3 md:gap-5 items-center text-sm sm:text-base text-[#373737]">
              <span>{tCommon("publication_date")}</span>
              <div className="flex items-center py-2 sm:py-1 px-7 bg-[#1f2b40] rounded-full">
                <span className="text-white text-sm sm:text-base">
                  {blog.created_at}
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#3a3636] font-bold leading-snug">
                {blog.name}
              </h1>
              <HTMLConvertor id="blog_content" html={blog.description} />
            </div>

            <div className="pt-6 border-t border-[#e5e5e5] mt-4">
              <BlogSocial />
            </div>
          </div>
        </article>
      </div>
    );
  }
  notFound();
}
