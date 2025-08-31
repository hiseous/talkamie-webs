import dayjs from "dayjs";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ConnectInputModal from "./ConnectInputModal";
import { StaticDatePicker } from "@mui/x-date-pickers";

type ConnectInputDateProps = ComponentPrimitiveProps & {
    date?: string;
    viewOnly?: boolean;
    onChange?: (yyyymmdd?: string) => void;
};

const ConnectInputDate = (props: ConnectInputDateProps) => {
    
    return (
        <ConnectInputModal
            className={`${props.className || ''}`}
            svgAssetName="CalendarEmptyAlt"
            title="Date"
            subTitle={props.date ? dayjs(props.date).format('ddd, MMMM D, YYYY') : undefined}
        >
            {
                !props.viewOnly ?
                <StaticDatePicker
                    // className={`${pickerShell}`}
                    // format="YYYY/MM/DD"
                    disablePast
                    displayStaticWrapperAs="desktop"
                    // slotProps={pickerSlotProps}
                    // onChange={(changeProps) => handleChange(changeProps)}
                    onChange={(value) => {
                        const date = value?.format('YYYY-MM-DD');
                        if(props.onChange) props.onChange(date);
                    }}
                    defaultValue={props.date ? dayjs(props.date) : undefined}
                /> : undefined
            }
        </ConnectInputModal>
    );
}

export default ConnectInputDate;