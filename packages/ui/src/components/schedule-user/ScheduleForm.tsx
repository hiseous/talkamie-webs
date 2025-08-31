
import { useEffect, useState } from "react";
import { scheduleCallForm } from "../../utils/api/schedule/schedule-call";
import { normalizeIso24Time } from "../../utils/funcs/time/format";
import { checkDateTimeRange, dateTimeRangeInDateTimeRanges, dateTimeRangeWeekDayInDateTimeRanges, fromUserAvailabilityCustomFormItems, fromUserAvailabilityWeeklyFormItems } from "../../utils/funcs/time/range";
import { ComponentPrimitiveProps, valueOf } from "../../utils/types/global.types";
import { dateTimeRangeProps, iso24HrTime, isoDateTime } from "../../utils/types/time";
import { userProps } from "../../utils/types/user";
import ScheduleInputCallType from "./ScheduleInputCallType";
import ScheduleInputDate from "./ScheduleInputDate";
import ScheduleInputRecurrence from "./ScheduleInputRecurrence";
import ScheduleInputTimeSlot, { scheduleTimeSlotOption } from "./ScheduleInputTimeSlot";
import ScheduleInputTitle from "./ScheduleInputTitle";
import { getPresentTime } from "../../utils/funcs/time/present-time";
import { fromTimeZoneOffset } from "../../utils/funcs/time/timezone";
import { adjustDateTimeByMilliseconds } from "../../utils/funcs/time/timestamp";
import { __1hr } from "../../utils/constants/digits/time";
import dayjs from "dayjs";

type ScheduleFormProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
    form?: scheduleCallForm;
    viewOnly?: boolean;
    onChange?: (name: keyof scheduleCallForm, value?: valueOf<scheduleCallForm>) => void;
};

const ScheduleForm = (props: ScheduleFormProps) => {
    const [focusedIsoDateTime, setFocusedIsoDateTime] = useState<isoDateTime | undefined>(undefined);
    const customDateTimeRanges = fromUserAvailabilityCustomFormItems(props.user?.availability?.custom, {omitPastRange: true}).customDateTimeRanges;
    const weeklyDateTimeRanges = fromUserAvailabilityWeeklyFormItems(props.user?.availability?.weekly).weeklyDateTimeRanges;

    const handles = {
        getTimeSlotOptions: (focusedIsoDateTime: isoDateTime | undefined, customRanges: dateTimeRangeProps[] | undefined, weeklyRanges: dateTimeRangeProps[] | undefined) => {
            const lim = 24;
            const options: scheduleTimeSlotOption[] = [];
            if(focusedIsoDateTime){
                const timezoneOffset = getPresentTime().timezone.offset;
                const isoTimezone = fromTimeZoneOffset(timezoneOffset).iso;
    
                for(let i = 0; i < lim; i++){
                    const isoStartDateTime = adjustDateTimeByMilliseconds(focusedIsoDateTime, i * __1hr.miliSec).iso;
                    const isoEndDateTime = adjustDateTimeByMilliseconds(focusedIsoDateTime, (i + 1) * __1hr.miliSec).iso;
    
                    const localStartDateTime = adjustDateTimeByMilliseconds(isoStartDateTime, -1 * timezoneOffset * 60 * 1000).iso.replaceAll('Z', isoTimezone);
                    const localEndDateTime = adjustDateTimeByMilliseconds(isoEndDateTime, -1 * timezoneOffset * 60 * 1000).iso.replaceAll('Z', isoTimezone);
    
                    const start = dayjs(localStartDateTime).format('HH:mm:ss') as iso24HrTime;
                    const end = dayjs(localEndDateTime).format('HH:mm:ss') as iso24HrTime;
                    const label = `${
                        dayjs(localStartDateTime).format('hh:mmA')
                    } - ${
                        dayjs(localEndDateTime).format('hh:mmA')
                    }`;
    
                    
                    const dateTimeRange: dateTimeRangeProps = {
                        start: isoStartDateTime,
                        end: isoEndDateTime,
                    };
                    
                    const availableInCustom = dateTimeRangeInDateTimeRanges(dateTimeRange, customRanges);
                    const availableInWeekly = dateTimeRangeWeekDayInDateTimeRanges(dateTimeRange, weeklyRanges);
                    const available = availableInCustom || availableInWeekly;
    
                    const option: scheduleTimeSlotOption = {
                        start,
                        end,
                        label,
                        disabled: available ? false : true,
                    };
                    
                    if(available) options.push(option);
                }
            }
            
            return options;
        },
        availableForRecurrence: (focusedIsoDateTime: isoDateTime | undefined, form: scheduleCallForm | undefined, weeklyRanges: dateTimeRangeProps[] | undefined) => {
            let available: boolean | undefined;
            if(focusedIsoDateTime){
                //get range;
                // available = false;
                if(form?.startDate && form.startTime && form.endTime){
                    const timezoneOffset = getPresentTime().timezone.offset;
                    const offsetInMiliSec = timezoneOffset * 60 * 1000;

                    const localIsoStartDateTime = `${form.startDate}T${normalizeIso24Time(form.startTime).normalized}`;
                    const localIsoEndDateTime = `${form.startDate}T${normalizeIso24Time(form.endTime).normalized}`;
                    
                    const isoStartDateTime = adjustDateTimeByMilliseconds(localIsoStartDateTime, offsetInMiliSec).iso;
                    const isoEndDateTime = adjustDateTimeByMilliseconds(localIsoEndDateTime, offsetInMiliSec).iso;

                    const range = checkDateTimeRange({
                        start: isoStartDateTime,
                        end: isoEndDateTime,
                    });
                    // console.log(form, range, weeklyRanges)
                    available = dateTimeRangeWeekDayInDateTimeRanges(range, weeklyRanges);
                }
            }
            
            return available;
        },
    };
    const options = handles.getTimeSlotOptions(focusedIsoDateTime, customDateTimeRanges, weeklyDateTimeRanges);

    useEffect(() => {
        if(props.form?.startDate && props.form.startTime){
            const isoDateTime = `${props.form.startDate}T${normalizeIso24Time(props.form.startTime).normalized}` as isoDateTime;
            setFocusedIsoDateTime(isoDateTime);
        }
    }, []);
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            <ScheduleInputTitle
                title={props.form?.title}
                onChange={(title) => {
                    if(props.onChange) props.onChange('title', title);
                }}
                viewOnly={props.viewOnly}
            />
            <ScheduleInputCallType
                callType={props.form?.type}
                onChange={(callType) => {
                    if(props.onChange) props.onChange('type', callType);
                }}
                className="mt-4"
                viewOnly={props.viewOnly}
            />
            <ScheduleInputDate
                date={props.form?.startDate}
                onChange={(isoDateTime, isoDate) => {
                    setFocusedIsoDateTime(isoDateTime);
                    if(props.onChange){
                        props.onChange('startDate', isoDate);
                        props.onChange('startTime', undefined);
                        props.onChange('endTime', undefined);
                    }
                }}
                className="mt-4"
                viewOnly={props.viewOnly}
                userCustomDateTimeRanges={customDateTimeRanges}
                userWeeklyDateTimeRanges={weeklyDateTimeRanges}
            />
            {/* <ScheduleInputTime
                title="Start Time"
                time={props.form?.startTime}
                onChange={(time) => {
                    if(props.onChange) props.onChange('startTime', time);
                }}
                className="mt-4"
                viewOnly={props.viewOnly}
            />
            <ScheduleInputTime
                title="End Time"
                time={props.form?.endTime}
                onChange={(time) => {
                    if(props.onChange) props.onChange('endTime', time);
                }}
                className="mt-4"
                viewOnly={props.viewOnly}
            /> */}
            <ScheduleInputTimeSlot
                title="Time Slot"
                slot={{
                    start: props.form?.startTime,
                    end: props.form?.endTime,
                }}
                options={options}
                focusedIsoDateTime={focusedIsoDateTime}
                // userCustomDateTimeRanges={customDateTimeRanges}
                // userWeeklyDateTimeRanges={weeklyDateTimeRanges}
                onChange={(time) => {
                    if(props.onChange){
                        props.onChange('startTime', time.start);
                        props.onChange('endTime', time.end);
                        props.onChange('recurrence', undefined)
                    }
                    // if(props.onChange) props.onChange('startTime', time);
                }}
                className="mt-4"
                viewOnly={props.viewOnly}
            />
            <ScheduleInputRecurrence
                recurrence={props.form?.recurrence}
                onChange={(recurrence) => {
                    if(props.onChange) props.onChange('recurrence', recurrence);
                }}
                className="mt-4"
                viewOnly={props.viewOnly}
                availableForRecurring={handles.availableForRecurrence(focusedIsoDateTime, props.form, weeklyDateTimeRanges)}
            />
        </div>
    );
}

export default ScheduleForm;