
import { dateTimeRangeProps } from "../../types/time";
import { getPresentTime } from "./present-time";

type status = 'past' | 'present' | 'future';

export const dateTimeRangeAgainstPresentTime = (dateTimeRange: dateTimeRangeProps) => {
    const present = getPresentTime();
    let status: status = 'past';

    if(dateTimeRange.start && dateTimeRange.end && dateTimeRange.start <= dateTimeRange.end){
        if(
            dateTimeRange.start <= present.dateTime.iso
            && present.dateTime.iso <= dateTimeRange.end
        ){
            status = 'present';
        }
        else if(
            present.dateTime.iso < dateTimeRange.start
            && dateTimeRange.start < dateTimeRange.end
            && present.dateTime.iso < dateTimeRange.end
        ){
            status = 'future';
        }
    }

    return {
        status,
    };
};