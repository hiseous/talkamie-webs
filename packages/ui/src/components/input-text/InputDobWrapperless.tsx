import { DatePicker, DatePickerSlotProps, TimePickerSlotProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ImageAsset, { imageAssetName } from "../../assets/images/ImageAsset";

export type InputDobWrapperlessProps = ComponentPrimitiveProps & {
    defaultDob?: string;
    onChange?: (dob?: string, isValid?: boolean) => void;
}
const InputDobWrapperless = (props: InputDobWrapperlessProps) => {
    const PickerIcon = (iconName: imageAssetName) => {
        return () => {
            return (
                <ImageAsset
                    name={iconName}
                    className="w-auto h-[24px] md:h-[32px]"
                />
            )
        }
    }
    const handleChange = (changeProps: Dayjs | null) => {
        const dob = changeProps?.format("YYYY-MM-DD");
        const isValid = changeProps?.isValid();
        if(props.onChange) props.onChange(dob, isValid);
    }
    // const pickerBox = `mt-2 px-4 py-3 rounded-3xl border-[1px] border-gray300 dark:border-grayVar4 dark:bg-gray900`;
    const pickerShell = `
        w-full [&_fieldset]:!border-0 [&_*]:!p-0 [&_button]:mr-0 [&_*]:![font-size:inherit] [&_*]:!text-[inherit]
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
                        openPickerIcon: PickerIcon('calendarPng'),
                    }}
                    format="DD/MM/YYYY"
                    slotProps={pickerSlotProps}
                    onChange={(changeProps) => handleChange(changeProps)}
                    // disablePast
                    disableFuture
                    defaultValue={props.defaultDob ? dayjs(props.defaultDob) : undefined}
                    // defaultValue={defUTCDatePart ? dayjs(defUTCDatePart) : undefined}
                />
        </div>
    );
}

export default InputDobWrapperless;