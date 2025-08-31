import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import UserProfileChatConnectRequestButtons from "./UserProfileChatConnectRequestButtons";
import UserInterests from "./UserInterests";
import UserBio from "./UserBio";
import UserZodiacLanguageGender from "./UserZodiacLanguageGender";
import UserNameRating from "./UserNameRating";
import UserIntroVideo from "./UserIntroVideo";
import { userProps } from "../../utils/types/user";

type UserProfileBodyDetailsProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
    updateUser?: (newUser?: Partial<userProps>) => void;
    onRequestAccepted?: () => void;
};

const UserProfileBodyDetails = (props: UserProfileBodyDetailsProps) => {
    
    return (
        <>
            <UserProfileChatConnectRequestButtons
                className="mt-8"
                user={props.user}
                updateUser={props.updateUser}
                onRequestAccepted={props.onRequestAccepted}
            />
            <div className="mt-7">
                <UserNameRating
                    user={props.user}
                />
                <UserZodiacLanguageGender
                    className="mt-3"
                    user={props.user}
                />
                <UserBio
                    className="mt-4"
                    user={props.user}
                />
                <UserIntroVideo
                    className="mt-4"
                    user={props.user}
                />
                <UserInterests
                    className="mt-8"
                    user={props.user}
                />
            </div>
        </>
    );
}

export default UserProfileBodyDetails;