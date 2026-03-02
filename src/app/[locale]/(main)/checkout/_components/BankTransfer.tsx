"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import MainBtn from "@/_components/common/buttons/MainBtn";

const BankTransfer = () => {
  const t = useTranslations("checkout");
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="border rounded-xl p-6 space-y-6">
      <h3 className="font-semibold text-lg">{t("bank transfer")}</h3>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={onChange}
      />

      <MainBtn onClick={() => inputRef.current?.click()}>
        {t("upload transfer receipt")}
      </MainBtn>

      {preview && (
        <Image
          src={preview}
          alt={t("transfer receipt")}
          width={200}
          height={200}
          className="rounded-lg"
        />
      )}
    </div>
  );
};

export default BankTransfer;
