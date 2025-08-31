import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { fromDobToZodiac } from "../../utils/funcs/time/zodiac-sign";
import { fromUserLocation } from "../../utils/funcs/user/location";
import { userGender, userProps } from "../../utils/types/user";

type UserZodiacLanguageGenderProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
};

const UserZodiacLanguageGender = (props: UserZodiacLanguageGenderProps) => {
    const locationValue = fromUserLocation(props.user?.location).value;
    
    return (
        <div className={`${props.className || ''} flex flex-wrap text-grayVar8`}>
        {
            (props.user?.dob) ?
            <div className="flex items-center mr-2">
                <ImageAsset name="emojiZodiacTaurusPng" />
                <div className="pl-1 capitalize">{fromDobToZodiac(props.user.dob)?.sign}</div>
            </div> : <></>
        }
        {
            (props.user?.gender && (['female', 'male'] as userGender[]).includes(props.user.gender)) ?
            <div className="flex items-center mr-2">
                <ImageAsset name="emojiGenderFemalePng" />
                <div className="pl-1 capitalize">{props.user.gender}</div>
            </div> : <></>
        }
        {
            locationValue ?
            <div className="flex items-center">
                <ImageAsset name="emojiRoundPushpinPng" />
                <div className="pl-1">{locationValue}</div>
            </div> : <></>
        }
        </div>
    );
}

export default UserZodiacLanguageGender;