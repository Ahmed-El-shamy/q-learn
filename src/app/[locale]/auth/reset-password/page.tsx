import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ResetPasswordForm from "./_components/ResetPasswordForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.resetPassword" });
  return {
    title: t("pageTitle"),
  };
}

const ResetPasswordPage = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-2">
      <div className="max-w-lg w-full">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
