import { PickersDayProps } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { dateTimeInDateTimeRanges, dateTimeWeekDayInDateTimeRanges } from "../../utils/funcs/time/range";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { dateTimeRangeProps } from "../../utils/types/time";
import { __classNames } from "../../utils/constants/classNames";

type MuiCustomDayProps = ComponentPrimitiveProps & PickersDayProps<dayjs.Dayjs> & {
    customavailabletimeranges?: dateTimeRangeProps[];
    weeklyavailabletimeranges?: dateTimeRangeProps[];
};

const MuiCustomDay = (props: MuiCustomDayProps) => {
    let disabled = props.disabled;
    if(!disabled){
        const availableInCustom = dateTimeInDateTimeRanges(props.day.toISOString(), props.customavailabletimeranges);
        const availableInWeekly = dateTimeWeekDayInDateTimeRanges(props.day.toISOString(), props.weeklyavailabletimeranges);
        const available = availableInCustom || availableInWeekly;
        disabled = available ? false : true;
    }

    const handles = {
        onClick: () => {
            if(!disabled){
                props.onDaySelect(props.day);
            }
        },
    };
    
    return (
        // <PickersDay
        //     {...props}
        //     className={`${props.className || ''}`}
        //     disabled={disabled}
        // />
        <div
            onClick={handles.onClick}
            className={`${props.className || ''} ${__classNames.transition}
                w-[36px] h-[36px] sm:w-[54px] sm:h-[54px] lg:w-[72px] lg:h-[72px]
                flex items-center justify-center text-center mx-[2px] rounded-full
                ${
                    disabled ? `cursor-not-allowed text-grayVar1/[.6] hover:bg-grayVar1/[.2]` :
                    `cursor-pointer
                        ${props.selected ? 'bg-redVar1 text-white' : 'hover:bg-pinkVar1'}
                        ${props.today ? 'border-redVar1 text-redVar1' : 'border-black'}
                    `
                }
            `}
        >
            {props.day.date()}
        </div>
    );
}

export default MuiCustomDay;