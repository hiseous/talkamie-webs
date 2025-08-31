'use client';

import { useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { interestProps } from "../../utils/types/interest";
import HeadingText from "../heading/HeadingText";
import InputText from "../input-text/InputText";
import ModalWrapper from "../modal/ModalWrapper";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import { __classNames } from "../../utils/constants/classNames";
import Button from "../button/Button";

type AddInterestModalProps = ComponentPrimitiveProps & {
    onAdd?: (interest?: interestProps) => void;
};

const AddInterestModal = (props: AddInterestModalProps) => {
    const popUp = usePopUp();
    const [interest, setInterest] = useState<interestProps>({});
    
    return (
        <ModalWrapper
            className={`${props.className || ''}`}
            onClose={popUp?.reset}
        >
            <HeadingText size="xs" className="font-semibold">
                Add New Interest
            </HeadingText>
            <InputText
                className={`mt-8 ${__classNames.inputVar1}`}
                placeholder="add your interest"
                onChange={(value) => {
                    setInterest(prev => ({
                        ...prev,
                        name: value,
                    }));
                }}
            />
            <Button theme="red" className="w-full rounded-md mt-2"
                onClick={() => {
                    if(interest.name && props.onAdd){
                        props.onAdd(interest);
                        popUp?.reset();
                    }
                }}
            >
                Add
            </Button>
            <Button onClick={popUp?.reset} theme="white" className="w-full rounded-md mt-2">
                Cancel
            </Button>
        </ModalWrapper>
    );
}

export default AddInterestModal;