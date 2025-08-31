
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __countries } from "../../utils/constants/placeholders/countries";
import { menuPosition } from "../dropdown/BlandDropdown";
import InputLabel from "../input-label/InputLabel";
import InputSelect from "./InputSelect";
import CustomImage from "../node/CustomImage";

type changeProps = {
    country?: string;
}
type InputSelectStateProps = ComponentPrimitiveProps & {
    displayOptionsAs?: 'dropdown' | 'pop-up';
    // options: inputSelectOption[];
    placeholder?: React.ReactNode;
    menuPosition?: menuPosition;
    // filterPlaceholder?: string;
    label?: string;
    handleClassName?: string;
    defaultValue?: {
        state?: string;
        // countryCode?: string;
    };
    onChange?: (changeProps: changeProps) => void;
}

const InputSelectState = (props: InputSelectStateProps) => {

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
                        props.placeholder ? props.placeholder : `Select`
                    }
                </>}
                filterPlaceholder="search states"
                menuPosition={props.menuPosition}
                options={[
                    ...(
                        __countries.map(item => {
                            return {
                                value: item.name,
                                label: <>
                                    <div className="flex items-center">
                                        <CustomImage src={item.flag} className="w-[17px] h-[17px] object-cover rounded-full mr-2" />
                                        <div>{item.name}</div>
                                    </div>
                                </>,
                                defaultChecked: (
                                    props.defaultValue ? (
                                        (
                                            item.name.toLowerCase() === props.defaultValue.state?.toLowerCase()
                                            // || item.code.toLowerCase() === props.defaultValue.countryCode?.toLowerCase()
                                        ) ? true : false
                                    ) : undefined
                                ),
                            }
                        })
                    )
                ]}
                onChange={(changeProps) => {
                    if(props.onChange) props.onChange({
                        country: changeProps.value,
                    });
                }}
            />
        </div>
    );
}

export default InputSelectState;