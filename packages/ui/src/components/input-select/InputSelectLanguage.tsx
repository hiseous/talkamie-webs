
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __languages } from "../../utils/constants/placeholders/languages";
import { menuPosition } from "../dropdown/BlandDropdown";
import InputLabel from "../input-label/InputLabel";
import InputSelect from "./InputSelect";
import CustomImage from "../node/CustomImage";

type changeProps = {
    language?: string;
}
type InputSelectLanguageProps = ComponentPrimitiveProps & {
    displayOptionsAs?: 'dropdown' | 'pop-up';
    // options: inputSelectOption[];
    placeholder?: React.ReactNode;
    menuPosition?: menuPosition;
    selectClassName?: string;
    // filterPlaceholder?: string;
    label?: string;
    handleClassName?: string;
    defaultValue?: {
        language?: string;
        languageCode?: string;
    };
    onChange?: (changeProps: changeProps) => void;
}

const InputSelectLanguage = (props: InputSelectLanguageProps) => {
    
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
                className={`${props.selectClassName || ''}`}
                handleClassName={`${props.handleClassName || ''}`}
                placeholder={<>
                    {
                        props.placeholder ? props.placeholder : `Please select a language`
                    }
                </>}
                filterPlaceholder="search languages"
                menuPosition={props.menuPosition}
                options={[
                    ...(
                        __languages.map(language => {
                            return {
                                value: language.name,
                                label: <>
                                    <div className="flex items-center">
                                        <CustomImage src={language.flag} className="w-[17px] h-[17px] object-cover rounded-full mr-2" />
                                        <div>{language.name}</div>
                                    </div>
                                </>,
                                defaultChecked: (
                                    props.defaultValue ? (
                                        (
                                            language.name.toLowerCase() === props.defaultValue.language?.toLowerCase()
                                            || language.code.toLowerCase() === props.defaultValue.languageCode?.toLowerCase()
                                        ) ? true : false
                                    ) : undefined
                                ),
                            }
                        })
                    )
                ]}
                onChange={(changeProps) => {
                    if(props.onChange) props.onChange({
                        language: changeProps.value,
                    });
                }}
            />
        </div>
    );
}

export default InputSelectLanguage;