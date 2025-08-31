'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { callProps } from "../../utils/types/call";
import CallInfo from "./CallInfo";
import ModalWrapper from "../modal/ModalWrapper";
import HeadingText from "../heading/HeadingText";

type CallInfoModalProps = ComponentPrimitiveProps & {
    item: callProps | undefined;
    close?: () => void;
}
const CallInfoModal = (props: CallInfoModalProps) => {
    
    return (
        <ModalWrapper className={`${props.className || ''}`} onClose={props.close}>
            <HeadingText size="2xs">
                Call Info
            </HeadingText>
            <CallInfo
                item={props.item}
                className="mt-6"
            />
        </ModalWrapper>
    );
}

export default CallInfoModal;