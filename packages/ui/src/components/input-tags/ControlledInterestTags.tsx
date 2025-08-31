'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { interestProps } from "../../utils/types/interest";
import ControlledInterestTagItem from "./ControlledInterestTagItem";

export type ControlledInterestTagsProps = ComponentPrimitiveProps & {
    interests: interestProps[];
    checkedInterests?: interestProps[];
    onChange?: (newCheckedInterests?: interestProps[]) => void;
};

const ControlledInterestTags = (props: ControlledInterestTagsProps) => {
    
    return (
        <div
            className={`${props.className || ''} flex items-center flex-wrap`}
        >
            {
                props.interests.map((interest, i) => {
                    return (
                        <div
                            key={`${i}_${interest.id}_${interest.name}`}
                            className={`${(i < props.interests.length - 1) ? 'pr-3 md:pr-6' : ''} py-3`}
                        >
                            <ControlledInterestTagItem
                                item={interest}
                                checkedItems={props.checkedInterests}
                                onChange={props.onChange}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ControlledInterestTags;