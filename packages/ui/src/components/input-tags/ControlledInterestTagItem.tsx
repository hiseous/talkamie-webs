'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import BlandTag from "../label/BlandTag";
import { interestProps } from "../../utils/types/interest";
import { findItemInObjectItems } from "../../utils/funcs/array/find";

type ControlledInterestTagItemProps = ComponentPrimitiveProps & {
    item?: interestProps;
    checkedItems?: interestProps[];
    onChange?: (newCheckedItems?: interestProps[]) => void;
}
const ControlledInterestTagItem = (props: ControlledInterestTagItemProps) => {
    
    const handles = {
        addInterest: (currentInterests: interestProps[] = [], interest: interestProps) => {
            const interests = [
                ...currentInterests,
                interest,
            ];

            return interests;
        },
        removeInterest: (currentInterests: interestProps[] = [], interestIndex: number) => {
            const interests = [...currentInterests];
            
            interests.splice(interestIndex, 1);
            return interests;
        },
        getItemIndex: (currentInterests: interestProps[] = [], interest?: interestProps) => {
            let itemIndex: number | undefined;
            if(props.checkedItems?.length && interest){
                itemIndex = findItemInObjectItems({
                    items: currentInterests,
                    key: ['name', interest.name],
                }).index;
            }

            return itemIndex;
        },
        toggleSelect: () => {
            const itemIndex = handles.getItemIndex(props.checkedItems, props.item);
            let newCheckedItems = [...props.checkedItems || []];

            if(typeof itemIndex === 'number'){
                //was checked, remove it;
                newCheckedItems = [...handles.removeInterest(props.checkedItems, itemIndex)];
            }
            else if(props.item){
                //was not checked, add to it;
                newCheckedItems = [...handles.addInterest(props.checkedItems, props.item)];
            }

            if(props.onChange) props.onChange(newCheckedItems);
        },
    };
    
    return (
        <BlandTag
            onClick={handles.toggleSelect}
            className={`${props.className || ''}`}
            label={props.item?.name}
            emoji={props.item?.emoji}
            checked={typeof handles.getItemIndex(props.checkedItems, props.item) === 'number'}
        />
    )
}

export default ControlledInterestTagItem;