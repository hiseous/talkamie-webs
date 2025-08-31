'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import Button from "../button/Button";
import InputTextLabel from "../input-text/InputTextLabel";
import HeaderVar2 from "../heading/HeadingVar2";
import InputSelectLanguage from "../input-select/InputSelectLanguage";
import AuthBackButton from "./AuthBackButton";
import { useEffect, useState } from "react";
import { updateUserForm, useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import { useLocalUser } from "../local-user-provider/useLocalUser";

type changeProps = {
    value?: string;
    name: keyof updateUserForm;
}
type AddBioNLanguageProps = ComponentPrimitiveProps & {
    // onChange?: (changeProps: changeProps) => void;
    onPrev?: () => void;
    onNext?: () => void;
};

const AddBioNLanguage = (props: AddBioNLanguageProps) => {
    const localUser = useLocalUser();
    const updateApi = useUpdateUserApi();
    const [form, setForm] = useState<updateUserForm>({});

    const handles = {
        onChange: (changeProps: changeProps) => {
            setForm({
                ...form,
                [changeProps.name]: changeProps.value,
            });
        },
        update: () => {
            if(Object.keys(form).length){
                updateApi.trigger({
                    body: form,
                });
            }
            else {
                if(props.onNext) props.onNext();
            }
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
                    title={`Tell us about yourself`}
                    subtitle={`Share a little about who you are and what you enjoy.`}
                    titleClassName="text-2xl"
                />
                <div className="mt-7">
                    <InputTextLabel
                        className="h-[300px]"
                        label="BIO"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `Tell us about yourself`,
                            type: 'textarea',
                            // defaultValue: props.defaultValues?.bio,
                            onChange: (value) => {
                                handles.onChange({
                                    name: 'bio',
                                    value,
                                });
                            },
                        }}
                    />
                    <InputSelectLanguage
                        // key={props.defaultValues?.language}
                        className="mt-5"
                        menuPosition={{y: 'auto'}}
                        label="Language"
                        handleClassName={`${__classNames.inputVar1}`}
                        // defaultValue={{
                        //     language: props.defaultValues?.language,
                        // }}
                        onChange={(changeProps) => {
                            handles.onChange({
                                name: 'language',
                                value: changeProps.language,
                            });
                        }}
                    />
                </div>
            </div>
            <Button
                theme="red"
                className="mt-8 w-full !opacity-[1]"
                loading={updateApi.loading}
                onClick={handles.update}
            >
                Proceed
            </Button>
        </div>
    );
}

export default AddBioNLanguage;