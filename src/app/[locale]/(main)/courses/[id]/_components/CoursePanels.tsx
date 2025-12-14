"use client";

import { useRef, useState } from "react";
import CourseOverview from "./CourseOverview";
import { useTranslations } from "next-intl";
import CourseContent from "./CourseContent";
import CourseInstructor from "./CourseInstructor";
import CourseRating from "./CourseRating";
import CourseQA from "./CourseQA";
import MainBtn from "@/_components/common/buttons/MainBtn";
import StudentsAlsoBought from "./StudentsAlsoBought";

const panels = [
    {
        title: "overview"
    },
    {
        title: "content"
    },
    {
        title: "instructor"
    },
    {
        title: "QA"
    },
    {
        title: "reviews"
    },
] as const;

const overview = `<div>
    <h2 class="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold mb-2">Course Requirements</h2>
    <p class="mb-4 sm:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
        Basic understanding of PHP programming language. Familiarity with web development concepts like HTML, CSS, and JavaScript.
    </p>

    <h2 class="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold mb-2">Course Description</h2>
    <p class="mb-4 sm:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
        Learn Laravel PHP framework from basics to advanced through practical projects. Master database integration, authentication, and complex application development with Laravel.
    </p>

    <h2 class="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold mb-2">Course Outcomes</h2>
    <p class="text-xs sm:text-sm md:text-base leading-relaxed">
        By the end of the course, you will be proficient in Laravel framework, capable of building scalable web applications, implementing RESTful APIs, and integrating third-party services.
    </p>
</div>
`

const CoursePanels = () => {
    const [currentPanel, setCurrentPanel] = useState<typeof panels[number]["title"]>(panels[0].title);
    const panelsRef = useRef<HTMLDivElement>(null);

    function renderActivePanel() {
        switch(currentPanel) {
            case "overview":
                return (
                    <CourseOverview
                        overview={overview}
                    />
                )
            case "content":
                return (
                    <CourseContent />
                )
            case "instructor":
                return (
                    <CourseInstructor />
                )
            case "reviews":
                return (
                    <CourseRating />
                )
            case "QA":
                return (
                    <CourseQA />
                )
        }
    }

    function changeActivePanel(title: typeof panels[number]["title"]) {
        panelsRef.current?.scrollIntoView({behavior: "smooth"});
        setCurrentPanel(title);
    }

    return (
        <div className="rounded-lg mx-auto max-w-[600px] md:max-w-[800px] lg:max-w-[1400px] px-2 md:px-8 pt-6">
            <div className="w-full lg:w-2/3 bg-white border shadow-md rounded py-2 px-4">
                <div className="h-0" ref={panelsRef} />
                <div className="flex items-center gap-2 w-full py-1 overflow-x-auto sticky top-0 bg-white z-40">
                    {panels.map(panel => (
                        <MainBtn variant={currentPanel === panel.title ? "main" : "secondary"} className={currentPanel === panel.title ? "pointer-events-none" : ""}  onClick={() => changeActivePanel(panel.title)} key={panel.title}>
                            {panel.title}
                        </MainBtn>
                    ))}
                </div>
                <div className="py-10">
                    {renderActivePanel()}
                </div>
                <StudentsAlsoBought />
            </div>
        </div>
    )
}

export default CoursePanels;