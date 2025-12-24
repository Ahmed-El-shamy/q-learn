import Avatar from "@/_components/common/avatar/Avatar";
import { CourseQA } from "../course-details.types";
import AnswerCard from "./AnswerCard";

interface QuestionCardProps {
  question: CourseQA;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className="py-4 bg-white">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Question Header */}
        <div className="flex items-start gap-3 sm:gap-4">
          <Avatar
            src={question.user.avatar}
            alt={question.user.name}
            size={48}
            className="w-10 h-10 sm:w-12 sm:h-12 shrink-0"
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
              {question.user.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {new Date(question.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Question Body */}
        <div className="pl-0 sm:pl-14 md:pl-16">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {question.body}
          </p>
        </div>

        {/* Answers */}
        {question.answers && question.answers.length > 0 && (
          <div className="pl-0 sm:pl-14 md:pl-16 space-y-3 sm:space-y-4 mt-2 sm:mt-3">
            <div className="text-xs sm:text-sm font-semibold text-gray-600">
              {question.answers.length} {question.answers.length === 1 ? "Answer" : "Answers"}
            </div>
            {question.answers.map((answer) => (
              <AnswerCard key={answer.id} answer={answer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;

