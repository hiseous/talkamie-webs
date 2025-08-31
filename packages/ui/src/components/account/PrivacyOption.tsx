
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { privacyOption } from "../../utils/types/privacy";
import HeadingText from "../heading/HeadingText";
import IconWrapper from "../icon/IconWrapper";

export type PrivacyOptionProps = ComponentPrimitiveProps & {
    option: privacyOption;
    checked?: boolean;
    onClick?: () => void;
}

const PrivacyOption = (props: PrivacyOptionProps) => {
    
    return (
        <div onClick={props.onClick} className={`${props.className || ''} cursor-pointer flex items-center justify-between
            ${props.checked ? 'border-redVar1/[.5]' : 'border-whiteVar2 bg-whiteVar5'} p-4 rounded-md border-[2px]`}
        >
            <div className="flex-1">
                <HeadingText size="2xs" className="font-semibold">{props.option.title}</HeadingText>
                <div>{props.option.subtitle}</div>
            </div>
            <IconWrapper
                iconName="CircleFill"
                className={`rounded-full p-[3px] border-[2px] box-content md:[&>*]:w-[16px] md:[&>*]:h-[16px]
                    ${props.checked ? 'border-redVar3 fill-redVar3' : 'border-grayVar3 fill-transparent'}
                `}
            />
        </div>
    );
}

export default PrivacyOption;