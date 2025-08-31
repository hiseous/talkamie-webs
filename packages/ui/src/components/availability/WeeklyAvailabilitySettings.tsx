import { __weekDays } from "../../utils/constants/time";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import LoadingText from "../loader/LoadingText";
import { useCustomAvailabilitySettings } from "./useCustomAvailabilitySettings";
import { useWeeklyAvailabilitySettings } from "./useWeeklyAvailabilitySettings";
import WeeklyItemSetting from "./WeeklyItemSettings";

type WeeklyAvailabilitySettingsProps = ComponentPrimitiveProps & {
    weeklyHook: ReturnType<typeof useWeeklyAvailabilitySettings>;
    customHook?: ReturnType<typeof useCustomAvailabilitySettings>;
};

const WeeklyAvailabilitySettings = (props: WeeklyAvailabilitySettingsProps) => {
    // console.log(props.weeklyHook.formItems, props.weeklyHook.weeklyObjectItems)
    
    return (
        <div className={`${props.className || ''}`}>
            {
                props.weeklyHook.get.loading === false ?
                <>
                    {
                        __weekDays.map((week, i) => (
                            <WeeklyItemSetting
                                key={i}
                                weekDayAbbr={week.short}
                                // dateTimeRanges={props.weeklyHook.weeklyArrayItems[week.short]}
                                dateTimeRanges={props.weeklyHook.weeklyDateTimeRanges}
                                // type="weekly"
                                className={`${i > 0 ? 'mt-6' : ''}`}
                                addDateTimeRange={(isoWeekDayAbbr, dateTimeRange) => props.weeklyHook.addDateTimeRange(isoWeekDayAbbr, dateTimeRange)}
                                removeDateTimeRange={(isoWeekDayAbbr, dateTimeRange) => props.weeklyHook.removeDateTimeRange(isoWeekDayAbbr, dateTimeRange)}
                            />
                        ))
                    }
                    <Button
                        theme="red"
                        className="w-full mt-8 rounded-md"
                        loading={props.weeklyHook.saving}
                        onClick={props.weeklyHook.submit}
                    >
                        Save changes
                    </Button>
                </> :
                props.weeklyHook.get.loading ?
                <LoadingText text="loading weekly availability..." /> :
                <></>
            }
        </div>
    );
}

export default WeeklyAvailabilitySettings;