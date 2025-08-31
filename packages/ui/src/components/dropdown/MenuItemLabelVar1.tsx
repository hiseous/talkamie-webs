import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Icon, { iconName } from "../icon/Icon";

interface MenuItemLabelVar1Props extends ComponentPrimitiveProps {
    text: string;
    iconName?: iconName;
}
const MenuItemLabelVar1 = (props: MenuItemLabelVar1Props) => {
    return (
        <div
            className={`${props.className || ''} flex items-center justify-between my-[4px] bg-blue50/[.5] dark:bg-gray700 p-4 rounded-xl`}
        >
            <div className="flex items-center">
                {
                    props.iconName &&
                    <div className="mr-2 w-[fit-content] h-[fit-content] p-[3px] box-content bg-white dark:bg-gray800 rounded-full">
                        <Icon
                            iconName={props.iconName}
                            size={20}
                            className="stroke-blueVar7 dark:stroke-blue300"
                        />
                    </div>
                }
                <div className="">{props.text}</div>
            </div>
            <Icon
                iconName="ChevronRight"
                size={16}
            />
        </div>
    );
}

export default MenuItemLabelVar1;