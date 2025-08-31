
'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { fromUserVerification } from "../../utils/funcs/user/verification";
import VerificationAddSpecialization from "../user-verification/VerificationAddSpecialization";
import { useRouter } from "next/navigation";
import { __routes } from "../../utils/constants/app-routes";
import VerificationBackgroundResponse from "../user-verification/VerificationBackgroundResponse";
import VerificationAdminResponse from "../user-verification/VerificationAdminResponse";
import Navigate from "../node/Navigate";

type AccountProfileVerificationProps = ComponentPrimitiveProps & {

}

const AccountProfileVerification = (props: AccountProfileVerificationProps) => {
    const localUser = useLocalUser();
    const navigate = useRouter();
    const fromProps = fromUserVerification({...localUser});
    const handles = {
        next: () => {
            navigate.replace(__routes.dashboard())
            // navigate.replace(routes.account());
        },
    };
    
    return (
        <div className={`${props.className || ''}`}>
            {
                localUser?.type === 'volunteer' ?
                <>
                    {
                        fromProps.currentStep.status !== 'complete' ?
                        <>
                            {
                                fromProps.currentStep.type === 'basic' ?
                                <VerificationAddSpecialization
                                    onNext={handles.next}
                                /> :
                                fromProps.currentStep.type === 'admin' ?
                                <VerificationAdminResponse
                                    onNext={handles.next}
                                /> :
                                fromProps.currentStep.type === 'background' ?
                                <VerificationBackgroundResponse
                                    onNext={handles.next}
                                />
                                :
                                <></>
                            }
                        </> :
                        <>

                        </>
                    }
                </> :
                <>
                    <Navigate
                        to={__routes.dashboard()}
                    />
                </>
            }
        </div>
    );
}

export default AccountProfileVerification;