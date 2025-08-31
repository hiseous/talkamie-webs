'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import HeaderVar2 from "../heading/HeadingVar2";
import ImageAsset from "../../assets/images/ImageAsset";
import { useInputFile } from "../input-file/useInputFile";
import { useEffect, useState } from "react";
import AuthBackButton from "./AuthBackButton";
import { updateUserForm, useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import CustomImage from "../node/CustomImage";
import { useGetSignedUploadUrlsForAllFiles } from "../../utils/api/signed-urls/for-all";
import { uploadFilesToS3itemProps, useUploadFilesToS3 } from "../../utils/api/signed-urls/upload-files-to-s3";
import { __fileSizeLimits } from "../../utils/constants/digits/file-sizes";
import { itemsToSignForUpload } from "../../utils/types/signed-url";

type formProps = Pick<updateUserForm, 'picture' | 'fileDirPath'>;
type states = {
    form: formProps;
    pictureFile?: File;
    // videoFile?: File;
}
type changeProps = {
    value?: string | File ;
    name: keyof formProps;
}
type AddPictureProps = ComponentPrimitiveProps & {
    onPrev?: () => void;
    onNext?: () => void;
};

const AddPicture = (props: AddPictureProps) => {
    const localUser = useLocalUser();
    const updateApi = useUpdateUserApi();
    
    const getSignedUrlsApi = useGetSignedUploadUrlsForAllFiles();
    const uploadToS3Api = useUploadFilesToS3();
    const loadingUpload = (getSignedUrlsApi.loading || uploadToS3Api.loading);
    const loading = (updateApi.loading || loadingUpload);

    const pictureFileHook = useInputFile({accept: 'image', maxFileSize: __fileSizeLimits.profilePicture});
    const [, setStates] = useState<states>({
        form: {},
    });


    const handles = {
        onFormChange: (changeProps: changeProps) => {
            setStates(prev => {
                prev.form = {
                    ...prev.form,
                    [changeProps.name]: changeProps.value,
                };

                return {...prev};
            });
        },
        onFileChange: (name: 'picture', file?: File) => {
            setStates(prev => {
                if(name === 'picture') prev.pictureFile = file;
                // else if(name === 'video') prev.videoFile = file;

                return {...prev};
            });
        },
        submit: () => {
            setStates(prev => {
                if(prev.pictureFile){//get signed url(s) and upload them, before proceeding;
                    handles.getSignedUrls({
                        picture: {
                            mimeType: prev.pictureFile.type,
                            name: prev.pictureFile.name,
                            objectType: 'picture',
                        }
                    });
                }
                else {//proceed without the file(s)
                    handles.update(prev.form);
                }

                return {...prev};
            })
        },
        getSignedUrls: (items: itemsToSignForUpload) => {
            getSignedUrlsApi.trigger({
                body: {
                    fileDirPath: localUser?.fileDirPath,
                    type: 'user',
                    items: {...items},
                },
            });
        },
        uploadFiles: (items: uploadFilesToS3itemProps[]) => {
            uploadToS3Api.trigger({
                body: {
                    items: [...items],
                },
            });
        },
        update: (form: formProps) => {
            updateApi.trigger({
                body: form,
            });
        },
    };

    useEffect(() => {
        handles.onFileChange('picture', pictureFileHook.file);
    }, [pictureFileHook.changeKey]);
    useEffect(() => {
        if(getSignedUrlsApi.loading === false && getSignedUrlsApi.success){
            setStates(prev => {
                prev.form.fileDirPath = getSignedUrlsApi.data?.fileDirPath;

                //upload the files;
                const uploadFiles: uploadFilesToS3itemProps[] = [];
                const signedItems = getSignedUrlsApi.data?.items;
                if(signedItems?.picture){
                    uploadFiles.push({
                        file: prev.pictureFile,
                        fileUrl: signedItems.picture.fileUrl,
                        preSignedUrl: signedItems.picture.uploadUrl,
                    });
                }

                handles.uploadFiles(uploadFiles);

                return {...prev};
            })
        }
    }, [getSignedUrlsApi.loading]);
    useEffect(() => {
        if(uploadToS3Api.loading === false && uploadToS3Api.success){
            setStates(prev => {
                const signedItems = getSignedUrlsApi.data?.items;
                if(signedItems?.picture?.fileUrl){
                    prev.form.picture = {
                        org: {
                            url: signedItems.picture.fileUrl,
                            mimeType: prev.pictureFile?.type,
                        },
                    };
                }

                handles.update(prev.form);

                return {...prev};
            })
        }
    }, [uploadToS3Api.loading]);
    useEffect(() => {
        if(updateApi.loading === false && updateApi.success){
            localUser?.updateUser(updateApi.data);
            if(props.onNext) props.onNext();
        }
    }, [updateApi.loading]);
    
    return (
        <div
            className={`${props.className || ''} h-full flex flex-col justify-between`}
        >
            <div>
                <AuthBackButton onClick={props.onPrev} className="mb-8" />
                <HeaderVar2
                    title={`Add a Profile Picture`}
                    subtitle={`Upload a photo to make your profile more personal and inviting`}
                    titleClassName="text-2xl"
                />
                <label
                    className="mt-7 flex items-center justify-center mx-auto w-full max-w-[600px] h-[340px]
                        border-[1px] border-dashed border-redVar1/[.2] rounded-xl cursor-pointer overflow-hidden
                    "
                >
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onInput={pictureFileHook.onInput}
                    />
                    {
                        pictureFileHook.processedFile ?
                        <CustomImage
                            src={pictureFileHook.processedFile.url}
                            className="w-full h-full object-cover"
                        /> :
                        <ImageAsset
                            name="imagePlusPng"
                            className="w-[90px] h-auto"
                        />
                    }
                </label>
            </div>
            <Button
                theme="red"
                className="mt-8 w-full !opacity-[1]"
                loading={loading}
                loadingNode={loadingUpload ? `please wait while uploading...` : undefined}
                onClick={handles.submit}
            >
                Proceed
            </Button>
        </div>
    );
}

export default AddPicture;