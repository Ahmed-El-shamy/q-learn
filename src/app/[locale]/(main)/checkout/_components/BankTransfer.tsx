"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import MainBtn from "@/_components/common/buttons/MainBtn";

const BankTransfer = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="border rounded-xl p-6 space-y-6">
      <h3 className="font-semibold text-lg">Bank Transfer</h3>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={onChange}
      />

      <MainBtn onClick={() => inputRef.current?.click()}>
        Upload Receipt
      </MainBtn>

      {preview && (
        <Image
          src={preview}
          alt="Receipt"
          width={200}
          height={200}
          className="rounded-lg"
        />
      )}
    </div>
  );
};

export default BankTransfer;
