import ImageAsset, { imageAssetName } from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import CustomImage from "../node/CustomImage";

type BlandTagProps = ComponentPrimitiveProps & {
    label: React.ReactNode;
    iconName?: imageAssetName;
    iconSrc?: string;
    emoji?: string;
    checked?: boolean;
    nodeBeforeEnd?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}
const BlandTag = (props: BlandTagProps) => {

    return (
        <div
            onClick={() => {
                if(!props.disabled && props.onClick) props.onClick();
            }}
            className={`${props.className || ''} w-[fit-content] h-[fit-content] rounded-md px-4 py-2 flex items-center
                border-[1px]
                ${props.checked ? `bg-pinkVar1 text-redVar1 font-medium border-transparent` : `border-whiteVar2`}
                ${props.disabled ? `opacity-[.5] cursor-not-allowed` : `cursor-pointer`}
            `}
        >
            {
                props.iconName ?
                <ImageAsset
                    name={props.iconName}
                    className="w-auto h-[18px] md:h-[24px]"
                /> :
                props.iconSrc ?
                <CustomImage
                    src={props.iconSrc}
                    className="w-auto h-[18px] md:h-[24px]"
                /> :
                props.emoji ?
                <span>{props.emoji}</span> : <></>
            }
            <span className={`${props.iconName || props.iconSrc || props.emoji ? 'pl-1' : ''}`}>{props.label}</span>
            {props.nodeBeforeEnd}
        </div>
    )
}

export default BlandTag;