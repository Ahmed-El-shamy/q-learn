// import api, { Api } from "@/_lib/api/api";
// import type { WishlistApiItem } from "../_types/wishlist.types";

// export async function fetchWishlist(): Promise<WishlistApiItem[]> {
//     const res = await api.get<WishlistApiItem[]>(Api.routes.site.myWishlists);
//     if (!res?.status) throw res;
//     return (res.data ?? []) as WishlistApiItem[];
// }

// export async function addToWishlist(courseId: number) {
//     const res = await api.post<null>(
//         Api.routes.site.myWishlists,
//         { course_id: courseId },
//         { headers: { "Content-Type": "multipart/form-data" } }
//     );
//     if (!res?.status) throw res;
//     return res.message ?? "Added to Wishlist";
// }

// export async function removeFromWishlist(wishlistId: number) {
//     const res = await api.delete<null>(`${Api.routes.site.myWishlists}/${wishlistId}`);
//     if (!res?.status) throw res;
//     return res.message ?? "Removed from Wishlist";
// }
import api, { Api } from "@/_lib/api/api";
import type { WishlistApiItem } from "../_types/wishlist.types";

export async function fetchWishlist(): Promise<WishlistApiItem[]> {
    const res = await api.get<WishlistApiItem[]>(Api.routes.site.myWishlists);
    if (!res?.status) throw res;
    return (res.data ?? []) as WishlistApiItem[];
}

// ✅ one endpoint toggle (add/remove)
export async function toggleWishlist(courseId: number) {
    const res = await api.post<null>(
        Api.routes.site.myWishlists, // لو عندك route جديد غيّره هنا
        { course_id: courseId },
        { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (!res?.status) throw res;

    return {
        message: res.message ?? "Wishlist updated",
    };
}
