
import { changePasswordTriggerProps } from "../../utils/api/user/useChangePasswordApi";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ChangePasswordStep from "./ChangePasswordStep";

type ChangePasswordStep1Props = ComponentPrimitiveProps & {
    oldPassword?: string;
    onNext?: () => void;
    onChange?: (name: keyof changePasswordTriggerProps['body'], value?: string) => void;
}

const ChangePasswordStep1 = (props: ChangePasswordStep1Props) => {

    return (
        <ChangePasswordStep
            className={`${props.className || ''}`}
            title={`Create new password`}
            subtitle={`Please enter your old password to be able to create your new password`}
            inputs={[
                {
                    label: `Old Password`,
                    props: {
                        defaultValue: props.oldPassword,
                        onChange: (value) => {
                            if(props.onChange) props.onChange('oldPassword', value);
                        },
                    },
                }
            ]}
            errorMsg={
                props.oldPassword !== undefined && !props.oldPassword ?
                `please provide your old password` : undefined
            }
            onSubmit={() => {
                if(props.oldPassword){
                    if(props.onNext) props.onNext();
                }
            }}
        />
    );
}

export default ChangePasswordStep1;