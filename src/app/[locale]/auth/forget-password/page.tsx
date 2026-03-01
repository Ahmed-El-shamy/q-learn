import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ForgetPasswordForm from "./_components/ForgetPasswordForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.forgetPassword" });
  return {
    title: t("pageTitle"),
  };
}

const ForgetPasswordPage = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-2">
      <div className="max-w-lg w-full">
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
