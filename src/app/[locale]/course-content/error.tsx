"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useTranslations } from "next-intl";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
    const t = useTranslations("Error");
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
            <div className="max-w-md space-y-6 p-6">
                <div className="flex justify-center">
                    <div className="rounded-full bg-red-100 p-4">
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-[#1f2b40]">
                        {t("title")}
                    </h2>
                    <p className="text-gray-600">
                        {t("description")}
                    </p>
                    {error?.message && (
                        <p className="text-sm text-gray-500 mt-2 p-3 bg-gray-100 rounded">
                            {error.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <MainBtn
                        onClick={reset}
                        containerClassName="w-full sm:w-auto"
                    >
                        {t("tryAgain")}
                    </MainBtn>
                    <Link href="/">
                        <MainBtn
                            variant="secondary"
                            containerClassName="w-full sm:w-auto"
                        >
                            {t("goToHomepage")}
                        </MainBtn>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;