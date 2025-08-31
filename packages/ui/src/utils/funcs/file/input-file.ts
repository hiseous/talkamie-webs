
type processedFileType = 'image' | 'audio' | 'video' | 'other';
export type processedFile = {
    type?: processedFileType;
    url?: string;
    name?: string;
    validated?: boolean;
}
type processInputFileProps = {
    file?: File;
    maxFileSize?: number;
    acceptedTypes?: processedFileType[];
}
export const processInputFile = (props: processInputFileProps) => {
    let processedFile: processedFile | undefined;

    if(props.file){
        const type: processedFileType = (
            props.file.type.startsWith('image/') ? 'image' :
            props.file.type.startsWith('audio/') ? 'audio' :
            props.file.type.startsWith('video/') ? 'video' :
            'other'
        );

        const validated = (
            (typeof props.maxFileSize === 'number' && (props.file.size > props.maxFileSize)) ||
            (props?.acceptedTypes && !props.acceptedTypes.includes(type))
        ) ? false : true;

        processedFile = {
            type,
            name: props.file.name,
            url: URL.createObjectURL(props.file),
            validated,
        };
    }

    return {
        processedFile,
    };
}

type processInputFilesProps = Omit<processInputFileProps, 'file'> & {
    files?: FileList;
}
export const processInputFiles = (props: processInputFilesProps) => {
    const processedFiles: processedFile[] = [];

    if(props.files?.length){
        for(let i = 0; i < props.files.length; i++){
            const file = props.files[i];
            const processProps = processInputFile({
                ...props,
                file,
            });
            const processedFile = processProps.processedFile;
            if(processedFile){
                processedFiles.push(processedFile);
            }
        }
    }

    return {
        processedFiles,
    };
}