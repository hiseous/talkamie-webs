'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { subtractPresentDateFrom } from "../../utils/funcs/time/timestamp";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import ModalWrapperVar1 from "../modal/ModalWrapperVar1";
import ThumbNLabel from "../thumb/ThumbNLabel";
import { scheduleProps } from "../../utils/types/schedule";

type ScheduledCardProps = ComponentPrimitiveProps & {
    item: scheduleProps;
};

const ScheduledCard = (props: ScheduledCardProps) => {
    // const timePast = subtractPresentDateFrom(props.item.scheduledAt).seconds <= 0;
    // const upcomingTime = subtractPresentDateFrom(timePast ? undefined : props.item.scheduledAt);
    const upcomingTime = subtractPresentDateFrom(props.item.timeslot?.from);
    const isOngoing = props.item.status === 'on-going';
    const routes = useAppRoutes();
    
    return (
        <ModalWrapperVar1
            className={`${props.className || ''} p-4 flex flex-col justify-between`}
        >
            <div>
                <ThumbNLabel
                    thumb={{
                        picture: props.item.attendee?.picture,
                        name: props.item.attendee?.name,
                    }}
                    label={props.item.attendee?.name}
                    labelClassName="line-clamp-1"
                />
                <div className="mt-3 flex items-center flex-wrap [&>*]:shrink-0">
                    <div className="pr-2 capitalize">{upcomingTime.on}</div>
                    <div className={`flex items-center uppercase ${isOngoing ? 'text-redVar1 fill-redVar1' : ''}`}>
                        <Icon iconName="Clock" className="pr-1" />
                        <div className="">{upcomingTime.at}</div>
                    </div>
                </div>
            </div>
            <Button
                theme={isOngoing ? 'red' : 'pink'}
                className="mt-4 block text-center rounded-md"
                href={
                    isOngoing && props.item.attendee?.id ? routes.user(props.item.attendee.id, ['chat']) :
                    !isOngoing && props.item.id ? routes.schedule(props.item.id) :
                    undefined
                }
            >
                {
                    isOngoing ? `Join Call` : `View Details`
                }
            </Button>
        </ModalWrapperVar1>
    );
}

export default ScheduledCard;