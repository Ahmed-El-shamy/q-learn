import Container from "@/_components/common/container/Container";
import { Link } from "@/i18n/navigation";
import React from "react";

const CopyRights = () => {
  return (
    <Container>
      <p className="text-center mt-12 text-[16px] md:text-xl">
        Copyright © 2024 qutell. All rights reserved | Made By{" "}
        <Link href={""} className="text-[#660af5]">
          Qutell
        </Link>
      </p>
    </Container>
  );
};

export default CopyRights;
