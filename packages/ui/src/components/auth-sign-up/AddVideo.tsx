'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import HeaderVar2 from "../heading/HeadingVar2";
import { useInputFile } from "../input-file/useInputFile";
import { useEffect, useState } from "react";
import PlayButton from "../button/PlayButton";
import { updateUserForm, useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import AuthBackButton from "./AuthBackButton";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { useGetSignedUploadUrlsForAllFiles } from "../../utils/api/signed-urls/for-all";
import { uploadFilesToS3itemProps, useUploadFilesToS3 } from "../../utils/api/signed-urls/upload-files-to-s3";
import { __fileSizeLimits } from "../../utils/constants/digits/file-sizes";
import { itemsToSignForUpload } from "../../utils/types/signed-url";

type formProps = Pick<updateUserForm, 'video' | 'fileDirPath'>;
type states = {
    form: formProps;
    videoFile?: File;
}
type changeProps = {
    value?: string | File;
    name: keyof formProps;
}
type AddVideoProps = ComponentPrimitiveProps & {
    onPrev?: () => void;
    // onNext?: () => void;
};

const AddVideo = (props: AddVideoProps) => {
    const fileHook = useInputFile();
    const localUser = useLocalUser();
    const updateApi = useUpdateUserApi();
    
    const getSignedUrlsApi = useGetSignedUploadUrlsForAllFiles();
    const uploadToS3Api = useUploadFilesToS3();
    const loadingUpload = (getSignedUrlsApi.loading || uploadToS3Api.loading);
    const loading = (updateApi.loading || loadingUpload);
    
    const videoFileHook = useInputFile({accept: 'video', maxFileSize: __fileSizeLimits.profileVideo});
    const [, setStates] = useState<states>({
        form: {},
    });

    const handles = {
        next: () => {
            window.location.href = '/';
        },
        onFormChange: (changeProps: changeProps) => {
            setStates(prev => {
                prev.form = {
                    ...prev.form,
                    [changeProps.name]: changeProps.value,
                };

                return {...prev};
            });
        },
        onFileChange: (name: 'video', file?: File) => {
            setStates(prev => {
                if(name === 'video') prev.videoFile = file;

                return {...prev};
            });
        },
        submit: () => {
            setStates(prev => {
                if(prev.videoFile){//get signed url(s) and upload them, before proceeding;
                    handles.getSignedUrls({
                        video: {
                            mimeType: prev.videoFile.type,
                            name: prev.videoFile.name,
                            objectType: 'video',
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
        update: (form: updateUserForm) => {
            updateApi.trigger({
                body: form,
            });
        },
    };

    useEffect(() => {
        handles.onFileChange('video', videoFileHook.file);
    }, [videoFileHook.changeKey]);
    useEffect(() => {
        if(getSignedUrlsApi.loading === false && getSignedUrlsApi.success){
            setStates(prev => {
                prev.form.fileDirPath = getSignedUrlsApi.data?.fileDirPath;

                //upload the files;
                const uploadFiles: uploadFilesToS3itemProps[] = [];
                const signedItems = getSignedUrlsApi.data?.items;
                if(signedItems?.video){
                    uploadFiles.push({
                        file: prev.videoFile,
                        fileUrl: signedItems.video.fileUrl,
                        preSignedUrl: signedItems.video.uploadUrl,
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
                if(signedItems?.video?.fileUrl){
                    prev.form.video = {
                        org: {
                            url: signedItems.video.fileUrl,
                            mimeType: prev.videoFile?.type,
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
            handles.next();
            // if(props.onNext) props.onNext();
        }
    }, [updateApi.loading]);
    
    return (
        <div
            className={`${props.className || ''} h-full flex flex-col justify-between`}
        >
            <div>
                <AuthBackButton onClick={props.onPrev} className="mb-8" />
                <HeaderVar2
                    title={`Share a little about yourself.`}
                    subtitle={`Upload a short video to introduce yourself. Let others know more about you in your own words`}
                    titleClassName="text-2xl"
                />
                <div className="mt-8 text-blackVar2 font-medium">
                    Upload an  introduction
                </div>
                <label
                    className="mt-7 flex items-center justify-center mx-auto w-full max-w-[600px] h-[340px]
                        border-[1px] border-dashed border-redVar1/[.2] rounded-xl cursor-pointer overflow-hidden
                    "
                >
                    <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onInput={fileHook.onInput}
                    />
                    {
                        fileHook.processedFile ?
                        <div className="relative w-full h-full">
                            <video
                                src={fileHook.processedFile.url}
                                className="w-full h-full object-cover"
                                // controls
                            />
                            {/* <PlayButton
                                className={`mx-auto absolute ${__classNames.posCenterX} ${__classNames.posCenterY}`}
                            /> */}
                        </div> :
                        <div className="text-center">
                            <PlayButton
                                className="mx-auto"
                                theme="red"
                            />
                            <div className="mt-3 text-blackVar2 font-medium">
                                Please select a video file to upload
                            </div>
                            <div className="text-grayVar3 text-xxsm">
                                Your video will be private until you pubish your profile
                            </div>
                        </div>
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
                Start Connecting
            </Button>
        </div>
    );
}

export default AddVideo;