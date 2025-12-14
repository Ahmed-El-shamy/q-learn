import { Star } from "lucide-react";

interface Props {
    rate: number;
    size?: number;
}

const Rate = ({ rate, size=20 }: Props) => {
    const roundedRating = Math.floor(rate * 2) / 2
    return (
        <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => {
                  const fillAmount = Math.max(
                    0,
                    Math.min(1, roundedRating - index)
                  );

                  return (
                    <span
                      key={index}
                      className="relative inline-flex w-5 h-5"
                      aria-label="rating-star"
                    >
                      <Star size={size} fill="var(--color-purple-200)" className="absolute inset-0 text-purple-300" />
                      <span
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: `${fillAmount * 100}%` }}
                      >
                        <Star className="text-purple-500" fill="var(--color-purple-500)" size={size} />
                      </span>
                    </span>
                  );
                })}
        </div>
    )
}

export default Rate;