import api, { Api } from "@/_lib/api/api";
import { queryOptions } from "@tanstack/react-query";
import { Quiz } from "@/app/[locale]/(main)/courses/_types/course.types";

const QuizQuery = (quizId: number | string) => queryOptions({
    queryKey: [Api.routes.site.quizzes, quizId],
    enabled: Boolean(quizId),
    queryFn: async () => {
        const response = await api.get<Quiz>(`${Api.routes.site.quizzes}/${quizId}`);
        return response?.data;
    },
});

export default QuizQuery;
