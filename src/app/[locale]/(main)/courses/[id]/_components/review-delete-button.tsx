"use client";
import Dialog from "@/_components/common/dialog/Dialog";
import api, { Api } from "@/_lib/api/api";
import { Trash2 } from "lucide-react"
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const ReviewDeleteButton = ({ id, author }: {id: number; author: number}) => {
    const session = useSession();
    const t = useTranslations();
    const isDeletable = session.status === "authenticated" && session.data.user.id === author;
    const queryClient = useQueryClient();

    if(!isDeletable) {
        return null;
    }

    return (
        <Dialog
            title="are-you-sure-delete"
            description="this-action-cannot-be-undone"
            content={null}
            action={{
                text: "yes-delete",
                action: async () => {
                    await api.delete(`${Api.routes.site.reviews}/${id}`);
                }
            }}
            onSuccess={async () => {
                await queryClient.invalidateQueries({queryKey: [Api.routes.site.reviews]});
                toast.success(t("review-deleted-success") || "Review deleted successfully");
            }}
        >

        <button className="text-red-500 text-xs sm:text-sm hover:underline">
            <Trash2 />
        </button>
        </Dialog>
    );
}

export default ReviewDeleteButton;