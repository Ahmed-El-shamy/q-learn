"use client";

import { useMutation } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import type { QuizAttemptSubmitResponse } from "@/app/[locale]/(main)/courses/_types/course.types";

export interface SubmitQuizAttemptPayload {
    attemptId: number;
    answers: Record<number, number>;
}

function formatAnswers(answers: Record<number, number>) {
    return Object.entries(answers).map(([questionId, answer]) => ({
        question_id: parseInt(questionId, 10),
        answer: answer + 1,
    }));
}

export function useSubmitQuizAttempt() {
    return useMutation<QuizAttemptSubmitResponse, unknown, SubmitQuizAttemptPayload>({
        mutationKey: [Api.routes.site.quizAttempts, "submit"],
        mutationFn: async ({ attemptId, answers }: SubmitQuizAttemptPayload) => {
            const payload = { answers: formatAnswers(answers) };
            const response = await api.post(
                `${Api.routes.site.quizAttempts}/${attemptId}/submit`,
                payload
            );
            return response?.data as QuizAttemptSubmitResponse;
        },
        onSuccess: (data) => {
            console.log("Quiz submission successful:", data);
        },
    });
}
