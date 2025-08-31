'use client';

import SkeletonLoaderUserProfile from "../loader-skeleton/SkeletonLoaderUserProfile";
import NoResultVar1 from "../node/NoResultVar1";
import { useScheduleLayout } from "../schedule-layout-provider/useScheduleLayout";

type ScheduleLayoutProps = {
    children: React.ReactNode;
};

const ScheduleLayout = (props: ScheduleLayoutProps) => {
    const layout = useScheduleLayout();
    
    return (
        <>
            {
                layout?.loading === false ?
                <>
                    {
                        layout.data?.id ?
                        <>
                            {props.children}
                        </> :
                        <NoResultVar1>
                            We could not find that schedule
                        </NoResultVar1>
                    }
                </> :
                layout?.loading ?
                <SkeletonLoaderUserProfile /> :
                <></>
            }
        </>
    );
}

export default ScheduleLayout;