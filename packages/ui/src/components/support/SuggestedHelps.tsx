
import { useEffect, useState } from "react";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";
import SkeletonLoaderUserItems from "../loader-skeleton/SkeletonLoaderUserItems";
import NoResult from "../node/NoResult";
import SuggestedHelpItem from "./SuggestedHelpItem";

type SuggestedHelpsProps = ComponentPrimitiveProps & {
    
}

const SuggestedHelps = (props: SuggestedHelpsProps) => {
    const dashboard = useDashboard();
    const [openIndex, setOpenIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        dashboard?.body.addScrollEvent();
        if(!dashboard?.faqs.wasTriggered) dashboard?.faqs.get();

        return () => dashboard?.body.removeScrollEvent();
    }, []);
    useEffect(() => {
        if(
            !dashboard?.faqs.loading
            && typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
            && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
        ){
            if(dashboard?.faqs.pagination?.lastEvaluatedKey) dashboard?.faqs?.get();
        }
    }, [dashboard?.body.scrollDistanceFrom?.bottom]);
    
    return (
        <div className={`${props.className || ''} bg-white dark:bg-gray800 p-2 pb-4 rounded-md max-h-[300px] flex flex-col`}>
            {/* <SearchBox
                placeholder="Search for help"
                onChange={dashboard?.faqs.onKeywordChange}
                className="sticky top-2 rounded-md"
                // inputClassName="dark:placeholder:text-white"
                hideLeadingIcon
                nodeBeforeEnd={<>
                    <Icon
                        iconName="Search"
                        // size={18}
                        // className={`stroke-gray500 dark:stroke-white`}
                    />
                </>}
            /> */}
            <div>
                {
                    dashboard?.faqs.initiallyLoading ?
                    <SkeletonLoaderUserItems /> :
                    dashboard?.faqs.initiallyLoading === false ?
                    <>
                        {
                            dashboard?.faqs.items?.length ?
                            <>
                                {
                                    dashboard?.faqs.items.map((faq, i) => {
                                        return (
                                            <SuggestedHelpItem
                                                key={`${i}_${faq.id}`}
                                                className={`${i > 0 ? 'mt-1' : ''}`}
                                                item={faq}
                                                defaultOpen={i === openIndex}
                                                onClick={() => {
                                                    setOpenIndex(i === openIndex ? undefined : i);
                                                }}
                                            />
                                        )
                                    })
                                }
                                {
                                    dashboard?.faqs.loading ?
                                    <SkeletonLoaderUserItems count={1} /> :
                                    <></>
                                }
                            </> :
                            <NoResult
                                label={`No help found`}
                                className="my-8"
                            />
                        }
                    </> :
                    <></>
                }
            </div>
        </div>
    )
}

export default SuggestedHelps;