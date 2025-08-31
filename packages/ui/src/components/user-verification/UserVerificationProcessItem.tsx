
'use client';

import { fromUserVerificationItem } from "../../utils/funcs/user/verification-item";
import { ComponentPrimitiveProps, ExcludeUndefined } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";
import IconWrapper from "../icon/IconWrapper";
import { useLocalUser } from "../local-user-provider/useLocalUser";

type itemType = Exclude<keyof ExcludeUndefined<userProps['verification']>, 'verified'>;
type UserVerificationProcessItemProps = ComponentPrimitiveProps & {
    type: itemType;
};

const UserVerificationProcessItem = (props: UserVerificationProcessItemProps) => {
    const localUser = useLocalUser();
    const fromProps = fromUserVerificationItem({
        type: props.type,
        user: {...localUser},
    })
    
    return (
        <div className={`${props.className || ''} p-3 md:p-4 border-[1.5px] border-whiteVar2 rounded-md flex flex-col md:flex-row items-center text-center md:text-start`}>
            <IconWrapper
                svgAssetName={fromProps.svgName}
                className="border-[1px] border-pinkVar7 bg-pinkVar1 fill-redVar1 p-2 rounded-full md:[&_svg]:w-[32px] md:[&_svg]:h-[32px]"
            />
            <div className="mt-3 md:mt-0 flex-1 px-2">
                <div className="font-medium">
                    {fromProps.title}
                </div>
                <div className="text-sm">
                    {fromProps.subtitle}
                </div>
            </div>
            <div
                className={`
                    mt-3 md:mt-0 text-xs border-[2px] px-1 rounded-full font-medium w-[fit-content]
                    ${
                        fromProps.status === 'complete' ? 'text-greenVar4 border-greenVar5 bg-greenVar6' :
                        fromProps.status === 'failed' ? 'text-redVar1 border-pinkVar7' :
                        fromProps.status === 'in-progress' ? 'text-blueVar3 border-blueVar4 bg-blueVar5' :
                        'text-yellowVar2 border-yellowVar3'
                    }
                `}
            >
                {
                    fromProps.status === 'complete' ? 'Complete' :
                    fromProps.status === 'failed' ? 'Failed' :
                    fromProps.status === 'in-progress' ? 'In Progress' :
                    'Pending'
                }
            </div>
        </div>
    );
}

export default UserVerificationProcessItem;