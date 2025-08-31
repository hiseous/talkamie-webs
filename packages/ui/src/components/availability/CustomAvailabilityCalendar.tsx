import { useEffect, useState } from "react";
import { Calendar } from "rsuite";
import { __classNames } from "../../utils/constants/classNames";
import { getPresentTime } from "../../utils/funcs/time/present-time";
import { dateTimeInDateTimeRanges } from "../../utils/funcs/time/range";
import { adjustDateTimeByMilliseconds, extractFromIsoDateTime, fromIsoDateTimeToIsoDate, fromTimestamp } from "../../utils/funcs/time/timestamp";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { dateTimeRangeProps } from "../../utils/types/time";
import { useCustomAvailabilitySettings } from "./useCustomAvailabilitySettings";
import CustomWeeklyItemSetting from "./CustomWeeklyItemSettings";

type CustomAvailabilityCalendarProps = ComponentPrimitiveProps & {
    // weeklyHook?: ReturnType<typeof useWeeklyAvailabilitySettings>;
    customHook?: ReturnType<typeof useCustomAvailabilitySettings>;
};

const CustomAvailabilityCalendar = (props: CustomAvailabilityCalendarProps) => {
    const [focusedDate, setFocusedDate] = useState<Date | undefined>(undefined); //focused day on calendar;

    const handles = {
        fromDate: (date: Date) => {
            const isoDateTime = date.toISOString();
            const timezoneOffset = date.getTimezoneOffset(); //as in minutes behind GMT;
            const localIsoDateTime = adjustDateTimeByMilliseconds(
                isoDateTime,
                -(timezoneOffset * 60 * 1000)
            ).iso;
            const isoLocalDate = fromIsoDateTimeToIsoDate(localIsoDateTime);

            return {
                isoLocalDate,
                isoDate: extractFromIsoDateTime(isoDateTime).isoDate,
            };
        },
        dateIsAlreadyAvailable: (date?: Date) => {
            let available = false;
            if(date){
                const isoDateTime = date.toISOString();
                available = dateTimeInDateTimeRanges(isoDateTime, props.customHook?.customDateTimeRanges);
            }

            return available;
        },
        onCalendarDateChange: (date?: Date) => {
            setFocusedDate(date);
        },
        addDateTimeRange: (dateTimeRange?: dateTimeRangeProps) => {
            if(dateTimeRange && props.customHook){
                // const transformedDateTimeRange = handles.replaceBaseIsoStartDateInDateTimeRange(date.toISOString(), dateTimeRange, date.getTimezoneOffset());
                // console.log('---add', {dateTimeRange, transformedDateTimeRange})
                // console.log('---add', dateTimeRange)
                props.customHook.addDateTimeRange(dateTimeRange);
            }
        },
        removeDateTimeRange: (dateTimeRange?: dateTimeRangeProps) => {
            if(dateTimeRange && props.customHook){
                // const transformedDateTimeRange = handles.replaceBaseIsoStartDateInDateTimeRange(date.toISOString(), dateTimeRange, date.getTimezoneOffset());
                // console.log('---remove', {dateTimeRange, transformedDateTimeRange})
                // console.log('---remove', dateTimeRange)
                props.customHook.removeDateTimeRange(dateTimeRange);
            }
        },
    };

    useEffect(() => {
        const present = getPresentTime();
        setFocusedDate(present.Date);
    }, []);

    let custom;
    if(focusedDate){
        // const dateTime = focusedDate.toISOString();
        // const localDateTime = adjustDateTimeByMilliseconds(dateTime, -(focusedDate.getTimezoneOffset() * 60 * 1000)).iso;
        const isoDate = extractFromIsoDateTime(focusedDate.toISOString()).isoDate;
        // const localDate = fromIsoDateTimeToIsoDate(localDateTime);
        const weekDayAbbr = fromTimestamp(focusedDate.toISOString()).day.short;
        if(props.customHook?.customArrayItems && isoDate){
            custom = {
                // dateTimeRanges: props.customHook?.customArrayItems[isoDate],
                dateTimeRanges: props.customHook.customDateTimeRanges,
                weekDayAbbr,
                isoDate,
            };
        }
    }

    // console.log('---reRendered', focusedDate?.toISOString(), custom, props.customHook?.customObjectItems)
    
    return (
        <div className={`${props.className || ''}`}>
                <Calendar
                    weekStart={0}
                    compact
                    disabledDate={(date: Date) => {
                        const today = new Date();
                        return date.getTime() < today.setHours(0, 0, 0, 0);
                    }}
                    className={`${__classNames.rsuiteCalendar}`}
                    cellClassName={(cellDate) => {
                        return `${handles.dateIsAlreadyAvailable(cellDate) ? `relative bg-redVar1 [&_.rs-calendar-table-cell-day]:!text-white hover:bg-white [&_.rs-calendar-table-cell-day]:hover:!text-redVar1` : `[&.rs-calendar-table-cell-is-today_.rs-calendar-table-cell-day]:!text-redVar1`}`;
                    }}
                    // renderCell={(cellDate) => {
                    //     return (
                    //         <div className="absolute left-0 top-0 w-full h-full p-2">
                    //             <div className="bg-[red] w-full h-full">
                    //             hey
                    //             </div>
                    //         </div>
                    //     )
                    // }}
                    onSelect={handles.onCalendarDateChange}
                    onMonthChange={handles.onCalendarDateChange}
                />
                <div>
                    {
                        custom ?
                        <CustomWeeklyItemSetting
                            weekDayAbbr={custom.weekDayAbbr}
                            dateTimeRanges={custom.dateTimeRanges}
                            className="mt-6"
                            addDateTimeRange={handles.addDateTimeRange}
                            removeDateTimeRange={handles.removeDateTimeRange}
                            focusedDateTimeRange={
                                focusedDate ? 
                                {
                                    start: focusedDate.toISOString(),
                                    end: adjustDateTimeByMilliseconds(focusedDate.toISOString(), 3600 * 24 * 1000).iso,
                                 } :
                                undefined
                            }
                            defaultInputTimeRangeValue={
                                focusedDate ? 
                                [
                                    focusedDate,
                                    adjustDateTimeByMilliseconds(focusedDate.toISOString(), 3600 * 1 * 1000).Date,
                                ] :
                                undefined
                            }
                            // addDateTimeRange={(dateTimeRange) => props.weeklyHook.addDateTimeRange(week.short, dateTimeRange)}
                            // removeDateTimeRange={(dateTimeRange) => props.weeklyHook.removeDateTimeRange(week.short, dateTimeRange)}
                        /> : undefined
                    }
                </div>
        </div>
    );
}

export default CustomAvailabilityCalendar;