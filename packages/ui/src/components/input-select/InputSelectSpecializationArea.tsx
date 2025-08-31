
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __specializationAreas } from "../../utils/constants/placeholders/specialization-areas";
import { menuPosition } from "../dropdown/BlandDropdown";
import InputLabel from "../input-label/InputLabel";
import InputSelect from "./InputSelect";

type changeProps = {
    area?: string;
}
type InputSelectSpecializationProps = ComponentPrimitiveProps & {
    displayOptionsAs?: 'dropdown' | 'pop-up';
    // options: inputSelectOption[];
    placeholder?: React.ReactNode;
    menuPosition?: menuPosition;
    // filterPlaceholder?: string;
    label?: string;
    handleClassName?: string;
    defaultValue?: {
        area?: string;
    };
    onChange?: (changeProps: changeProps) => void;
}

const InputSelectSpecialization = (props: InputSelectSpecializationProps) => {
    
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
                        props.placeholder ? props.placeholder : `Please select an area`
                    }
                </>}
                filterPlaceholder="search areas"
                menuPosition={props.menuPosition}
                options={[
                    ...(
                        __specializationAreas.map(area => {
                            return {
                                value: area.name,
                                label: <>
                                    <div>{area.name}</div>
                                </>,
                                defaultChecked: (
                                    props.defaultValue ? (
                                        (
                                            area.name?.toLowerCase() === props.defaultValue.area?.toLowerCase()
                                        ) ? true : false
                                    ) : undefined
                                ),
                            }
                        })
                    )
                ]}
                onChange={(changeProps) => {
                    if(props.onChange) props.onChange({
                        area: changeProps.value,
                    });
                }}
            />
        </div>
    );
}

export default InputSelectSpecialization;