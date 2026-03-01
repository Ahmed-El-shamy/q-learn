"use client";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { settingsOptions } from "../_queries/settingsOptions";

const LOGO_HEIGHT = 40; // fixed height in px

export default function AuthLogo() {
  const { data: settings } = useSuspenseQuery(settingsOptions());
  const logoUrl = settings?.site_logo ?? "/logo-placeholder.jpg";

  return (
    <Link
      prefetch={false}
      href="/"
      className="relative flex items-center"
      style={{ height: LOGO_HEIGHT }}
    >
      <img
        src={logoUrl}
        alt="Logo"
        className="relative h-full w-auto object-contain"
      />
    </Link>
  );
}
