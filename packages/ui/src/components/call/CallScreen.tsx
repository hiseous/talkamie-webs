
import { svgAssetName } from "../../assets/svg/SvgAsset";
import { __classSelectors } from "../../utils/constants/querySelectors";
import { fromSeconds } from "../../utils/funcs/time/seconds";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppSocket } from "../app-socket-provider/useAppSocket";
import HeadingText from "../heading/HeadingText";
import IconWrapper from "../icon/IconWrapper";
import VerifiedBadge from "../icon/VerifiedBadge";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import VideoCallScreen from "./VideoCallScreen";

type buttonIcon = {
    iconName: svgAssetName;
    className?: string;
    onClick?: () => void;
}
type CallScreenProps = ComponentPrimitiveProps & {
    // receiver?: userProps;
    // duration?: number; //in seconds;
};

const CallScreen = (props: CallScreenProps) => {
    const localUser = useLocalUser();
    const appSocket = useAppSocket();
    const peer = appSocket?.peer;
    const call = peer?.call;
    const user = call?.user;
    const buttonIcons: buttonIcon[] = [
        {iconName: peer?.local?.audio?.enabled ? 'Microphone' : 'MicrophoneSlash', onClick: () => appSocket?.toggleLocalMicMute()},
        {iconName: 'VolumeHigh', onClick: () => appSocket?.changeAudioOutput()},
        {iconName: peer?.local?.video?.enabled ? 'Video' : 'VideoSlash', onClick: () => appSocket?.toggleLocalVideoMute()},
        {iconName: 'Times', className: 'bg-redVar1', onClick: () => appSocket?.endCall()}
    ];
    
    return (
        <div
            style={{
                backgroundImage: user?.picture?.org?.url ? `url(${user.picture?.org?.url})` : undefined,
            }}
            className={`${props.className || ''} relative bg-no-repeat bg-cover bg-black text-white fill-white text-center`}
        >
            {
                peer?.remote?.stream ?
                <div className="absolute w-full h-full">
                    <VideoCallScreen
                        srcObject={peer.remote.stream}
                        className="w-full h-full"
                    />
                </div> : <></>
            }
            {
                peer?.local?.stream ?
                <div className={`${call?.type === 'video' ? '' : 'hidden'} absolute bottom-8 right-8 rounded-2xl overflow-hidden w-full h-full max-w-[160px] max-h-[30vh]`}>
                    <VideoCallScreen
                        srcObject={peer.local.stream}
                        className={`${__classSelectors.localStreamVideo} w-full h-full`}
                        muted
                    />
                    {
                        !peer.local.video?.enabled ?
                        <div
                            style={{backgroundImage: localUser?.picture?.org?.url ? `url(${localUser.picture?.org?.url})` : undefined}}
                            className="absolute left-0 top-0 w-full h-full bg-cover bg-top"
                        ></div> : <></>
                    }
                </div> : <></>
            }
            <div className="relative w-full h-full bg-black/[.3] flex flex-col items-center justify-between py-8">
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <HeadingText size="xs">
                            {user?.name}
                        </HeadingText>
                        {
                            user?.verification?.verified ?
                            <VerifiedBadge
                                className="ml-1"
                                type={user.type}
                            /> : <></>
                        }
                    </div>
                    <div className="capitalize">{call?.type} call</div>
                    {
                        call?.status === 'connecting' ? 'connecting' :
                        call?.duration ?
                        <div>
                            {fromSeconds(call?.duration).text}
                        </div> :
                        call?.status === 'missed' && call.direction === 'outgoing' ? 'unavailable' :
                        call?.status ?
                        <div>{call?.status}</div> :
                        <></>
                    }
                </div>
                <div className="flex items-center">
                    {
                        buttonIcons.map((buttonIcon, i) => (
                            <IconWrapper
                                key={i}
                                svgAssetName={buttonIcon.iconName}
                                onClick={buttonIcon.onClick}
                                className={`${buttonIcon.className || ''} ${i > 0 ? 'ml-2' : ''} rounded-full bg-black p-3`}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CallScreen;