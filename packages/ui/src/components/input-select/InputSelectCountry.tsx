
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __countries } from "../../utils/constants/placeholders/countries";
import { menuPosition } from "../dropdown/BlandDropdown";
import InputLabel from "../input-label/InputLabel";
import InputSelect from "./InputSelect";
import CustomImage from "../node/CustomImage";

type changeProps = {
    country?: string;
}
type InputSelectCountryProps = ComponentPrimitiveProps & {
    displayOptionsAs?: 'dropdown' | 'pop-up';
    // options: inputSelectOption[];
    placeholder?: React.ReactNode;
    menuPosition?: menuPosition;
    // filterPlaceholder?: string;
    label?: string;
    selectClassName?: string;
    handleClassName?: string;
    defaultValue?: {
        country?: string;
        countryCode?: string;
    };
    onChange?: (changeProps: changeProps) => void;
}

const InputSelectCountry = (props: InputSelectCountryProps) => {

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
                // className={`flex flex-col justify-center !w-full [&>*]:!w-full`}
                className={`${props.selectClassName || ''}`}
                handleClassName={`${props.handleClassName || ''}`}
                placeholder={<>
                    {
                        props.placeholder ? props.placeholder : `Please select your country`
                    }
                </>}
                filterPlaceholder="search countries"
                useFilterInput
                menuPosition={props.menuPosition}
                options={[
                    ...(
                        __countries.map(country => {
                            return {
                                value: country.name,
                                label: <>
                                    <div className="flex items-center">
                                        <CustomImage src={country.flag} className="w-5 h-5 md:w-6 md:h-6 object-cover rounded-full mr-2" />
                                        <div>{country.name}</div>
                                    </div>
                                </>,
                                defaultChecked: (
                                    props.defaultValue ? (
                                        (
                                            country.name.toLowerCase() === props.defaultValue.country?.toLowerCase()
                                            || country.code.toLowerCase() === props.defaultValue.countryCode?.toLowerCase()
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

export default InputSelectCountry;