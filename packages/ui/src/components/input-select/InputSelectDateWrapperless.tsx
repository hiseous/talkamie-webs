import { DatePicker, DatePickerSlotProps, TimePickerSlotProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper from "../icon/IconWrapper";

export type InputSelectDateWrapperlessProps = ComponentPrimitiveProps & {
    defaultUTC?: string;
    disablePast?: boolean;
    onChange?: (timestamp?: string) => void;
}
const InputSelectDateWrapperless = (props: InputSelectDateWrapperlessProps) => {
    
    const handleChange = (changeProps: Dayjs | null) => {
        const utc = changeProps?.format();
        // console.log('------', changeProps?.toISOString())
        if(props.onChange) props.onChange(utc);
    }
    // const pickerBox = `mt-2 px-4 py-3 rounded-3xl border-[1px] border-gray300 dark:border-grayVar4 dark:bg-gray900`;
    const pickerShell = `[&_input]:!hidden w-[fit-content] [&_*]:!m-0 [&_.iconWrapper]:!p-2
        [&_fieldset]:!border-0 [&_*]:!p-0 [&_button]:mr-0 [&_*]:![font-size:inherit] [&_*]:!text-[inherit]
        [&_input]:placeholder:lowercase [&_input]:lowercase [&_input]:placeholder:text-[gray]
        [&_input]:font-[inherit] [&_input]:text-[inherit]
    `;
    const pickerSlotProps: DatePickerSlotProps<Dayjs, false> & TimePickerSlotProps<Dayjs, false> = {
        textField: {
            size: 'small',
        },
    };
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            <DatePicker
                className={`${pickerShell}`}
                slots={{
                    openPickerIcon: () => {
                        return <>
                            <IconWrapper
                                svgAssetName="CalendarEmptyAlt"
                                className="iconWrapper fill-redVar1 bg-pinkVar1 rounded-full"
                            />
                        </>
                    },
                }}
                format="MM/DD/YYYY"
                slotProps={pickerSlotProps}
                onChange={(changeProps) => handleChange(changeProps)}
                disablePast={props.disablePast}
                defaultValue={props.defaultUTC ? dayjs(props.defaultUTC) : undefined}
            />
        </div>
    );
}

export default InputSelectDateWrapperless;