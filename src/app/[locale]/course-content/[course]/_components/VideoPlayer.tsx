'use client';

import { MediaController, MediaControlBar, MediaPlayButton, MediaTimeRange, MediaTimeDisplay, MediaVolumeRange, MediaMuteButton, MediaFullscreenButton, MediaLoadingIndicator } from 'media-chrome/react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
    url: string | null;
    className?: string;
}

const VideoPlayer = ({ url, className = '' }: VideoPlayerProps) => {
    if (!url) {
        return (
            <div className={`flex items-center justify-center bg-black ${className}`}>
                <div className="text-white text-center">
                    <p>No video available</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full h-full bg-black ${className}`}>
            <MediaController className="w-full h-full">
                <video
                    slot="media"
                    src={url}
                    preload="auto"
                    className="w-full h-full object-contain"
                />
                <MediaLoadingIndicator slot="centered-chrome" />
                <MediaControlBar>
                    <MediaPlayButton />
                    <MediaTimeRange />
                    <MediaTimeDisplay showDuration />
                    <MediaVolumeRange />
                    <MediaMuteButton />
                    <MediaFullscreenButton />
                </MediaControlBar>
            </MediaController>
        </div>
    );
};

export default VideoPlayer;

