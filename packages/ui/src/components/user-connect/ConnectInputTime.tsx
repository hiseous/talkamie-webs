import dayjs from "dayjs";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ConnectInputModal from "./ConnectInputModal";
import { StaticTimePicker } from "@mui/x-date-pickers";

type ConnectInputTimeProps = ComponentPrimitiveProps & {
    title?: string;
    time?: string;
    viewOnly?: boolean;
    onChange?: (HHmmss?: string) => void;
};

const ConnectInputTime = (props: ConnectInputTimeProps) => {
    
    return (
        <ConnectInputModal
            className={`${props.className || ''}`}
            svgAssetName="Clock"
            title={props.title ?? 'Time'}
            subTitle={props.time ? dayjs(`2025-03-28T${props.time || '00:00:00'}.000`).format('hh:mmA') : undefined}
        >
            {
                !props.viewOnly ?
                <StaticTimePicker
                    displayStaticWrapperAs="desktop"
                    onChange={(value) => {
                        const time = value?.format('HH:mm:ss');
                        console.log({value: value?.toISOString(), time})
                        if(props.onChange) props.onChange(time);
                    }}
                    defaultValue={props.time ? dayjs(props.time) : undefined}
                /> : undefined
            }
        </ConnectInputModal>
    );
}

export default ConnectInputTime;