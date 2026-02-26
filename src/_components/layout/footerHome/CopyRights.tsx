"use client";

import Container from "@/_components/common/container/Container";
import React from "react";
import { useTranslations } from "next-intl";

interface CopyRightsProps {
  copyRight?: string;
}

const CopyRights: React.FC<CopyRightsProps> = ({ copyRight = "" }) => {
  const t = useTranslations("footer");
  return (
    <Container>
      <p className="text-center mt-12 text-[16px] md:text-xl">
        {copyRight || t("copyrightDefault")}
      </p>
    </Container>
  );
};

export default CopyRights;
