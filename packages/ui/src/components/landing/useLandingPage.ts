'use client';

import { useState } from "react";
import { headerTheme } from "./Header";

export const useLandingPage = () => {
    const [headerTheme, setHeaderTheme] = useState<headerTheme>('light');

    const handles = {
        onProgress: (progress: number, flipTheme?: boolean) => {
            let theme = headerTheme;
            if(progress > 0.8){
                theme = 'light';
            }
            else {
                theme = 'dark';
            }

            if(flipTheme){
                theme = theme === 'dark' ? 'light' : 'dark';
            }

            setHeaderTheme(theme);
        },
    };

    return {
        headerTheme,
        ...handles,
    };
};