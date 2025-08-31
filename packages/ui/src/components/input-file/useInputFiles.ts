'use client';

import { useState } from "react";
import { processedFile, processInputFiles } from "../../utils/funcs/file/input-file";
import { getNewKey } from "../../utils/funcs/string/string";
import { estimateCount } from "../../utils/funcs/digit";

type states = {
    files?: FileList;
    processedFiles?: processedFile[];
    wasBlurred?: boolean;
    error?: string;
    key?: string;
    changeKey?: string;
}
export type onInputFilesChangeProps = {
    files?: FileList;
    processedFiles?: processedFile[];
    wasBlurred?: boolean;
    validated?: boolean;
}
export type useInputFilesProps = {
    canProcessFiles?: boolean;
    accept?: 'image' | 'video';
    maxFileSize?: number; //in bytes;
    onChange?: (changeProps: onInputFilesChangeProps) => void;
}
export const useInputFiles = (props?: useInputFilesProps) => {
    const [states, setStates] = useState<states>({});

    const handles = {
        onFilesChange: (fileList?: FileList) => {
            let files: FileList | undefined;
            let processedFiles: processedFile[] | undefined;

            let error = '';

            setStates(prev => {
                if(fileList?.length){
                    for(let i = 0; i < fileList.length; i++){
                        const fileItem = fileList[i];
                        error = (
                            props?.accept && !fileItem?.type.startsWith(`${props.accept}/`) ? `please select ${props.accept}` :
                            props?.maxFileSize && fileItem.size > props.maxFileSize ?
                            `max size limit: ${estimateCount({count: props.maxFileSize, suffix: 'b', divisor: 1024}).toHuman}` :
                            ``
                        );
                        if(error){
                            break;
                        }
                    }
                }

                if(!error){
                    files = fileList;
                    if(props?.canProcessFiles){
                        const processProps = processInputFiles({
                            files: fileList,
                        });
                        processedFiles = processProps.processedFiles;
                    }
                }
                
                prev.files = files;
                prev.processedFiles = processedFiles;
                prev.wasBlurred = true;
                prev.error = error;
                prev.changeKey = getNewKey();

                if(props?.onChange) props.onChange({
                    files,
                    processedFiles,
                    wasBlurred: true,
                });

                return {...prev};
            })

            // return {
            //     files,
            //     processedFiles,
            // };
        },
        onInput: (e: React.FormEvent<HTMLInputElement>) => {
            const files = e.currentTarget.files ?? undefined;
            return handles.onFilesChange(files);
        },
        reset: () => {
            setStates({
                key: getNewKey(),
            });
        },
        onDragOver: (e: React.DragEvent<HTMLElement>) => {
            e.preventDefault();
        },
        onDragDrop: (e: React.DragEvent<HTMLElement>) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            handles.onFilesChange(files);
        },
    };

    return {
        ...states,
        ...handles,
    };
}