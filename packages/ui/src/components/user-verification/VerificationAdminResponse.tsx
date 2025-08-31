'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import VerificationResponseTag from "./VerificationResponseTag";

type VerificationAdminResponseProps = ComponentPrimitiveProps & {
    onNext?: () => void;
};

const VerificationAdminResponse = (props: VerificationAdminResponseProps) => {
    const localUser = useLocalUser();
    
    return (
        <VerificationResponseTag
            className={`${props.className || ''}`}
            type="admin"
            status={localUser?.verification?.admin?.status}
        />
    );
}

export default VerificationAdminResponse;