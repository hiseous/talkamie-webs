'use client';

import { ComponentPrimitiveProps, ExcludeUndefined } from "../../utils/types/global.types";
import IconWrapper from "../icon/IconWrapper";
import { userProps, userVerificationStatus } from "../../utils/types/user";

type itemType = Exclude<keyof ExcludeUndefined<userProps['verification']>, 'verified'>;
type VerificationResponseTagProps = ComponentPrimitiveProps & {
    status?: userVerificationStatus;
    type: itemType;
};

const VerificationResponseTag = (props: VerificationResponseTagProps) => {
    
    return (
        <div
            className={`${props.className || ''} flex items-center border-[2px] px-4 py-2 rounded-full w-[fit-content]
                ${
                    props.status === 'complete' ? 'fill-greenVar4 border-greenVar4 bg-greenVar4/[.08]' :
                    props.status === 'failed' ? 'fill-redVar1 border-redVar1 bg-redVar1/[.08]' :
                    props.status === 'in-progress' ? 'fill-blueVar2 border-blueVar2 bg-blueVar2/[.08]' :
                    'fill-yellowVar2 bg-yellowVar3/[.2]'
                }
            `}
        >
            <IconWrapper
                iconName={
                    props.status === 'complete' ? 'CheckCircle' :
                    props.status === 'failed' ? 'XCircle' :
                    props.status === 'in-progress' ? 'ExclamationOctagon' :
                    'ExclamationTriangle'
                }
                className={`[&_svg]:w-[24px] [&_svg]:h-[24px] md:[&_svg]:w-[32px] md:[&_svg]:h-[32px]`}
            />
            <div className="pl-2">
                {
                    props.status === 'complete' ? (
                        props.type === 'admin' ? `Our team has successfully reviewed your information` :
                        props.type === 'background' ? `You have been successfully verified` :
                        `Your basic review is complete`
                    ) :
                    props.status === 'failed' ? (
                        props.type === 'admin' ? `Our team was not able to review your account information` :
                        props.type === 'background' ? `We could not verify your background information` :
                        `Your basic information review has failed`
                    ) :
                    props.status === 'in-progress' ? (
                        props.type === 'admin' ? `Our team is currently reviewing your account information` :
                        props.type === 'background' ? `Your background information is currently under review` :
                        `Your basic information review is now in progress`
                    ) :
                    (
                        props.type === 'admin' ? `Your account information is in queue for review by our team` :
                        props.type === 'background' ? `Your background information has not yet started` :
                        `Your basic information review has not yet started`
                    )
                }
            </div>
        </div>
    );
}

export default VerificationResponseTag;