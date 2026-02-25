'use client';

import { useQuery } from "@tanstack/react-query";
import QuizQuery from "../_data/QuizQuery";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import Loader from "@/_components/common/loaders/spinner/Loader";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useHandleQuiz } from "./hooks/useHandleQuiz";

interface QuizComponentProps {
    quizId: number;
}

const QuizComponent = ({ quizId }: QuizComponentProps) => {
    const { data: quiz, isLoading } = useQuery({
        ...QuizQuery(quizId),
        refetchOnMount: false
    });
    const t = useTranslations("courses");
    const locale = useLocale() as "en" | "ar";

    const questions = quiz?.questions || [];
    const totalQuestions = questions.length;

    const {
        examStarted,
        currentQuestionIndex,
        answers,
        isStartingExam,
        isSubmitting,
        submitResult,
        isSubmitError,
        resetQuiz,
        isLastQuestion,
        isFirstQuestion,
        handleStartExam,
        handleNext,
        handlePrevious,
        handleAnswerSelect,
        handleSubmit,
        isQuestionAnswered,
    } = useHandleQuiz({ quizId, totalQuestions });

    const currentQuestion = questions[currentQuestionIndex];
    const isCurrentQuestionAnswered = currentQuestion ? isQuestionAnswered(currentQuestion.id) : false;

    if (isLoading) {
        return (
            <div className="w-full aspect-video h-[60vh] xl:h-[calc(100vh-56px)] bg-white flex items-center justify-center">
                <Loader className="w-12! h-12! border-4!" />
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="w-full aspect-video h-[60vh] xl:h-[calc(100vh-56px)] bg-white p-8">
                <div className="text-gray-600">
                    <p>{t("noContentAvailable")}</p>
                </div>
            </div>
        );
    }

    if (submitResult || isSubmitError) {
        const isPassed = submitResult?.is_passed ?? false;
        const Icon = isPassed ? CheckCircle2 : XCircle;
        const accent = isPassed ? "green" : "red";

        const title = isSubmitError
            ? t("quizSubmitErrorTitle")
            : isPassed
                ? t("quizPassedTitle")
                : t("quizFailedTitle");

        const subtitle = isSubmitError
            ? t("quizSubmitErrorMessage")
            : `${t("yourScore")}: ${submitResult?.score ?? 0}/${submitResult?.max_score ?? 0}`;

        return (
            <div className={`w-full aspect-video h-[60vh] xl:h-[calc(100vh-56px)] bg-white p-8`}>
                <div className="max-w-4xl w-full">
                    <div
                        className={`flex items-start gap-4 rounded-xl border p-6 ${
                            accent === "green"
                                ? "border-green-200 bg-green-50"
                                : "border-red-200 bg-red-50"
                        }`}
                    >
                        <Icon
                            className={`mt-1 h-8 w-8 ${
                                accent === "green" ? "text-green-600" : "text-red-600"
                            }`}
                        />
                        <div className="flex-1">
                            <h2
                                className={`text-xl font-bold ${
                                    accent === "green" ? "text-green-800" : "text-red-800"
                                }`}
                            >
                                {title}
                            </h2>
                            <p
                                className={`mt-1 ${
                                    accent === "green" ? "text-green-700" : "text-red-700"
                                }`}
                            >
                                {subtitle}
                            </p>

                            {!isSubmitError && submitResult && (
                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                                    <div>
                                        <span className="font-semibold">{t("timeTaken")}:</span>{" "}
                                        {submitResult.time_taken_seconds} {t("seconds")}
                                    </div>
                                    <div>
                                        <span className="font-semibold">{t("attemptNumber")}:</span>{" "}
                                        {submitResult.attempt_number}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {submitResult?.quiz?.show_results_immediately && submitResult?.answers?.length ? (
                        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                {t("answersReview")}
                            </h3>
                            <div className="space-y-3">
                                {submitResult.answers.map((a) => (
                                    <div
                                        key={a.id}
                                        className={`flex items-center justify-between rounded-lg border p-4 ${
                                            a.is_correct
                                                ? "border-green-200 bg-green-50"
                                                : "border-red-200 bg-red-50"
                                        }`}
                                    >
                                        <div className="text-sm text-gray-800">
                                            <div className="font-semibold">
                                                {t("question")} #{a.quiz_question_id}
                                            </div>
                                            <div className="text-gray-700">
                                                {t("yourAnswer")}: {a.answer}
                                            </div>
                                        </div>
                                        <div
                                            className={`text-sm font-semibold ${
                                                a.is_correct ? "text-green-700" : "text-red-700"
                                            }`}
                                        >
                                            {a.is_correct ? t("correct") : t("incorrect")}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    <div className="mt-6 flex gap-3">
                        <MainBtn
                            onClick={() => resetQuiz()}
                            variant="secondary"
                        >
                            {t("backToQuiz")}
                        </MainBtn>

                        {isSubmitError ? (
                            <MainBtn
                                onClick={handleSubmit}
                                isLoading={isSubmitting}
                                containerClassName="flex-1"
                            >
                                {t("retrySubmit")}
                            </MainBtn>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }

    // Exam Information Screen
    if (!examStarted) {
        return (
            <div className="w-full aspect-video h-[60vh] xl:h-[calc(100vh-56px)] bg-white p-8">
                <div className="max-w-4xl w-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{quiz.title}</h1>
                    <div 
                        className="text-gray-600 mb-6" 
                        dangerouslySetInnerHTML={{ __html: quiz.description }}
                    />
                    
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">{t("maxAttempts")}</p>
                                <p className="text-lg font-semibold text-gray-800">{quiz.max_attempts}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t("passingScore")}</p>
                                <p className="text-lg font-semibold text-gray-800">{quiz.passing_score}%</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t("timeLimit")}</p>
                                <p className="text-lg font-semibold text-gray-800">{quiz.time_limit_minutes} {t("minutes")}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t("yourAttempts")}</p>
                                <p className="text-lg font-semibold text-gray-800">{quiz.user_attempts} / {quiz.max_attempts}</p>
                            </div>
                        </div>
                    </div>

                    <MainBtn
                        onClick={handleStartExam}
                        containerClassName="w-full"
                        isLoading={isStartingExam}
                    >
                        {t("startExam")}
                    </MainBtn>
                </div>
            </div>
        );
    }

    // Exam Questions Screen
    if (!questions.length || !currentQuestion) {
        return (
            <div className="w-full aspect-video h-[60vh] xl:h-[calc(100vh-56px)] bg-white p-8">
                <div className="text-gray-600">
                    <p>{t("noContentAvailable")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[60vh] xl:h-[calc(100vh-56px)] bg-white p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
                {/* Question Counter */}
                <div className="mb-6">
                    <span className="text-lg font-semibold text-gray-700">
                        {t("question")} {currentQuestionIndex + 1}/{totalQuestions}
                    </span>
                </div>

                {/* Question */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        {currentQuestion.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <label
                                key={index}
                                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                    answers[currentQuestion.id] === index
                                        ? 'border-purple-600 bg-purple-50'
                                        : 'border-gray-200 hover:border-purple-300'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.id}`}
                                    value={index}
                                    checked={answers[currentQuestion.id] === index}
                                    onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="ml-3 text-gray-700">{option[locale]}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <MainBtn
                        onClick={handlePrevious}
                        disabled={isFirstQuestion}
                        variant="secondary"
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft size={20} />
                        {t("previous")}
                    </MainBtn>

                    {isLastQuestion ? (
                        <MainBtn
                            onClick={handleSubmit}
                            disabled={!isCurrentQuestionAnswered}
                            containerClassName="bg-green-600 hover:bg-green-700 border-green-600"
                            className="flex items-center gap-2"
                            isLoading={isSubmitting}
                        >
                            {t("submitAnswers")}
                        </MainBtn>
                    ) : (
                        <MainBtn
                            onClick={handleNext}
                            disabled={!isCurrentQuestionAnswered}
                            variant="main"
                            className="flex items-center gap-2"
                        >
                            {t("next")}
                            <ChevronRight size={20} />
                        </MainBtn>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizComponent;
