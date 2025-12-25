"use client";
import { toast } from "sonner";

const toastErrorMessage = (err: unknown) => {
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
                toast.error(err.response.message);
            } else if (
                "errors" in err.response
                && err.response.errors
                && typeof err.response.errors === "string"
            ) {
                toast.error(err.response.errors);
            }
        } else if (
            "message" in err
            && err.message
            && typeof err.message === "string"
        ) {
            toast.error(err.message);
        }
    }
}

export default toastErrorMessage;