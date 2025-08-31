'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import HeaderVar2 from "../heading/HeadingVar2";
import InputTags from "../input-tags/InputTags";
import { inputTagProps } from "../input-tags/useInputTags";
import { useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import { useEffect, useState } from "react";
import { useGetInterestsApi } from "../../utils/api/interests/useGetInterestsApi";
import AuthBackButton from "./AuthBackButton";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { interestProps } from "../../utils/types/interest";

type SelectInterestsProps = ComponentPrimitiveProps & {
    onPrev?: () => void;
    onNext?: () => void;
};

const SelectInterests = (props: SelectInterestsProps) => {
    const localUser = useLocalUser();
    const getInterestsApi = useGetInterestsApi();
    const [interests, setInterests] = useState<inputTagProps[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<inputTagProps[]>([]);
        
    const updateApi = useUpdateUserApi();
    const handles = {
        update: () => {
            if(selectedInterests.length){
                const interestValues: Pick<interestProps, 'emoji' | 'name'>[] = [];
                selectedInterests.map((selectedInterest) => {
                    if(selectedInterest.value){
                        interestValues.push({
                            name: selectedInterest.value,
                            emoji: selectedInterest.emoji,
                        });
                    }
                });
                updateApi.trigger({
                    body: {
                        interests: interestValues,
                    },
                });
            }
            else {
                if(props.onNext) props.onNext();
            }
        },
    };

    useEffect(() => {
        getInterestsApi.trigger();
    }, []);
    useEffect(() => {
        if(getInterestsApi.loading === false && getInterestsApi.success){
            const newInterests: inputTagProps[] = [];
            const fetchedInterests = getInterestsApi.data ?? [];
            fetchedInterests.map((interest) => {
                if(interest.id){
                    newInterests.push({
                        value: interest.name,
                        emoji: interest.emoji,
                        // iconSrc: interest.iconSrc,
                    });
                }
            });
            setInterests(newInterests);
        }
    }, [getInterestsApi.loading]);
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
                    title={`What are you passionate about?`}
                    subtitle={`Share a little about who you are and what you enjoy`}
                    titleClassName="text-2xl"
                />
                <InputTags
                    key={interests.length}
                    defaultTags={interests}
                    // defaulValueList={props.defaultValueList}
                    className="mt-11"
                    onChange={(changeProps) => {
                        setSelectedInterests(changeProps.tags ?? [])
                    }}
                />
            </div>
            <Button
                theme="red"
                className="w-full !opacity-[1]"
                loading={updateApi.loading}
                onClick={handles.update}
            >
                Proceed
            </Button>
        </div>
    );
}

export default SelectInterests;