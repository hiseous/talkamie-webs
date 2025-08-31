'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import Button from "../button/Button";
import InputTextLabel from "../input-text/InputTextLabel";
import HeaderVar2 from "../heading/HeadingVar2";
import AuthBackButton from "./AuthBackButton";
import { useEffect, useState } from "react";
import { updateUserForm, useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { useGetInterestsApi } from "../../utils/api/interests/useGetInterestsApi";
import InputDob from "../input-text/InputDob";
import { useInputFile } from "../input-file/useInputFile";
import CustomImage from "../node/CustomImage";
import ImageAsset from "../../assets/images/ImageAsset";
import { interestProps } from "../../utils/types/interest";
import { uploadFilesToS3itemProps, useUploadFilesToS3 } from "../../utils/api/signed-urls/upload-files-to-s3";
import { itemsToSignForUpload } from "../../utils/types/signed-url";
import { __fileSizeLimits } from "../../utils/constants/digits/file-sizes";
import { useGetSignedUploadUrlsForAllFiles } from "../../utils/api/signed-urls/for-all";
import ControlledInterestTags from "../input-tags/ControlledInterestTags";
import { useAuth } from "../auth-provider/useAuth";
import { __routes } from "../../utils/constants/app-routes";

type formProps = Pick<updateUserForm, 'bio' | 'interests' | 'dob' | 'picture' | 'fileDirPath'>;
type states = {
    form: formProps;
    pictureFile?: File;
    // videoFile?: File;
}
type changeProps = {
    value?: string | File | interestProps[];
    name: keyof formProps;
}
type AddYourInfoProps = ComponentPrimitiveProps & {
    
};

const AddYourInfo = (props: AddYourInfoProps) => {
    const auth = useAuth();
    const localUser = useLocalUser();
    const updateApi = useUpdateUserApi();
    const getInterestsApi = useGetInterestsApi();
    
    const getSignedUrlsApi = useGetSignedUploadUrlsForAllFiles();
    const uploadToS3Api = useUploadFilesToS3();
    const loadingUpload = (getSignedUrlsApi.loading || uploadToS3Api.loading);
    const loading = (updateApi.loading || loadingUpload);

    const pictureFileHook = useInputFile({accept: 'image', maxFileSize: __fileSizeLimits.profilePicture});
    const [states, setStates] = useState<states>({
        form: {
            interests: localUser?.interests,
        },
    });

    // const canUpdate = (props.type || bio || dob.value || selectedInterests.length || picture.file) ? true : false;

    
    const handles = {
        // onChange: (changeProps: changeProps) => {
        //     setForm({
        //         ...form,
        //         [changeProps.name]: changeProps.value,
        //     });
        // },
        next: () => {
            window.location.href = auth?.continueUrl || __routes.dashboard();
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
        getInterestsApi.trigger();
    }, []);
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
                // if(signedItems?.video){
                //     uploadFiles.push({
                //         file: prev.videoFile,
                //         fileUrl: signedItems.video.fileUrl,
                //         preSignedUrl: signedItems.video.uploadUrl,
                //     });
                // }

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
                // if(signedItems?.video?.fileUrl){
                //     prev.form.video = {
                //         org: {
                //             url: signedItems.video.fileUrl,
                //             mimeType: prev.videoFile?.type,
                //         },
                //     };
                // }

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
                <div className="flex items-center justify-between">
                    <AuthBackButton onClick={auth?.prevSignUpStep} />
                    <Button
                        className="md:px-8 hover:text-redVar1 hover:border-redVar1 md:border-[1px]"
                        onClick={handles.next}
                    >
                        Do this later
                    </Button>
                </div>
                <div className="mt-7">
                    <HeaderVar2
                        title={`Add a Profile Picture`}
                        subtitle={`Upload a photo to make your profile more personal and inviting`}
                        titleClassName="text-2xl"
                    />
                    <label
                        className="mt-7 flex items-center justify-center mx-auto w-full h-[200px] md:h-[340px]
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
                            <div className="flex flex-col items-center">
                                <ImageAsset
                                    name="imagePlusPng"
                                    className="w-[50px] md:w-[90px] h-auto"
                                />
                                <div className="mt-4 text-xl text-redVar1 underline">
                                    Choose a photo
                                </div>
                            </div>
                        }
                    </label>
                    <HeaderVar2
                        title={`Tell us about yourself`}
                        subtitle={`Share a little about who you are and what you enjoy.`}
                        titleClassName="text-2xl"
                        className="mt-12"
                    />
                    <InputTextLabel
                        className="mt-7 h-[140px] md:h-[300px]"
                        // label="BIO"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `Tell us about yourself`,
                            type: 'textarea',
                            // defaultValue: props.defaultValues?.bio,
                            onChange: (value) => handles.onFormChange({name: 'bio', value}),
                        }}
                    />
                    {
                        localUser?.type === 'senior' ?
                        <>
                            <HeaderVar2
                                // title={`How old are you?`}
                                title={`What is your date of birth?`}
                                subtitle={`Your age helps us create better matches.`}
                                titleClassName="text-2xl"
                                className="mt-12"
                            />
                            <InputDob
                                className={`${__classNames.inputVar1} mt-7 flex items-center justify-between  cursor-pointer`}
                                // defaultDob={props.defaultDob}
                                onChange={(dob, isValid) => {
                                    if(isValid || !dob) handles.onFormChange({name: 'dob', value: dob})
                                }}
                            />
                        </> :
                        <></>
                    }
                    <HeaderVar2
                        title={`What are you passionate about?`}
                        subtitle={`Share a little about who you are and what you enjoy`}
                        titleClassName="text-2xl"
                        className="mt-12"
                    />
                    <ControlledInterestTags
                        key={getInterestsApi.data?.length}
                        interests={getInterestsApi.data || []}
                        checkedInterests={states.form.interests}
                        className="mt-11"
                        onChange={(newCheckedInterests) => {
                            // console.log('new interests', newCheckedInterests)
                            handles.onFormChange({name: 'interests', value: newCheckedInterests})
                        }}
                    />
                </div>
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
            {/* <Button
                theme="white"
                className="mt-8 w-full !opacity-[1]"
                onClick={handles.next}
            >
                Do this later
            </Button> */}
        </div>
    );
}

export default AddYourInfo;