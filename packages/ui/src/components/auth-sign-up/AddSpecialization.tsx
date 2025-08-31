'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import VerificationAddSpecialization from "../user-verification/VerificationAddSpecialization";
import { useAuth } from "../auth-provider/useAuth";
import AuthBackButton from "./AuthBackButton";

type AddSpecializationProps = ComponentPrimitiveProps & {
    
};

const AddSpecialization = (props: AddSpecializationProps) => {
    const auth = useAuth();
    
    return (
        <div
            className={`${props.className || ''} h-full flex flex-col justify-between`}
        >
            <AuthBackButton onClick={auth?.prevSignUpStep} className="mb-8" />
            <VerificationAddSpecialization
                onNext={auth?.nextSignUpStep}
            />
        </div>
    );
}

export default AddSpecialization;