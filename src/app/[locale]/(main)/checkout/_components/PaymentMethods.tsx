"use client";

import { useState } from "react";
import { CreditCard, Landmark, Lock } from "lucide-react";
import BankTransfer from "./BankTransfer";
import OnlinePayment from "./OnlinePayment";

const PaymentMethods = () => {
  const [method, setMethod] = useState<"online" | "bank">("online");

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-[#1f2b40]">Payment Method</h2>

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setMethod("online")}
          className={`flex-1 border rounded-lg p-4 flex items-center gap-3 transition
            ${
              method === "online"
                ? "border-[#635BFF] bg-[#F4F3FF]"
                : "border-gray-200"
            }`}
        >
          <CreditCard />
          <div>
            <p className="font-medium">Online Payment</p>
            <span className="text-sm text-gray-500">
              Card / Apple Pay / Google Pay
            </span>
          </div>
        </button>

        {/* <button
          onClick={() => setMethod("bank")}
          className={`flex-1 border rounded-lg p-4 flex items-center gap-3 transition
            ${
              method === "bank"
                ? "border-[#635BFF] bg-[#F4F3FF]"
                : "border-gray-200"
            }`}
        >
          <Landmark />
          <div>
            <p className="font-medium">Bank Transfer</p>
            <span className="text-sm text-gray-500">Upload receipt</span>
          </div>
        </button> */}
      </div>

      {/* Content */}
      {method === "online" ? <OnlinePayment /> : <BankTransfer />}

      {/* Trust */}
      <div className="flex items-center gap-2 text-sm text-gray-500 pt-4">
        <Lock size={16} />
        Payments are secured & encrypted
      </div>
    </div>
  );
};

export default PaymentMethods;
