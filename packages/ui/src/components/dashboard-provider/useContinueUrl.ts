'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useContinueUrl = () => {
    const searchParams = useSearchParams();
    const continueUrl = searchParams.get('continue') || undefined;
    const [url, setUrl] = useState(continueUrl);
    
    useEffect(() => {
        if(continueUrl) setUrl(continueUrl);
    });
    
    return {
        url,
    };
}