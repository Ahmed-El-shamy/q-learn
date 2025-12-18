"use client";
import { toast } from "sonner";

const toastErrorMessage = (err: unknown) => {
    if(
        err 
        && typeof err === "object" 
        && "response" in err 
        && err.response 
        && typeof err.response === "object" 
        && "message" in err.response 
        && err.response.message 
        && typeof err.response.message === "string"
    ) {
        toast.error(err.response.message);
    } else if (
        err 
        && typeof err === "object" 
        && "message" in err 
        && err.message 
        && typeof err.message === "string"
    ) {
        toast.error(err.message);
    }
}

export default toastErrorMessage;