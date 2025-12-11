import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { CourseChapter as CourseChapterType } from "../course-details.types";
import CourseChapter from "./CourseChapter";

const mockChapters: CourseChapterType[] = [
  {
    title: "Chapter 1: Foundations of Web Development",
    duration: "1h 45m",
    lessons: [
      { name: "What is the Web?", description: "How browsers, servers, and HTTP work together.", duration: "12m", isLocked: false },
      { name: "HTML Building Blocks", description: "Elements, nesting, semantics, and accessibility basics.", duration: "18m", isLocked: false },
      { name: "CSS Essentials", description: "Selectors, the cascade, and layout primitives (flex/grid).", duration: "22m", isLocked: false },
      { name: "JavaScript Primer", description: "Syntax, variables, functions, and the DOM at a glance.", duration: "28m", isLocked: true }
    ],
    expanded: false 
  },
  {
    title: "Chapter 2: Responsive Layouts",
    duration: "1h 30m",
    lessons: [
      { name: "The Box Model Deep Dive", description: "Margin, border, padding, box-sizing, and overflow.", duration: "15m", isLocked: false },
      { name: "Flexbox in Practice", description: "Common patterns: navbars, cards, equal-height columns.", duration: "20m", isLocked: false },
      { name: "Grid for Complex Layouts", description: "Track sizing, areas, and responsive templates.", duration: "24m", isLocked: true },
      { name: "Media Queries & Fluid Sizing", description: "Breakpoints, clamp(), and mobile-first strategies.", duration: "18m", isLocked: true }
    ],
    expanded: false
  },
  {
    title: "Chapter 3: Modern JavaScript",
    duration: "2h 05m",
    lessons: [
      { name: "ES Modules & Tooling", description: "Imports/exports, bundlers, and transpilers overview.", duration: "22m", isLocked: false },
      { name: "Async Patterns", description: "Promises, async/await, and handling errors cleanly.", duration: "26m", isLocked: false },
      { name: "APIs & Fetch", description: "REST basics, JSON handling, and simple auth headers.", duration: "21m", isLocked: true },
      { name: "State & Immutability", description: "Managing shared state and avoiding unintended mutation.", duration: "18m", isLocked: true }
    ],
    expanded: false
  },
  {
    title: "Chapter 4: Frontend Framework Patterns",
    duration: "1h 55m",
    lessons: [
      { name: "Component Architecture", description: "Props vs. state, lifting state, and container/presentational split.", duration: "23m", isLocked: false },
      { name: "Routing Basics", description: "Client-side routing concepts, nested routes, and guards.", duration: "20m", isLocked: false },
      { name: "Data Fetching Strategies", description: "CSR vs SSR vs SSG, caching, and revalidation.", duration: "26m", isLocked: true },
      { name: "Testing UI Components", description: "Unit vs. integration, mocking data, and accessibility checks.", duration: "24m", isLocked: true }
    ],
    expanded: false
  }
];

const CourseContent = () => {
    const t = useTranslations("courses");

    const [chapters, setChapters] = useState<CourseChapterType[]>(mockChapters);

    const ToggleChapter = useCallback((index: number) => {
        setChapters(old => old.map((chapter, i) => i === index ? {...chapter, expanded: !chapter.expanded} : chapter));
    }, []);

    const toggleAllChapters = () => {
      setChapters(old => {
        const willClose = old.every(chapter => chapter.expanded);
        return old.map(chapter => ({...chapter, expanded: !willClose}));
      })
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-3xl font-bold">{t("course-content")}</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 flex-wrap text-xl">
                    <span>3 chapters</span>
                    <span className="text-gray-600">•</span>
                    <span>7 lectures</span>
                    <span className="text-gray-600">•</span>
                    <span>1 quizzes</span>
                    <span className="text-gray-600">•</span>
                    <span>20 Min total length</span>
                </div>
                <button className="text-primary text-xl cursor-pointer" onClick={toggleAllChapters}>
                   {t("toggle-all-chapters")} 
                </button>
            </div>
            <div className="flex flex-col w-full">
                {chapters.map((chapter, index) => (
                    <CourseChapter key={index} index={index} toggleChapter={ToggleChapter} chapter={chapter} />
                ))}
            </div>
        </div>
    );
}

export default CourseContent;