import type { Settings } from "@/types/settings.types";
import api, { Api } from "../api/api";
export async function getSettings() {
    const res = await api.get(Api.routes.site.settings);
    return res?.data as Settings || {}
}
