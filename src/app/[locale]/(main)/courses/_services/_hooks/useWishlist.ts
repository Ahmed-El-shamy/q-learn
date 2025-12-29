"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWishlist } from "../../_quires/wishlist.api";
import { toWishlistMap, type WishlistMap } from "../../_types/wishlist.types";

export const wishlistKeys = {
    all: ["wishlist"] as const,
};

export function useWishlistQuery(enabled: boolean) {
    return useQuery({
        queryKey: wishlistKeys.all,
        queryFn: async (): Promise<WishlistMap> => {
            const items = await fetchWishlist();
            return toWishlistMap(items);
        },
        enabled,
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
    });
}
