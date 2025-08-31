'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import VerifiedBadge from "../icon/VerifiedBadge";
import Thumb from "../thumb/Thumb";
import { callProps } from "../../utils/types/call";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";
import SvgAsset from "../../assets/svg/SvgAsset";
import IconWrapper from "../icon/IconWrapper";
import { fromSeconds } from "../../utils/funcs/time/seconds";
import HeadingText from "../heading/HeadingText";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { fromUserLocation } from "../../utils/funcs/user/location";

type CallInfoProps = ComponentPrimitiveProps & {
    item: callProps | undefined;
}
const CallInfo = (props: CallInfoProps) => {
    const routes = useAppRoutes();
    const timestamp = props.item?.timestamp ? fromTimestamp(props.item.timestamp, true) : undefined;
    const locationValue = fromUserLocation(props.item?.user?.location)
    
    return (
        <div className={`${props.className || ''}`}>
            <div className="p-5 rounded-md flex-1 flex items-center border-[1px] border-grayVar2 border-b-none">
                <Thumb
                    picture={props.item?.user?.picture}
                    size="sm"
                />
                <div className="flex-1 pl-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center">
                                <div className="text-lg font-semibold">{props.item?.user?.name}</div>
                                {
                                    props.item?.user?.verification?.verified ?
                                    <VerifiedBadge className="ml-1 mt-1" type={props.item?.user?.type} /> : <></>
                                }
                            </div>
                            {
                                locationValue ? <div>{locationValue.value}</div> : undefined
                            }
                        </div>
                        {
                            props.item?.chat?.id ?
                            <IconWrapper
                                svgAssetName="ChatTextFill"
                                iconSize={32}
                                href={routes.chat(props.item.chat.id)}
                                theme="pink"
                                className="rounded-full p-2"
                            /> : <></>
                        }
                    </div>
                </div>
            </div>
            <div className="p-5 rounded-md border-[1px] border-grayVar2 border-t-none">
                <div className="flex items-center justify-between">
                    <HeadingText size="2xs" className="capitalize">
                        {timestamp?.human.chatFriendly}
                    </HeadingText>
                    <div className="pl-1 capitalize">
                        {
                            props.item?.status === 'missed' && props.item.direction === 'outgoing' ? 'not answered' :
                            props.item?.status === 'missed' ? 'missed' :
                            props.item?.status === 'rejected' ? 'declined' :
                            props.item?.direction === 'incoming' ? 'incoming' :
                            'outgoing'
                        }
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                        <SvgAsset
                            name={
                                props.item?.status === 'missed' ? 'PhoneMissed' :
                                props.item?.status === 'rejected' ? 'PhoneTimes' :
                                props.item?.direction === 'incoming' ? 'PhoneIncoming' :
                                'PhoneOutgoing'
                            }
                        />
                        <div className="pl-1">
                            <span>{props.item?.type === 'video' ? 'Video' : 'Voice'} call</span>
                            {timestamp ? <span> at<span className="uppercase"> {timestamp.time.in12Hr}</span></span> : <></>}
                        </div>
                    </div>
                    {
                        props.item?.duration ?
                        fromSeconds(props.item.duration).text : undefined
                    }
                </div>
            </div>
        </div>
    );
}

export default CallInfo;