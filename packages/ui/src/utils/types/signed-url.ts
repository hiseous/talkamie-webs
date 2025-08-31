
export type itemToSignForUploadProps = {
    name?: string;
    mimeType?: string;
    objectType?: 'certificate' | 'picture' | 'video';
}
export type itemsToSignForUpload = {
    [itemKey in string]?: itemToSignForUploadProps;
}

export type s3SignedItemProps = {
    fileUrl?: string;
    uploadUrl?: string;
}