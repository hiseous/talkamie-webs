'use client';

import { useEffect, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import Button from "../button/Button";
import InputSelectCountry from "../input-select/InputSelectCountry";
import InputTextLabel from "../input-text/InputTextLabel";
import HeaderVar2 from "../heading/HeadingVar2";
import GetUserLocationButton from "../user-location/GetUserLocationButton";
import { fetchedUserLocation } from "../user-location/useGetUserLocation";
import { useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import AuthBackButton from "./AuthBackButton";
import { useLocalUser } from "../local-user-provider/useLocalUser";

type locationKey = 'country' | 'state' | 'city';
type changeProps = {
    value?: string;
    name: locationKey;
}
type location = {
    [key in locationKey]?: string;
}
type SelectLocationProps = ComponentPrimitiveProps & {
    onPrev?: () => void;
    onNext?: () => void;
};

const SelectLocation = (props: SelectLocationProps) => {
    const localUser = useLocalUser();
    const [fetchedLocation, setFetchedLocation] = useState({
        key: '',
        address: undefined as fetchedUserLocation['address'],
    });
    const [location, setLocation] = useState<location>({});
        
    const updateApi = useUpdateUserApi();
    const handles = {
        update: () => {
            if(location.city || location.country || location.state){
                updateApi.trigger({
                    body: location,
                });
            }
        },
        onChange: (changeProps: changeProps) => {
            setLocation(prev => ({
                ...prev,
                [changeProps.name]: changeProps.value,
            }));
        },
    };

    useEffect(() => {
        if(updateApi.loading === false && updateApi.success){
            localUser?.updateUser(updateApi.data);
            if(props.onNext) props.onNext();
        }
    }, [updateApi.loading]);
    
    
    return (
        <div
            className={`${props.className || ''} h-full flex flex-col justify-between`}
        >
            <div>
                <AuthBackButton onClick={props.onPrev} className="mb-8" />
                <HeaderVar2
                    title={`Kindly Share your Location.`}
                    subtitle={`Kindly Share your Location. Your location is used only to improve matching and scheduling.`}
                    titleClassName="text-2xl"
                />
                <div key={fetchedLocation.key} className="mt-7">
                    <InputSelectCountry
                        menuPosition={{y: 'auto'}}
                        label={`Country`}
                        selectClassName="w-full"
                        handleClassName={`${__classNames.inputVar1}`}
                        defaultValue={{
                            country: fetchedLocation.address?.country,
                            //  ?? props.defaultValues?.country,
                            // countryCode: fetchedLocation.address?.country_code,
                        }}
                        onChange={(changeProps) => {
                            handles.onChange({
                                name: 'country',
                                value: changeProps.country,
                            });
                        }}
                    />
                    <InputTextLabel
                        className="mt-5"
                        label="State"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `Please enter your state`,
                            defaultValue: fetchedLocation.address?.state,
                            //  ?? props.defaultValues?.state,
                            onChange: (value) => {
                                handles.onChange({
                                    name: 'state',
                                    value,
                                });
                            },
                        }}
                    />
                    <InputTextLabel
                        className="mt-5"
                        label="City"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `Please enter your city`,
                            defaultValue: fetchedLocation.address?.city,
                            //  ?? props.defaultValues?.city,
                            onChange: (value) => {
                                handles.onChange({
                                    name: 'city',
                                    value,
                                });
                            },
                        }}
                    />
                </div>
                <GetUserLocationButton
                    className="mt-14"
                    onLoaded={(loadedProps) => {
                        setFetchedLocation({
                            key: `${Date.now()}`,
                            address: loadedProps.location?.address,
                        });
                    }}
                />
            </div>
            <Button
                theme="red"
                className="w-full !opacity-[1]"
                disabled={!(location.city || location.country || location.state)}
                loading={updateApi.loading}
                onClick={handles.update}
            >
                Proceed
            </Button>
        </div>
    );
}

export default SelectLocation;