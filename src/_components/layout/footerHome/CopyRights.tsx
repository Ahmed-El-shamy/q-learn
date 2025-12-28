import Container from "@/_components/common/container/Container";
import { Link } from "@/i18n/navigation";
import React from "react";
interface CopyRightsProps {
  copyRight?: string;
}
const CopyRights: React.FC<CopyRightsProps> = ({ copyRight = "" }) => {
  return (
    <Container>
      <p className="text-center mt-12 text-[16px] md:text-xl">
        {copyRight
          ? copyRight
          : "  Copyright © 2024 qutell. All rights reserved | Made By Qutell"}
      </p>
    </Container>
  );
};

export default CopyRights;
