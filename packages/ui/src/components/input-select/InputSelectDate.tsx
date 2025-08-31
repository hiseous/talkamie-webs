import InputSelectDateWrapperless, { InputSelectDateWrapperlessProps } from "./InputSelectDateWrapperless";
import LocalizationWrapper from "../wrapper/LocalizationWrapper";

type InputSelectDateProps = InputSelectDateWrapperlessProps;
const InputSelectDate = (props: InputSelectDateProps) => {
    
    return (
        <LocalizationWrapper>
            <InputSelectDateWrapperless {...props} />
        </LocalizationWrapper>
    );
}

export default InputSelectDate;