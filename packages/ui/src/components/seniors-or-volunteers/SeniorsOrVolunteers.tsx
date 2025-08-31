'use client';

import { useEffect, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useDashboard } from "../dashboard-provider/useDashboard";
import HeadingVar1 from "../heading/HeadingVar1";
import SearchBox from "../search/SearchBox";
import SeniorVolunteerItems from "./SeniorVolunteerItems";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import { getNewKey } from "../../utils/funcs/string/string";
import SeniorsOrVolunteersFiltersContent from "./SeniorsOrVolunteersFiltersContent";
import IconWrapper from "../icon/IconWrapper";
import ModalWrapper from "../modal/ModalWrapper";
import HeadingText from "../heading/HeadingText";
import { useLocalUser } from "../local-user-provider/useLocalUser";

type SeniorsOrVolunteersProps = ComponentPrimitiveProps & {
    // type?: userType;
};

const SeniorsOrVolunteers = (props: SeniorsOrVolunteersProps) => {
    // const hook = useSeniorsOrVolunteers(props);
    const dashboard = useDashboard();
    const localUser = useLocalUser();
    const searchFor = localUser?.type === 'senior' ? 'volunteer' : 'senior';
    const users = searchFor === 'senior' ? dashboard?.seniors : dashboard?.volunteers;

    const popUp = usePopUp();
    const [resetKey, setResetKey] = useState<string | undefined>(undefined);
    const handles = {
        reset: () => {
            setResetKey(getNewKey());
            users?.resetFilters();
        },
        onFilterChange: users?.onFilterChange,
        renderContent: (className?: string) => {
            return (
                <SeniorsOrVolunteersFiltersContent
                    className={className}
                    resetKey={resetKey}
                    onChange={handles.onFilterChange}
                    defaultFilter={users?.filter}
                    onReset={handles.reset}
                />
            )
        },
    };

    useEffect(() => {
        dashboard?.body.addScrollEvent();
        if(users && !users?.wasTriggered){
            // users.filter.type = searchFor;
            users.getItems()
        };

        return () => dashboard?.body.removeScrollEvent();
    }, []);
    useEffect(() => {
        if(
            typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
            && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
        ){
            if(users?.pagination?.lastEvaluatedKey) users.getItems();
            // else dashboard.body.removeScrollEvent();
        }
    }, [dashboard?.body.scrollDistanceFrom?.bottom]);
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            <SearchBox
                className="max-w-[400px]"
                placeholder={`Search for a ${searchFor}`}
                autoFocus
                nodeBeforeEnd={<>
                    <IconWrapper
                        className="md:hidden"
                        svgAssetName="SlidersHorizontal"
                        onClick={() => {
                            popUp?.set({
                                nodes: [
                                    <>
                                        <ModalWrapper>
                                            <HeadingText size="sm">Set filter</HeadingText>
                                            {handles.renderContent('mt-8')}
                                        </ModalWrapper>
                                    </>
                                ],
                            });
                        }}
                    />
                </>}
                onChange={users?.onKeywordChange}
            />
            <HeadingVar1 className="mt-6 capitalize">
                find {searchFor}s
            </HeadingVar1>
            <div key={resetKey}>
                {handles.renderContent('mt-4 hidden md:block')}
            </div>
            {/* <SeniorsOrVolunteersFilter
                className="mt-4"
                defaultFilter={users?.filter}
                onChange={users?.onFilterChange}
                onReset={users?.resetFilters}
            /> */}
            <SeniorVolunteerItems
                items={users?.items}
                initiallyLoading={users?.initiallyLoading}
                loading={users?.loading}
                // updateItem={users?.updateItem}
                className="mt-4"
            />
        </div>
    );
}

export default SeniorsOrVolunteers;