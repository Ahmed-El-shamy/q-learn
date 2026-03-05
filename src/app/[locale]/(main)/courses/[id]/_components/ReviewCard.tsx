import { useLocale } from "next-intl";
import Rate from "../../_components/Rate";
import Avatar from "@/_components/common/avatar/Avatar";

interface ReviewCardProps {
    review: {
        id: number;
        rating: number;
        review: string;
        user: {
            id: number;
            name: string;
        };
        created_at: string;
    };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    const locale = useLocale();
    const createdAt = new Date(review.created_at).toLocaleDateString(locale === "en" ? "en-GB" : "ar", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }); 

    return (
        <div className="border border-gray-300 rounded-lg p-3 sm:p-4 md:p-5 bg-white">
            <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar
                            src="/"
                            alt={review.user.name}
                            size={48}
                            className="w-9 h-9 sm:w-10 sm:h-10 shrink-0"
                        />
                        <p className="font-semibold text-xs sm:text-sm md:text-base text-gray-900">
                            {review.user.name}
                        </p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                        {createdAt}
                    </p>
                </div>
                <Rate rate={review.rating} size={16} />
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {review.review}
                </p>
            </div>
        </div>
    );
};

export default ReviewCard;

