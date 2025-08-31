import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { __classNames } from "../../utils/constants/classNames";
import { getNewKey } from "../../utils/funcs/string/string";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { dateTimeRangeProps, isoDate, isoDateTime } from "../../utils/types/time";
import LocalizationWrapper from "../wrapper/LocalizationWrapper";
import MuiCustomDay from "./MuiCustomDay";
import MuiCustomHeader from "./MuiCustomHeader";
import ScheduleInputModal from "./ScheduleInputModal";

type ScheduleInputDateProps = ComponentPrimitiveProps & {
    date?: string;
    viewOnly?: boolean;
    userCustomDateTimeRanges?: dateTimeRangeProps[];
    userWeeklyDateTimeRanges?: dateTimeRangeProps[];
    onChange?: (isoDateTime?: isoDateTime, isoDate?: isoDate) => void;
};

const ScheduleInputDate = (props: ScheduleInputDateProps) => {
    const [closeKey, setCloseKey] = useState<string | undefined>(undefined);
    
    return (
        <ScheduleInputModal
            className={`${props.className || ''}`}
            svgAssetName="CalendarEmptyAlt"
            closeKey={closeKey}
            title="Date"
            subTitle={props.date ? dayjs(props.date).format('ddd, MMMM D, YYYY') : undefined}
        >
            {
                !props.viewOnly ?
                <LocalizationWrapper>
                    <StaticDatePicker
                        // className={`${pickerShell}`}
                        // format="YYYY/MM/DD"
                        disablePast
                        displayStaticWrapperAs="desktop"
                        // slotProps={pickerSlotProps}
                        // onChange={(changeProps) => handleChange(changeProps)}
                        onChange={(value) => {
                            if(props.onChange) props.onChange(value?.toISOString() as isoDateTime, value?.format('YYYY-MM-DD') as isoDate);
                            setCloseKey(getNewKey());
                        }}
                        defaultValue={props.date ? dayjs(props.date) : undefined}
                        className={`${__classNames.muiStaticDatePicker}`}
                        slots={{
                            day: (thisProps) => (
                                <MuiCustomDay
                                    {...thisProps}
                                    customavailabletimeranges={props.userCustomDateTimeRanges}
                                    weeklyavailabletimeranges={props.userWeeklyDateTimeRanges}
                                />
                            ),
                            calendarHeader: (thisProps) => (
                                <MuiCustomHeader
                                    {...thisProps}
                                />
                            ),
                        }}
                    />
                </LocalizationWrapper> : undefined
            }
        </ScheduleInputModal>
    );
}

export default ScheduleInputDate;