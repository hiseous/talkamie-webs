import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type RatingStarProps = ComponentPrimitiveProps & {
    size?: number;
    unitValue?: number; //as in a value from 0 to 1;
    // percentage?: number; //max = 100;
    onClick?: () => void;
};

const RatingStar = (props: RatingStarProps) => {
    
    return (
        <div onClick={props.onClick} className={`${props.className || ''} relative w-[fit-content] h-[fit-content]`}>
            <SvgAsset
                name="StarFill"
                size={props.size ?? 32}
                className="opacity-0"
            />
            <SvgAsset
                name="StarFill"
                size={props.size ?? 32}
                className="absolute left-0 top-0 stroke-[1px] fill-transparent"
            />
            {
                typeof props.unitValue === 'number' ?
                <div
                    style={{
                        width: `calc(${100 * props.unitValue}%)`
                    }}
                    className="absolute top-0 left-0 h-full overflow-hidden mix-blend-hue z-10"
                >
                    <SvgAsset
                        name="StarFill"
                        size={props.size ?? 32}
                    />
                </div> : <></>
            }
        </div>
    );
}

export default RatingStar;