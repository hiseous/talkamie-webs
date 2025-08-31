'use client';

import { useEffect } from "react";
import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import { fetchedUserLocation, useGetUserLocation } from "./useGetUserLocation";

type loadedProps = {
    location?: fetchedUserLocation;
}
type GetUserLocationButtonProps = ComponentPrimitiveProps & {
    onLoaded?: (loadedProps: loadedProps) => void,
};

const GetUserLocationButton = (props: GetUserLocationButtonProps) => {
    const hook = useGetUserLocation();

    useEffect(() => {
        if(hook.loading === false){
            if(props.onLoaded) props.onLoaded({
                location: hook.location,
            })
        }
    }, [hook.loading]);
    
    return (
        <Button
            className={`${props.className || ''} flex items-center justify-center w-full py-4`}
            onClick={hook.trigger}
        >
            <ImageAsset
                name="locationCrosshairsPng"
                className="w-auto h-[24px]"
            />
            <span className="pl-2">
                {
                    hook.loading ? `loading...` :
                    `Use my current location`
                }
            </span>
        </Button>
    );
}

export default GetUserLocationButton;