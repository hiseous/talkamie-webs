'use client';

import { useState } from "react";
import { faqProps } from "../../utils/types/faq";

export const useDashSelectedFaq = () => {
    const [faq, setFaq] = useState<faqProps | undefined>();
    
    const handles = {
        set: (faq: faqProps) => setFaq(faq),
    };

    return {
        ...handles,
        faq,
    };
};