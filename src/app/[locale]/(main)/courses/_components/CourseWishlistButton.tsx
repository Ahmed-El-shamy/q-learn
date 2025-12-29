"use client";

import React, { useMemo } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";

import {
  useWishlistQuery,
  wishlistKeys,
} from "../_services/_hooks/useWishlist";
import type { WishlistMap } from "../_types/wishlist.types";
import { useToggleWishlist } from "../_services/_hooks/useToggleWishlist";
import { useRequireAuthToast } from "../../_features/auth/requireAuthToast";

export function CourseWishlistButton({ courseId }: { courseId?: number }) {
  const tCourse = useTranslations("courseCard");
  const tCommon = useTranslations("common");
  const { status } = useSession();
  const authed = status === "authenticated";

  // ✅ fetch wishlist only if authed
  useWishlistQuery(authed);

  const qc = useQueryClient();
  const map = qc.getQueryData<WishlistMap>(wishlistKeys.all) ?? {};
  const isWished = courseId ? Boolean(map[Number(courseId)]) : false;

  const requireAuthToast = useRequireAuthToast();

  const { toggle, isPending } = useToggleWishlist({
    courseId,
    isAuthed: authed,
    onRequireAuth: () => requireAuthToast(tCourse("loginRequiredForWishlist")),
    messages: {
      added: tCourse("wishlistAdded"),
      removed: tCourse("wishlistRemoved"),
      failed: tCourse("wishlistFailed"),
    },
  });

  const label = useMemo(
    () => (isWished ? tCourse("removeFromWishlist") : tCourse("addToWishlist")),
    [isWished, tCourse]
  );

  return (
    <button
      type="button"
      onClick={() => toggle()}
      aria-label={label}
      aria-pressed={isWished}
      disabled={!courseId || isPending}
      className=" cursor-pointer duration-300 hover:scale-105
        absolute top-5 end-5 z-20
        h-10 w-10 rounded-full grid place-items-center
        bg-white/90 backdrop-blur border border-black/5 shadow-sm
        transition-all  hover:bg-white hover:shadow active:scale-95
        disabled:opacity-60 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b633ff]/60
      "
    >
      <Heart
        size={18}
        className={`
          transition-colors duration-200
          ${isWished ? "fill-[#b633ff] text-[#b633ff]" : "text-[#1f2b40]"}
        `}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
