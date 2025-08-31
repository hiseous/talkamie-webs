'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type NavigateProps = {
    to: string;
}
const Navigate = (props: NavigateProps) => {
    const navigate = useRouter();
    
    useEffect(() => {
        navigate.push(props.to);
    }, []);

    return (
        <></>
    );
}

export default Navigate;