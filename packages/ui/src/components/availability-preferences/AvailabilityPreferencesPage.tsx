'use client';

import { useEffect, useState } from "react";
import { __classNames } from "../../utils/constants/classNames";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import InputLabel from "../input-label/InputLabel";
import InputSelect, { inputSelectOption } from "../input-select/InputSelect";
import InputTextLabel from "../input-text/InputTextLabel";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { updateUserForm, useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import Button from "../button/Button";
import { parseAndValidateNumber } from "../../utils/funcs/digit";
import { useToastMessage } from "../../utils/funcs/hooks/useToastMessage";

type form = Pick<updateUserForm, 'maxCallCount' | 'maxCallDuration'> & {
    changed?: boolean;
}
const AvailabilityPreferencesPage = () => {
    const localUser = useLocalUser();
    const updateApi = useUpdateUserApi();
    const toast = useToastMessage();
    const [durationOptions, setDurationOptions] = useState<inputSelectOption[]>([]);
    const [form, setForm] = useState<form>({});

    const handles = {
        onChange: (name: keyof form, value?: string | number) => {
            setForm(prev => ({
                ...prev,
                changed: true,
                [name]: value ? parseAndValidateNumber(value) : undefined,
            }));
        },
        submit: () => {
            if(localUser?.id){
                setForm(prev => {
                    updateApi.trigger({
                        body: form,
                    });

                    return {...prev};
                })
            }
        },
    };

    useEffect(() => {
        const mins = [5, 10, 15, 20];
        const options: inputSelectOption[] = [];
        for(let i = 0; i < mins.length; i++){
            const min = mins[i];
            const valueInSec = min * 60;
            options.push({
                label: `${min} Minutes`,
                defaultChecked: localUser?.preferences?.call?.maxDuration === valueInSec,
                value: valueInSec.toString(),
            })
        }

        setDurationOptions(options);
    }, []);

    useEffect(() => {
        if(updateApi.loading === false && updateApi.success){
            localUser?.updateUser({
                preferences: {
                    ...localUser.preferences,
                    ...updateApi.data?.preferences,
                },
            });
            toast.success(`Your call preference has been saved!`);
            setForm({});
        }
    }, [updateApi.loading]);

    
    return (
        <>
            <HeadingAndBackButtonVar1 className="!items-start">
                <div>Call Preference</div>
                <div className="font-normal text-base text-blackVar4">Set your call preference</div>
            </HeadingAndBackButtonVar1>
            <div className="mt-8 max-w-[800px]">
                <div>
                    <InputLabel>
                        Call Duration
                    </InputLabel>
                    <InputSelect
                        key={durationOptions.length}
                        options={durationOptions}
                        className={`${__classNames.inputVar1}`}
                        placeholder={`select max call duration`}
                        onChange={(changeProps) => {
                            handles.onChange('maxCallDuration', changeProps.selectedOption?.value)
                        }}
                        menuClassName="w-full"
                    />
                </div>
                <InputTextLabel
                    className="mt-8"
                    label={`Maximum Number of Calls`}
                    inputProps={{
                        placeholder: `limit of daily calls`,
                        className: `${__classNames.inputVar1}`,
                        type: 'number',
                        defaultValue: localUser?.preferences?.call?.maxCount?.toString(),
                        onChange: (value) => handles.onChange('maxCallCount', value),
                    }}
                />
                <Button
                    theme="red"
                    className="w-full mt-8 rounded-md"
                    disabled={!form.changed}
                    loading={updateApi.loading}
                    onClick={handles.submit}
                >
                    Save changes
                </Button>
            </div>
        </>
    );
}

export default AvailabilityPreferencesPage;