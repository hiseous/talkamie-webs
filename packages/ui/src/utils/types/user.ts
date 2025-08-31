
import { chatProps } from "./chat";
import { connectRequestProps } from "./connect";
import { compressedFileProps } from "./file";
import { itemId } from "./global.types";
import { interestProps } from "./interest";
import { isoDate } from "./time";
import { userAvailabilityCustomItems, userAvailabilityWeeklyItems } from "./user-availability";
import { userReviewProps } from "./user-review";

export type userType = 'senior' | 'volunteer';
export type userGender = 'male' | 'female' | 'unspecified';
// type userMedicalProps = {
//     isHealthcareWorker?: boolean;
//     ssn?: string | number; //social security number;
//     medicalId?: string | number;
//     certificationState?: string;
// }
type userViewerProps = {
    id?: itemId;
    connectRequest?: connectRequestProps;
    chat?: Pick<chatProps, 'id' | 'request'>;
    // schedule?: callScheduleProps;
    review?: Pick<userReviewProps, 'id'>;
}
export type userVerificationStatus = 'pending' | 'in-progress' | 'failed' | 'complete';
type userVerificationProps = {
    // verified?: boolean;
    status?: userVerificationStatus;
}

export type userProps = {
    age?: number;
    availability?: {
        custom?: userAvailabilityCustomItems;
        weekly?: userAvailabilityWeeklyItems;
    };
    bio?: string;
    // certificate?: compressedFileProps;
    dailyInfo?: {
        totalCalls?: number;
    };
    dob?: isoDate;
    email?: string;
    fileDirPath?: string; // the file directory path generated from the signed-url endpoint;
    gender?: userGender;
    id?: itemId;
    interests?: interestProps[];
    language?: string;
    ledger?: {
        coins?: {
            balance?: number;
        };
        // funds?: {
        //     balance?: number; //in US cent;
        //     withdrawal?: {
        //         limit?: number; //in US cent;
        //         monthlyCount?: number; //number of withdrawals in the user's current month-of-view;
        //         maxMonthlyCount?: number; //max number of withdrawals a user can withdraw in a month;
        //     };
        // };
        // subscription?: {
        //     active?: boolean;
        //     tier?: financeTierNumber;
        // };
        paypal?: {
            email?: string;
        };
    };
    location?: {
        city?: string;
        country?: string;
        state?: string;
    };
    name?: string;
    picture?: compressedFileProps;
    preferences?: {
        call?: {
            maxCount?: number;
            maxDuration?: number; // in seconds;
        };
        notifications?: {
            push?: {
                enabled?: boolean;
            };
        };
    };
    rating?: number;
    timezoneOffset?: number; // in minutes; e.g, -180 means UTC+03:00 (3 hours ahead); 60 means UTC-01:00 (1 hour behind)
    totalConnections?: number;
    totalPendingRequests?: number;
    totalReviews?: number;
    totalUnreadAlerts?: number;
    totalUnreadChats?: number;
    type?: userType;
    verification?: {
        verified?: boolean; // whether all verifications have been approved or not;
        basic?: userVerificationProps;
        // face?: userVerificationProps;
        admin?: userVerificationProps;
        background?: userVerificationProps;
    };
    video?: compressedFileProps;
    viewer?: userViewerProps;
    visibility?: 'public' | 'matches' | 'volunteers' | 'seniors';
    licence?: {
        id?: itemId;
    };
    certificate?: {
        file?: compressedFileProps;
        state?: string;
    };
    specialization?: {
        area?: string;
    };


    key?: string; //for frontend;
};