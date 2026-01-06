"use client";
import clsx from "clsx";
import { useState, useEffect } from "react";

const TOC = () => {
  const [blogHeaders, setBlogHeaders] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const headers =
      (
        document.getElementById("blog_content") as HTMLDivElement | undefined
      )?.querySelectorAll("h1,h2") || [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.textContent);
        }
      },
      {
        rootMargin: "0px 0px -85% 0px",
      }
    );
    // initialize the headers with id = their content.
    headers.forEach((header) => {
      header.id = header.textContent;
      observer.observe(header);
    });
    // setting the local state with those headers.
    setBlogHeaders(Array.from(headers).map((header) => header.textContent));

    // cleaning up the intersection observer.
    return () => {
      observer.disconnect();
    };
  }, []);
  if (!blogHeaders?.length) return null;
  return (
    <div className="sticky bg-white flex flex-col rounded border border-purple-300 shadow shadow-purple-200 top-0">
      {Boolean(blogHeaders.length) &&
        blogHeaders.map((header) => (
          <a
            key={header}
            href={`#${header}`}
            className={clsx(
              "px-2 py-2 overflow-hidden  hover:bg-purple-50 line-clamp-1",
              {
                "bg-purple-100/50 text-purple-500": activeSection === header,
              }
            )}
            title={header}
          >
            <p className="line-clamp-1">{header}</p>
          </a>
        ))}
    </div>
  );
};

export default TOC;
