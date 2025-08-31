import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type RatingStarVar2Props = ComponentPrimitiveProps & {
    size?: number;
    unitValue?: number; //as in a value from 0 to 1;
    // percentage?: number; //max = 100;
    onClick?: () => void;
};

const RatingStarVar2 = (props: RatingStarVar2Props) => {
    
    return (
        <div onClick={props.onClick} className={`${props.className || ''} relative w-[fit-content] h-[fit-content]`}>
            <SvgAsset
                name="StarFill"
                size={props.size ?? 32}
            />
            {
                typeof props.unitValue === 'number' ?
                <div
                    style={{
                        width: `calc(100% - ${100 * props.unitValue}%)`
                    }}
                    className="absolute bg-white h-full overflow-hidden mix-blend-color top-0 right-0"
                ></div> : <></>
            }
        </div>
    );
}

export default RatingStarVar2;