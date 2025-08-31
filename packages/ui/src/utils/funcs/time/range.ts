import { userAvailabilityCustomArrayItems, userAvailabilityCustomObjectItems } from "../../../components/availability/useCustomAvailabilitySettings";
import { userAvailabilityWeeklyArrayItems, userAvailabilityWeeklyObjectItems } from "../../../components/availability/useWeeklyAvailabilitySettings";
import { __1day } from "../../constants/digits/time";
import { dateTimeRangeProps, dateTimeRanges, isoDate, isoDateTime, timeRangeProps } from "../../types/time";
import { userAvailabilityCustomItems, userAvailabilityWeeklyItems } from "../../types/user-availability";
import { dateTimeRangeAgainstPresentTime } from "./comparison";
import { from24HrTime } from "./format";
import { getPresentTime } from "./present-time";
import { adjustDateTimeByMilliseconds, fromTimestamp } from "./timestamp";
import { adjustIsoDateTimeByTimezone } from "./timezone";
import { adjustDateTimeToWeekDay } from "./week-days";

// export const timeRangeInTimeRanges = (timeRange?: timeRangeProps, timeRanges: timeRangeProps[] = []) => {
//     let isInRange = false;
//     // console.log(timeRange, timeRanges)
//     if(timeRange){
//         for(let i = 0; i < timeRanges.length; i++){
//             const timeRangeItem = timeRanges[i];
//             if(timeRange.start && timeRange.end && timeRangeItem.start && timeRangeItem.end){
//                 let isoStartDateTime = `1970-02-02T${normalizeIso24Time(timeRange.start).normalized}`;
//                 const isoEndDateTime = `1970-02-02T${normalizeIso24Time(timeRange.end).normalized}`;
//                 if(isoStartDateTime >= isoEndDateTime){
//                     isoStartDateTime = adjustDateTimeByMilliseconds(isoStartDateTime, -1 * __1day.miliSec).iso;
//                 }

//                 let isoItemStartDateTime = `1970-02-02T${normalizeIso24Time(timeRangeItem.start).normalized}`;
//                 const isoItemEndDateTime = `1970-02-02T${normalizeIso24Time(timeRangeItem.end).normalized}`;
//                 if(isoItemStartDateTime >= isoItemEndDateTime){
//                     isoItemStartDateTime = adjustDateTimeByMilliseconds(isoItemStartDateTime, -1 * __1day.miliSec).iso;
//                 }

//                 if(
//                     isoItemStartDateTime <= isoStartDateTime
//                     && isoEndDateTime <= isoItemEndDateTime
//                 ){
//                     isInRange = true;
//                     break;
//                 }
//             }
//         }
//     }

//     return isInRange;
// };

export const checkDateTimeRange = (dateTimeRange: dateTimeRangeProps) => {
    const start = dateTimeRange.start;
    let end = dateTimeRange.end;

    if(start && end){
        if(end <= start){
            //add one more day to the end range, if it is less than the start;
            end = adjustDateTimeByMilliseconds(end, __1day.miliSec).iso;
            
            //what if the end is many more days lesser than the start?
        }
    }

    const range: dateTimeRangeProps = {
        start,
        end,
    };

    return range;
}
export const replaceAndAdjustDateInDateTimeRange = (replacementIsoDate: isoDate, dateTimeRange: dateTimeRangeProps) => {
    const newRange: dateTimeRangeProps = {};

    if(replacementIsoDate && dateTimeRange.start && dateTimeRange.end){
        const start = new Date(dateTimeRange.start);
        const end = new Date(dateTimeRange.end);
        
        // Parse new date (without time)
        const newDate = new Date(replacementIsoDate + "T00:00:00.000Z");

        // Calculate the difference in days between end and start
        const msInDay = 24 * 60 * 60 * 1000;
        const dayDiff = Math.round((end.getTime() - start.getTime()) / msInDay);

        // Helper: create new Date with new date but old time
        const combineDateAndTime = (datePart: Date, timePart: Date) => {
            return new Date(
            Date.UTC(
                datePart.getUTCFullYear(),
                datePart.getUTCMonth(),
                datePart.getUTCDate(),
                timePart.getUTCHours(),
                timePart.getUTCMinutes(),
                timePart.getUTCSeconds(),
                timePart.getUTCMilliseconds()
            )
            );
        }

        // New start with replaced date but original time
        const newStart = combineDateAndTime(newDate, start);

        // New end is newStart + dayDiff days, but keep original end time
        const tentativeEndDate = new Date(newStart.getTime() + dayDiff * msInDay);
        const newEnd = combineDateAndTime(tentativeEndDate, end);

        newRange.start = newStart.toISOString();
        newRange.end = newEnd.toISOString();
    }

  return newRange;
};

export const dateTimeRangeInDateTimeRanges = (dateTimeRange?: dateTimeRangeProps, dateTimeRanges: dateTimeRangeProps[] = []) => {
    let isInRange = false;
    // console.log(dateTimeRange, dateTimeRanges)
    if(dateTimeRange){
        for(let i = 0; i < dateTimeRanges.length; i++){
            const dateTimeRangeItem = dateTimeRanges[i];
            if(dateTimeRange.start && dateTimeRange.end && dateTimeRangeItem?.start && dateTimeRangeItem.end){
                if(
                    dateTimeRangeItem.start <= dateTimeRange.start
                    && dateTimeRange.end <= dateTimeRangeItem.end
                ){
                    isInRange = true;
                    break;
                }
            }
        }
    }

    return isInRange;
};
export const dateTimeInDateTimeRanges = (isoDateTime?: isoDateTime, dateTimeRanges: dateTimeRangeProps[] = []) => {
    let isInRange = false;
    if(isoDateTime){
        for(let i = 0; i < dateTimeRanges.length; i++){
            const dateTimeRange = dateTimeRanges[i];
            if(dateTimeRange?.start && dateTimeRange.end){
                if(
                    (isoDateTime <= dateTimeRange.start) && (dateTimeRange.end <= adjustDateTimeByMilliseconds(isoDateTime, __1day.miliSec).iso)
                    // (dateTimeRange.start <= isoDateTime) && (isoDateTime <= dateTimeRange.end)
                    // (isoDateTime <= dateTimeRange.start) && (dateTimeRange.end <= adjustDateTimeByMilliseconds(isoDateTime, 3600 * 23 * 1000).iso)
                    // (adjustDateTimeByMilliseconds(isoDateTime, -__1day.miliSec).iso <= dateTimeRange.start) && (dateTimeRange.end <= isoDateTime)
                ){
                    isInRange = true;
                    break;
                }
            }
        }
    }

    return isInRange;
};
export const dateTimeRangeWeekDayInDateTimeRanges = (dateTimeRange?: dateTimeRangeProps, dateTimeRanges: dateTimeRangeProps[] = []) => {
    let isInRange = false;
    // console.log(dateTimeRange, dateTimeRanges)
    if(dateTimeRange){
        for(let i = 0; i < dateTimeRanges.length; i++){
            const dateTimeRangeItem = dateTimeRanges[i];
            if(dateTimeRange.start && dateTimeRange.end && dateTimeRangeItem?.start && dateTimeRangeItem.end){
                // const isoStartDateTimeProps = fromTimestamp(dateTimeRange.start, false);
                // const isoEndDateTimeProps = fromTimestamp(dateTimeRange.end, false);
                const adjustedStartDateTimeProps = fromTimestamp(adjustIsoDateTimeByTimezone(dateTimeRange.start), false);
                const adjustedEndDateTimeProps = fromTimestamp(adjustIsoDateTimeByTimezone(dateTimeRange.end), false);

                // const isoStartRangeItemProps = fromTimestamp(dateTimeRangeItem.start, false);
                // const isoEndRangeItemProps = fromTimestamp(dateTimeRangeItem.end, false);
                const adjustedStartRangeItemProps = fromTimestamp(adjustIsoDateTimeByTimezone(dateTimeRangeItem.start), false);
                const adjustedEndRangeItemProps = fromTimestamp(adjustIsoDateTimeByTimezone(dateTimeRangeItem.end), false);

                if(
                    adjustedStartRangeItemProps.day.dayOfWeekIndex === adjustedStartDateTimeProps.day.dayOfWeekIndex
                    // && (
                    //     adjustedStartRangeItemProps.time.in24Hr <= adjustedStartDateTimeProps.time.in24Hr
                    //     && adjustedEndDateTimeProps.time.in24Hr <= adjustedEndRangeItemProps.time.in24Hr
                    // )
                    // dateTimeRangeItem.start <= dateTimeRange.start
                    // && dateTimeRange.end <= dateTimeRangeItem.end
                ){
                    //replace the weekly range item date parts with the dateTimeRange date part;
                    //then compare them;
                    const tempIsoDate = adjustedStartDateTimeProps.date.iso;
                    const tempItemRange: dateTimeRangeProps = {
                        start: adjustedStartRangeItemProps.dateTime.iso,
                        end: adjustedEndRangeItemProps.dateTime.iso,
                    };
                    const newItemRange = replaceAndAdjustDateInDateTimeRange(tempIsoDate, tempItemRange);

                    if(
                        newItemRange.start && newItemRange.end
                        && (
                            newItemRange.start <= adjustedStartDateTimeProps.dateTime.iso
                            && adjustedEndDateTimeProps.dateTime.iso <= newItemRange.end
                        )
                    ){
                        // console.log(
                        //     i,
                        //     dateTimeRange, dateTimeRanges,
                        //     adjustedStartDateTimeProps.day.short,
                        //     adjustedStartDateTimeProps.dateTime.iso, adjustedStartRangeItemProps.dateTime.iso,
                        //     adjustedEndDateTimeProps.dateTime.iso, adjustedEndRangeItemProps.dateTime.iso,
                        //     // adjustedStartDateTimeProps.time.in24Hr, adjustedStartRangeItemProps.time.in24Hr,
                        //     // adjustedEndDateTimeProps.time.in24Hr, adjustedEndRangeItemProps.time.in24Hr
                        // )
                        isInRange = true;
                        break;
                    }
                }
            }
        }
    }

    return isInRange;
};
export const dateTimeWeekDayInDateTimeRanges = (isoDateTime?: isoDateTime, dateTimeRanges: dateTimeRangeProps[] = []) => {
    let isInRange = false;
    if(isoDateTime){

        for(let i = 0; i < dateTimeRanges.length; i++){
            const dateTimeRange = dateTimeRanges[i];
            if(dateTimeRange?.start && dateTimeRange.end){
                const isoStartDateTimeProps = fromTimestamp(adjustIsoDateTimeByTimezone(isoDateTime), false).day;
                // const isoEndDateTimeProps = fromTimestamp(adjustDateTimeByMilliseconds(adjustIsoDateTimeByTimezone(isoDateTime), __1day.miliSec).iso, false).day;

                const isoStartRangeProps = fromTimestamp(adjustIsoDateTimeByTimezone(dateTimeRange.start), false).day;
                // const isoEndRangeProps = fromTimestamp(adjustIsoDateTimeByTimezone(dateTimeRange.end), false).day;

                if(
                    isoStartDateTimeProps.dayOfWeekIndex === isoStartRangeProps.dayOfWeekIndex
                    // && isoEndDateTimeProps.dayOfWeekIndex === isoEndRangeProps.dayOfWeekIndex
                    // isoStartDateTimeProps.dayOfWeekIndex <= isoStartRangeProps.dayOfWeekIndex
                    // && isoEndDateTimeProps.dayOfWeekIndex <= isoEndRangeProps.dayOfWeekIndex
                    // (isoDateTime <= dateTimeRange.start) && (dateTimeRange.end <= adjustDateTimeByMilliseconds(isoDateTime, __1day.miliSec).iso)
                ){
                    isInRange = true;
                    break;
                }
            }
        }
    }

    return isInRange;
};

export const fromUserAvailabilityCustomObjectItems = (customObjectItems: userAvailabilityCustomObjectItems) => {
    const formItems: userAvailabilityCustomItems = {};
    const customArrayItems: userAvailabilityCustomArrayItems = {};
    let customDateTimeRanges: dateTimeRangeProps[] = [];

    for (const key in customObjectItems) {
        if (Object.prototype.hasOwnProperty.call(customObjectItems, key)) {
            const isoDate = key as keyof typeof customObjectItems;
            const dateTimeRangesObj = customObjectItems[isoDate];
            if(dateTimeRangesObj){
                const timeRanges: timeRangeProps[] = [];
                const dateTimeRanges: dateTimeRangeProps[] = [];

                for (const key2 in dateTimeRangesObj) {
                    if (Object.prototype.hasOwnProperty.call(dateTimeRangesObj, key2)) {
                        const startTimeKey = key2 as keyof typeof dateTimeRangesObj;
                        const dateTimeRange = dateTimeRangesObj[startTimeKey];
                        if(dateTimeRange){
                            const timeRange: timeRangeProps = {};
                            if(dateTimeRange.start) timeRange.start = fromTimestamp(dateTimeRange.start, false).time.in24Hr;
                            if(dateTimeRange.end) timeRange.end = fromTimestamp(dateTimeRange.end, false).time.in24Hr;

                            timeRanges.push(timeRange);

                            const checkedDateTimeRange = checkDateTimeRange(dateTimeRange);
                            dateTimeRanges.push(checkedDateTimeRange);
                        }
                    }
                }

                formItems[isoDate] = timeRanges;
                customArrayItems[isoDate] = dateTimeRanges;
                customDateTimeRanges = [
                    ...customDateTimeRanges,
                    ...dateTimeRanges,
                ];
            }
        }
    }

    return {
        formItems,
        customArrayItems,
        customDateTimeRanges,
    };
};

type fromUserAvailabilityCustomFormItemsOptions = {
    omitPastRange?: boolean;
}
export const fromUserAvailabilityCustomFormItems = (formItems?: userAvailabilityCustomItems, options?: fromUserAvailabilityCustomFormItemsOptions) => {
    const customObjectItems: userAvailabilityCustomObjectItems = {};
    let customDateTimeRanges: dateTimeRangeProps[] = [];

    if(formItems){
        for (const key in formItems) {
            if (Object.prototype.hasOwnProperty.call(formItems, key)) {
                const isoDate = key as keyof typeof formItems;
                const timeRanges = formItems[isoDate];
                if(timeRanges?.length){
                    const dateTimeRangesObj: dateTimeRanges = {};
                    const dateTimeRanges: dateTimeRangeProps[] = [];

                    for(let i = 0; i < timeRanges.length; i++){
                        const timeRange = timeRanges[i];
                        const dateTimeRange: dateTimeRangeProps = {};
                        
                        dateTimeRange.start = `${isoDate}T${from24HrTime(timeRange?.start || '00:00:00.000Z').text?.normalized}`;
                        dateTimeRange.end = `${isoDate}T${from24HrTime(timeRange?.end || '00:00:00.000Z').text?.normalized}`;

                        if(dateTimeRange.end < dateTimeRange.start){
                            //means, the end should be in the next day;
                            dateTimeRange.end = adjustDateTimeByMilliseconds(dateTimeRange.end, __1day.miliSec).iso;
                        }

                        const checkedDateTimeRange = checkDateTimeRange(dateTimeRange);
                        const compareProps = dateTimeRangeAgainstPresentTime(dateTimeRange);
                        if(options?.omitPastRange === undefined || compareProps.status !== 'past'){
                            dateTimeRangesObj[dateTimeRange.start] = checkedDateTimeRange;
                            dateTimeRanges.push(checkedDateTimeRange);
                        }
                    }

                    customObjectItems[isoDate] = dateTimeRangesObj;
                    customDateTimeRanges = [
                        ...customDateTimeRanges,
                        ...dateTimeRanges,
                    ];
                }
            }
        }
    }

    return {
        customObjectItems,
        customDateTimeRanges,
    };
};

export const fromUserAvailabilityWeeklyObjectItems = (weeklyObjectItems: userAvailabilityWeeklyObjectItems) => {
    const formItems: userAvailabilityWeeklyItems = {};
    const weeklyArrayItems: userAvailabilityWeeklyArrayItems = {};
    let weeklyDateTimeRanges: dateTimeRangeProps[] = [];

    for (const key in weeklyObjectItems) {
        if (Object.prototype.hasOwnProperty.call(weeklyObjectItems, key)) {
            const weekDayAbbrKey = key as keyof typeof weeklyObjectItems;
            const dateTimeRangesObj = weeklyObjectItems[weekDayAbbrKey];
            if(dateTimeRangesObj){
                const timeRanges: timeRangeProps[] = [];
                const dateTimeRanges: dateTimeRangeProps[] = [];

                for (const key2 in dateTimeRangesObj) {
                    if (Object.prototype.hasOwnProperty.call(dateTimeRangesObj, key2)) {
                        const startTimeKey = key2 as keyof typeof dateTimeRangesObj;
                        const dateTimeRange = dateTimeRangesObj[startTimeKey];
                        if(dateTimeRange){
                            const timeRange: timeRangeProps = {};
                            if(dateTimeRange.start) timeRange.start = fromTimestamp(dateTimeRange.start, false).time.in24Hr;
                            if(dateTimeRange.end) timeRange.end = fromTimestamp(dateTimeRange.end, false).time.in24Hr;

                            timeRanges.push(timeRange);

                            const checkedDateTimeRange = checkDateTimeRange(dateTimeRange);
                            dateTimeRanges.push(checkedDateTimeRange);
                        }
                    }
                }

                formItems[weekDayAbbrKey] = timeRanges;
                weeklyArrayItems[weekDayAbbrKey] = dateTimeRanges;
                weeklyDateTimeRanges = [
                    ...weeklyDateTimeRanges,
                    ...dateTimeRanges,
                ];
            }
        }
    }

    return {
        formItems,
        weeklyArrayItems,
        weeklyDateTimeRanges,
    };
}
export const fromUserAvailabilityWeeklyFormItems = (formItems?: userAvailabilityWeeklyItems) => {
    const weeklyObjectItems: userAvailabilityWeeklyObjectItems = {};
    let weeklyDateTimeRanges: dateTimeRangeProps[] = [];

    if(formItems){
        for (const key in formItems) {
            if (Object.prototype.hasOwnProperty.call(formItems, key)) {
                const weekDayAbbrKey = key as keyof typeof formItems;
                const timeRanges = formItems[weekDayAbbrKey];
                if(timeRanges?.length){
                    const dateTimeRangesObj: dateTimeRanges = {};
                    const dateTimeRanges: dateTimeRangeProps[] = [];

                    for(let i = 0; i < timeRanges.length; i++){
                        const timeRange = timeRanges[i];
                        const dateTimeRange: dateTimeRangeProps = {};

                        const presentDate = getPresentTime().date.iso;
                        const presentStart = `${presentDate}T${from24HrTime(timeRange?.start || '00:00:00.000Z').text?.normalized}`;
                        const presentEnd = `${presentDate}T${from24HrTime(timeRange?.end || '00:00:00.000Z').text?.normalized}`;

                        dateTimeRange.start = adjustDateTimeToWeekDay(presentStart, weekDayAbbrKey, false).iso;
                        dateTimeRange.end = adjustDateTimeToWeekDay(presentEnd, weekDayAbbrKey, false).iso;

                        const checkedDateTimeRange = checkDateTimeRange(dateTimeRange);
                        dateTimeRanges.push(checkedDateTimeRange);

                        dateTimeRangesObj[dateTimeRange.start] = checkedDateTimeRange;
                        dateTimeRanges.push(checkedDateTimeRange);
                    }

                    weeklyObjectItems[weekDayAbbrKey] = dateTimeRangesObj;
                    weeklyDateTimeRanges = [
                        ...weeklyDateTimeRanges,
                        ...dateTimeRanges,
                    ];
                }
            }
        }
    }

    // console.log('--------', formItems, weeklyObjectItems, weeklyDateTimeRanges)

    return {
        weeklyObjectItems,
        weeklyDateTimeRanges,
    };
};