"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import React, { useState, forwardRef, useImperativeHandle, useCallback } from "react";
import { X } from "lucide-react";
import "./dialog.css";
import MainBtn from "../buttons/MainBtn";

interface ActionType {
    action: () => Promise<void>;
    isPending?: boolean;
    text?: string;
}

export interface DialogRefType {
    close: () => void;
    open: () => void;
}

interface Props {
    title?: string;
    description?: string;
    children: React.ReactNode;
    action?: ActionType;
    cancel?: ActionType;
    content: React.ReactNode;
    onSuccess?: () => void;
}

const defaultOkText = "ok";
const defaultCancelText = "cancel";

const DialogComponent = forwardRef<DialogRefType, Props>(({
    title,
    description,
    children,
    action,
    cancel,
    content,
    onSuccess,
}, ref) => {
    const t = useTranslations();
    const [open, setOpen] = useState<boolean>(true);

    const closeDialog = useCallback(() => {
        setOpen(false);
        if(cancel?.action) cancel?.action();
    }, [cancel])

    useImperativeHandle(ref, () => {
        return ({
            close: closeDialog,
            open: () => setOpen(true)
        })
    });

    const handleAction = useCallback(async () => {
        await action?.action();
        setOpen(false);
        onSuccess?.();
    }, [action]);

    return (
        <Dialog
            open={open}
            onOpenChange={(e) => {
                if(!e) cancel?.action();
                setOpen(e);
            }}
        >
            <DialogTrigger asChild >
                {children}
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay  className="fixed inset-0 bg-black/60 z-60 fade-in" />
                <DialogContent
                    className="max-w-xl w-[80%] rounded z-70 outline-none scale-100 fixed top-1/2 left-1/2 bg-white content"
                >
                    <div className="w-full border-b border-b-purple-500 py-2 relative">
                        {
                            (title || description) && (
                            <div className="px-4 text-start">
                                <DialogTitle className="text-purple-800 font-bold text-lg">
                                    {t(title || "")}
                                </DialogTitle>
                                <DialogDescription className="text-gray-700">
                                    {t(description || "")}
                                </DialogDescription>
                            </div> 
                            )
                        }
                        <DialogClose asChild>
                            <X className="text-purple-500/50 cursor-pointer duration-100 hover:text-purple-500 top-2 end-4 absolute" />
                        </DialogClose>
                    </div>
                    <div className="px-4 py-2 max-h-[500px] overflow-y-auto">
                        {content}
                    </div>
                    <div className="flex flex-col w-full md:flex-row-reverse px-4 py-2 md:gap-4 gap-2">
                        <MainBtn>
                            {t(action?.text || defaultOkText)}
                        </MainBtn>
                        <DialogClose asChild>
                            <MainBtn variant="outlined">
                                {t(cancel?.text || defaultCancelText)}
                            </MainBtn>
                        </DialogClose>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
})

export default DialogComponent;