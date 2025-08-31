import { callType } from "./call";
import { itemId } from "./global.types";
import { userProps } from "./user";

export type scheduleProps = {
    id?: itemId;
    type?: callType;
    title?: string;
    // weeklyRecurringDay?: 'all' | 'sunday' | 'monday' | 'tuesday'
    //     | 'wednesday' | 'thursday' | 'friday' | 'saturday';
    attendee?: userProps;
    timeslot?: {
        from?: string; //starting date-time in utc;
        to?: string; //ending date-time in utc;
    };
    status?: 'past' | 'on-going' | 'upcoming';
    recurrence?: 'daily' | 'weekly';
    // chat?: Pick<chatProps, 'id'>;
    // message?: Pick<chatMessageProps, 'id'>;
    // from?: Pick<userProps, 'id'>;
    // to?: Pick<userProps, 'id'>;
}