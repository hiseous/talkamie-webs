import { privacyOption } from "../../types/privacy";
import { userType } from "../../types/user";

export const __privacyOptions = (localUserType?: userType): privacyOption[] => {
    return [
        // {
        //     type: 'public',
        //     title: `Public`,
        //     subtitle: `Any ${localUserType === 'senior' ? 'amies' : 'seniors'} on the platform can view your profile`,
        // },
        ...(
            localUserType === 'senior' ? ([
                {
                    type: 'volunteers',
                    title: `Public`,
                    subtitle: `All amies can view your profile.`,
                },
            ] as privacyOption[]) : ([
                {
                    type: 'seniors',
                    title: `Public`,
                    subtitle: `All seniors can view your profile.`,
                },
            ] as privacyOption[])
        ),
        {
            type: 'matches',
            title: `Matches Only`,
            subtitle: `Only ${localUserType === 'senior' ? 'amies' : 'seniors'} you've connected with can view your profile.`,
        },
    ];
};