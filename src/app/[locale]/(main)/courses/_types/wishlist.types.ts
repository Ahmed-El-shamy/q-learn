
export type WishlistApiItem = {
    id: number;
    course: { id: number };
    [key: string]: any;
};

export type WishlistMap = Record<number, number>;

export function toWishlistMap(items: WishlistApiItem[] = []): WishlistMap {
    const map: WishlistMap = {};
    for (const w of items) {
        const cid = Number(w?.course?.id);
        const wid = Number(w?.id);
        if (cid && wid) map[cid] = wid;
    }
    return map;
}
