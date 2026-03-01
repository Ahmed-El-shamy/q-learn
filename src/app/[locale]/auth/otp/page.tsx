import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import OTPFrom from "./_components/OTPFrom";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.otp" });
  return {
    title: t("pageTitle"),
  };
}

const OTPPage = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-2">
      <div className="max-w-lg w-full">
        <OTPFrom />
      </div>
    </div>
  );
};

export default OTPPage;
