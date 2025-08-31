
'use client';

import { useEffect } from "react";
import { useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import { __privacyOptions } from "../../utils/constants/placeholders/privacy";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import PrivacyOption from "./PrivacyOption";

type PrivacyOptionsProps = ComponentPrimitiveProps & {

}

const PrivacyOptions = (props: PrivacyOptionsProps) => {
    const localUser = useLocalUser();
    const updateApi = useUpdateUserApi();

    useEffect(() => {
        if(updateApi.loading === false && updateApi.success){
            localUser?.updateUser(updateApi.data);
        }
    }, [updateApi.loading]);

    return (
        <div className={`${props.className || ''}`}>
            {
                __privacyOptions(localUser?.type).map((option, i) => {
                    return (
                        <PrivacyOption
                            key={i}
                            option={option}
                            className={`${i > 0 ? 'mt-6' : ''}`}
                            checked={option.type === (localUser?.visibility || 'public')}
                            onClick={() => {
                                updateApi.trigger({
                                    body: {
                                        visibility: option.type,
                                    },
                                });
                            }}
                        />
                    )
                })
            }
        </div>
    );
}

export default PrivacyOptions;