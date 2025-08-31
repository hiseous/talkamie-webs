import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ConnectInputModal from "./ConnectInputModal";
import IconWrapper from "../icon/IconWrapper";
import { callType } from "../../utils/types/call";

type ConnectInputCallTypeProps = ComponentPrimitiveProps & {
    callType?: callType;
    viewOnly?: boolean;
    onChange?: (callType?: callType) => void;
};

const ConnectInputCallType = (props: ConnectInputCallTypeProps) => {
    const callTypes: callType[] = ['audio', 'video'];
    
    return (
        <ConnectInputModal
            className={`${props.className || ''}`}
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
        </ConnectInputModal>
    );
}

export default ConnectInputCallType;