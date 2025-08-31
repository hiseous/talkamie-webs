'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import { __classNames } from "../../utils/constants/classNames";
import Icon from "../icon/Icon";
import LoadingText from "../loader/LoadingText";
import HeaderVar2 from "../heading/HeadingVar2";
import AuthBackButton from "./AuthBackButton";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { userGender } from "../../utils/types/user";

type option = {
    value: userGender;
    title: string;
}
type SelectGenderProps = ComponentPrimitiveProps & {
    onPrev?: () => void;
    onNext?: () => void;
};

const SelectGender = (props: SelectGenderProps) => {
    const localUser = useLocalUser();
    const updateApi = useUpdateUserApi();
    const options: option[] = [
        {
            value: 'male',
            title: `Male`,
        },
        {
            value: 'female',
            title: `Female`,
        },
        {
            value: 'unspecified',
            title: `Prefer not to say`,
        },
    ];
    const handles = {
        update: (gender: userGender) => {
            updateApi.trigger({
                body: {gender}
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
            className={`${props.className || ''}`}
        >
            <AuthBackButton onClick={props.onPrev} className="mb-8" />
            <HeaderVar2
                title={`What’s your gender?`}
                subtitle={`This helps us tailor your experience`}
                titleClassName="text-2xl"
            />
            <div className="mt-7">
                {
                    options.map((option, i) => {
                        return (
                            <div
                                key={i}
                                className={`${__classNames.inputVar1} ${i > 0 ? 'mt-7' : ''} flex items-center justify-between cursor-pointer`}
                                onClick={() => {
                                    handles.update(option.value)
                                }}
                            >
                                <div className="font-medium text-sm">{option.title}</div>
                                <Icon
                                    iconName="ChevronRight"
                                />
                            </div>
                        )
                    })
                }
            </div>
            {
                updateApi.loading ?
                <LoadingText className="mt-6" text="updating..." /> :
                <></>
            }
        </div>
    );
}

export default SelectGender;