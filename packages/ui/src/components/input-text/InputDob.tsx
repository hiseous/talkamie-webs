import LocalizationWrapper from "../wrapper/LocalizationWrapper";
import InputDobWrapperless, { InputDobWrapperlessProps } from "./InputDobWrapperless";

const InputDob = (props: InputDobWrapperlessProps) => {
    
    return (
        <LocalizationWrapper>
            <InputDobWrapperless {...props} />
        </LocalizationWrapper>
    );
}

export default InputDob;