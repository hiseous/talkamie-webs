'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import AuthBackButton from "./AuthBackButton";
import VerificationAddBackgroundCheck from "../user-verification/VerificationAddBackgroundCheck";

type AddBackgroundCheckProps = ComponentPrimitiveProps & {
    onPrev?: () => void;
    onNext?: () => void;
};

const AddBackgroundCheck = (props: AddBackgroundCheckProps) => {
    
    return (
        <div
            className={`${props.className || ''} h-full flex flex-col justify-between`}
        >
            <AuthBackButton onClick={props.onPrev} className="mb-8" />
            <VerificationAddBackgroundCheck onNext={props.onNext} />
        </div>
    );
}

export default AddBackgroundCheck;