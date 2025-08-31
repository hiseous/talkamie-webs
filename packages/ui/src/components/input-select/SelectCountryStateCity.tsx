'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useEffect, useState } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import { City, Country, State } from "react-country-state-city/dist/esm/types";
import "react-country-state-city/dist/react-country-state-city.css";
import { __classNames } from "../../utils/constants/classNames";
import SelectCountryStateCityItems, { selectCountryStateCityChangeProps } from "./SelectCountryStateCityItems";

type changeProps = {
    country?: {
        iso2?: string;
        name?: string;
    };
    state?: {
        name?: string;
        code?: string;
    };
    city?: {
        name?: string;
    };
}
type states = {
    data?: {
        country?: Country;
        state?: State;
        city?: City;
    };
    countries?: {
        items?: Country[];
        loading?: boolean;
    };
    states?: {
        items?: State[];
        loading?: boolean;
    };
    cities?: {
        items?: City[];
        loading?: boolean;
    };
}

type itemTypeProps = {
    [key in selectCountryStateCityChangeProps['type']]?: {
        placeholder?: string;
        label?: string;
    };
}
type SelectCountryStateCityProps = ComponentPrimitiveProps & itemTypeProps & {
    onChange?: (changeProps: changeProps) => void;
};

const SelectCountryStateCity = (props: SelectCountryStateCityProps) => {
    const [states, setStates] = useState<states>({});

    const handles = {
        onItemChange: (changeProps: selectCountryStateCityChangeProps) => {
            setStates(prev => {
                if(changeProps.type === 'country'){
                    const country = changeProps.item as Country | undefined;
                    prev.data = {
                        ...prev.data,
                        country,
                        state: undefined,
                        city: undefined,
                    };
                    prev.states = undefined;
                    prev.cities = undefined;
                }
                else if(changeProps.type === 'state'){
                    const state = changeProps.item as State | undefined;
                    prev.data = {
                        ...prev.data,
                        state,
                        city: undefined,
                    };
                    prev.cities = undefined;
                }
                else if(changeProps.type === 'city'){
                    const city = changeProps.item as City | undefined;
                    prev.data = {
                        ...prev.data,
                        city,
                    };
                }
                handles.onStatesChange(prev);

                return {...prev};
            });
        },
        onStatesChange: (currentStates: states) => {
            if(props.onChange){
                props.onChange({
                    country: {
                        name: currentStates.data?.country?.name,
                        iso2: currentStates.data?.country?.iso2,
                    },
                    state: {
                        name: currentStates.data?.state?.name,
                        code: currentStates.data?.state?.state_code,
                    },
                    city: {
                        name: currentStates.data?.city?.name,
                    },
                });
            }
        },
    };
    
    useEffect(() => {
        GetCountries()
        .then((countries) => {
            setStates(prev => {
                prev.countries = {
                    items: countries,
                    loading: false,
                };
                prev.states = {
                    loading: true,
                };

                return {...prev};
            });
        });
    }, []);
    useEffect(() => {
        if(states.data?.country?.id){
            GetState(parseInt(states.data.country.id.toString()))
            .then((states) => {
                setStates(prev => {
                    prev.states = {
                        items: states,
                        loading: false,
                    };
                    prev.cities = {
                        loading: true,
                    };

                    return {...prev};
                });
            });
        }
    }, [states.data?.country?.id]);
    useEffect(() => {
        if(states.data?.country?.id && states.data.state?.id){
            GetCity(parseInt(states.data.country.id.toString()), parseInt(states.data.state.id.toString()))
            .then((cities) => {
                setStates(prev => {
                    prev.cities = {
                        items: cities,
                        loading: false,
                    };

                    return {...prev};
                });
            });
        }
    }, [states.data?.country?.id, states.data?.state?.id]);
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            <SelectCountryStateCityItems
                type="country"
                label={props.country?.label}
                placeholder={props.country?.placeholder}
                items={states.countries?.items}
                loading={states.countries?.loading}
                handleClassName={`${__classNames.inputVar1}`}
                onSelect={handles.onItemChange}
            />
            {
                states.data?.country?.id ?
                <>
                    <SelectCountryStateCityItems
                        key={`${states.data.country.id}`}
                        className="mt-5"
                        type="state"
                        label={props.state?.label}
                        placeholder={props.state?.placeholder}
                        items={states.states?.items}
                        loading={states.states?.loading}
                        handleClassName={`${__classNames.inputVar1}`}
                        onSelect={handles.onItemChange}
                    />
                    {
                        states.data?.state?.id ?
                        <>
                            <SelectCountryStateCityItems
                                key={`${states.data.country.id}_${states.data.state.id}`}
                                className="mt-5"
                                type="city"
                                label={props.city?.label}
                                placeholder={props.city?.placeholder}
                                items={states.cities?.items}
                                loading={states.cities?.loading}
                                handleClassName={`${__classNames.inputVar1}`}
                                onSelect={handles.onItemChange}
                            />
                        </> : undefined
                    }
                </> : undefined
            }
        </div>
    );
}

export default SelectCountryStateCity;