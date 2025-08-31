
import SvgAsset from "../../assets/svg/SvgAsset";
import { __app } from "../../utils/constants/app";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppSocket } from "../app-socket-provider/useAppSocket";
import Button from "../button/Button";
import HeadingText from "../heading/HeadingText";
import IconWrapper from "../icon/IconWrapper";
import VerifiedBadge from "../icon/VerifiedBadge";
import Thumb from "../thumb/Thumb";

type IncommingCallModalProps = ComponentPrimitiveProps & {
    
};

const IncommingCallModal = (props: IncommingCallModalProps) => {
    const appSocket = useAppSocket();
    const call = appSocket?.peer?.call;
    const user = call?.user;
    
    return (
        <div
            className={`${props.className || ''} flex flex-col justify-between bg-blackVar5 text-white fill-white p-4 rounded-xl text-center`}
        >
            <div className="flex items-center justify-between">
                <div>{__app.name}</div>
                <div className="flex items-center text-whiteVar1 fill-whiteVar1">
                    <span className="pr-3">Incoming Call</span>
                    <IconWrapper
                        svgAssetName="Times"
                        iconSize={32}
                    />
                </div>
            </div>
            <div className="mt-10">
                <HeadingText size="2xs" className="text-grayVar8 capitalize">{call?.type} call</HeadingText>
                <div className="mt-4 mx-auto relative w-[fit-content] h-[fit-content]">
                    <Thumb
                        picture={user?.picture}
                        name={user?.name}
                        size="3xl"
                    />
                    {
                        user?.verification?.verified ?
                        <VerifiedBadge
                            className={`!absolute bottom-4 right-4 md:bottom-2 md:right-2 scale-[1.3]`}
                            type={user.type}
                        /> : <></>
                    }
                </div>
                <HeadingText size="xs" className="mt-4">{user?.name}</HeadingText>
                <HeadingText size="2xs" className="text-grayVar8">is calling you</HeadingText>
            </div>
            <div className="mt-8 flex items-center px-4">
                <Button onClick={appSocket?.rejectCall} theme="red" className="flex items-center justify-center w-full rounded-md mr-4">
                    <SvgAsset name="PhoneHangupFill" size={32} />
                    <HeadingText size="2xs" className="pl-2">Reject</HeadingText>
                </Button>
                <Button onClick={appSocket?.acceptCall} theme="green" className="flex items-center justify-center w-full rounded-md ml-4">
                    <SvgAsset name="PhoneFill" size={32} />
                    <HeadingText size="2xs" className="pl-2">Accept</HeadingText>
                </Button>
            </div>
        </div>
    );
}

export default IncommingCallModal;