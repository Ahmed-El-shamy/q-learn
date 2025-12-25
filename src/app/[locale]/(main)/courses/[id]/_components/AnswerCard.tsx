import Avatar from "@/_components/common/avatar/Avatar";
import { CourseQAAnswer } from "../course-details.types";

interface AnswerCardProps {
  answer: CourseQAAnswer;
}

const AnswerCard = ({ answer }: AnswerCardProps) => {
  return (
    <div className="border-l-2 border-gray-200 pl-3 sm:pl-4 md:pl-5 py-2 sm:py-3 bg-gray-50 rounded-r">
      <div className="flex flex-col gap-2 sm:gap-3">
        {/* Answer Header */}
        <div className="flex items-start gap-2 sm:gap-3">
          <Avatar
            src={answer.user.avatar}
            alt={answer.user.name}
            size={40}
            className="w-8 h-8 sm:w-10 sm:h-10 shrink-0"
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="font-semibold text-xs sm:text-sm md:text-base text-gray-900">
              {answer.user.name}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(answer.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Answer Body */}
        <div className="pl-0 sm:pl-10 md:pl-12">
          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
            {answer.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;

