import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import RatingStars from "../node/RatingStars";
import UserNameAgeBadge from "./UserNameAgeBadge";
import ViewUserProfileButton from "./ViewUserProfileButton";
import { userProps } from "../../utils/types/user";

type UserCardVar2Props = ComponentPrimitiveProps & {
    user: userProps;
    nameAgeSeparator?: string;
    nameAgeClassName?: string;
    viewLabel?: string;
    updateUser?: (userProps?: Partial<userProps>) => void;
    // onRequestAccepted?: () => void;
};

const UserCardVar2 = (props: UserCardVar2Props) => {
    // const routes = useAppRoutes();
    // const userLink = props.user.id ? routes.user(props.user.id) : undefined;
    // const locationValue = fromUserLocation(props.user.location).value;
    
    return (
        <div
            style={{
                backgroundImage: `url(${props.user.picture?.org?.url})`,
            }}
            // href={userLink}
            className={`${props.className || ''} relative overflow-hidden rounded-xl bg-cover bg-no-repeat
                bg-pinkVar4 text-white bg-top
            `}
        >
            {
                !props.user.picture?.org?.url ?
                <div>
                    <SvgAsset
                        name="User"
                        className={`absolute ${__classNames.posCenter} fill-redVar1/[.4]`}
                        size={200}
                    />
                </div> : <></>
            }
            <ViewUserProfileButton
                type="link"
                user={props.user}
                label={props.viewLabel}
                updateUser={props.updateUser}
                // className="md:hidden"
            />
            {/* <ViewUserProfileButton
                type="pop-up"
                user={props.user}
                updateUser={props.updateUser}
                className="hidden md:block"
            /> */}
            <div className={`absolute left-0 bottom-0 w-full backdrop-blur-[8px] px-5 py-3 fill-white
                    ${props.user.picture?.org?.url ? 'bg-black/[.15]' : 'bg-black/[.4]'}
                `}
            >
                <UserNameAgeBadge
                    user={props.user}
                />
                {/* {
                    locationValue ?
                    <div className="flex items-center">
                        <Icon iconName="GeoAlt" size={24} />
                        <span className="pl-1 line-clamp-1">{locationValue}</span>
                    </div> : <></>
                } */}
                {
                    props.user.rating ?
                    <RatingStars
                        rating={props.user.rating}
                    /> :
                    <div className="flex items-center">
                        <SvgAsset
                            name="Star"
                            size={32}
                        />
                        <span className="pl-1">No rating yet</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default UserCardVar2;