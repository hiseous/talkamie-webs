'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { City, Country, State } from "react-country-state-city/dist/esm/types";
import "react-country-state-city/dist/react-country-state-city.css";
import InputSelect from "./InputSelect";
import InputLabel from "../input-label/InputLabel";

type item = Country | State | City;
export type selectCountryStateCityChangeProps = {
    type: 'country' | 'state' | 'city';
    item?: item;
}
type SelectCountryStateCityItemsProps = ComponentPrimitiveProps & {
    items?: (item)[];
    type: selectCountryStateCityChangeProps['type'];
    loading?: boolean;
    handleClassName?: string;
    label?: React.ReactNode;
    placeholder?: string;
    onSelect?: (changeProps: selectCountryStateCityChangeProps) => void;
};

const SelectCountryStateCityItems = (props: SelectCountryStateCityItemsProps) => {
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            {
                props.label ?
                <InputLabel
                    className="mb-2"
                >{props.label}</InputLabel> :
                <></>
            }
            <InputSelect
                // displayOptionsAs="pop-up"
                // className={`flex flex-col justify-center !w-full [&>*]:!w-full`}
                // className={`${props.selectClassName || ''}`}
                handleClassName={`${props.handleClassName || ''}`}
                placeholder={
                    props.loading ? <span className="italic">loading items</span> :
                    props.placeholder ?? `Select ${props.type}`
                }
                filterPlaceholder="search items"
                useFilterInput
                // menuPosition={props.menuPosition}
                options={[
                    ...(
                        (props.items || []).map(item => {
                            return {
                                value: item.name,
                                label: <>
                                    <div className="flex items-center">
                                        {
                                            'iso2' in item ?
                                            <div
                                                style={{
                                                    fontFamily: `Twemoji Mozilla`,
                                                }}
                                                className="w-5 h-5 md:w-6 md:h-6 object-cover rounded-full mr-2"
                                            >
                                                {item.emoji}
                                            </div> : undefined
                                        }
                                        <div>{item.name}</div>
                                    </div>
                                </>,
                                // defaultChecked: (
                                //     props.defaultValue ? (
                                //         (
                                //             item.name.toLowerCase() === props.defaultValue.item?.toLowerCase()
                                //             || item.code.toLowerCase() === props.defaultValue.countryCode?.toLowerCase()
                                //         ) ? true : false
                                //     ) : undefined
                                // ),
                            }
                        })
                    )
                ]}
                onChange={(changeProps) => {
                    if(props.onSelect && typeof changeProps.selectedIndex === 'number'){
                        props.onSelect({
                            type: props.type,
                            item: props.items?.[changeProps.selectedIndex],
                        });
                    }
                }}
            />
        </div>
    );
}

export default SelectCountryStateCityItems;