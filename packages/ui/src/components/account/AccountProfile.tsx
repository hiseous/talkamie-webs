
'use client';

import { __routes } from "../../utils/constants/app-routes";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import HeadingText from "../heading/HeadingText";
import VerifiedBadge from "../icon/VerifiedBadge";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import RatingStars from "../node/RatingStars";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import Thumb from "../thumb/Thumb";
import UserConnectionsModal from "../user-connections/UserConnectionsModal";
import UserBio from "../user-profile/UserBio";
import UserEmail from "../user-profile/UserEmail";
import UserInterests from "../user-profile/UserInterests";
import UserIntroVideo from "../user-profile/UserIntroVideo";
import UserZodiacLanguageGender from "../user-profile/UserZodiacLanguageGender";

type AccountProfileProps = ComponentPrimitiveProps & {

}

const AccountProfile = (props: AccountProfileProps) => {
    const localUser = useLocalUser();
    const popUp = usePopUp();

    return (
        <div className={`${props.className || ''}`}>
            <div className="md:flex items-center">
                <div className="mx-auto relative w-[fit-content] h-[fit-content]">
                    <Thumb
                        picture={localUser?.picture}
                        name={localUser?.name}
                        size="3xl"
                    />
                    {
                        localUser?.verification?.verified ?
                        <VerifiedBadge
                            className={`!absolute bottom-4 right-4 md:bottom-2 md:right-2 scale-[1.3]`}
                            type={localUser.type}
                        /> : <></>
                    }
                </div>
                <div className="mt-4 md:mt-0 font-semibold md:flex items-center flex-1">
                    <Button
                        theme="red" className="md:ml-4 rounded-md w-full md:max-w-[300px]"
                        onClick={() => {
                            popUp?.set({
                                nodes: [
                                    <UserConnectionsModal title="Your Connections" />,
                                ],
                            });
                        }}
                    >
                        {
                            localUser?.totalConnections ? `${localUser.totalConnections} ${localUser?.type === 'senior' ? 'Volunteer' : 'Senior'}${localUser.totalConnections > 1 ? 's' : ''}` :
                            `No ${localUser?.type === 'senior' ? 'Volunteers' : 'Seniors'} Yet`
                        }
                    </Button>
                    <Button href={__routes.account(['edit'])} theme="pink-var-1" className="block text-center mt-2 md:mt-0 md:ml-4 rounded-md w-full md:max-w-[300px]">
                        Edit Profile
                    </Button>
                </div>
            </div>
            <div className="mt-4 [&_*]:!font-bold">
                <HeadingText size="xs">
                    {localUser?.name}
                    {localUser?.age ? `${localUser.name ? ', ' : ''}${localUser.age}` : ``}
                </HeadingText>
                <div className="mt-2">
                    {
                        localUser?.rating ?
                        <div className="flex items-center">
                            <HeadingText size="xs">{localUser.rating.toFixed(1)}</HeadingText>
                            <RatingStars
                                className="ml-2"
                                rating={localUser.rating}
                                var="2"
                            />
                            <HeadingText href={__routes.account(['reviews'])} size="2xs" className="ml-2 underline">
                                View Reviews
                            </HeadingText>
                        </div> : <></>
                    }
                </div>
            </div>
            <UserBio
                className="mt-4"
                user={localUser}
            />
            <UserZodiacLanguageGender
                className="mt-4 text-[black] font-semibold"
                user={localUser}
            />
            <UserIntroVideo
                className="mt-8"
                user={localUser}
            />
            <UserInterests
                className="mt-8"
                user={localUser}
            />
            <UserEmail
                className="mt-8"
                user={localUser}
            />
        </div>
    );
}

export default AccountProfile;