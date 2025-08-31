import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ScheduleInputModal from "./ScheduleInputModal";
import IconWrapper from "../icon/IconWrapper";
import { callType } from "../../utils/types/call";
import { useState } from "react";
import { getNewKey } from "../../utils/funcs/string/string";

type ScheduleInputCallTypeProps = ComponentPrimitiveProps & {
    callType?: callType;
    viewOnly?: boolean;
    onChange?: (callType?: callType) => void;
};

const ScheduleInputCallType = (props: ScheduleInputCallTypeProps) => {
    const [closeKey, setCloseKey] = useState<string | undefined>(undefined);
    const callTypes: callType[] = ['audio', 'video'];
    
    return (
        <ScheduleInputModal
            className={`${props.className || ''}`}
            closeKey={closeKey}
            svgAssetName={props.callType === 'video' ? 'Video' : 'Phone'}
            title="Call Type"
            subTitle={
                props.callType ? (
                    props.callType === 'video' ? `Video Call` : `Audio Call`
                ) : undefined
            }
        >
            {
                !props.viewOnly ?
                <>
                    {
                        callTypes.map((callType, i) => {
                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        if(props.onChange) props.onChange(callType);
                                        setCloseKey(getNewKey());
                                    }}
                                    className="flex items-center justify-between capitalize px-2 py-4 cursor-pointer fill-redVar1">
                                    <div>{callType} call</div>
                                    {
                                        callType === props.callType ?
                                        <IconWrapper
                                            iconName="Check2"
                                        /> : <></>
                                    }
                                </div>
                            )
                        })
                    }
                </> : undefined
            }
        </ScheduleInputModal>
    );
}

export default ScheduleInputCallType;