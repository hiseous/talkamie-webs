import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import { userType } from "../../utils/types/user";

type VerifiedBadgeProps = ComponentPrimitiveProps & {
    type?: userType;
    size?: number;
}
const VerifiedBadge = (props: VerifiedBadgeProps) => {
    return (
        <div className={`${props.className || ''} shrink-0 relative overflow-hidden w-[fit-content] h-[fit-content] fill-redVar1`}>
            <div
                className={`${__classNames.posCenter} absolute w-0 h-0 p-1 box-content bg-white`}
            ></div>
            <SvgAsset size={props.size} name="BadgeCheckFill" className="relative md:w-[36px] md:h-[36px]" />
        </div>
    );
}

export default VerifiedBadge;