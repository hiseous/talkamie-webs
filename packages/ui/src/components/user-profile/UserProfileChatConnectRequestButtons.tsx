'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import IconLabelButton from "../button/IconLabelButton";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import SendConnectRequestButton from "../button/SendConnectRequestButton";
import RejectConnectRequestButton from "../button/RejectConnectRequestButton";
import AcceptConnectRequestButton from "../button/AcceptConnectRequestButton";
import { useAppSocket } from "../app-socket-provider/useAppSocket";
import { connectRequestStatus } from "../../utils/types/connect";
import CancelMessageRequestButton from "../button/CancelMessageRequestButton";
import RejectMessageRequestButton from "../button/RejectMessageRequestButton";
import AcceptMessageRequestButton from "../button/AcceptMessageRequestButton";

type UserProfileChatConnectRequestButtonsProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
    updateUser?: (userProps?: Partial<userProps>) => void;
    onRequestAccepted?: () => void;
};

const UserProfileChatConnectRequestButtons = (props: UserProfileChatConnectRequestButtonsProps) => {
    const localUser = useLocalUser();
    const routes = useAppRoutes();
    const appSocket = useAppSocket();
    const chatId = props.user?.viewer?.chat?.id;
    
    return (
        <>
            {
                
                localUser?.id && !localUser?.isMe(props.user?.id) ?
                <div className={`${props.className || ''} flex justify-center font-medium flex-wrap [&>*]:mb-2 [&>*]:mr-2`}>
                    {
                        props.user?.viewer?.connectRequest?.status === 'accepted' ?
                        <>
                            <IconLabelButton
                                svgAssetName="Chats"
                                label="Message"
                                className="w-[fit-content]"
                                labelClassName="hidden md:inline"
                                href={chatId ? routes.chat(chatId) : undefined}
                            />
                            <IconLabelButton
                                svgAssetName="Phone"
                                label="Call"
                                className="w-[fit-content]"
                                labelClassName="hidden md:inline"
                                onClick={() => {
                                    if(props.user?.viewer?.chat?.id){
                                        appSocket?.callUser({
                                            chatId: props.user.viewer?.chat?.id,
                                            // receiverId: props.user.id,
                                            type: 'audio',
                                        }, props.user);
                                    }
                                }}
                                // href={chatId ? routes.chat(chatId) : undefined}
                            />
                            {
                                localUser.type === 'senior' ?
                                <IconLabelButton
                                    svgAssetName="Calendar"
                                    label="Schedule"
                                    className="w-[fit-content]"
                                    labelClassName="hidden md:inline"
                                    href={props.user.id ? routes.user(props.user.id, ['schedule']) : undefined}
                                /> : <></>
                            }
                        </> :
                        <>
                            {
                                (['pending'] as (connectRequestStatus | undefined)[]).includes(props.user?.viewer?.chat?.request?.status) ?
                                <>
                                    {
                                        props.user?.viewer?.chat?.request?.sender?.id ?
                                        <>
                                            {
                                                localUser.isMe(props.user?.viewer?.chat?.request?.sender?.id) ?
                                                <>
                                                    <CancelMessageRequestButton
                                                        user={props.user}
                                                        updateUser={props.updateUser}
                                                    />
                                                </> :
                                                <>
                                                    <RejectMessageRequestButton
                                                        user={props.user}
                                                        updateUser={props.updateUser}
                                                    />
                                                    <AcceptMessageRequestButton
                                                        user={props.user}
                                                        updateUser={props.updateUser}
                                                        onAccepted={props.onRequestAccepted}
                                                    />
                                                </>
                                            }
                                        </> : <></>
                                    }
                                </> :
                                (
                                    !props.user?.viewer?.connectRequest?.id
                                    || (props.user?.viewer?.connectRequest?.from?.id && localUser.isMe(props.user?.viewer?.connectRequest?.from?.id))
                                ) && localUser?.type === 'senior' ?
                                <SendConnectRequestButton
                                    user={props.user}
                                    updateUser={props.updateUser}
                                /> :
                                props.user?.viewer?.connectRequest?.to?.id && localUser.isMe(props.user?.viewer?.connectRequest?.to?.id) ?
                                <>
                                    <RejectConnectRequestButton
                                        user={props.user}
                                        updateUser={props.updateUser}
                                    />
                                    <AcceptConnectRequestButton
                                        user={props.user}
                                        updateUser={props.updateUser}
                                        onAccepted={props.onRequestAccepted}
                                    />
                                </> :
                                localUser.type === 'volunteer' ?
                                <IconLabelButton
                                    svgAssetName="ChatsDots"
                                    label="Message Request"
                                    className="w-[fit-content]"
                                    labelClassName="hidden md:inline"
                                    href={
                                        props.user?.viewer?.chat?.id ?
                                        routes.chat(props.user.viewer.chat.id) :
                                        props.user?.id ?
                                        routes.user(props.user.id, ['chat']) :
                                        undefined
                                    }
                                /> :
                                undefined
                            }
                        </>
                    }
                </div> : undefined
            }
        </>
    );
}

export default UserProfileChatConnectRequestButtons;