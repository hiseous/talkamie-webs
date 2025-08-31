'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import ModalWrapperVar1 from "../modal/ModalWrapperVar1";
import ThumbNLabel from "../thumb/ThumbNLabel";
import { scheduleProps } from "../../utils/types/schedule";
import IconWrapper from "../icon/IconWrapper";
import SvgAsset from "../../assets/svg/SvgAsset";

type ScheduledCardVar1Props = ComponentPrimitiveProps & {
    item: scheduleProps;
};

const ScheduledCardVar1 = (props: ScheduledCardVar1Props) => {
    // const timePast = subtractPresentDateFrom(props.item.scheduledAt).seconds <= 0;
    // const upcomingTime = subtractPresentDateFrom(timePast ? undefined : props.item.scheduledAt);
    const startProps = fromTimestamp(props.item.timeslot?.from, true);
    const isOngoing = props.item.status === 'on-going';
    const routes = useAppRoutes();
    
    return (
        <ModalWrapperVar1
            className={`${props.className || ''} p-4 flex flex-col justify-between`}
        >
            <div>
                <div className="flex items-center justify-center md:justify-start">
                    <IconWrapper
                        svgAssetName="Calendar"
                        iconSize={32}
                        className="fill-redVar1 bg-pinkVar1 p-2 rounded-full"
                    />
                    <div className="pl-4 font-semibold text-lg">
                        {
                            props.item.title ||
                            <span className="capitalize">{props.item.status || 'past'} schedule</span>
                        }
                    </div>
                </div>
                <div className="text-center md:text-start md:pl-[78px]">
                    <div className="mt-3 flex items-center flex-wrap [&>*]:shrink-0">
                        <div className={`flex items-center capitalize pr-4`}>
                            <SvgAsset name="Calendar" size={27} />
                            <div className="pl-2">{startProps.day.short}, {startProps.date.iso}</div>
                        </div>
                        <div className={`flex items-center uppercase`}>
                            <Icon iconName="Clock" />
                            <div className="pl-2">{startProps.time.in12Hr}</div>
                        </div>
                    </div>
                    <ThumbNLabel
                        thumb={{
                            picture: props.item.attendee?.picture,
                            name: props.item.attendee?.name,
                            size: 'xs'
                        }}
                        label={props.item.attendee?.name}
                        labelClassName="line-clamp-1"
                        className="mt-3 justify-center md:justify-start"
                    />
                </div>
            </div>
            <Button
                theme={isOngoing ? 'red' : 'pink'}
                className="mt-6 block text-center rounded-md"
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

export default ScheduledCardVar1;