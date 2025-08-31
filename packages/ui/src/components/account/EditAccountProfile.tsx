
'use client';

import { useEffect, useState } from "react";
import SvgAsset from "../../assets/svg/SvgAsset";
import { __classNames } from "../../utils/constants/classNames";
import { __fileSizeLimits } from "../../utils/constants/digits/file-sizes";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import HeadingText from "../heading/HeadingText";
import InputText from "../input-text/InputText";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import Thumb from "../thumb/Thumb";
import ErrorText from "../node/ErrorText";
import WrapperVar1 from "../wrapper/WrapperVar1";
import BlandTag from "../label/BlandTag";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import AddInterestModal from "./AddInterestModal";
import { updateUserForm, useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import { useRouter } from "next/navigation";
import { __routes } from "../../utils/constants/app-routes";
import { useGetSignedUploadUrlsForAllFiles } from "../../utils/api/signed-urls/for-all";
import { uploadFilesToS3itemProps, useUploadFilesToS3 } from "../../utils/api/signed-urls/upload-files-to-s3";
import { itemsToSignForUpload } from "../../utils/types/signed-url";
import { useInputFile } from "../input-file/useInputFile";
import { interestProps } from "../../utils/types/interest";
import InputDob from "../input-text/InputDob";
import SelectCountryStateCity from "../input-select/SelectCountryStateCity";

type formProps = Pick<updateUserForm, 'picture' | 'video' | 'interests' | 'bio' | 'name' | 'fileDirPath' | 'dob' | 'country' | 'state' | 'city'>;
type states = {
    form: formProps;
    pictureFile?: File;
    videoFile?: File;
}
type changeProps = {
    value?: string | File;
    name: keyof formProps;
}
type EditAccountProfileProps = ComponentPrimitiveProps & {

}

const EditAccountProfile = (props: EditAccountProfileProps) => {
    const navigate = useRouter();
    const popUp = usePopUp();
    const localUser = useLocalUser();
    const updateApi = useUpdateUserApi();
    const pictureFileHook = useInputFile({accept: 'image', maxFileSize: __fileSizeLimits.profilePicture});
    const videoFileHook = useInputFile({accept: 'video', maxFileSize: __fileSizeLimits.profileVideo});
    
    const getSignedUrlsApi = useGetSignedUploadUrlsForAllFiles();
    const uploadToS3Api = useUploadFilesToS3();
    const loadingUpload = (getSignedUrlsApi.loading || uploadToS3Api.loading);
    const loading = (updateApi.loading || loadingUpload);

    // const [interests, setInterests] = useState(localUser?.interests);
    // const [otherForm, setOtherForm] = useState<updateUserForm>({});
    const [states, setStates] = useState<states>({
        form: {
            interests: localUser?.interests,
        },
    });

    const handles = {
        addInterest: (interest: interestProps) => {
            setStates(prev => {
                prev.form = {
                    ...prev.form,
                    interests: [
                        ...prev.form.interests || [],
                        interest,
                    ],
                };

                return {...prev};
            });
        },
        removeInterest: (interestIndex: number) => {
            setStates(prev => {
                if(prev.form.interests?.length){
                    prev.form.interests.splice(interestIndex, 1);
                }

                return {...prev};
            });
        },
        showAddInterestPopUp: () => {
            popUp?.set({
                nodes: [
                    <AddInterestModal
                        onAdd={(interest) => {
                            if(interest){
                                handles.addInterest(interest);
                            }
                        }}
                    />,
                ],
            });
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
        onFileChange: (name: 'picture' | 'video', file?: File) => {
            setStates(prev => {
                if(name === 'picture') prev.pictureFile = file;
                else if(name === 'video') prev.videoFile = file;

                return {...prev};
            });
        },
        submit: () => {
            setStates(prev => {
                if(prev.pictureFile || prev.videoFile){//get signed url(s) and upload them, before proceeding;
                    handles.getSignedUrls({
                        ...(
                            prev.pictureFile ? {
                                picture: {
                                    mimeType: prev.pictureFile.type,
                                    name: prev.pictureFile.name,
                                    objectType: 'picture',
                                }
                            } : {}
                        ),
                        ...(
                            prev.videoFile ? {
                                video: {
                                    mimeType: prev.videoFile.type,
                                    name: prev.videoFile.name,
                                    objectType: 'video',
                                }
                            } : {}
                        ),
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
        handles.onFileChange('picture', pictureFileHook.file);
    }, [pictureFileHook.changeKey]);
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
                if(signedItems?.picture){
                    uploadFiles.push({
                        file: prev.pictureFile,
                        fileUrl: signedItems.picture.fileUrl,
                        preSignedUrl: signedItems.picture.uploadUrl,
                    });
                }
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
                if(signedItems?.picture?.fileUrl){
                    prev.form.picture = {
                        org: {
                            url: signedItems.picture.fileUrl,
                            mimeType: prev.pictureFile?.type,
                        },
                    };
                }
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
            navigate.replace(__routes.account());
        }
    }, [updateApi.loading]);
    
    return (
        <div className={`${props.className || ''}`}>
            <label
                onDrop={pictureFileHook.onDragDrop}
                onDragOver={pictureFileHook.onDragOver}
            >
                <div className="flex items-center cursor-pointer">
                    <input
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onInput={pictureFileHook.onInput}
                    />
                    {/* <div className="flex items-center">
                        <Thumb
                            imageSrc={pictureFileHook.processedFiles?.[0]?.url || localUser?.pictureSrc}
                            size="lg"
                        />
                        <Button theme="pink-var-1" className="ml-4 rounded-md w-full md:max-w-[300px]">
                            Select image
                        </Button>
                    </div> */}
                    <Thumb
                        imageSrc={pictureFileHook.processedFiles?.[0]?.url || localUser?.picture?.org?.url}
                        size="lg"
                    />
                    <div className="pl-4 flex items-center fill-redVar1">
                        <SvgAsset name="PenLine" />
                        <HeadingText size="2xs" className="pl-2">Select Image</HeadingText>
                    </div>
                </div>
                {
                    pictureFileHook.error ? <ErrorText className="mt-2">{pictureFileHook.error}</ErrorText> : undefined
                }
            </label>
            <div className="mt-8">
                <HeadingText size="2xs">Full name</HeadingText>
                <InputText
                    className={`mt-1 ${__classNames.inputVar1}`}
                    placeholder="Your full name"
                    defaultValue={localUser?.name}
                    onChange={(value) => {
                        handles.onFormChange({
                            name: 'name',
                            value,
                        });
                    }}
                />
            </div>
            <div className="mt-4">
                <HeadingText size="2xs">Bio</HeadingText>
                <InputText
                    className={`mt-1 ${__classNames.inputVar1} h-[200px]`}
                    placeholder="Bio"
                    defaultValue={localUser?.bio}
                    type="textarea"
                    onChange={(value) => {
                        handles.onFormChange({
                            name: 'bio',
                            value,
                        });
                    }}
                />
            </div>
            <div className="mt-4">
                <HeadingText size="2xs">Date of Birth</HeadingText>
                <InputDob
                    className={`${__classNames.inputVar1} mt-7 flex items-center justify-between  cursor-pointer`}
                    // defaultDob={props.defaultDob}
                    defaultDob={localUser?.dob}
                    onChange={(dob, isValid) => {
                        handles.onFormChange({
                            name: 'dob',
                            value: isValid ? dob : localUser?.dob,
                        });
                    }}
                />
            </div>
            <label
                onDrop={videoFileHook.onDragDrop}
                onDragOver={videoFileHook.onDragOver}
                className="mt-8 block cursor-pointer"
            >
                <input
                    className="hidden"
                    type="file"
                    accept="video/*"
                    onInput={videoFileHook.onInput}
                />
                <div className="flex items-center justify-end text-redVar1 fill-redVar1 font-semibold">
                    <SvgAsset name="Plus" />
                    <span className="pl-2">Upload new video</span>
                </div>
                <video
                    src={videoFileHook.processedFiles?.[0]?.url || localUser?.video?.org?.url}
                    controls
                    className="mt-2 w-full h-auto max-h-[500px] bg-black"
                />
                {
                    videoFileHook.error ? <ErrorText className="mt-2">{videoFileHook.error}</ErrorText> : undefined
                }
            </label>
            <SelectCountryStateCity
                className="mt-5"
                country={{
                    label: `Location`
                }}
                onChange={(changeProps) => {
                    setStates(prev => {
                        prev.form = {
                            ...prev.form,
                            country: changeProps.country?.name || '',
                            state: changeProps.state?.name || '',
                            city: changeProps.city?.name || '',
                        };

                        return {...prev};
                    });
                }}
            />
            <WrapperVar1 className="mt-8 p-4">
                <div className="flex items-center justify-between">
                    <HeadingText size="2xs">Interests</HeadingText>
                    <div onClick={handles.showAddInterestPopUp} className="cursor-pointer flex items-center justify-end text-redVar1 fill-redVar1 font-semibold">
                        <SvgAsset name="Plus" />
                        <span className="pl-2">Add more</span>
                    </div>
                </div>
                <div className="mt-3">
                    {
                        states.form.interests?.length ?
                        <div className="flex items-center flex-wrap">
                            {
                                states.form.interests?.map((interest, i) => {
                                    return (
                                        <BlandTag
                                            key={`${i}`}
                                            className={`${(i < (states.form.interests?.length ?? 0) - 1) ? 'mr-2' : ''} my-2 bg-white cursor-default`}
                                            // iconSrc={interest.iconSrc}
                                            label={interest.name}
                                            emoji={interest.emoji}
                                            nodeBeforeEnd={
                                                <SvgAsset
                                                    name="Times"
                                                    className="ml-1 cursor-pointer"
                                                    onClick={() => {
                                                        handles.removeInterest(i);
                                                    }}
                                                />
                                            }
                                        />
                                    )
                                })
                            }
                         </div> :
                        <HeadingText size="2xs" className="text-center font-medium text-grayVar1">add an interest</HeadingText>
                    }
                </div>
            </WrapperVar1>
            <Button
                theme="red"
                className="mt-8 rounded-md w-full"
                loading={loading}
                loadingNode={loadingUpload ? `please wait while uploading...` : undefined}
                onClick={handles.submit}
            >
                Save Changes
            </Button>
        </div>
    );
}

export default EditAccountProfile;