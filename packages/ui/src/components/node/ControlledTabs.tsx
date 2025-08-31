import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";

export type controlledTabOption<valueType = any> = {
    value?: valueType;
    label?: string;
    href?: string;
}
type ControlledTabsProps<valueType = any> = ComponentPrimitiveProps & {
    value?: valueType;
    tabs?: controlledTabOption[];
    onChange?: (value?: valueType) => void;
};

const ControlledTabs = (props: ControlledTabsProps) => {
    
    return (
        <div className={`${props.className || ''} flex items-center`}>
            {
                props.tabs?.map((tab, i) => (
                    <Button
                        key={`${i}`}
                        onClick={() => {
                            if(props.onChange) props.onChange(tab.value);
                        }}
                        href={tab.href}
                        theme="pink-var-1"
                        className={`capitalize px-5 md:px-12 py-1 md:py-2
                            ${i > 0 ? 'ml-4 md:ml-8' : ''}
                            ${tab.value === props.value ? 'font-semibold' : '!text-grayVar8 hover:border-grayVar8'}
                        `}
                    >
                        {tab.label || tab.value}
                    </Button>
                ))
            }
        </div>
    );
}

export default ControlledTabs;