import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ScheduleInputModal from "./ScheduleInputModal";
import InputText from "../input-text/InputText";
import { useState } from "react";
import { getNewKey } from "../../utils/funcs/string/string";

type ScheduleInputTitleProps = ComponentPrimitiveProps & {
    title?: string;
    viewOnly?: boolean;
    onChange?: (title?: string) => void;
};

const ScheduleInputTitle = (props: ScheduleInputTitleProps) => {
    const [closeKey, setCloseKey] = useState<string | undefined>(undefined);
    
    return (
        <ScheduleInputModal
            className={`${props.className || ''}`}
            svgAssetName="HashTagFill"
            closeKey={closeKey}
            title="Title"
            subTitle={props.title}
        >
            {
                !props.viewOnly ?
                <InputText
                    placeholder="title here..."
                    className="bg-whiteVar3 border-[1px] border-whiteVar2 rounded-t-md"
                    defaultValue={props.title}
                    autoFocus
                    onChange={(value) => {
                        if(props.onChange) props.onChange(value);
                    }}
                    onBlur={() => setCloseKey(getNewKey)}
                /> : undefined
            }
        </ScheduleInputModal>
    );
}

export default ScheduleInputTitle;