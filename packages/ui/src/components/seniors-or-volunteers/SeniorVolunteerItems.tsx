import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import SkeletonLoaderVolunteers from "../loader-skeleton/SkeletonLoaderVolunteers";
import NoResult from "../node/NoResult";
import SeniorOrVolunteerCards from "./SeniorOrVolunteerCards";
import { userProps } from "../../utils/types/user";

type SeniorVolunteerItems = ComponentPrimitiveProps & {
    items?: userProps[];
    initiallyLoading?: boolean;
    loading?: boolean;
    updateItem?: (i: number, userProps?: Partial<userProps>) => void;
};

const SeniorVolunteerItems = (props: SeniorVolunteerItems) => {
    
    return (
        <div className={`${props.className || ''}`}>
            {
                props.initiallyLoading === false ?
                <>
                    {
                        props?.items?.length ?
                        <SeniorOrVolunteerCards
                            items={props?.items}
                            loadingMore={props.loading}
                            updateItem={props.updateItem}
                        /> :
                        <NoResult
                            label="We can not find any results. Check your filters or try a new search."
                        />
                        // <div className="px-4 py-6 text-center">
                        //     no {localUser?.type === 'volunteer' ? 'seniors': 'volunteers'} found
                        // </div>
                    }
                </> :
                props.initiallyLoading ?
                <SkeletonLoaderVolunteers count={8} /> :
                <></>
            }
        </div>
    );
}

export default SeniorVolunteerItems;