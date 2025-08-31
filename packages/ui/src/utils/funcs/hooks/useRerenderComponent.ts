
'use client';

import { useState } from "react";
import { getNewKey } from "../string/string";

export const useRerenderComponent = () => {
    const reRender = useState<string | undefined>(undefined);
    const handles = {
        trigger: () => reRender[1](getNewKey()),
    };

    return {
        ...handles,
    };
};