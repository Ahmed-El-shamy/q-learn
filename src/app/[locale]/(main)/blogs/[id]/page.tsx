// "use client";
// import { usePathname } from "@/i18n/navigation";
// import Image from "next/image";
// import BlogComment from "../_components/BlogComment";
// import { blogsData } from "../page";
// import BlogSocial from "../_components/BlogSocial";

// const Page = () => {
//   const pathname = usePathname();
//   const segments = pathname.split("/");
//   const id = segments[2];

//   const blog = blogsData.find((b) => b.id === id);
//   if (!blog) return <p>Blog not found</p>;

//   return (
//     <div className="flex-column gap-10">
//       <div className="border border-[#d1d1d1] overflow-hidden flex flex-col h-full">
//         <div className="w-full h-72 sm:h-92 md:h-110 xl:h-132 relative overflow-hidden">
//           <Image
//             src={blog.image}
//             alt={blog.alt}
//             fill
//             className="object-cover"
//           />
//         </div>

//         <div className="px-5 py-10 md:p-10 flex flex-col gap-8 flex-1 justify-between">
//           <div className="flex flex-wrap gap-3 md:gap-5">
//             <div className="flex items-center py-2 sm:py-1 ps-3 sm:ps-1 pe-7 bg-linear-to-r from-[#660afb] to-[#b633ff] rounded-full gap-2 cursor-pointer">
//               <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-full overflow-hidden">
//                 <Image
//                   src="/images/homepage/business-man1.jpg"
//                   alt="user name"
//                   width={100}
//                   height={100}
//                   className="object-cover"
//                 />
//               </div>

//               <span className="text-white text-sm sm:text-base">
//                 {blog.user}
//               </span>
//             </div>

//             <div className="flex items-center py-2 sm:py-1 px-7 bg-[#1f2b40] rounded-full ">
//               <span className="text-white text-sm sm:text-base">
//                 {blog.date}
//               </span>
//             </div>

//             <div className="flex items-center py-2 sm:py-1 px-7 bg-[#1f2b40] rounded-full ">
//               <span className="text-white text-sm sm:text-base">
//                 {blog.category}
//               </span>
//             </div>
//           </div>

//           <div className="space-y-8">
//             <h2 className="text-2xl md:text-3xl text-[#3a3636] font-bold">
//               {blog.title}
//             </h2>
//             <p className="text-[#373737] text-base md:text-lg w-full md:w-[90%]">
//               Deep learning is a subset of machine learning in artificial
//               intelligence that has networks capable of learning unsupervised
//               from data that is unstructured or unlabeled. It is also known as
//               deep neural learning or deep neural network.
//             </p>
//           </div>

//           <BlogSocial />
//         </div>
//       </div>

//       <BlogComment />
//     </div>
//   );
// };

// export default Page;
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import Image from "next/image";
import BlogSocial from "../_components/BlogSocial";

const blogsData: any[] = [];

type TocItem = { id: string; title: string };

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function useActiveSection(
  sectionIds: string[],
  rootMargin = "-30% 0px -60% 0px"
) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (!sectionIds.length) return;

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // اختار السكشن الأكثر وضوحًا
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );

        const id = visible[0]?.target?.id;
        if (id) setActiveId(id);
      },
      { root: null, rootMargin, threshold: [0.01, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds, rootMargin]);

  return { activeId, setActiveId };
}

export default function Page() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[2];

  const blog = blogsData.find((b) => b.id === id);
  if (!blog) return <p>Blog not found</p>;

  const sections = useMemo(
    () => [
      { title: "Overview" },
      { title: "What is Deep Learning?" },
      { title: "Key Use Cases" },
      { title: "How It Works (High Level)" },
      { title: "Common Pitfalls" },
      { title: "Conclusion" },
    ],
    []
  );

  const toc: TocItem[] = useMemo(() => {
    const used = new Set<string>();
    return sections.map((s) => {
      const base = slugify(s.title);
      let candidate = base;
      let i = 2;
      while (used.has(candidate)) candidate = `${base}-${i++}`;
      used.add(candidate);
      return { id: candidate, title: s.title };
    });
  }, [sections]);

  const { activeId: observedActiveId, setActiveId: setObservedActiveId } =
    useActiveSection(toc.map((t) => t.id));

  // ✅ Active فوري عند الضغط
  const [clickedId, setClickedId] = useState<string | null>(null);
  const clickTimeoutRef = useRef<number | null>(null);

  const activeId = clickedId ?? observedActiveId;

  const scrollToId = (targetId: string) => {
    setClickedId(targetId); // ✅ highlight immediately on click

    // after a short time, let observer take over again
    if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = window.setTimeout(() => {
      setClickedId(null);
    }, 700);

    const el = document.getElementById(targetId);
    if (!el) return;

    // ملاحظة: لازم section يكون عليه scroll-mt-* عشان الهيدر/الناف
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // optional: update observed state immediately
    setObservedActiveId(targetId);
  };

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
    };
  }, []);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    const bad: Array<{
      node: Element;
      overflow: string;
      transform: string;
      filter: string;
    }> = [];
    let p: Element | null = el.parentElement;

    while (p) {
      const cs = window.getComputedStyle(p);
      const overflow = `${cs.overflow}/${cs.overflowX}/${cs.overflowY}`;
      const transform = cs.transform;
      const filter = cs.filter;

      const breaksSticky =
        /hidden|auto|scroll/.test(cs.overflow + cs.overflowX + cs.overflowY) ||
        transform !== "none" ||
        filter !== "none";

      if (breaksSticky) bad.push({ node: p, overflow, transform, filter });

      p = p.parentElement;
    }

    console.log("Sticky debug — possible blockers:", bad);
  }, []);

  return (
    <div className="containerr space-between-sections ">
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">
          {/* --------------------- Main Content --------------------- */}
          <article className="border border-[#d1d1d1] overflow-hidden flex flex-col h-full bg-white">
            <div className="w-full h-72 sm:h-92 md:h-110 xl:h-132 relative overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.alt}
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
                    {blog.user}
                  </span>
                </div>

                <div className="flex items-center py-2 sm:py-1 px-7 bg-[#1f2b40] rounded-full">
                  <span className="text-white text-sm sm:text-base">
                    {blog.date}
                  </span>
                </div>

                <div className="flex items-center py-2 sm:py-1 px-7 bg-[#1f2b40] rounded-full">
                  <span className="text-white text-sm sm:text-base">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <h1 className="text-2xl md:text-3xl text-[#3a3636] font-bold">
                  {blog.title}
                </h1>

                <p className="text-[#373737] text-base md:text-lg w-full md:w-[90%]">
                  Deep learning is a subset of machine learning in artificial
                  intelligence that has networks capable of learning
                  unsupervised from data that is unstructured or unlabeled.
                </p>
              </div>

              {/* Sections */}
              <div className="prose prose-lg max-w-none">
                {toc.map((item, idx) => (
                  <section
                    key={item.id}
                    id={item.id}
                    className="scroll-mt-28 border-t border-[#eee] pt-8 mt-8"
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-[#2b2b2b]">
                      {idx + 1}. {item.title}
                    </h2>

                    <p className="text-[#373737] leading-8">
                      {item.title} content goes here...
                    </p>
                  </section>
                ))}
              </div>

              <BlogSocial />
            </div>
          </article>

          {/* --------------------- Aside (Sticky) --------------------- */}

          <aside className="hidden md:block  self-start">
            <div
              ref={stickyRef}
              className="sticky top-24 z-30 bg-white/95 backdrop-blur shadow-2xl border border-[#d1d1d1] rounded-lg overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-[#eee]">
                <p className="font-semibold text-[#1f2b40]">On this page</p>
              </div>

              <nav className="px-2 py-2 max-h-[calc(100vh-140px)] overflow-y-auto">
                <ul className="flex flex-col">
                  {toc.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => scrollToId(item.id)}
                          aria-current={isActive ? "location" : undefined}
                          className={[
                            "w-full text-left px-3 py-2 rounded-md text-sm transition",
                            "hover:bg-[#f5f6f7]",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#660afb]/40",
                            isActive
                              ? "bg-[#f5f6f7] text-[#1f2b40] font-semibold border-l-4 border-[#660afb]"
                              : "text-[#3a3636] border-l-4 border-transparent opacity-85",
                          ].join(" ")}
                        >
                          {item.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
