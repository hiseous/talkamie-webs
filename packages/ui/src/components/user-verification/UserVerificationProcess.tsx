
'use client';

import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { fromUserVerification } from "../../utils/funcs/user/verification";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import HeadingText from "../heading/HeadingText";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import UserVerificationProcessItem from "./UserVerificationProcessItem";

type UserVerificationProcessProps = ComponentPrimitiveProps & {
    
};

const UserVerificationProcess = (props: UserVerificationProcessProps) => {
    const localUser = useLocalUser();
    const routes = useAppRoutes();

    // const totalSteps = 3;
    // let currentStep = 0;
    // if(localUser?.verification?.basic?.status === 'complete') currentStep = 1;
    // else if(localUser?.verification?.admin?.status === 'complete') currentStep = 2;
    // else if(localUser?.verification?.background?.status === 'complete') currentStep = 3;

    const fromProps = fromUserVerification({...localUser});
    
    return (
        <div className={`${props.className || ''}`}>
            <div className="flex items-center">
                {
                    Array.from({length: fromProps.totalSteps}).map((unknown, i) => {
                        const stepComplete = i < fromProps.currentStep.index;
                        return (
                            <div
                                key={`${i}_${unknown}`}
                                className={`${i > 0 ? 'pl-2' : ''} flex-1 h-[8px]`}
                            >
                                <div
                                    className={`w-full h-full rounded-full ${stepComplete ? 'bg-redVar1' : 'bg-pinkVar4'}`}
                                ></div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-6">
                <HeadingText size="xs">
                    Review in Progress
                </HeadingText>
                <div className="mt-2 text-grayVar8">
                    We're currently reviewing your information and awaiting admin approval. Once approved, you can move on to the next step.
                </div>
            </div>
            <div className="mt-10">
                <UserVerificationProcessItem
                    type="basic"
                />
                <UserVerificationProcessItem
                    type="admin"
                    className="mt-7"
                />
                <UserVerificationProcessItem
                    type="background"
                    className="mt-7"
                />
                <Button
                    theme="red"
                    href={routes.account(['verification'])}
                    className="mt-8 block w-full text-center"
                >
                    Proceed
                </Button>
            </div>
        </div>
    );
}

export default UserVerificationProcess;