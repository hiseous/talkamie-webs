import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import RatingStars from "../node/RatingStars";
import { userProps } from "../../utils/types/user";
import VerifiedBadge from "../icon/VerifiedBadge";
import HeadingText from "../heading/HeadingText";

type AmyCardVar1Props = ComponentPrimitiveProps & {
    user: userProps;
    nameAgeSeparator?: string;
    nameAgeClassName?: string;
    viewLabel?: string;
};

const AmyCardVar1 = (props: AmyCardVar1Props) => {
    
    return (
        <div
            style={{
                backgroundImage: `url(${props.user.picture?.org?.url})`,
            }}
            // href={userLink}
            className={`${props.className || ''} relative overflow-hidden rounded-xl bg-cover bg-no-repeat
                bg-blackVar1 text-white bg-top
            `}
        >
            {
                !props.user.picture?.org?.url ?
                <div>
                    <SvgAsset
                        name="User"
                        className={`absolute ${__classNames.posCenter} fill-white`}
                        size={200}
                    />
                </div> : <></>
            }
            <div className="absolute left-0 bottom-0 w-full bg-black/[.08] backdrop-blur-[24px] px-5 py-3 fill-white">
                <RatingStars
                    rating={props.user.rating}
                    className="fill-yellowVar1 stroke-yellowVar1"
                    size={38}
                />
                <div className="flex items-center">
                    <HeadingText size="sm">{props.user.name}, {props.user.age}</HeadingText>
                    <VerifiedBadge className="ml-1 fill-redVar1 md:[&>svg]:w-[48px] md:[&>svg]:h-[48px]" size={32} />
                </div>
            </div>
        </div>
    );
}

export default AmyCardVar1;