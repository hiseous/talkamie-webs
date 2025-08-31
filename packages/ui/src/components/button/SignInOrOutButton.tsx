'use client';

import { useEffect } from "react";
import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useSignOutApi } from "../../utils/api/auth/useSignOutApi";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { __routes } from "../../utils/constants/app-routes";

type SignInOrOutButtonProps = ComponentPrimitiveProps & {
    theme?: 'red';
    onClick?: () => void;
};

const SignInOrOutButton = (props: SignInOrOutButtonProps) => {
    const localUser = useLocalUser();
    // const routes = useAppRoutes();
    const signOutApi = useSignOutApi();

    const handles = {
        navigateToAuth: () => {
            window.location.href = `${window.location.origin}${__routes.auth(['sign-in'])}`;
        },
    };

    useEffect(() => {
        if(signOutApi.loading === false && signOutApi.success){
            localUser?.unsetUser();
            handles.navigateToAuth();
        }
    }, [signOutApi.loading]);
    
    return (
        <NodeMayBeLink
            // href={localUser?.id ? undefined : routes.auth(['sign-in'])}
            className={`${props.className || ''} cursor-pointer flex items-center fill-redVar1 text-redVar1`}
            onClick={() => {
                if(localUser?.id){
                    signOutApi.trigger();
                }
                else {
                    handles.navigateToAuth();
                }
            }}
        >
            <SvgAsset
                name={localUser?.id ? 'LogOutFill' : 'LogInFill'}
            />
            <div className="pl-1">
                {`Log${localUser?.id ? 'out' : 'in'}`}
            </div>
        </NodeMayBeLink>
    );
}

export default SignInOrOutButton;