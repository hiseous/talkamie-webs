import { scheduleCallForm, scheduleCallReqBody } from "../../api/schedule/schedule-call";
import { scheduleProps } from "../../types/schedule";
import { getPresentTime } from "../time/present-time";
import { combineIntoUtcTimestamp } from "../time/time-combination";
import { adjustDateTimeByMilliseconds, adjustTimestamp, binaryOpOnTimestamps, fromTimestamp } from "../time/timestamp";

export const fromScheduleToForm = (schedule?: scheduleProps) => {
    const fromProps = (
        schedule?.timeslot?.from ? fromTimestamp(schedule.timeslot.from, true) : undefined
    );
    const toProps = (
        schedule?.timeslot?.to ? fromTimestamp(schedule.timeslot.to, true) : undefined
    );

    const form: scheduleCallForm = {
        title: schedule?.title || (schedule?.attendee?.name ? `Meeting with ${schedule?.attendee.name}` : ``),
        startDate: fromProps?.date.iso,
        type: schedule?.type ?? 'video',
        startTime: fromProps?.time.in24Hr,
        endTime: toProps?.time.in24Hr,
        recurrence: schedule?.recurrence ?? 'none',
        // weeklyRecurringDay: schedule?.weeklyRecurringDay,
        // timezoneOffset: new Date().getTimezoneOffset(),
    };

    return form;
};

export const fromScheduleFormToReqBody = (form: scheduleCallForm) => {
    let startDateTime: string | undefined;
    let endDateTime: string | undefined;

    if(form.startDate){
        startDateTime = combineIntoUtcTimestamp({
            date: form.startDate,
            time: form.startTime,
            // timezoneOffset: form.timezoneOffset,
        }).iso;
        endDateTime = combineIntoUtcTimestamp({
            date: form.startDate,
            time: form.endTime,
            // timezoneOffset: form.timezoneOffset,
        }).iso;

        //if end-date-time < start-date-time, due to choosing 11PM to 12AM, add one day;
        const diff = binaryOpOnTimestamps(endDateTime, '-', startDateTime).inSec;
        if(diff < 0){
            //add one day;
            endDateTime = adjustTimestamp({
                timestamp: endDateTime,
                day: 1,
                op: 'add',
            }).iso;
        }

        //all these are equivalent to the user's local time;
        //convert to utc;
        const timezoneOffset = getPresentTime().timezone.offset;
        startDateTime = adjustDateTimeByMilliseconds(startDateTime, timezoneOffset * 60 * 1000).iso;
        endDateTime = adjustDateTimeByMilliseconds(endDateTime, timezoneOffset * 60 * 1000).iso;
    }

    let reqBody: scheduleCallReqBody = {
        title: form.title,
        type: form.type,
        // timezoneOffset: form.timezoneOffset,
        // weeklyRecurringDay: form.weeklyRecurringDay,
        recurrence: form.recurrence,
        startDateTime,
        endDateTime,
    };

    return reqBody;
}