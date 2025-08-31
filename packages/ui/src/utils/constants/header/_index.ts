import { userType } from "../../types/user";
import { __app } from "../app";
import { __routes } from "../app-routes";
import { __hashSelectors } from "../querySelectors";


type headerLink = {
    label: string;
    href?: string;
    onClick?: () => void;
}
export const __landingPageHeaderLinks = (type: userType) => {
    const links: headerLink[] = [
        // {
        //     label: `Volunteer`,
        //     href: '#become-volunteer',
        // },
        ...(
            type === 'volunteer' ? [
                {
                    label: `FAQs`,
                    href: `#${__hashSelectors.landingPage.faqs}`,
                },
            ] : []
        ),
        {
            label: `Support`,
            href: `mailto:${__app.support.email}`,
        },
        {
            label: `Become an Amie (Friend)`,
            href: __routes.becomeAmie(),
        },
    ];

    return links;
}