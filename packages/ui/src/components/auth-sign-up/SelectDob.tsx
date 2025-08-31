'use client';

import { useEffect, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import Button from "../button/Button";
import HeaderVar2 from "../heading/HeadingVar2";
import InputDob from "../input-text/InputDob";
import { useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import AuthBackButton from "./AuthBackButton";
import { useLocalUser } from "../local-user-provider/useLocalUser";

type dobState = {
    value?: string;
    isValid?: boolean;
}
type SelectDobProps = ComponentPrimitiveProps & {
    onPrev?: () => void;
    onNext?: () => void;
};

const SelectDob = (props: SelectDobProps) => {
    const localUser = useLocalUser();
    const [dob, setDob] = useState<dobState>({})
    
    const updateApi = useUpdateUserApi();
    const handles = {
        update: () => {
            if(dob.isValid) updateApi.trigger({
                body: {dob: dob.value}
            });
        },
    };

    useEffect(() => {
        if(updateApi.loading === false && updateApi.success){
            localUser?.updateUser(updateApi.data);
            if(props.onNext) props.onNext();
        }
    }, [updateApi.loading]);
    
    return (
        <div
            className={`${props.className || ''} h-full flex flex-col justify-between`}
        >
            <div>
                <AuthBackButton onClick={props.onPrev} className="mb-8" />
                <HeaderVar2
                    title={`How old are you?`}
                    subtitle={`Your age helps us create better matches.`}
                    titleClassName="text-2xl"
                />
                <InputDob
                    className={`${__classNames.inputVar1} mt-7 flex items-center justify-between  cursor-pointer`}
                    // defaultDob={props.defaultDob}
                    onChange={(dob, isValid) => {
                        setDob(prev => ({
                            ...prev,
                            value: dob,
                            isValid,
                        }));
                    }}
                />
            </div>
            <Button
                theme="red"
                className="w-full !opacity-[1]"
                loading={updateApi.loading}
                disabled={!dob.isValid}
                onClick={handles.update}
            >
                Proceed
            </Button>
        </div>
    );
}

export default SelectDob;