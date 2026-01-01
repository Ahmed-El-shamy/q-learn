"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Landmark, TriangleAlert } from "lucide-react";
import MainBtn from "@/_components/common/buttons/MainBtn";
import MainTextArea from "@/_components/common/inputs/mainInput/MainTextArea";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useCart } from "@/store/CartProvider";

const PaymentMethods = () => {
  const [receipt, setReceipt] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { clearCart } = useCart();
  const router = useRouter();
  const t = useTranslations("checkout");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReceipt(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receipt) {
      return;
    }
    router.push("/");
  };

  return (
    <div className="w-full md:max-w-2xl lg:max-w-xl xl:max-w-2xl mx-auto space-y-6">
      <div className="border border-[#d1d1d1] rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full gradient-background flex items-center justify-center">
            <Landmark className="text-white" size={30} />
          </div>
        </div>

        <h2 className="text-xl text-[#1f2b40] font-semibold mb-2">
          {t("bank transfer")}
        </h2>

        <p className="text-[#737887] mb-6">
          {t(
            "please upload the bank transfer receipt to proceed with your order"
          )}
        </p>

        {/* Image Upload */}
        <label className="inline-block cursor-pointer">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <MainBtn type="button" onClick={() => inputRef?.current?.click()}>
            {t("upload transfer receipt")}
          </MainBtn>
        </label>

        {/* Image Preview */}
        {preview && (
          <div className="mt-6 flex justify-center">
            <Image
              src={preview}
              alt={t("transfer receipt")}
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="flex gap-3 border border-yellow-300 bg-yellow-50 rounded-lg p-4 text-sm text-yellow-800">
        <TriangleAlert className="-mt-1" />
        <p>
          {t(
            "please make sure the uploaded receipt is clear and includes the transaction details"
          )}
        </p>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-[#1f2b40] font-medium mb-2">
          {t("order notes")}
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t("write your notes here")}
          className="w-full h-28 border border-[#d1d1d1] rounded-md p-3 text-sm focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <form onSubmit={handleSubmit}>
        <div
          className={`flex justify-center transition-opacity ${
            !receipt ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <MainBtn type="submit" disabled={!receipt}>
            {t("complete order")}
          </MainBtn>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethods;
