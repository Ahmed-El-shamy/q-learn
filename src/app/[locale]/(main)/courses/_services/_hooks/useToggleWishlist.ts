"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { wishlistKeys } from "./useWishlist";
import type { WishlistMap } from "../../_types/wishlist.types";
import { toggleWishlist } from "../../_quires/wishlist.api";

type Options = {
    courseId?: number;
    isAuthed: boolean;
    onRequireAuth: () => void;
    messages?: {
        added?: string;
        removed?: string;
        failed?: string;
    };
};

export function useToggleWishlist({
    courseId,
    isAuthed,
    onRequireAuth,
    messages,
}: Options) {
    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            if (!courseId) throw new Error("Missing courseId");
            if (!isAuthed) {
                onRequireAuth();
                throw new Error("UNAUTH");
            }
            return toggleWishlist(courseId);
        },

        onMutate: async () => {
            if (!courseId || !isAuthed) return;

            await qc.cancelQueries({ queryKey: wishlistKeys.all });

            const prev = qc.getQueryData<WishlistMap>(wishlistKeys.all) ?? {};
            const cid = Number(courseId);
            const wasWished = Boolean(prev[cid]);

            qc.setQueryData<WishlistMap>(wishlistKeys.all, (old = {}) => {
                const next = { ...old };
                if (next[cid]) delete next[cid];
                else next[cid] = -Date.now();
                return next;
            });

            return { prev, wasWished };
        },

        onError: (err, _vars, ctx) => {
            if ((err as any)?.message === "UNAUTH") return;

            qc.setQueryData(wishlistKeys.all, ctx?.prev ?? {});
            toast.error(messages?.failed ?? "Could not update wishlist");
        },

        onSuccess: (_res, _vars, ctx) => {
            if (ctx?.wasWished) {
                toast.success(messages?.removed ?? "Removed from wishlist");
            } else {
                toast.success(messages?.added ?? "Added to wishlist");
            }
        },

        onSettled: () => {
            qc.invalidateQueries({ queryKey: wishlistKeys.all });
        },
    });

    return {
        toggle: mutation.mutate,
        isPending: mutation.isPending,
    };
}
