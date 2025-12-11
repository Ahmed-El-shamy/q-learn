import { useTranslations } from "next-intl";
import type { CourseQA } from "../course-details.types";
import Image from "next/image";

const mockQA: CourseQA[] = [
  {
    text: "Is the course suitable for beginners?",
    picture: "/images/600x600.jpg",
    username: "alice23",
    date: "2024-11-01",
    replies: [
      {
        text: "Yes, the first two modules start from absolute basics.",
        picture: "/images/600x600.jpg",
        username: "instructor",
        date: "2024-11-02",
      },
    ],
  },
  {
    text: "How long do I have access to the materials?",
    picture: "/images/600x600.jpg",
    username: "bob_dev",
    date: "2024-11-05",
    replies: [
      {
        text: "You get lifetime access including future updates.",
        picture: "/images/600x600.jpg",
        username: "instructor",
        date: "2024-11-06",
      },
      {
        text: "Confirmed, I revisited after a month and content was still there.",
        picture: "/images/600x600.jpg",
        username: "charlie",
        date: "2024-11-07",
      },
    ],
  },
];

const CourseQA = () => {
  const t = useTranslations("courses");
  return (
    <div>
        <p className="pb-4 text-3xl font-bold">
            {t("qa.title")}
        </p>
        <div>
            {
                mockQA.map(question => (
                    <>
                        <div className="flex gap-4 py-6 border-b border-b-gray-300">
                            <Image 
                                height={50}
                                width={50}
                                src={question.picture}
                                alt="question-writer"
                                className="rounded-full w-fit h-fit"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-lg">
                                    {question.username}
                                </p>
                                <p className="text-gray-500">
                                    {question.date}
                                </p>
                                <p>
                                    {question.text}
                                </p>
                            </div>
                        </div>
                        {
                            question.replies.length && (
                                <div className="px-10">
                                    {
                                        question.replies.map(reply => (
                                            <div className="flex gap-4 py-8 border-b border-b-gray-300">
                                                <Image 
                                                    height={50}
                                                    width={50}
                                                    src={reply.picture}
                                                    alt="reply-writer"
                                                    className="rounded-full w-fit h-fit"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-lg">
                                                        {reply.username}
                                                    </p>
                                                    <p className="text-gray-500">
                                                        {reply.date}
                                                    </p>
                                                    <p>
                                                        {reply.text}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </>
                ))
            }
        </div>
    </div>
  );
};

export default CourseQA;