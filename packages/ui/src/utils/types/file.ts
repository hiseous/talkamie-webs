

type fileAttributes = {
    mimeType?: string;
    url?: string;
}
export type compressedFileProps = {
    sm?: fileAttributes; //compressed file (small sized);
    org?: fileAttributes; // the original file;
}