
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __certificationStates } from "../../utils/constants/placeholders/certification-states";
import { menuPosition } from "../dropdown/BlandDropdown";
import InputLabel from "../input-label/InputLabel";
import InputSelect from "./InputSelect";

type changeProps = {
    state?: string;
}
type InputSelectCertificationStateProps = ComponentPrimitiveProps & {
    displayOptionsAs?: 'dropdown' | 'pop-up';
    // options: inputSelectOption[];
    placeholder?: React.ReactNode;
    menuPosition?: menuPosition;
    // filterPlaceholder?: string;
    label?: string;
    handleClassName?: string;
    defaultValue?: {
        state?: string;
    };
    onChange?: (changeProps: changeProps) => void;
}

const InputSelectCertificationState = (props: InputSelectCertificationStateProps) => {
    
    return (
        <div className={`${props.className || ''}`}>
            {
                props.label ?
                <InputLabel
                    className="mb-2"
                >{props.label}</InputLabel> : <></>
            }
            <InputSelect
                // displayOptionsAs="pop-up"
                className={`flex flex-col justify-center !w-full [&>*]:!w-full`}
                handleClassName={`${props.handleClassName || ''}`}
                placeholder={<>
                    {
                        props.placeholder ? props.placeholder : `Please select a state`
                    }
                </>}
                filterPlaceholder="search areas"
                menuPosition={props.menuPosition}
                options={[
                    ...(
                        __certificationStates.map(state => {
                            return {
                                value: state.name,
                                label: <>
                                    <div>{state.name}</div>
                                </>,
                                defaultChecked: (
                                    props.defaultValue ? (
                                        (
                                            state.name?.toLowerCase() === props.defaultValue.state?.toLowerCase()
                                        ) ? true : false
                                    ) : undefined
                                ),
                            }
                        })
                    )
                ]}
                onChange={(changeProps) => {
                    if(props.onChange) props.onChange({
                        state: changeProps.value,
                    });
                }}
            />
        </div>
    );
}

export default InputSelectCertificationState;