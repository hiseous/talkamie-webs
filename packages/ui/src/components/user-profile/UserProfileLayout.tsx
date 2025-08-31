'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import SkeletonLoaderUserProfile from "../loader-skeleton/SkeletonLoaderUserProfile";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import NoResultVar1 from "../node/NoResultVar1";
import { useUserProfile } from "../user-profile-provider/useUserProfile";

type UserProfileLayoutProps = ComponentPrimitiveProps & {
    children: React.ReactNode;
};

const UserProfileLayout = (props: UserProfileLayoutProps) => {
    const context = useUserProfile();
    
    return (
        <DocWrapperVar1
            className={`${props.className || ''} bg-white`}
        >
            {
                context?.loading === false ?
                <>
                    {
                        context?.data ?
                        <>
                            {props.children}
                        </> :
                        <NoResultVar1>
                            User not found
                        </NoResultVar1>
                    }
                </> :
                context?.loading ?
                <SkeletonLoaderUserProfile /> :
                <></>
            }
        </DocWrapperVar1>
    );
}

export default UserProfileLayout;