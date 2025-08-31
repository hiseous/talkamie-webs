import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type HeaderVar2Props = ComponentPrimitiveProps & {
    title?: string;
    subtitle?: string;
    titleClassName?: string;
    subtitleClassName?: string;
};

const HeaderVar2 = (props: HeaderVar2Props) => {
    
    return (
        <div className={`${props.className || ''}`}>
            {
                props.title ?
                <div className={`${props.titleClassName || ''} font-medium text-blackVar1 text-3xl`}>{props.title}</div> :
                <></>
            }
            {
                props.subtitle ?
                <div
                    className={`${props.subtitleClassName || ''} ${props.title ? 'mt-2' : ''} text-blackVar4`}
                >{props.subtitle}</div> :
                <></>
            }
        </div>
    );
}

export default HeaderVar2;