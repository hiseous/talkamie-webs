'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";
import UserThumbLabelVar1, { UserThumbLabelVar1Props } from "../user-cards/UserThumbLabelVar1";

type ConnectionListItemsProps = ComponentPrimitiveProps & {
    items: userProps[];
    link?: UserThumbLabelVar1Props['link'];
}
const ConnectionListItems = (props: ConnectionListItemsProps) => {
    
    return (
        <div className={`${props.className || ''} grid grid-cols-1`}>
            {
                props.items.map((user, i) => {
                    return (
                        <UserThumbLabelVar1
                            key={`${i}_${user.id}`}
                            className="flex-1"
                            user={user}
                            link={props.link}
                        />
                    )
                })
            }
        </div>
    );
}

export default ConnectionListItems;