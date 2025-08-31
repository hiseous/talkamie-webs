import axios from "axios";
import { useState } from "react";
import { response } from "../useFetchApi";
import { getNewKey } from "../../funcs/string/string";

export type uploadFilesToS3itemProps = {
    preSignedUrl: string | undefined;
    file: File | undefined;
    fileUrl: string | undefined;
};

type FormObject = {
    body: {
        items: uploadFilesToS3itemProps[];
    };
};

type UploadResult = {
    name?: string;
    url?: string;
    success?: boolean;
    error?: string;
};

type DataProps = {
    results: UploadResult[];
};
type states = response<DataProps> & {
    key?: string;
}

export const useUploadFilesToS3 = () => {
    const [response, setResponse] = useState<states>({
        key: ``,
    });

    const handles = {
        trigger: async (formObject: FormObject) => {
            const { items } = formObject.body;

            if(items.length){

            setResponse({
                key: getNewKey(),
                loading: true,
            });

            const results: UploadResult[] = [];

            const uploadAll = async () => {
                for(let i = 0; i < formObject.body.items.length; i++){
                    const item = formObject.body.items[i];
                    const preSignedUrl = item?.preSignedUrl;
                    const file = item?.file;
                    const fileUrl = item?.fileUrl;

                    if(file && preSignedUrl){
                        try {
                            const res = await axios.put(preSignedUrl, file, {
                                headers: {
                                    'Content-Type': file.type,
                                },
                            });

                            const success = res.status.toString().startsWith('2');
                            results.push({
                                name: file.name,
                                url: fileUrl,
                                success,
                                error: success ? undefined : "Upload failed",
                            });
                        } catch (err: any) {
                            let errorMsg = "Upload error";
                            if (err?.code?.toLowerCase() === "err_network") {
                                errorMsg = "Network issue. Please check connection.";
                            }

                            results.push({
                                name: file.name,
                                url: fileUrl,
                                success: false,
                                error: errorMsg,
                            });
                        }
                    }
                    else {
                        results.push({
                            error: `missing file or presigned url`,
                            success: false,
                        })
                    }
                }
            };

            await uploadAll();

            const allSuccess = results.every(r => r.success);

            setResponse({
                key: getNewKey(),
                loading: false,
                success: allSuccess,
                data: { results },
                error: allSuccess ? undefined : "One or more files failed to upload.",
            });
        }
        else {
            setResponse({
                key: getNewKey(),
                loading: false,
                success: false,
                error: "No files provided.",
            });
        }
    },
}

    return {
        ...handles,
        ...response,
    };
};