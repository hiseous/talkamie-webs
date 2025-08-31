
import { __classNames } from "../../utils/constants/classNames";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import AuthBackButton from "../auth-sign-up/AuthBackButton";
import Button from "../button/Button";
import HeadingText from "../heading/HeadingText";
import InputText, { InputTextProps } from "../input-text/InputText";
import ErrorText from "../node/ErrorText";

type input = {
    label?: string;
    props?: InputTextProps;
}
type ChangePasswordStepProps = ComponentPrimitiveProps & {
    title?: string;
    subtitle?: string;
    inputs?: input[];
    loading?: boolean;
    errorMsg?: string;
    showBackButton?: boolean;
    onSubmit?: () => void;
    onPrev?: () => void;
}

const ChangePasswordStep = (props: ChangePasswordStepProps) => {

    return (
        <div className={`${props.className || ''}`}>
            {
                props.showBackButton ?
                <AuthBackButton onClick={props.onPrev} className="mb-2" /> : undefined
            }
            <HeadingText size="xs" className="font-semibold">{props.title}</HeadingText>
            <div className="text-lg">{props.subtitle}</div>
            <div className="mt-4">
                {
                    props.inputs?.map((input, i) => (
                        <div key={i} className={`${i > 0 ? 'mt-4' : ''}`}>
                            <HeadingText size="2xs">{input.label}</HeadingText>
                            <InputText
                                className={`mt-1 ${__classNames.inputVar1}`}
                                placeholder="Password"
                                type="password"
                                {...input.props}
                            />
                        </div>
                    ))
                }
            </div>
            {
                props.errorMsg ?
                <ErrorText>{props.errorMsg}</ErrorText> : <></>
            }
            <Button
                theme="red"
                className="w-full mt-6 rounded-md py-4"
                loading={props.loading}
                onClick={props.onSubmit}
            >
                Proceed
            </Button>
        </div>
    );
}

export default ChangePasswordStep;