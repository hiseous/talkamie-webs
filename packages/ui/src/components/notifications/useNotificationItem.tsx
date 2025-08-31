
'use client';

import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";
import { alertProps } from "../../utils/types/alert";

type useNotificationItemProps = {
    item?: alertProps;
}

export const useNotificationItem = (props: useNotificationItemProps) => {
    const routes = useAppRoutes();
    const timestampProps = props.item?.timestamp ? fromTimestamp(props.item.timestamp, true) : undefined;
    let title: string | undefined;
    let body: React.ReactNode | undefined;
    let href: string | undefined;

    if(props.item?.type === 'connect-request'){
        if(props.item.connectRequest?.user?.id){
            href = routes.user(props.item.connectRequest.user.id);
        }

        if(props.item.connectRequest?.status === 'pending'){
            title = `Pending Request`;
            body = <>
                <span>{props.item.connectRequest.user?.name} </span>
                sent you a connect request.
            </>;
        }
        else if(props.item.connectRequest?.status === 'accepted'){
            title = `Request Accepted`;
            body = <>
                <span>{props.item.connectRequest.user?.name} </span>
                accepted your connect request.
            </>;
        }
        else if(props.item.connectRequest?.status === 'rejected'){
            title = `Request Rejected`;
            body = <>
                <span>{props.item.connectRequest.user?.name} </span>
                rejected your connect request.
            </>;
        }
    }
    else if(props.item?.type === 'message-request'){
        if(props.item.chat?.id){
            href = routes.chat(props.item.chat.id);
        }
        else if(props.item.chat?.request?.sender?.id){
            href = routes.user(props.item.chat.request.sender.id);
        }

        if(props.item.chat?.request?.status === 'pending'){
            title = `Pending Request`;
            body = <>
                <span>{props.item.chat?.user?.name} </span>
                sent you a message request.
            </>;
        }
        else if(props.item.chat?.request?.status === 'accepted'){
            title = `Request Accepted`;
            body = <>
                <span>{props.item.chat?.user?.name} </span>
                accepted your message request.
            </>;
        }
        else if(props.item.chat?.request?.status === 'rejected'){
            title = `Request Rejected`;
            body = <>
                <span>{props.item.chat?.user?.name} </span>
                rejected your message request.
            </>;
        }
    }
    else if(props.item?.type === 'review'){
        href = routes.account(['reviews']);
        title = `Profile Review`;
        body = <>
            <span>{props.item.review?.rater?.name} </span>
            made a review on your profile.
        </>;
    }
    else if(props.item?.type === 'schedule'){
        if(props.item.schedule?.id){
            href = routes.schedule(props.item.schedule.id);
        }
        
        title = `Upcoming Call Reminder!`;
        body = <>
            Your call with
            <span> {props.item.schedule?.attendee?.name} </span>
            is scheduled for
            <span>
                {
                    timestampProps ?
                    <>
                        <span className="font-medium"> {timestampProps.day.number}/{timestampProps.month.index + 1}/{timestampProps.year} </span>
                        at
                        <span className="uppercase font-medium"> {timestampProps.time.in12Hr.replaceAll(' ', '')}. </span>
                    </> :
                    undefined
                }
            </span>
            Don't miss it
        </>
    }

    return {
        title,
        body,
        href,
    };
};