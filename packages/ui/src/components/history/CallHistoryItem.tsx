'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import VerifiedBadge from "../icon/VerifiedBadge";
import NodeMayBeLink from "../node/NodeMayBeLink";
import Thumb from "../thumb/Thumb";
import { callProps } from "../../utils/types/call";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";
import SvgAsset from "../../assets/svg/SvgAsset";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import CallInfoModal from "../history-call/CallInfoModal";

type CallHistoryItemProps = ComponentPrimitiveProps & {
    item: callProps | undefined;
}
const CallHistoryItem = (props: CallHistoryItemProps) => {
    const popUp = usePopUp();
    // const routes = useAppRoutes();
    const timestamp = props.item?.timestamp ? fromTimestamp(props.item.timestamp, true) : undefined;
    
    return (
        <NodeMayBeLink
            // href={props.item?.id ? routes.callHistory(props.item.id) : undefined}
            onClick={() => {
                popUp?.set({
                    nodes: [
                        <CallInfoModal item={props.item} close={popUp.reset} />
                    ],
                });
            }}
            className={`${props.className || ''} flex items-center cursor-pointer`}
        >
            <div className="flex-1 flex items-center">
                <Thumb
                    picture={props.item?.user?.picture}
                    size="sm"
                />
                <div className="flex-1 pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="text-lg font-semibold">{props.item?.user?.name}</div>
                            {
                                props.item?.user?.verification?.verified ?
                                <VerifiedBadge className="ml-1 mt-1" type={props.item?.user?.type} /> : <></>
                            }
                        </div>
                        {
                            timestamp ?
                            <div className="capitalize">
                                {timestamp.human.chatFriendly}
                            </div> : <></>
                        }
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <SvgAsset
                                name={
                                    props.item?.status === 'missed' ? 'PhoneMissed' :
                                    props.item?.status === 'rejected' ? 'PhoneTimes' :
                                    props.item?.direction === 'incoming' ? 'PhoneIncoming' :
                                    'PhoneOutgoing'
                                }
                            />
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
                        {
                            timestamp ?
                            <div className="uppercase">
                                {timestamp.time.in12Hr}
                            </div> : <></>
                        }
                    </div>
                </div>
            </div>
        </NodeMayBeLink>
    );
}

export default CallHistoryItem;