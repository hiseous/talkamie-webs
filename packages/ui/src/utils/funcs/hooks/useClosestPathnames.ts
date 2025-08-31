'use client';

import { usePathname } from "next/navigation";
import { removeTraillingSlash } from "../string/string";
import { whichIsTheClosestBasePath } from "../string/url";

type useClosestPathnamesProps = {
    pathnames?: string[];
}
export const useClosestPathnames = (props?: useClosestPathnamesProps) => {
    const currentPathname = usePathname();

    const handles = {
        isThisLocation: (arbitraryPathname: string = '/') => {
            return removeTraillingSlash(arbitraryPathname) === removeTraillingSlash(whichIsTheClosestBasePath(currentPathname, props?.pathnames));
        },
    };

    return {
        ...handles,
        currentPathname,
    };
};