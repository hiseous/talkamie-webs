// import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
// import dayjs from "dayjs";
// import { dateTimeInDateTimeRanges, dateTimeWeekDayInDateTimeRanges } from "../../utils/funcs/time/range";
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { dateTimeRangeProps } from "../../utils/types/time";

// type MuiCustomDayProps = ComponentPrimitiveProps & PickersDayProps<dayjs.Dayjs> & {
//     customavailabletimeranges?: dateTimeRangeProps[];
//     weeklyavailabletimeranges?: dateTimeRangeProps[];
// };

// const MuiCustomDay = (props: MuiCustomDayProps) => {
//     let disabled = props.disabled;
//     if(!disabled){
//         const availableInCustom = dateTimeInDateTimeRanges(props.day.toISOString(), props.customavailabletimeranges);
//         const availableInWeekly = dateTimeWeekDayInDateTimeRanges(props.day.toISOString(), props.weeklyavailabletimeranges);
//         const available = availableInCustom || availableInWeekly;
//         disabled = available ? false : true;
//     }
    
//     return (
//         <PickersDay
//             {...props}
//             className={`${props.className || ''}`}
//             disabled={disabled}
//         />
//     );
// }

// export default MuiCustomDay;