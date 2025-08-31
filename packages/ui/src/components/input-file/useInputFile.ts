'use client';

import { useInputFiles, useInputFilesProps } from "./useInputFiles";

type useInputFileProps = useInputFilesProps & {
    canProcessFiles?: boolean; //default = true;
    onChange?: (file?: File) => void;
}
export const useInputFile = (props?: useInputFileProps) => {
    const hook = useInputFiles({
        ...props,
        canProcessFiles: props?.canProcessFiles ?? true,
    });
    const file = hook.files?.[0];
    const processedFile = hook.processedFiles?.[0];

    // const handles = {
    //     onInput: (e: React.FormEvent<HTMLInputElement>) => {
    //         const returnProps = hook.onInput(e);
    //         const file = returnProps.files?.[0];
    //         if(props?.onChange) props.onChange(file);
    //     },
    // };

    return {
        // ...handles,
        ...hook,
        file,
        processedFile,
        wasBlurred: hook.wasBlurred,
    };
}