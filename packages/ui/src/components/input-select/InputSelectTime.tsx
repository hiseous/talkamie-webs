
import LocalizationWrapper from "../wrapper/LocalizationWrapper";
import InputSelectTimeWrapperless, { InputSelectTimeWrapperlessProps } from "./InputSelectTimeWrapperless";

const InputSelectTime = (props: InputSelectTimeWrapperlessProps) => {
    
    return (
        <LocalizationWrapper>
            <InputSelectTimeWrapperless {...props} />
        </LocalizationWrapper>
    );
}

export default InputSelectTime;