import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import RatingStars from "../node/RatingStars";
import { userProps } from "../../utils/types/user";
import HeadingText from "../heading/HeadingText";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";

type UserNameRatingProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
};

const UserNameRating = (props: UserNameRatingProps) => {
    const routes = useAppRoutes();
    
    return (
        <div className={`${props.className || ''}`}>
            <div className="text-2xl font-semibold">
                {props.user?.name}
                {props.user?.age ? `${props.user.name ? ', ' : ''}${props.user.age}` : ``}
            </div>
            <div className="mt-2 flex items-center">
                <div className="flex items-center font-semibold">
                    {props.user?.rating ? <div className="text-xl mr-2">{props.user?.rating?.toFixed(1)}</div> : undefined}
                    <RatingStars
                        rating={props.user?.rating}
                        var="2"
                    />
                </div>
                <HeadingText href={props.user?.id ? routes.user(props.user?.id, ['reviews']) : undefined} size="2xs" className="ml-2 underline">
                    View Reviews
                </HeadingText>
            </div>
        </div>
    );
}

export default UserNameRating;