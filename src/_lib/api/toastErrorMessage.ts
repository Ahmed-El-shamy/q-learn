"use client";
import { toast } from "sonner";

const toastErrorMessage = (err: unknown, defaultMessage?: string) => {
    if(
        err 
        && typeof err === "object" 
    ) {
        if(
            "response" in err 
            && err.response 
            && typeof err.response === "object" 
        ) {
            if(
                "message" in err.response 
                && err.response.message 
                && typeof err.response.message === "string"
            ) {
                toast.error(err.response.message || defaultMessage);
            } else if (
                "errors" in err.response
                && err.response.errors
                && typeof err.response.errors === "string"
            ) {
                toast.error(err.response.errors || defaultMessage);
            }
        } else if (
            "message" in err
            && err.message
            && typeof err.message === "string"
        ) {
            toast.error(err.message || defaultMessage);
        } else if (defaultMessage) toast.error(defaultMessage);
    }
}

export default toastErrorMessage;