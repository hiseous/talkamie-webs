'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";
import BackButton from "../button/BackButton";
import Thumb from "../thumb/Thumb";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import UserProfileBodyDetails from "./UserProfileBodyDetails";
import { useUserProfileCard } from "./useUserProfileCard";

type UserProfileCardProps = ComponentPrimitiveProps & {
    user: userProps;
    updateUser?: (newProps?: userProps) => void;
};

const UserProfileCard = (props: UserProfileCardProps) => {
    const hook = useUserProfileCard(props);
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            <BackButton
                theme="red"
                // className={``}
            />
            {/* <DocWrapperVar1
                // style={{
                //     backgroundImage: hook.user.coverPictureSrc ? `url(${hook.user.coverPictureSrc})`: undefined,
                // }}
                className="bg-cover bg-no-repeat h-[180px] bg-whiteVar1">
                <BackButton
                    theme="red"
                    className={``}
                />
                
            </DocWrapperVar1> */}
            <Thumb
                picture={props.user.picture}
                name={props.user.name}
                size="3xl"
                className="mx-auto border-[4px] border-white"
                // className="mt-[-50px] mx-auto border-[4px] border-white"
            />
            <DocWrapperVar1 className="pt-3">
                <UserProfileBodyDetails
                    user={props.user}
                    updateUser={hook.updateUser}
                />
            </DocWrapperVar1>
        </div>
    );
}

export default UserProfileCard;