
'use client';

import { useEffect, useState } from "react";
import { changePasswordTriggerProps, useChangePasswordApi } from "../../utils/api/user/useChangePasswordApi";
import ChangePasswordStep1 from "./ChangePasswordStep1";
import ChangePasswordStep2 from "./ChangePasswordStep2";
import { __routes } from "../../utils/constants/app-routes";
import { useRouter } from "next/navigation";

export const useAccountPasswordPage = () => {
    const updateApi = useChangePasswordApi();
    const navigate = useRouter();
    const [stepIndex, setStepIndex] = useState(0);
    const [form, setForm] = useState<changePasswordTriggerProps['body']>({});
    const totalSteps = 2;
    
    const handles = {
        onPrev: () => {
            let newIndex = stepIndex - 1;
            if(newIndex < 0) newIndex = 0;
            setStepIndex(newIndex);
        },
        onNext: () => {
            let newIndex = stepIndex + 1;
            if(newIndex >= totalSteps) newIndex = totalSteps - 1;
            setStepIndex(newIndex);
        },
        onChange: (name: keyof changePasswordTriggerProps['body'], value?: string) => {
            setForm(prev => ({
                ...prev,
                [name]: value,
            }));
        },
        submit: () => {
            updateApi.trigger({
                body: form,
            });
        },
    };
    const steps = [
        <ChangePasswordStep1
            oldPassword={form.oldPassword}
            onChange={handles.onChange}
            onNext={handles.onNext}
        />,
        <ChangePasswordStep2
            onChange={handles.onChange}
            onPrev={handles.onPrev}
            onNext={handles.submit}
        />,
    ];

    useEffect(() => {
        if(updateApi.loading === false && updateApi.success){
            navigate.push(__routes.account());
        }
    }, [updateApi.loading]);

    return {
        stepNode: steps[stepIndex],
    };
};