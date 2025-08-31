import { itemId } from "../../types/global.types";

type itemKeyName = string; //e.g, "id";
type itemKeyValue = any; //as in the value of "id";

type findItemInObjectItemsProps<itemType> = {
    items?: itemType[];
    key: [itemKeyName, itemKeyValue];
}
export const findItemInObjectItems = <itemType extends Record<itemId, any> = Record<itemId, any>>(props: findItemInObjectItemsProps<itemType>) => {
    let index: number | undefined;
    let item: itemType | undefined;

    if(props.items?.length){
        for(let i = 0; i < props.items.length; i++){
            const keyName = props.key[0];
            const keyValue = props.key[1];

            if(props.items[i] && (keyValue === props.items[i]?.[keyName])){
                item = props.items[i];
                index = i;
                break;
            }
        }
    }

    return {
        index,
        item,
    };
};