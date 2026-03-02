"use client";

import { useTranslations } from "next-intl";
import PaymentMethods from "./_components/PaymentMethods";
import OrderDetails from "./_components/OrderDetails";

const Page = () => {
  const t = useTranslations("checkout");
  return (
    <section className="min-h-screen bg-[#F8F9FB] py-16">
      <div className="containerr">
        <h1 className="text-3xl font-semibold text-[#1f2b40] mb-10">
          {t("title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment */}
          <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm">
            <PaymentMethods />
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-8 shadow-sm sticky top-10">
            <OrderDetails />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
