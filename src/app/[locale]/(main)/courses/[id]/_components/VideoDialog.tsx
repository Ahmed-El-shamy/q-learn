"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface VideoDialogProps {
    videoUrl: string;
    children: ReactNode;
}

const VideoDialog = ({ videoUrl, children }: VideoDialogProps) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl px-4 focus:outline-none">
                    <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <video
                                className="absolute top-0 left-0 w-full h-full"
                                controls
                                autoPlay
                                src={videoUrl}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
                                aria-label="Close video"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default VideoDialog;

