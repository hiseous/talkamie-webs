import { __apiUrls } from "../../constants/api-urls";
import { itemsToSignForUpload, s3SignedItemProps } from "../../types/signed-url";
import { useFetchApi } from "../useFetchApi";


type triggerProps = {
    body: {
        fileDirPath?: string; //existing file directory path;
        type: 'user';
        items: itemsToSignForUpload;
    };
}

type respData = {
    fileDirPath?: string;
    items?: {
        [itemKey in string]?: s3SignedItemProps;
    };
}

export const useGetSignedUploadUrlsForAllFiles = () => {

    const api = useFetchApi<respData>({
        fallBackToastError: `could not sign the url(s)`,
    });
    
    const handle = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.signedUrls(),
                body: triggerProps.body,
                method: 'post',
            });
        },
    };
    
    return {
        ...api,
        ...handle,
    };
}