'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import VerificationAddBackgroundCheck from "./VerificationAddBackgroundCheck";
import VerificationResponseTag from "./VerificationResponseTag";

type VerificationBackgroundResponseProps = ComponentPrimitiveProps & {
    onNext?: () => void;
};

const VerificationBackgroundResponse = (props: VerificationBackgroundResponseProps) => {
    const localUser = useLocalUser();
    const status = localUser?.verification?.background?.status;
    
    return (
        <div className={`${props.className || ''}`}>
            <VerificationResponseTag
                type="background"
                status={status}
            />
            {
                status !== 'complete' && status !== 'in-progress' ?
                <>
                    <VerificationAddBackgroundCheck
                        className="mt-5"
                        onNext={props.onNext}
                    />
                </> :
                <></>
            }
        </div>
    );
}

export default VerificationBackgroundResponse;