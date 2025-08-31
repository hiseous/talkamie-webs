import SvgAsset, { svgAssetName } from "../../assets/svg/SvgAsset";
import { __classNames } from "../../utils/constants/classNames";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { callType } from "../../utils/types/call";
import { chatProps } from "../../utils/types/chat";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppSocket } from "../app-socket-provider/useAppSocket";
import BackButton from "../button/BackButton";
import Button from "../button/Button";
import BlandDropdown from "../dropdown/BlandDropdown";
import IconWrapper from "../icon/IconWrapper";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import NodeMayBeLink from "../node/NodeMayBeLink";
import UserThumbLabelVar1 from "../user-cards/UserThumbLabelVar1";

type optionProps = {
    label?: string;
    href?: string;
    onClick?: () => void;
}
type iconTab = {
    icon: svgAssetName;
    options?: optionProps[];
    className?: string;
    label?: string;
    href?: string;
    onClick?: () => void;
}
type ChatHeaderProps = ComponentPrimitiveProps & {
    chat: chatProps;
};

const ChatHeader = (props: ChatHeaderProps) => {
    const appSocket = useAppSocket();
    const routes = useAppRoutes();
    const localUser = useLocalUser();
    const canCall = localUser?.type === 'senior' && props.chat.user?.id && !localUser?.isMe(props.chat.user.id);

    const handles = {
        call: (type?: callType) => {
            if(props.chat.id){
                appSocket?.callUser({
                    type,
                    // receiverId: props.chat.receiver?.id,
                    chatId: props.chat.id,
                    // body: {
                    //     chatId: props.chat.id,
                    // },
                }, props.chat.user);
            }
        },
    };

    const desktopIconTabs: iconTab[] = [
        ...(
            canCall ? [
                {
                    icon: 'Video',
                    className: 'hidden xl:flex',
                    label: 'Video Call',
                    onClick: () => {
                        handles.call('video');
                    },
                },
                {
                    icon: 'Phone',
                    className: 'hidden xl:flex',
                    label: 'Audio Call',
                    onClick: () => {
                        handles.call('audio');
                    }
                },
                // {
                //     icon: 'CalendarEmptyAlt',
                //     className: 'hidden xl:flex',
                //     label: 'Schedule Call',
                //     href: routes.user(props.chat.user.id, ['schedule']),
                // },
            ] : []
        ) as iconTab[],
        {
            icon: 'MoreHorizontal',
            options: [
                ...(
                    props.chat.user?.id && localUser?.type === 'senior' ? [
                        {
                            label: 'Schedule Call',
                            href: routes.user(props.chat.user.id, ['schedule']),
                        },
                    ] : []
                ),
                ...(
                    props.chat.user?.id && localUser?.type === 'volunteer' ? [
                        {
                            label: 'View Profile',
                            href: routes.user(props.chat.user.id),
                        },
                    ] : []
                ),
            ],
        },
    ];
    
    return (
        <div className={`${props.className || ''} flex items-center justify-between`}>
            <div className="flex-1 flex items-center pb-2">
                <BackButton theme="red" />
                <UserThumbLabelVar1
                    user={props.chat.user}
                    hideSublabel
                    className="pl-1 md:pl-2 xl:pl-4 py-0"
                    nameClassName="line-clamp-1"
                    link="user"
                />
            </div>
            <div className="shrink-0 pl-2 md:pl-8 flex items-center w-[max-width]">
                {
                    canCall ?
                    <div className="flex items-center xl:hidden">
                        <BlandDropdown
                            handle={{
                                children: <>
                                    <Button theme="pink-var-1" className="flex items-center px-3 md:px-5">
                                        <SvgAsset name="PhoneFill" size={24} className="md:w-[32px] md:h-[32px]" />
                                        <SvgAsset name="AngleDown" size={24} className="ml-2 md:w-[28px] md:h-[28px]"/>
                                    </Button>
                                </>
                            }}
                            renderMenu={(renderProps) => ({
                                position: {x: 'center'},
                                children: <>
                                    <div className="text-sm">
                                        {
                                            (['audio', 'video'] as callType[]).map((callType, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        if(renderProps.closeMenu) renderProps.closeMenu();
                                                        handles.call(callType);
                                                    }}
                                                    className={`px-6 py-2 cursor-pointer capitalize hover:bg-pinkVar1 ${__classNames.transition}`}
                                                >{callType} call</div>
                                            ))
                                        }
                                    </div>
                                </>
                            })}
                        />
                    </div> : <></>
                }
                {
                    desktopIconTabs.map((iconTab, i) => {
                        return (
                            <BlandDropdown
                                key={i}
                                handle={{
                                    children: <>
                                        <Button
                                            className={`${i > 0 ? 'ml-1 md:ml-4' : ''} ${iconTab.className || ''} shrink-0 rounded-full items-center !p-2 ${iconTab.label ? 'md:!px-4 md:!py-2' : 'md:!p-3'} text-sm`}
                                            theme="pink-var-1"
                                            href={iconTab.href}
                                            onClick={iconTab.onClick}
                                        >
                                            {
                                                iconTab.label ? <span className="pr-2">{iconTab.label}</span> : undefined
                                            }
                                            <IconWrapper
                                                key={i}
                                                svgAssetName={iconTab.icon}
                                                className={`md:[&>*]:w-[24px] md:[&>*]:h-[24px]`}
                                                iconSize={24}
                                            />
                                        </Button>
                                    </>
                                }}
                                renderMenu={
                                    iconTab.options?.length ?
                                    (renderProps) => ({
                                        position: {x: 'right'},
                                        children: <>
                                            <div className="text-sm">
                                                {
                                                    iconTab.options?.map((option, i) => (
                                                        <NodeMayBeLink
                                                            key={i}
                                                            href={option.href}
                                                            onClick={() => {
                                                                if(option.onClick) option.onClick();
                                                                if(renderProps.closeMenu) renderProps.closeMenu();
                                                            }}
                                                            className={`block px-6 py-2 cursor-pointer capitalize hover:bg-pinkVar1 ${__classNames.transition}`}
                                                        >{option.label}</NodeMayBeLink>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    }) :
                                    undefined
                                }
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ChatHeader;