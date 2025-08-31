
'use client';

import { useLocalUser } from "../local-user-provider/useLocalUser";
import ModalWrapper from "../modal/ModalWrapper";
import Button from "../button/Button";
import HeadingText from "../heading/HeadingText";
import BlandTextarea from "../input-text/BlandTextarea";
import { __classNames } from "../../utils/constants/classNames";
import { usePostUserReviewApi, usePostUserReviewRespData, usePostUserReviewTriggerProps } from "../../utils/api/user/post-review";
import { itemId, valueOf } from "../../utils/types/global.types";
import { useEffect, useState } from "react";
import RatingStarVar2 from "../node/RatingStarVar2";
import { stringIsEmpty } from "../../utils/funcs/string/string";

type states = Exclude<usePostUserReviewTriggerProps['body'], undefined>;
type WriteReviewModalProps = {
    userId: itemId;
    onSent?: (respData?: usePostUserReviewRespData) => void;
    onClose?: () => void;
}

const WriteReviewModal = (props: WriteReviewModalProps) => {
    const localUser = useLocalUser();
    const postApi = usePostUserReviewApi();
    const [states, setStates] = useState<states>({});

    const handles = {
        send: () => {
            setStates(prev => {
                if(localUser?.id){
                    postApi.trigger({
                        revieweeId: props.userId,
                        body: prev,
                    });
                }

                return {...prev};
            });
        },
        onChange: (name: keyof states, value?: valueOf<states>) => {
            setStates(prev => {
                prev[name] = value as any;
                return {...prev};
            });
        },
    };
    
    useEffect(() => {
        if(postApi.loading === false && postApi.success){
            if(props.onSent) props.onSent(postApi.data);
        }
    }, [postApi.loading]);
    
    return (
        <ModalWrapper
            onClose={props.onClose}
        >
            <HeadingText size="xs">
                Write a Review
            </HeadingText>
            <BlandTextarea
                placeholder="Review"
                className={`mt-8 ${__classNames.inputVar1} min-h-[250px]`}
                onChange={(value) => handles.onChange('text', value)}
            />
            <div className="mt-4 flex items-center justify-center fill-redVar1 stroke-redVar1">
                {
                    Array.from({length: 5}).map((unknown, i) => (
                        <RatingStarVar2
                            key={`${i}_${unknown}`}
                            className={`${i > 0 ? 'ml-2' : ''} cursor-pointer`}
                            unitValue={(states.rate ?? 0) > i ? 1 : 0}
                            // unitValue={0.5}
                            onClick={() => handles.onChange('rate', i + 1)}
                        />
                    ))
                }
            </div>
            <div className="mt-2 text-center">
                Tap to Rate
            </div>
            <Button
                theme="red"
                className="mt-8 w-full"
                onClick={handles.send}
                loading={postApi.loading}
                disabled={typeof states.rate !== 'number' || stringIsEmpty(states.text)}
            >
                Send
            </Button>
        </ModalWrapper>
    );
}

export default WriteReviewModal;