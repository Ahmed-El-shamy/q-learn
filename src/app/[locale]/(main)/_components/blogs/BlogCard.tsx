"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Blog } from "../../blogs/types/blog.types";
import { Calendar, User } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
interface BlogCardProps {
  blog: Blog;
  className?: string;
}

/** يحول HTML لنص بسيط (للـ excerpt) */
function htmlToText(html?: string) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ") // remove tags
    .replace(/\s+/g, " ")
    .trim();
}

const BlogCard = ({ blog, className = "" }: BlogCardProps) => {
  const title = blog?.name ?? "Untitled";
  const author = blog?.author ?? "";
  const date = blog?.published_at;
  const excerpt = htmlToText(blog?.description).slice(0, 140); // ثابت

  return (
    <article
      className={`
        group
        w-[320px] sm:w-[360px] md:w-[400px]
        h-[520px]
        overflow-hidden
        rounded-3xl
        border border-slate-200/70
        bg-white
        shadow-sm
        transition
        hover:-translate-y-1 hover:shadow-lg
        focus-within:shadow-lg
        ${className}
      `}
      aria-label={`Blog post: ${title}`}
    >
      <Link
        href={`/blogs/${blog?.id}`}
        className="
          block h-full
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2
        "
        aria-label={`Read blog: ${title}`}
      >
        {/* Media */}
        <div className="relative h-[220px] bg-slate-100">
          <Image
            src={blog?.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 320px, (max-width: 768px) 360px, 400px"
            className="
              object-cover
              transition-transform duration-500
              group-hover:scale-[1.04]
            "
            quality={90}
            loading="lazy"
          />

          {/* gradient overlay for readability */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
            aria-hidden="true"
          />

          {/* Category badge */}
          <div className="absolute left-4 top-4">
            <span
              className="
                inline-flex items-center
                rounded-full
                bg-white/90 backdrop-blur
                px-3 py-1
                text-xs font-semibold text-slate-800
                shadow-sm
              "
            >
              {title}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[300px] flex-col p-5">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
            {author && (
              <span className="inline-flex items-center gap-1">
                <User className="h-4 w-4" aria-hidden="true" />
                <span className="truncate max-w-[180px]">{author}</span>
              </span>
            )}
            {date && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>{formatDate(date)}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-3 text-lg sm:text-xl font-bold text-slate-900 line-clamp-2 leading-snug">
            {title}
          </h3>

          {/* Excerpt ثابت */}
          <p className="mt-2 text-sm text-slate-600 line-clamp-4 leading-relaxed">
            {excerpt || "Read a quick overview and explore the full article."}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA */}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm font-semibold text-sky-700">
              Read more
            </span>

            {/* سهم بسيط + hover */}
            <span
              className="
                inline-flex h-10 w-10 items-center justify-center
                rounded-full
                border border-slate-200
                bg-white
                text-slate-900
                transition
                group-hover:bg-slate-900 group-hover:text-white
              "
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
