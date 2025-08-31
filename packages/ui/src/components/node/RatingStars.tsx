import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import RatingStar from "./RatingStar";
import RatingStarVar2 from "./RatingStarVar2";

type RatingStarsProps = ComponentPrimitiveProps & {
    size?: number;
    rating?: number;
    maxRating?: number;
    var?: '1' | '2';
};

const RatingStars = (props: RatingStarsProps) => {
    const rating = props.rating ?? 0;
    const intPart = parseInt(rating.toString());
    const floatPart = (rating - intPart);
    
    return (
        <div className={`${props.className || ''} flex items-center fill-redVar1 stroke-redVar1`}>
            {
                Array.from({length: props.maxRating ?? 5}).map((unknown, i) => {
                    const unitValue = (
                        intPart >= (i + 1) ? 1 :
                        (intPart + 1) === (i + 1) ? floatPart :
                        0
                    );
                    
                    return (
                        props.var === '2' ?
                        <RatingStarVar2
                            key={`${unknown}_${i}`}
                            className={`${i > 0 ? 'ml-[1px]' : ''}`}
                            unitValue={unitValue}
                            size={props.size}
                        /> : 
                        <RatingStar
                            key={`${unknown}_${i}`}
                            className={`${i > 0 ? 'ml-[1px]' : ''}`}
                            unitValue={unitValue}
                            size={props.size}
                        />
                    )
                })
            }
        </div>
    );
}

export default RatingStars;