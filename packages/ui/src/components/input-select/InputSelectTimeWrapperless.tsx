'use client';

import { DatePickerSlotProps, renderTimeViewClock, TimePicker, TimePickerSlotProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useEffect, useState } from "react";

export type InputSelectTimeWrapperlessProps = ComponentPrimitiveProps & {
    defaultHHmm?: string;
    defaultUtc?: string;
    onChange?: (HHmm?: string) => void;
}
const InputSelectTimeWrapperless = (props: InputSelectTimeWrapperlessProps) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    
    const handleChange = (changeProps: Dayjs | null) => {
        const newValue = changeProps?.format('HH:mm');
        setValue(newValue);
        if(props.onChange) props.onChange(newValue);
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

    useEffect(() => {
        if(props.defaultHHmm){
            handleChange(dayjs(`0000-00-00T${props.defaultHHmm}`));
        }
        else if(props.defaultUtc){
            handleChange(dayjs(props.defaultUtc));
        }
    }, []);
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            <TimePicker
                className={`${pickerShell}`}
                slots={{
                    openPickerIcon: () => {
                        return <>
                            <div>
                                {value || '__:__'}
                            </div>
                        </>
                    },
                }}
                // format="HH:mm"
                ampm={false}
                slotProps={pickerSlotProps}
                onChange={(changeProps) => handleChange(changeProps)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                defaultValue={
                    props.defaultHHmm ? dayjs(`0000-00-00T${props.defaultHHmm}`) :
                    props.defaultUtc ? dayjs(props.defaultUtc) :
                    undefined
                }
            />
        </div>
    );
}

export default InputSelectTimeWrapperless;