import { useTranslations } from "next-intl";
import Rate from "../../_components/Rate";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import CourseRatingInput from "./CourseRatingInput";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import CourseDetailsQuery, { courseReviewsQuery } from "../_data/CourseDetailsQuery";
import CourseRatingSkeleton from "@/_components/common/loaders/skeltons/CourseRatingSkeleton";
import ReviewCard from "./ReviewCard";
import { Review } from "../../_types/course.types";

const CourseRating = () => {
    const t = useTranslations("courses");
    const session = useSession();
    const isAuthenticated = session.status === "authenticated";
    const params: {id: string} = useParams();

    const {data: reviewsData, isLoading: reviewsLoading} = useQuery({
        ...courseReviewsQuery(params.id),
        refetchOnMount: false
    });

    const {data: course} = useQuery({
        ...CourseDetailsQuery(params.id),
        refetchOnMount: false
    });

    const averageRating = course?.average_rating ? parseFloat(course.average_rating) : 0;

    const ratingsBreakdown = useMemo(() => {
        if (!reviewsData || !Array.isArray(reviewsData) || !reviewsData.length) {
            return {
                1: { count: 0, percentage: 0 },
                2: { count: 0, percentage: 0 },
                3: { count: 0, percentage: 0 },
                4: { count: 0, percentage: 0 },
                5: { count: 0, percentage: 0 },
            };
        }

        const ratings = reviewsData.map((review) => review.rating).filter((rating) => rating != null);
        const totalRatings = ratings.length;

        const breakdown = ratings.reduce((acc: Record<number, { count: number; percentage: number }>, rating: number) => {
            if (rating >= 1 && rating <= 5) {
                if (!acc[rating]) {
                    acc[rating] = { count: 0, percentage: 0 };
                }
                acc[rating].count += 1;
            }
            return acc;
        }, {} as Record<number, { count: number; percentage: number }>);

        // Calculate percentages and ensure all ratings 1-5 are present
        const result: Record<number, { count: number; percentage: number }> = {};
        for (let i = 1; i <= 5; i++) {
            const count = breakdown[i]?.count || 0;
            result[i] = {
                count,
                percentage: totalRatings > 0 ? (count / totalRatings) * 100 : 0,
            };
        }

        return result;
    }, [reviewsData]);

    if (reviewsLoading) {
        return <CourseRatingSkeleton />;
    }

    return (
        <div>
            <p className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">
                {t("course-full-rating")}
            </p>
            <div className="rounded border-gray-300 border p-2.5 sm:p-3 md:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        {averageRating.toFixed(1)}
                    </p>
                    <Rate rate={averageRating} />
                    <p className="text-xs sm:text-sm md:text-base font-bold text-gray-500">
                        {t("course-rating")}
                    </p>
                </div>
                <div className="flex-1 flex flex-col gap-1.5 sm:gap-2 md:gap-3">
                    {
                        Array(5).fill(1).map((num, i) => num + i).map(rate => {
                            const ratingDetails = ratingsBreakdown[rate];
                            return (
                                <div key={rate} className="w-full flex items-center gap-1.5 sm:gap-2">
                                    <div className="flex-1 rounded-full bg-gray-200/60 h-full">
                                        <div className="rounded-full main-background h-full" style={{ width: `${ratingDetails.percentage}%` }}></div>
                                    </div>
                                    <Rate rate={rate} size={16} />
                                    <p className="text-xs sm:text-sm">
                                        ({ratingDetails.count})
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                {
                    !isAuthenticated ?
                        <div className="flex flex-col sm:flex-row justify-between text-nowrap items-start sm:items-center gap-2 sm:gap-1 mt-3">
                            <div className="text-xs sm:text-sm md:text-base">
                                {t("no-reviews")}
                            </div>
                            <p className="text-xs sm:text-sm md:text-base [&>a]:hover:underline [&>a]:text-blue-500 [&>a]:font-medium">
                                {t.rich("login-to-leave-review", {
                                    login: (chunks) => <Link href="/auth/login">{chunks}</Link>,
                                })}
                            </p>
                        </div>
                        :
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-3">
                            <p className="text-xs sm:text-sm md:text-base">
                                {reviewsData && Array.isArray(reviewsData) && reviewsData.length > 0 
                                    ? t("review-the-course") 
                                    : t("be-the-first-reviewer")}
                            </p>
                            <div className="text-xs sm:text-sm md:text-base">
                                <CourseRatingInput />
                            </div>
                        </div>
                }
            </div>
            {reviewsData && Array.isArray(reviewsData) && reviewsData.length > 0 && (
                <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                    {reviewsData
                        .filter((review) => review.is_active && review.status === "approved")
                        .map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                </div>
            )}
        </div>
    );
}

export default CourseRating;