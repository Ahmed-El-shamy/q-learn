import { useMutation } from "@tanstack/react-query"
import { signOut } from "next-auth/react"

const useSignout = () => {
    return useMutation({
        mutationKey: ["signout"],
        mutationFn: async () => {
            await signOut();
        }
    });
}

export default useSignout;