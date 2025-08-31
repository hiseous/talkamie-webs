import { __svgChildrenAssets } from "./_index";

export type svgAssetName = keyof typeof __svgChildrenAssets;
interface SvgAssetProps {
    name: svgAssetName;
    className?: string;
    size?: number;
    onClick?: () => void;
}
const SvgAsset = (props: SvgAssetProps) => {
    const svgChildren = __svgChildrenAssets[props.name];

    return (
        <svg
            width={props.size ?? 24}
            height={props.size ?? 24}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClick}
            className={`${props.className || ''}`}
        >{svgChildren}</svg>
    )
}

export default SvgAsset;