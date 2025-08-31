'use client';

import SkeletonLoaderSchedules from "../loader-skeleton/SkeletonLoaderSchedules";
import NoResult from "../node/NoResult";
import SearchBox from "../search/SearchBox";
import ConnectionListItems from "../user-connect/ConnectionListItems";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import { useStartNewChatPage } from "./useStartNewChatPage";

const StartNewChatPage = () => {
    const hook = useStartNewChatPage();
    
    return (
        <DocWrapperVar1>
            <SearchBox
                placeholder="Search"
                className="max-w-[500px] mb-8"
                onChange={hook.onKeywordChange}
            />
            {
                hook.users.initiallyLoading === false ?
                <>
                    <div className="uppercase text-grayVar8 font-semibold">connections</div>
                    {
                        hook.users?.items?.length ?
                        <ConnectionListItems
                            items={hook.users.items}
                            link="chat"
                            className="mt-4"
                        /> :
                        <NoResult
                            label={
                                hook.filter.keyword ? `No one in your connections is with that keyword` :
                                `You have no connections yet`
                            }
                            className="mt-20"
                        />
                    }
                    {
                        hook.users.loading ?
                        <SkeletonLoaderSchedules count={2} className="mt-4" /> :
                        <></>
                    }
                </> :
                hook.users.initiallyLoading ?
                <SkeletonLoaderSchedules count={8} /> :
                <></>
            }
        </DocWrapperVar1>
    );
}

export default StartNewChatPage;