'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import Button from "../button/Button";
import HeaderVar2 from "../heading/HeadingVar2";
import { useEffect, useState } from "react";
import { updateUserForm, useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import InputTextLabel from "../input-text/InputTextLabel";
import { useInputFile } from "../input-file/useInputFile";
import Icon from "../icon/Icon";
import { useGetSignedUploadUrlsForAllFiles } from "../../utils/api/signed-urls/for-all";
import { uploadFilesToS3itemProps, useUploadFilesToS3 } from "../../utils/api/signed-urls/upload-files-to-s3";
import { itemsToSignForUpload } from "../../utils/types/signed-url";

type changeProps = {
    value?: string | File;
    name: keyof Pick<updateUserForm, 'certificate' | 'certificateState' | 'licenseId' | 'specialization'>;
}
type VerificationAddSpecializationProps = ComponentPrimitiveProps & {
    onNext?: () => void;
};
type states = {
    form: updateUserForm;
    certificateFile?: File;
}

const VerificationAddSpecialization = (props: VerificationAddSpecializationProps) => {
    const localUser = useLocalUser();
    const fileHook = useInputFile();
    const updateApi = useUpdateUserApi();
    
    const getSignedUrlsApi = useGetSignedUploadUrlsForAllFiles();
    const uploadToS3Api = useUploadFilesToS3();
    const loadingUpload = (getSignedUrlsApi.loading || uploadToS3Api.loading);
    const loading = (updateApi.loading || loadingUpload);

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
        onFileChange: (file?: File) => {
            setStates(prev => {
                prev.certificateFile = file;

                return {...prev};
            });
        },
        submit: () => {
            setStates(prev => {
                if(prev.certificateFile){//get signed url(s) and upload them, before proceeding;
                    handles.getSignedUrls({
                        certificate: {
                            mimeType: prev.certificateFile.type,
                            name: prev.certificateFile.name,
                            objectType: 'certificate',
                        },
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
        handles.onFileChange(fileHook.file);
    }, [fileHook.changeKey]);
    useEffect(() => {
        if(getSignedUrlsApi.loading === false && getSignedUrlsApi.success){
            setStates(prev => {
                prev.form.fileDirPath = getSignedUrlsApi.data?.fileDirPath;

                //upload the files;
                const uploadFiles: uploadFilesToS3itemProps[] = [];
                const signedItems = getSignedUrlsApi.data?.items;
                if(signedItems?.certificate){
                    uploadFiles.push({
                        file: prev.certificateFile,
                        fileUrl: signedItems.certificate.fileUrl,
                        preSignedUrl: signedItems.certificate.uploadUrl,
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
                if(signedItems?.certificate?.fileUrl){
                    prev.form.certificate = {
                        org: {
                            url: signedItems.certificate.fileUrl,
                            mimeType: prev.certificateFile?.type,
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
                <HeaderVar2
                    title={`Let's Get You Started`}
                    subtitle={`We priotize licensed healthcare workers and others in related fields`}
                    titleClassName="text-2xl"
                />
                <div className="mt-7">
                    {/* <InputSelectSpecialization
                        className="mt-5"
                        dropdownMenuPostionY="auto"
                        label="What is your area of specialization?"
                        handleClassName={`${__classNames.inputVar1}`}
                        onChange={(changeProps) => {
                            handles.onChange({
                                name: 'specialization',
                                value: changeProps.area,
                            });
                        }}
                    />
                    <InputSelectCertificationState
                        className="mt-5"
                        dropdownMenuPostionY="auto"
                        label="Certification State"
                        handleClassName={`${__classNames.inputVar1}`}
                        onChange={(changeProps) => {
                            handles.onChange({
                                name: 'certificateState',
                                value: changeProps.state,
                            });
                        }}
                    /> */}
                    <InputTextLabel
                        className="mt-5"
                        label="What is your area of specialization?"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `Enter your area of specialization`,
                            defaultValue: localUser?.specialization?.area,
                            onChange: (value) => {
                                handles.onFormChange({
                                    name: 'specialization',
                                    value,
                                });
                            },
                        }}
                    />
                    <InputTextLabel
                        className="mt-5"
                        label="Certification State"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `What state were certified?`,
                            defaultValue: localUser?.certificate?.state,
                            onChange: (value) => {
                                handles.onFormChange({
                                    name: 'certificateState',
                                    value,
                                });
                            },
                        }}
                    />
                    <InputTextLabel
                        className="mt-5"
                        label={<>
                            License ID <span className="text-grayVar5 text-sm font-normal">{`(Medical ID)`}</span>
                        </>}
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `Enter your ID`,
                            defaultValue: localUser?.licence?.id?.toString(),
                            onChange: (value) => {
                                handles.onFormChange({
                                    name: 'licenseId',
                                    value,
                                });
                            },
                        }}
                    />
                    <label className="mt-5 block cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div>Add Certificate</div>
                            <div className="flex items-center fill-redVar1 text-redVar1 text-sm">
                                <input
                                    type="file"
                                    className="hidden"
                                    // accept="image/*"
                                    onInput={fileHook.onInput}
                                />
                                <Icon iconName="PlusLg" size={24} />
                                <div className="pl-2">Upload Document</div>
                            </div>
                        </div>
                        <div className="mt-4 h-24 md:h-48 rounded-md bg-redVar12 p-4 flex flex-col items-center justify-center fill-redVar1 text-redVar1">
                            <Icon iconName="FileEarmarkMedical" size={32} />
                            {
                                fileHook.processedFile?.name ?
                                <div className="mt-2 line-clamp-1">{fileHook.processedFile.name}</div> : <></>
                            }
                        </div>
                    </label>
                </div>
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

export default VerificationAddSpecialization;