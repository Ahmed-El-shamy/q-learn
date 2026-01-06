import api, { Api } from "@/_lib/api/api";
import type { WishlistApiItem } from "../_types/wishlist.types";

export async function fetchWishlist(): Promise<WishlistApiItem[]> {
    const res = await api.get<WishlistApiItem[]>(Api.routes.site.myWishlists);
    if (!res?.status) throw res;
    return (res.data ?? []) as WishlistApiItem[];
}

export async function toggleWishlist(courseId: number) {
    const res = await api.post<null>(
        Api.routes.site.myWishlists,
        { course_id: courseId },
        { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (!res?.status) throw res;

    return {
        message: res.message ?? "Wishlist updated",
    };
}
