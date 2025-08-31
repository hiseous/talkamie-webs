import { useEffect, useRef } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

export type VideoCallScreenProps = ComponentPrimitiveProps & {
    srcObject?: MediaStream;
    muted?: boolean;
    style?: React.CSSProperties;
};

const VideoCallScreen = (props: VideoCallScreenProps) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if(video){
            video.srcObject = props.srcObject ?? null;
        }
    }, [ref.current, props.srcObject]);

    return (
        <video
            ref={ref}
            style={props.style}
            className={`${props.className || ''} scale-x-[-1] object-cover`}
            // src={props.srcObject}
            // controls
            playsInline
            autoPlay
            muted={props.muted}
            // muted={props.muted}
            // loop
        ></video>
    )
}
export default VideoCallScreen;