"use client";

import { useTranslations } from "next-intl";
import { CreditCard, Lock } from "lucide-react";

const PaymentMethods = () => {
  const t = useTranslations("checkout");

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-[#1f2b40]">{t("paymentMethod")}</h2>

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          type="button"
          className="flex-1 border rounded-lg p-4 flex items-center gap-3 transition border-[#00C950] bg-[#ECFDF3]"
        >
          <CreditCard />
          <div>
            <p className="font-medium text-start">{t("onlinePayment")}</p>
            <span className="text-sm text-gray-500">
              {t("onlinePaymentDescription")}
            </span>
          </div>
        </button>
      </div>

      {/* Trust */}
      <div className="flex items-center gap-2 text-sm text-gray-500 pt-4">
        <Lock size={16} />
        {t("paymentsSecured")}
      </div>
    </div>
  );
};

export default PaymentMethods;
