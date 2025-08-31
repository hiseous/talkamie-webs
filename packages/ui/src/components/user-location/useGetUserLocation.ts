'use client';

import { useState } from 'react';

type fetchedData = {
    place_id?: number;
    licence?: string;
    osm_type?: string;
    osm_id?: number;
    lat?: string;
    lon?: string;
    class?: string;
    type?: string;
    place_rank?: number;
    importance?: number;
    addresstype?: string;
    name?: string;
    display_name?: string;
    address?: {
        city?: string;
        county?: string;
        state?: string;
        "ISO3166-2-lvl4": string;
        postcode?: string | number;
        country?: string;
        country_code?: string;
        town?: string;
        village?: string;
    };
    boundingbox?: (string | number)[];
};
export type fetchedUserLocation = Pick<fetchedData, 'address'>;
type states = {
    loading?: boolean;
    error?: string;
    location?: fetchedUserLocation;
};
export const useGetUserLocation = () => {
    const [states, setStates] = useState<states>({});

    const handles = {
        trigger: () => {
            setStates({
                loading: true,
            });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
        
                        // Call reverse geocoding API
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json() as fetchedData | undefined;
                        
                        const address = data?.address;
                        setStates({
                            loading: false,
                            location: {
                                address,
                            },
                        });
                    },
                    (error) => {
                        console.log(error);
                        setStates({
                            loading: false,
                            error: error.message || 'Location permission denied or unavailable.',
                        });
                    }
                );
            }
            else {
                console.log("geolocation navigator not supported by browser");
                setStates({
                    loading: false,
                    error: 'Geolocation is not supported by this browser.',
                });
            }
        },
    };
    
    return {
        ...handles,
        ...states,
    };
};