"use client";

import { useMutation } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";

export interface SubmitQuizAttemptPayload {
    attemptId: number;
    answers: Record<number, number>;
}

function formatAnswers(answers: Record<number, number>) {
    return Object.entries(answers).map(([questionId, answer]) => ({
        question_id: parseInt(questionId, 10),
        answer,
    }));
}

export function useSubmitQuizAttempt() {
    return useMutation({
        mutationKey: [Api.routes.site.quizAttempts, "submit"],
        mutationFn: async ({ attemptId, answers }: SubmitQuizAttemptPayload) => {
            const payload = { answers: formatAnswers(answers) };
            const response = await api.post(
                `${Api.routes.site.quizAttempts}/${attemptId}/submit`,
                payload
            );
            return response?.data;
        },
        onSuccess: (data) => {
            console.log("Quiz submission successful:", data);
        },
    });
}
