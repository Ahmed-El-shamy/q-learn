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
    };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 sm:p-5 md:p-6 bg-white">
            <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    <Avatar
                        src="/"
                        alt={review.user.name}
                        size={48}
                        className="w-10 h-10 sm:w-12 sm:h-12 shrink-0"
                    />
                    <p className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
                        {review.user.name}
                    </p>
                </div>
                <Rate rate={review.rating} size={16} />
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {review.review}
                </p>
            </div>
        </div>
    );
};

export default ReviewCard;

