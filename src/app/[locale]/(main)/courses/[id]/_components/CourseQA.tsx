import { useTranslations } from "next-intl";
import type { CourseQA } from "../course-details.types";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import CourseQAInput from "./CourseQAInput";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { courseQAQuery } from "../_data/CourseDetailsQuery";
import CourseQASkeleton from "@/_components/common/loaders/skeltons/CourseQASkeleton";
import QuestionCard from "./QuestionCard";

const CourseQA = () => {
  const t = useTranslations("courses");
  const baseT = useTranslations();
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const params: {id: string} = useParams();

  const {data: qaData, isLoading: qaLoading} = useQuery({
    ...courseQAQuery(params.id),
    refetchOnMount: false
  });

  if (qaLoading) {
    return <CourseQASkeleton />;
  }

  const qaList = qaData && Array.isArray(qaData) ? qaData : [];

  return (
    <div>
        <p className="pb-3 sm:pb-4 text-xl sm:text-2xl md:text-3xl font-bold">
            {t("qa.title")}
        </p>
        <div>
            {
                qaList.length > 0 ? (
                    qaList.map((question) => (
                        <QuestionCard key={question.id} question={question} />
                    ))
                ) : (
                    <div className="py-4 sm:py-5 md:py-6 text-xs sm:text-sm md:text-base text-gray-500 text-center">
                        {t("qa.no-questions") || "No questions yet. Be the first to ask!"}
                    </div>
                )
            }
        </div>
        <div className="mt-4">
          {
            !isAuthenticated ? (
              <div className="flex flex-col xl:flex-row xl:justify-between text-nowrap items-start xl:items-center gap-2 sm:gap-1 mt-4">
                <div className="text-xs sm:text-sm md:text-base">
                  {t("qa.login-to-ask")}
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2 [&>a]:hover:underline [&>a]:cursor-pointer [&>a]:text-blue-500 text-xs sm:text-sm md:text-base">
                  <Link href="/auth/login">
                    {baseT("auth.login.login")}
                  </Link>
                  <p>
                    {baseT("or")}
                  </p>
                  <Link href="/auth/register">
                    {baseT("auth.signup")}
                  </Link>
                  <p>
                    {t("as-a-student")}
                  </p>
                  <p>
                    {t("to-ask-a-question")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <p className="text-xs sm:text-sm md:text-base">
                  {t("qa.ask-question")}
                </p>
                <div className="text-xs sm:text-sm md:text-base w-full sm:w-auto">
                  <CourseQAInput />
                </div>
              </div>
            )
          }
        </div>
    </div>
  );
};

export default CourseQA;