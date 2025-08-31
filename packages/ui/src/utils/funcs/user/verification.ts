import { ExcludeUndefined } from "../../types/global.types";
import { userProps, userVerificationStatus } from "../../types/user";

type itemType = Exclude<keyof ExcludeUndefined<userProps['verification']>, 'verified'>;
type step = {
    index: number; //zero-index;
    status?: userVerificationStatus;
    type?: itemType;
}
export const fromUserVerification = (user?: userProps) => {
    const totalSteps = 3;
    
    const currentStep: step = {
        index: 0,
        status: user?.verification?.basic?.status,
        type: 'basic',
    };

    if(user?.verification?.basic?.status === 'complete'){
        currentStep.index = 1;
        currentStep.status = user.verification.admin?.status;
        currentStep.type = 'admin';
    }
    else if(user?.verification?.admin?.status === 'complete'){
        currentStep.index = 2;
        currentStep.status = user.verification.background?.status;
        currentStep.type = 'background';
    }
    else if(user?.verification?.background?.status === 'complete'){
        currentStep.index = 3;
        currentStep.status = 'complete';
        // currentStep.type = 'background';
    }

    return {
        totalSteps,
        currentStep,
    };
};