import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import InputLabel from "../input-label/InputLabel";
import InputText, { InputTextProps } from "./InputText";

type InputTextLabelProps = ComponentPrimitiveProps & {
    label?: React.ReactNode;
    inputProps?: InputTextProps;
};

const InputTextLabel = (props: InputTextLabelProps) => {
    
    return (
        <label
            className={`${props.className || ''} flex flex-col`}
        >
            {
                props.label ?
                <InputLabel
                    className="mb-2"
                >{props.label}</InputLabel> :
                <></>
            }
            <InputText
                {...props.inputProps}
            />
        </label>
    );
}

export default InputTextLabel;