"use client";

import { useState, useCallback } from "react";
import api, { Api } from "@/_lib/api/api";
import { useSubmitQuizAttempt } from "./useSubmitQuizAttempt";

interface UseHandleQuizParams {
    quizId: number;
    totalQuestions: number;
}

export function useHandleQuiz({ quizId, totalQuestions }: UseHandleQuizParams) {
    const [examStarted, setExamStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isStartingExam, setIsStartingExam] = useState(false);
    const [attemptId, setAttemptId] = useState<number | null>(null);

    const {
        mutate: submitAttempt,
        data: submitResult,
        isPending: isSubmitting,
        isError: isSubmitError,
        error: submitError,
        reset: resetSubmit,
    } = useSubmitQuizAttempt();

    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

    const handleStartExam = useCallback(async () => {
        try {
            setIsStartingExam(true);
            const response = await api.post<{ id: number }>(
                `${Api.routes.site.quizzes}/${quizId}/start`
            );

            if (response?.data?.id) {
                setAttemptId(response.data.id);
                setExamStarted(true);
            } else {
                throw new Error("Failed to start exam: No attempt ID received");
            }
        } catch (error) {
            console.error("Error starting exam:", error);
            setIsStartingExam(false);
            throw error;
        }
    }, [quizId]);

    const handleNext = useCallback(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex((i) => i + 1);
        }
    }, [currentQuestionIndex, totalQuestions]);

    const handlePrevious = useCallback(() => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((i) => i - 1);
        }
    }, [currentQuestionIndex]);

    const handleAnswerSelect = useCallback((questionId: number, optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionIndex,
        }));
    }, []);

    const handleSubmit = useCallback(() => {
        if (!attemptId) {
            console.error("No attempt ID available");
            return;
        }
        submitAttempt({ attemptId, answers });
    }, [attemptId, answers, submitAttempt]);

    const resetQuiz = useCallback(() => {
        resetSubmit();
        setExamStarted(false);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setAttemptId(null);
        setIsStartingExam(false);
    }, [resetSubmit]);

    const isQuestionAnswered = useCallback(
        (questionId: number) => answers[questionId] !== undefined,
        [answers]
    );

    return {
        examStarted,
        currentQuestionIndex,
        answers,
        isStartingExam,
        attemptId,
        isSubmitting,
        submitResult,
        isSubmitError,
        submitError,
        resetSubmit,
        resetQuiz,
        isLastQuestion,
        isFirstQuestion,
        handleStartExam,
        handleNext,
        handlePrevious,
        handleAnswerSelect,
        handleSubmit,
        isQuestionAnswered,
    };
}
