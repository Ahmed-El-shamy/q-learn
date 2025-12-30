"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Landmark, TriangleAlert } from "lucide-react";
import MainBtn from "@/_components/common/buttons/MainBtn";
import MainTextArea from "@/_components/common/inputs/mainInput/MainTextArea";

const PaymentMethods = () => {
  const [receipt, setReceipt] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReceipt(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!receipt) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="border border-[#d1d1d1] rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full gradient-background flex items-center justify-center">
            <Landmark className="text-white" size={30} />
          </div>
        </div>

        <h2 className="text-xl text-[#1f2b40] font-semibold mb-2">
          Bank Transfer
        </h2>

        <p className="text-[#737887] mb-6">
          Please upload the bank transfer receipt to proceed with your order.
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
            Upload Transfer Receipt
          </MainBtn>
        </label>

        {/* Image Preview */}
        {preview && (
          <div className="mt-6 flex justify-center">
            <Image
              src={preview}
              alt="Transfer Receipt"
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
          Please make sure the uploaded receipt is clear and includes the
          transaction details.
        </p>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-[#1f2b40] font-medium mb-2">
          Order Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes here..."
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
            Complete Order
          </MainBtn>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethods;
