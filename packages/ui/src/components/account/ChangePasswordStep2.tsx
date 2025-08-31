
import { useState } from "react";
import { changePasswordTriggerProps } from "../../utils/api/user/useChangePasswordApi";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ChangePasswordStep from "./ChangePasswordStep";

type passwords = {
    new?: string;
    confirmNew?: string;
}
type ChangePasswordStep2Props = ComponentPrimitiveProps & {
    onPrev?: () => void;
    onNext?: () => void;
    onChange?: (name: keyof changePasswordTriggerProps['body'], value?: string) => void;
    loading?: boolean;
}

const ChangePasswordStep2 = (props: ChangePasswordStep2Props) => {
    const [passwords, setPasswords] = useState<passwords>({});

    return (
        <ChangePasswordStep
            className={`${props.className || ''}`}
            showBackButton
            onPrev={props.onPrev}
            title={`Enter your new password`}
            subtitle={`Your password will be used to Log in and manage your account on Talkamie`}
            inputs={[
                {
                    label: `New Password`,
                    props: {
                        onChange: (value) => {
                            if(props.onChange) props.onChange('newPassword', value);
                            setPasswords(prev => ({
                                ...prev,
                                new: value,
                            }));
                        },
                    },
                },
                {
                    label: `Confirm Password`,
                    props: {
                        onChange: (value) => {
                            setPasswords(prev => ({
                                ...prev,
                                confirmNew: value,
                            }));
                        },
                    },
                },
            ]}
            errorMsg={
                passwords.confirmNew !== undefined && passwords.new !== passwords.confirmNew ?
                `passwords do not match` : undefined
            }
            loading={props.loading}
            onSubmit={() => {
                if(passwords.new && passwords.new === passwords.confirmNew && props.onNext){
                    props.onNext();
                }
            }}
        />
    );
}

export default ChangePasswordStep2;