
'use client';

import { DateRange } from "rsuite/esm/DateRangePicker";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { dateTimeRangeProps, weekDayAbbr } from "../../utils/types/time";
import ControlledCheckbox from "../checkbox/ControlledCheckbox";
import IconWrapper from "../icon/IconWrapper";
import InputTimeRangeModal from "../input-time/InputTimeRangeModal";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import TimeRangeItemLabel from "./TimeRangeItemLabel";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";

type CustomWeeklyItemSettingProps = ComponentPrimitiveProps & {
    weekDayAbbr: weekDayAbbr;
    dateTimeRanges?: dateTimeRangeProps[];
    focusedDateTimeRange?: dateTimeRangeProps;
    defaultInputTimeRangeValue?: DateRange;
    addDateTimeRange?: (dateTimeRangeProps: dateTimeRangeProps) => void;
    removeDateTimeRange?: (dateTimeRangeProps: dateTimeRangeProps) => void;
};

const CustomWeeklyItemSetting = (props: CustomWeeklyItemSettingProps) => {
    const popUp = usePopUp();
    const dateTimeRanges = props.dateTimeRanges?.filter((dateTimeRange) => {
        let isTheDay = false;
        if(dateTimeRange.start && dateTimeRange.end && props.focusedDateTimeRange?.start && props.focusedDateTimeRange.end){
            const fromProps = fromTimestamp(dateTimeRange.start);
            const isWeekDayAbbr = fromProps.day.short === props.weekDayAbbr;
            const isSameDay = (
                (props.focusedDateTimeRange.start <= dateTimeRange.start)
                && (dateTimeRange.end <= props.focusedDateTimeRange.end)
            );
            isTheDay = isSameDay && isWeekDayAbbr;
        }

        return isTheDay;
    })
    
    return (
        <div className={`${props.className || ''} flex justify-between items-start`}>
            <div className="capitalize flex items-center">
                <ControlledCheckbox
                    checked={dateTimeRanges?.length ? true : false}
                />
                <div className="pl-2">{props.weekDayAbbr}</div>
            </div>
            <div>
                {
                    dateTimeRanges?.length ?
                    <div>
                        {
                            dateTimeRanges.map((dateTimeRange, i) => {
                                return (
                                    <TimeRangeItemLabel
                                        key={i}
                                        dateTimeRange={dateTimeRange}
                                        className={`${i > 0 ? 'mt-2' : ''}`}
                                        remove={() => {
                                            if(props.removeDateTimeRange) props.removeDateTimeRange(dateTimeRange);
                                        }}
                                    />
                                )
                            })
                        }
                    </div> :
                    <div className="italic">unavailable</div>
                }
            </div>
            <IconWrapper
                svgAssetName="Plus"
                className="fill-redVar1"
                onClick={() => {
                    popUp?.set({
                        nodes: [
                            <InputTimeRangeModal
                                defaultValue={props.defaultInputTimeRangeValue}
                                onCancel={popUp.reset}
                                onAdd={(dateTimeRange) => {
                                    if(props.addDateTimeRange) props.addDateTimeRange(dateTimeRange);
                                    popUp.reset();
                                }}
                            />,
                        ],
                    });
                }}
            />
        </div>
    );
}

export default CustomWeeklyItemSetting;