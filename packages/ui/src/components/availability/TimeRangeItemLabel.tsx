
'use client';

import { toTwoDigits } from "../../utils/funcs/digit";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { dateTimeRangeProps, isoDateTime } from "../../utils/types/time";
import IconWrapper from "../icon/IconWrapper";

type TimeRangeItemLabelProps = ComponentPrimitiveProps & {
    // timeRange?: timeRangeProps;
    dateTimeRange?: dateTimeRangeProps;
    remove?: () => void;
};

const TimeRangeItemLabel = (props: TimeRangeItemLabelProps) => {
    const timeBoxClassName = `border-[1px] border-whiteVar4 px-3 py-1 rounded-sm`;
    const handles = {
        fromDateTimeRange: (dateTime?: isoDateTime) => {
            let node: React.ReactNode | undefined;
            if(dateTime){
                const fromProps = fromTimestamp(dateTime, true);
                node = <>
                    {`${toTwoDigits(fromProps.time.hh)}:${toTwoDigits(fromProps.time.mm)}`}
                    <span className="uppercase pl-1">{fromProps.time.meridiem}</span>
                </>
            }

            return {
                node,
            };
        },
    };
    
    return (
        <div className={`${props.className || ''} flex items-center justify-between`}>
            <div className="flex items-center">
                <div className={`${timeBoxClassName}`}>{handles.fromDateTimeRange(props.dateTimeRange?.start).node}</div>
                <div className="mx-2">-</div>
                <div className={`${timeBoxClassName}`}>{handles.fromDateTimeRange(props.dateTimeRange?.end).node}</div>
            </div>
            <IconWrapper
                svgAssetName="Times"
                className="ml-4"
                onClick={props.remove}
            />
        </div>
    );
}

export default TimeRangeItemLabel;