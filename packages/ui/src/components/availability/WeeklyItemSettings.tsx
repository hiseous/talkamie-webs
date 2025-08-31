
'use client';

import { DateRange } from "rsuite/esm/DateRangePicker";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { dateTimeRangeProps, weekDayAbbr } from "../../utils/types/time";
import ControlledCheckbox from "../checkbox/ControlledCheckbox";
import IconWrapper from "../icon/IconWrapper";
import InputTimeRangeModal from "../input-time/InputTimeRangeModal";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import TimeRangeItemLabel from "./TimeRangeItemLabel";
import { getPresentTime } from "../../utils/funcs/time/present-time";
import { fromTimeZoneOffset } from "../../utils/funcs/time/timezone";
import { adjustDateTimeByMilliseconds, fromTimestamp } from "../../utils/funcs/time/timestamp";
import { adjustDateTimeToWeekDay } from "../../utils/funcs/time/week-days";

type WeeklyItemSettingProps = ComponentPrimitiveProps & {
    weekDayAbbr: weekDayAbbr; //local day of the week;
    dateTimeRanges?: dateTimeRangeProps[]; //iso date-time ranges, which must have be in correspondent to their iso day of the week;
    // focusedDateTimeRange?: dateTimeRangeProps;
    defaultInputTimeRangeValue?: DateRange;
    addDateTimeRange?: (isoWeekDay: weekDayAbbr, dateTimeRangeProps: dateTimeRangeProps) => void;
    removeDateTimeRange?: (isoWeekDay: weekDayAbbr, dateTimeRangeProps: dateTimeRangeProps) => void;
};

const WeeklyItemSetting = (props: WeeklyItemSettingProps) => {
    const popUp = usePopUp();
    const timezoneOffset = getPresentTime().timezone.offset;
    const isoTimezone = fromTimeZoneOffset(timezoneOffset).iso;

    const handles = {
        filterRanges: () => {
            const dateTimeRanges = props.dateTimeRanges?.filter((dateTimeRange) => {
                let isTheDay = false;
                if(dateTimeRange.start && dateTimeRange.end){

                    // const isoStartDateTime = adjustDateTimeByMilliseconds(props.focusedIsoDateTime, i * __1hr.miliSec).iso;
                    // const isoEndDateTime = adjustDateTimeByMilliseconds(props.focusedIsoDateTime, (i + 1) * __1hr.miliSec).iso;

                    const localStartDateTime = adjustDateTimeByMilliseconds(dateTimeRange.start, -1 * timezoneOffset * 60 * 1000).iso.replaceAll('Z', isoTimezone);
                    // const localEndDateTime = adjustDateTimeByMilliseconds(dateTimeRange.end, -1 * timezoneOffset * 60 * 1000).iso.replaceAll('Z', isoTimezone);

                    const localStartProps = fromTimestamp(localStartDateTime, true);
                    if(localStartProps.day.short === props.weekDayAbbr){
                        isTheDay = true;
                    }
                }

                return isTheDay;
            });

            return dateTimeRanges;
        },
        addRange: (dateTimeRange: dateTimeRangeProps) => {
            //date-time range may be in any day of the week;
            //convert to the local day of the week, then its iso;

            if(dateTimeRange.start && dateTimeRange.end){
                const localStartDateTime = adjustDateTimeByMilliseconds(dateTimeRange.start, -1 * timezoneOffset * 60 * 1000).iso.replaceAll('Z', isoTimezone);
                const localEndDateTime = adjustDateTimeByMilliseconds(dateTimeRange.end, -1 * timezoneOffset * 60 * 1000).iso.replaceAll('Z', isoTimezone);

                //adjust to the local week day;
                const adjustedIsoStartDateTime = adjustDateTimeToWeekDay(localStartDateTime, props.weekDayAbbr, true).iso;
                const adjustedIsoEndDateTime = adjustDateTimeToWeekDay(localEndDateTime, props.weekDayAbbr, true).iso;
                const isoWeekDayAbbr = fromTimestamp(adjustedIsoStartDateTime, false).day.short;
                const newRange: dateTimeRangeProps = {
                    start: adjustedIsoStartDateTime,
                    end: adjustedIsoEndDateTime,
                };

                // console.log('--add range', props.weekDayAbbr, dateTimeRange, isoWeekDayAbbr, newRange)

                if(props.addDateTimeRange){
                    props.addDateTimeRange(isoWeekDayAbbr, newRange);
                }
            }
        },
        removeRange: (dateTimeRange: dateTimeRangeProps) => {
            //date time range is already in conrrespondent to their day of the week;
            
            if(dateTimeRange.start && dateTimeRange.end){
                const isoWeekDayAbbr = fromTimestamp(dateTimeRange.start, false).day.short;
                // console.log('--remove range', isoWeekDayAbbr, dateTimeRange)

                if(props.removeDateTimeRange){
                    props.removeDateTimeRange(isoWeekDayAbbr, dateTimeRange);
                }
            }
        },
    };

    const dateTimeRanges = handles.filterRanges();
    
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
                                            handles.removeRange(dateTimeRange);
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
                                    handles.addRange(dateTimeRange);
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

export default WeeklyItemSetting;