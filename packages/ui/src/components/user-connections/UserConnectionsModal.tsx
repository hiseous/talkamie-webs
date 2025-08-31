'use client';

import { useEffect } from "react";
import { __routes } from "../../utils/constants/app-routes";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import HeadingText from "../heading/HeadingText";
import SkeletonLoaderUserItems from "../loader-skeleton/SkeletonLoaderUserItems";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import ModalWrapper from "../modal/ModalWrapper";
import NoResult from "../node/NoResult";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import SearchBox from "../search/SearchBox";
import ConnectionListItems from "../user-connect/ConnectionListItems";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { UserThumbLabelVar1Props } from "../user-cards/UserThumbLabelVar1";
import SvgAsset from "../../assets/svg/SvgAsset";

type UserConnectionsModalProps = ComponentPrimitiveProps & {
    title?: string;
    itemLink?: UserThumbLabelVar1Props['link'];
};

const UserConnectionsModal = (props: UserConnectionsModalProps) => {
    const popUp = usePopUp();
    const localUser = useLocalUser();
    const connections = useDashboard()?.connections;

    useEffect(() => {
        if(!connections?.wasTriggered) connections?.getItems();
    }, []);
    
    return (
        <ModalWrapper
            className={`${props.className || ''}`}
            onClose={popUp?.reset}
        >
            <HeadingText size="xs">
                {props.title ?? `Your Connections`}
            </HeadingText>
            <SearchBox
                placeholder="Search for a connection"
                className="mt-8 mb-8"
                onChange={connections?.onKeywordChange}
            />
            {
                connections?.initiallyLoading === false ?
                <>
                    {
                        connections?.items?.length ?
                        <>
                            <div className="flex items-center justify-between">
                                <div className="uppercase text-grayVar8 font-semibold">connections</div>
                                <Button theme="pink" className="px-4 !py-2 flex items-center" href={localUser?.type === 'senior' ? __routes.volunteers() : __routes.seniors()}>
                                    <SvgAsset
                                        name="Plus"
                                    />
                                    <span className="pl-1">Find new {localUser?.type === 'senior' ? 'amies' : 'seniors'}</span>
                                </Button>
                            </div>
                            <ConnectionListItems
                                items={connections?.items}
                                link={props.itemLink || 'user'}
                                className="mt-4"
                            />
                        </> :
                        // <></>
                        <NoResult
                            label={
                                <>
                                    {
                                        connections?.filter.keyword ? `No one in your connections is with that keyword` :
                                        `You have no connections yet`
                                    }
                                    <Button theme="red" className="px-8 mt-4 w-full block" href={localUser?.type === 'senior' ? __routes.volunteers() : __routes.seniors()}>
                                        Start Connecting
                                    </Button>
                                </>
                            }
                            className="mt-20"
                        />
                    }
                    {
                        connections?.loading ?
                        <SkeletonLoaderUserItems count={2} className="mt-4" /> :
                        <></>
                    }
                </> :
                connections?.initiallyLoading ?
                <SkeletonLoaderUserItems count={8} /> :
                <></>
            }
        </ModalWrapper>
    );
}

export default UserConnectionsModal;