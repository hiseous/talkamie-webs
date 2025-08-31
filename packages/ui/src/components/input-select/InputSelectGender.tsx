import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userGender } from "../../utils/types/user";
import { menuPosition } from "../dropdown/BlandDropdown";
import InputLabel from "../input-label/InputLabel";
import InputSelect from "./InputSelect";

type option = {
    value: userGender;
    title: string;
}
type InputSelectGenderProps = ComponentPrimitiveProps & {
    handleClassName?: string;
    label?: string;
    placeholder?: React.ReactNode;
    defaultValue?: userGender;
    menuPosition?: menuPosition;
    onChange?: (gender?: userGender) => void;
};

const InputSelectGender = (props: InputSelectGenderProps) => {
    const options: option[] = [
        {
            value: 'male',
            title: `Male`,
        },
        {
            value: 'female',
            title: `Female`,
        },
        // {
        //     value: 'unspecified',
        //     title: `Prefer not to say`,
        // },
    ];
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            {
                props.label ?
                <InputLabel
                    className="mb-2"
                >{props.label}</InputLabel> : <></>
            }
            <InputSelect
                // displayOptionsAs="pop-up"
                // className={`flex flex-col justify-center !w-full [&>*]:!w-full`}
                handleClassName={`${props.handleClassName || ''}`}
                placeholder={<>
                    {
                        props.placeholder ? props.placeholder : `Select Gender`
                    }
                </>}
                filterPlaceholder="search countries"
                menuPosition={props.menuPosition}
                options={[
                    ...(
                        options.map(option => {
                            return {
                                value: option.value,
                                label: <>
                                    <div className="">
                                        {option.title || option.value}
                                    </div>
                                </>,
                                defaultChecked: (
                                    props.defaultValue ? (
                                        (
                                            option.value === props.defaultValue
                                        ) ? true : false
                                    ) : undefined
                                ),
                            }
                        })
                    )
                ]}
                onChange={(changeProps) => {
                    if(props.onChange) props.onChange(changeProps.value as (userGender | undefined));
                }}
            />
        </div>
    );
}

export default InputSelectGender;