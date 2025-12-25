"use client";
import { useTranslations } from "next-intl";
import { BadgeAlert, RotateCw } from "lucide-react";
interface ErrorHandlerProps {
  title?: string;
  buttonLabel?: string;
}
const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  title = "Something went wrong",
  buttonLabel = "Retry",
}) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-red-100 border border-red-300 text-red-800 shadow-md my-7">
      <BadgeAlert className="w-10 h-10 text-red-600" />
      <p className="font-medium text-center">{t(title)}</p>
      <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition">
        <RotateCw className="w-4 h-4" />
        {t(buttonLabel)}
      </button>
    </div>
  );
};

export default ErrorHandler;
