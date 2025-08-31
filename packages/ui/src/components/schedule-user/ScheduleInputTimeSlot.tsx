import dayjs from "dayjs";
import { useState } from "react";
import { getNewKey } from "../../utils/funcs/string/string";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { iso24HrTime, isoDateTime } from "../../utils/types/time";
import BlandTag from "../label/BlandTag";
import ScheduleInputModal from "./ScheduleInputModal";

export type scheduleTimeSlotOption = {
    label: string;
    // value: string; //HH:mm:ss;
    start?: iso24HrTime; //HH:mm:ss;
    end?: iso24HrTime; //HH:mm:ss;
    disabled?: boolean;
}
type slotProps = {
    start?: iso24HrTime; //HH:mm:ss;
    end?: iso24HrTime; //HH:mm:ss;
}

type ScheduleInputTimeSlotProps = ComponentPrimitiveProps & {
    focusedIsoDateTime: isoDateTime | undefined;
    // userCustomDateTimeRanges?: dateTimeRangeProps[];
    // userWeeklyDateTimeRanges?: dateTimeRangeProps[];
    title?: string;
    slot?: slotProps;
    options?: scheduleTimeSlotOption[];
    viewOnly?: boolean;
    onChange?: (slotProps: slotProps) => void;
};

const ScheduleInputTimeSlot = (props: ScheduleInputTimeSlotProps) => {
    // const [options, setOptions] = useState<scheduleTimeSlotOption[]>([]);
    const [closeKey, setCloseKey] = useState<string | undefined>(undefined);
    
    // useEffect(() => {
    //     const lim = 24;
    //     const newOptions: scheduleTimeSlotOption[] = [];
    //     // let focusedIsoTimeRanges: timeRangeProps[] = [];
    //     // console.log('---1', props.focusedIsoDateTime)
    //     // if(props.focusedIsoDateTime){
    //     //     const dateProps = fromTimestamp(props.focusedIsoDateTime, false);
    //     //     const isoDate = dateProps.date.iso;
    //     //     console.log('---2', isoDate)
    //     //     if(isoDate && props.userCustomAvailabilityItems && isoDate in props.userCustomAvailabilityItems){
    //     //         focusedIsoTimeRanges = props.userCustomAvailabilityItems[isoDate] || [];
    //     //     }
    //     // }
    //     // console.log('---3', focusedIsoTimeRanges, props.userCustomAvailabilityItems)

    //     if(props.focusedIsoDateTime){
    //         const timezoneOffset = getPresentTime().timezone.offset;
    //         const isoTimezone = fromTimeZoneOffset(timezoneOffset).iso;

    //         for(let i = 0; i < lim; i++){

    //             const isoStartDateTime = adjustDateTimeByMilliseconds(props.focusedIsoDateTime, i * __1hr.miliSec).iso;
    //             const isoEndDateTime = adjustDateTimeByMilliseconds(props.focusedIsoDateTime, (i + 1) * __1hr.miliSec).iso;

    //             const localStartDateTime = adjustDateTimeByMilliseconds(isoStartDateTime, -1 * timezoneOffset * 60 * 1000).iso.replaceAll('Z', isoTimezone);
    //             const localEndDateTime = adjustDateTimeByMilliseconds(isoEndDateTime, -1 * timezoneOffset * 60 * 1000).iso.replaceAll('Z', isoTimezone);

    //             // const localStartDateTime = `1970-02-02T${toTwoDigits(i)}:00:00.000${isoTimezone}`;
    //             // const localEndDateTime = `1970-02-02T${toTwoDigits(i + 1)}:00:00.000${isoTimezone}`;

    //             const start = dayjs(localStartDateTime).format('HH:mm:ss') as iso24HrTime;
    //             const end = dayjs(localEndDateTime).format('HH:mm:ss') as iso24HrTime;
    //             const label = `${
    //                 dayjs(localStartDateTime).format('hh:mmA')
    //             } - ${
    //                 dayjs(localEndDateTime).format('hh:mmA')
    //             }`;

    //             // const fromStartProps = fromTimestamp(localStartDateTime, false);
    //             // const fromEndProps = fromTimestamp(localEndDateTime, false);
    //             // console.log(i, fromStartProps.time.in24Hr, fromEndProps.time.in24Hr)
    //             // const available = timeRangeInTimeRanges({start: fromStartProps.time.in24Hr, end: fromEndProps.time.in24Hr}, focusedIsoTimeRanges);
    //             const dateTimeRange: dateTimeRangeProps = {
    //                 start: isoStartDateTime,
    //                 end: isoEndDateTime,
    //             };
    //             // console.log(i, isoStartDateTime, localStartDateTime)
    //             const availableInCustom = dateTimeRangeInDateTimeRanges(dateTimeRange, props.userCustomDateTimeRanges);
    //             const availableInWeekly = dateTimeRangeWeekDayInDateTimeRanges(dateTimeRange, props.userWeeklyDateTimeRanges);
    //             const available = availableInCustom || availableInWeekly;

    //             const option: scheduleTimeSlotOption = {
    //                 start,
    //                 end,
    //                 label,
    //                 disabled: available ? false : true,
    //             };
                
    //             if(available) newOptions.push(option);
    //         }
    //     }
        
    //     setOptions(newOptions);
    // }, [props.focusedIsoDateTime, props.userCustomDateTimeRanges]);
    
    return (
        <ScheduleInputModal
            className={`${props.className || ''}`}
            svgAssetName="Clock"
            closeKey={closeKey}
            title={props.title ?? 'Time Slot'}
            subTitle={
                props.slot?.start && props.slot.end ?
                `${
                    dayjs(`1970-02-02T${props.slot?.start || '00:00:00'}.000`).format('hh:mmA')
                } - ${
                    dayjs(`1970-02-02T${props.slot?.end || '00:00:00'}.000`).format('hh:mmA')
                }`
                : undefined
            }
        >
            {
                !props.viewOnly && props.focusedIsoDateTime ?
                // <div className="max-h-[400px] overflow-y-auto customScrollbar">
                <div className="mt-4">
                    {
                        props.options?.length ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 gap-3 text-sm max-h-[300px] overflow-y-auto">
                            {
                                props.options.map((option, i) => {
                                    const checked = (
                                        props.slot?.start && props.slot?.start === option.start &&
                                        props.slot?.end && props.slot.end === option.end
                                    ) ? true : false;
                                    return (
                                        <BlandTag
                                            key={i}
                                            checked={checked}
                                            label={option.label}
                                            className="mx-auto text-center w-full justify-center"
                                            disabled={option.disabled}
                                            onClick={() => {
                                                if(props.onChange){
                                                    props.onChange({
                                                        start: option.start,
                                                        end: option.end,
                                                    });
                                                }
                                                setCloseKey(getNewKey());
                                            }}
                                        />
                                        // <div
                                        //     key={i}
                                        //     onClick={() => {
                                        //         if(props.onChange){
                                        //             props.onChange({
                                        //                 start: option.start,
                                        //                 end: option.end,
                                        //             });
                                        //         }
                                        //     }}
                                        //     className={`px-4 py-4 cursor-pointer rounded-md text-center
                                        //         ${checked ? 'bg-redVar1 text-white' : 'hover:bg-pinkVar1 text-blackVar2'}    
                                        //     `}
                                        // >
                                        //     {option.label}
                                        // </div>
                                    )
                                })
                            }
                        </div> :
                        <div className="text-center italic">
                            user is not available at this time
                        </div>
                    }
                </div> : undefined
            }
        </ScheduleInputModal>
    );
}

export default ScheduleInputTimeSlot;