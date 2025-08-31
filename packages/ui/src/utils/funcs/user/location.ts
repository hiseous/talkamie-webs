import { userProps } from "../../types/user";

export const fromUserLocation = (location?: userProps['location']) => {
    let value = location?.country;
    if(location?.state){
        value += `${value ? ', ' : ''}${location.state}`;
    }
    else if(location?.city){
        value += `${value ? ', ' : ''}${location.city}`;
    }

    return {
        value,
    };
};