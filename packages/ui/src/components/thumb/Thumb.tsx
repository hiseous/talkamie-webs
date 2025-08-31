
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import { fromUserName } from "../../utils/funcs/string/name";
import Icon from "../icon/Icon";
import CustomImage from "../node/CustomImage";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { compressedFileProps } from "../../utils/types/file";

export type ThumbProps = ComponentPrimitiveProps & {
    dotTheme?: 'red';
    size?: 'xs' | 'sm' | 'md' | 'lg' | '3xl';
    imageSrc?: string;
    picture?: compressedFileProps;
    name?: string;
    fallBack?: 'name-initials';
    href?: string;
    onClick?: () => void;
}

const Thumb = ({size = 'sm', fallBack = 'name-initials', ...props}: ThumbProps) => {
    const iconClassName = `bg-whiteVar1 text-redVar1 fill-redVar1 rounded-full w-full h-full flex items-center justify-center`;
    const userInitials = (
        fallBack === 'name-initials' && props.name ?
        fromUserName(props.name, {initialsLength: 2}).initials :
        undefined
    );
    const pictureUrl = props.imageSrc || props.picture?.org?.url || props.picture?.sm?.url;

    return (
        <NodeMayBeLink
            onClick={props.onClick}
            href={props.href}
            className={`
                ${props.className || ''} ${__classNames.transition}
                relative font-semibold shrink-0 rounded-full
                ${
                    size === 'xs' ? `w-[36px] h-[36px] md:w-[48px] md:h-[48px] text-sm` :
                    size === 'sm' ? `w-[48px] h-[48px] md:w-[64px] md:h-[64px] text-sm` :
                    size === 'md' ? `w-[70px] h-[70px] md:w-[96px] md:h-[96px] text-base` :
                    size === 'lg' ? `w-[120px] h-[120px] text-xl` :
                    // size === 'xl' ? `w-[120px] h-[120px] text-2xl` :
                    // size === '2xl' ? `w-[72px] h-[72px] text-3xl` :
                    size === '3xl' ? `w-[200px] h-[200px] text-4xl` :
                    // size === '4xl' ? `w-[160px] h-[160px] text-6xl` :
                    `w-[80px] h-[80px] text-sm`
                }
            `}
        >
            {
                pictureUrl ?
                <CustomImage
                    src={pictureUrl}
                    className="w-full h-full rounded-full object-cover object-top"
                    placeholder="blur"
                    blurDataURL={props.picture?.sm?.url}
                    loading="lazy"
                /> :
                userInitials ?
                <div className={`${iconClassName}`}>{userInitials}</div> :
                <div className={`${iconClassName}`}>
                    <Icon
                        iconName="Person"
                        size={
                            size === 'xs' ? 24 :
                            size === 'sm' ? 32 :
                            size === 'md' ? 48 :
                            size === 'lg' ? 60 :
                            // size === 'xl' ? 32 :
                            // size === '2xl' ? 36 :
                            size === '3xl' ? 88 :
                            // size === '4xl' ? 56 :
                            40
                        }
                    />
                </div>
            }
            {
                props.dotTheme ?
                <div className={`w-0 h-0 p-1 box-content rounded-full
                        absolute bottom-0 right-0
                        ${props.dotTheme === 'red' ? 'bg-redVar1' : ''}
                    `}
                ></div> :
                <></>
            }
        </NodeMayBeLink>
    )
}

export default Thumb;