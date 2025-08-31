import { svgAssetName } from "../../../assets/svg/SvgAsset";
import { ExcludeUndefined } from "../../types/global.types";
import { userProps } from "../../types/user";

type itemType = Exclude<keyof ExcludeUndefined<userProps['verification']>, 'verified'>;
type itemProps = {
    svgName: svgAssetName;
    title: string;
    subtitle: string;
}
type fromUserVerificationItemProps = {
    type: itemType;
    user: userProps | undefined;
}

export const fromUserVerificationItem = (props: fromUserVerificationItemProps) => {
    const items: Record<itemType, itemProps> = {
        basic: {
            svgName: 'UserViewFinderFill',
            title: `Basic Verification`,
            subtitle: `ID and personal information check.`,
        },
        admin: {
            svgName: 'UsersGroupFill',
            title: `Admin Verification`,
            subtitle: `Full profile review by our team.`,
        },
        background: {
            svgName: 'ShieldHeartFill',
            title: `Background Check`,
            subtitle: `A safety review to ensure platform trust.`,
        },
    };
    const item = items[props.type];
    const status = props.user?.verification?.[props.type]?.status;

    return {
        ...item,
        status,
    };
}