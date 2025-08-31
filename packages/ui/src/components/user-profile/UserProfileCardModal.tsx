'use client';

import { useEffect, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";
import { useGetUserApi } from "../../utils/api/user/useGetUserApi";
import ModalWrapper from "../modal/ModalWrapper";
import Thumb from "../thumb/Thumb";
import VerifiedBadge from "../icon/VerifiedBadge";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import UserProfileBodyDetails from "./UserProfileBodyDetails";

type UserProfileCardModalProps = ComponentPrimitiveProps & {
    defaultUser?: userProps;
    updateUser?: (newUser?: Partial<userProps>) => void;
    onRequestAccepted?: () => void;
};

const UserProfileCardModal = (props: UserProfileCardModalProps) => {
    const [user, setUser] = useState(props.defaultUser);
    const getApi = useGetUserApi();
    const popUp = usePopUp();

    const handles = {
        updateUser: (userProps?: Partial<userProps>) => {
            setUser(prev => ({
                ...prev,
                ...userProps,
            }));
            if(props.updateUser) props.updateUser(userProps);
        },
    };

    useEffect(() => {
        if(props.defaultUser?.id) getApi.trigger({
            userId: props.defaultUser.id,
        });
    }, []);
    useEffect(() => {
        if(getApi.loading === false && getApi.success){
            const newUser = getApi.data;
            if(newUser?.id){
                setUser(newUser);
                if(props.updateUser) props.updateUser(newUser);
            }
        }
    }, [getApi.loading]);
    
    return (
        <ModalWrapper
            onClose={popUp?.reset}
        >
            <div className="flex justify-center">
                <div className="relative w-[fit-content] h-[fit-content]">
                    <Thumb
                        picture={user?.picture}
                        size="3xl"
                    />
                    {
                        user?.verification?.verified ?
                        <VerifiedBadge
                            className={`!absolute bottom-2 right-2 scale-[1.3]`}
                            type={user.type}
                        /> : <></>
                    }
                </div>
            </div>
            <UserProfileBodyDetails
                user={user}
                updateUser={handles.updateUser}
                onRequestAccepted={props.onRequestAccepted}
            />
        </ModalWrapper>
    );
}

export default UserProfileCardModal;