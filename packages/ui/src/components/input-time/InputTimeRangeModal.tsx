import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { dateTimeRangeProps } from "../../utils/types/time";
import Button from "../button/Button";
import HeadingText from "../heading/HeadingText";
import ModalWrapper from "../modal/ModalWrapper";
import { TimeRangePicker } from "rsuite";
import "./rsuite-time-range-picker.css";
import { useState } from "react";
import { DateRange } from "rsuite/esm/DateRangePicker";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";

export type InputTimeRangeModalProps = ComponentPrimitiveProps & {
    // baseIsoStartDate?: isoDate;
    defaultValue?: DateRange;
    onAdd?: (dateTimeRange: dateTimeRangeProps) => void;
    onCancel?: () => void;
};

const InputTimeRangeModal = (props: InputTimeRangeModalProps) => {
    const [range, setRange] = useState<dateTimeRangeProps>({
        ...props.defaultValue ? {
            start: props.defaultValue[0]?.toISOString() ? fromTimestamp(props.defaultValue[0].toISOString()).dateTime.iso : undefined,
            end: props.defaultValue[1]?.toISOString() ? fromTimestamp(props.defaultValue[1].toISOString()).dateTime.iso : undefined,
        } : {}
    });

    const handles = {
        transformPIckerDates: (dates?: DateRange | null) => {
            const dateTimeRange: dateTimeRangeProps = {};

            if(dates?.length){
                const startDate = dates[0];
                const endDate = dates[1];

                dateTimeRange.start = startDate.toISOString();
                dateTimeRange.end = endDate.toISOString();

                // if(props.baseIsoStartDate){
                //     const diffProps = binaryOpOnTimestamps(endDate.toISOString(), '-', startDate.toISOString());
                //     const isoStartTime = extractFromIsoDateTime(startDate.toISOString()).isoTime;
                //     if(isoStartTime){
                //         const newIsoStartDateTime = `${props.baseIsoStartDate}T${isoStartTime}` as isoDateTime;
                //         const newIsoEndDateTime = adjustDateTimeByMilliseconds(newIsoStartDateTime, diffProps.inMiliSec).iso;

                //         dateTimeRange.start = newIsoStartDateTime;
                //         dateTimeRange.end = newIsoEndDateTime;
                //     }
                // }

                // console.log('--transformed', dateTimeRange);
                
                // const startProps = fromTimestamp(startDate.toISOString(), false);
                // const endProps = fromTimestamp(endDate.toISOString(), false);

                // dateTimeRange.start = startProps.time.in24Hr;
                // dateTimeRange.end = endProps.time.in24Hr;
            }

            return {
                dateTimeRange,
            };
        },
        onRangePickerChange: (dates?: DateRange | null) => {
            const dateTimeRange = handles.transformPIckerDates(dates).dateTimeRange;
            setRange(dateTimeRange);
            return {
                dateTimeRange,
            };
        },
        onRangePickerOk: (dates?: DateRange | null) => {
            const dateTimeRange = handles.onRangePickerChange(dates).dateTimeRange;
            if(props.onAdd) props.onAdd(dateTimeRange);
        },
        onAdd: () => {
            if(props.onAdd) props.onAdd(range);
        },
    };
    
    return (
        <ModalWrapper
            className={`${props.className || ''} font-medium text-blackVar1`}
            onClose={props.onCancel}
        >
            <HeadingText size="2xs">
                Pick time
            </HeadingText>
            <div className="mt-8">
                <TimeRangePicker
                    format="hh:mm aa"
                    showMeridiem
                    className="
                        [&_input.rs-date-range-input]:px-3 [&_input.rs-date-range-input]:py-4
                        [&_input.rs-date-range-input]:text-sm
                    "
                    defaultValue={props.defaultValue}
                    onChange={handles.onRangePickerChange}
                    onOk={(date) => {
                        handles.onRangePickerOk(date);
                    }}
                />
            </div>
            <div className="mt-8 flex items-center [&>*]:flex-1 [&>*]:rounded-md">
                <Button
                    theme="white"
                    className="mr-1"
                >
                    Cancel
                </Button>
                <Button
                    theme="red"
                    className="ml-1"
                    onClick={handles.onAdd}
                >
                    Add
                </Button>
            </div>
        </ModalWrapper>
    );
}

export default InputTimeRangeModal;