'use client';

import { useEffect } from "react";
import SvgAsset, { svgAssetName } from "../../assets/svg/SvgAsset";
import { useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import { __routes } from "../../utils/constants/app-routes";
import { useClosestPathnames } from "../../utils/funcs/hooks/useClosestPathnames";
import { settingsAppRouteSubpath } from "../../utils/types/app-routes";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ControlledToggleButton from "../button/ControlledToggleButton";
import IconWrapper from "../icon/IconWrapper";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import ThumbTitleSubtitleNode from "../node/ThumbTitleSubtitleNode";

type tab = {
    iconName: svgAssetName;
    title: string;
    subtitle: string;
    hrefSubpaths?: settingsAppRouteSubpath[];
    href?: string;
    trailingNode?: React.ReactNode;
}
type AccountTabsProps = ComponentPrimitiveProps & {

}

const AccountTabs = (props: AccountTabsProps) => {
    const localUser = useLocalUser();
    const updateApi = useUpdateUserApi();

    const tabs: tab[] = [
        {
            iconName: 'User',
            title: `Profile Details`,
            subtitle: `Profile Information`,
            hrefSubpaths: ['profile'],
        },
        ...(
            localUser?.type === 'senior' ? [
                // {
                //     iconName: 'MoneyBillCheck',
                //     title: `Subscription Management`,
                //     subtitle: `Upgrade or manage subscription.`,
                //     hrefSubpaths: ['subscription'],
                // },
            ] : [
                {
                    iconName: 'CalendarCheckAlt',
                    title: `Availability Management`,
                    subtitle: `Manage your daily schedules and  calls`,
                    hrefSubpaths: ['availability', 'schedule'],
                },
                // {
                //     iconName: 'LocationPin',
                //     title: `Location Details`,
                //     subtitle: `Update your location details`,
                //     hrefSubpaths: ['location'],
                // },
                // {
                //     iconName: 'CreditCard',
                //     title: `Finance`,
                //     subtitle: `Manage your earnings and withdrawal`,
                //     hrefSubpaths: ['finance'],
                // },
            ]
        ) as tab[],
        {
            iconName: 'CreditCard',
            title: `Finance`,
            subtitle: `${localUser?.type === 'senior' ? `Manage your purchase history` : `Manage your earnings and withdrawal`}`,
            hrefSubpaths: ['finance'],
        },
        {
            iconName: 'ShieldCheck',
            title: `Change Password`,
            subtitle: `Edit account password`,
            hrefSubpaths: ['password'],
        },
        {
            iconName: 'Bell',
            title: `Push Notification`,
            subtitle: `Receive status notifications`,
            // hrefSubpaths: ['notification'],
            trailingNode: <>
                <ControlledToggleButton
                    checked={localUser?.preferences?.notifications?.push?.enabled}
                    disabled={updateApi.loading}
                    onClick={() => {
                        updateApi.trigger({
                            body: {
                                pushNotification: {
                                    enabled: !localUser?.preferences?.notifications?.push?.enabled,
                                },
                            },
                        });
                    }}
                />
            </>
        },
        {
            iconName: 'UserLock',
            title: `Privacy`,
            subtitle: `Manage how your information is shared and viewed`,
            hrefSubpaths: ['privacy'],
        },
        {
            iconName: 'UserLock',
            title: `Help/Support`,
            subtitle: `Get in touch with us`,
            href: __routes.support(),
            // hrefSubpaths: ['support'],
        },
    ];
    const pathNames = tabs.map(tab => __routes.settings(tab.hrefSubpaths));
    const closestPaths = useClosestPathnames({pathnames: pathNames});

    useEffect(() => {
        if(updateApi.loading === false && updateApi.success){
            localUser?.updateUser(updateApi.data);
        }
    }, [updateApi.loading]);
    
    return (
        <div className={`${props.className || ''}`}>
            {
                tabs.map((tab, i) => {
                    const href = (
                        (tab.href || tab.hrefSubpaths) ? tab.href || __routes.settings(tab.hrefSubpaths) : undefined
                    );
                    const isThisLocation = closestPaths.isThisLocation(href);
                    
                    return (
                        <ThumbTitleSubtitleNode
                            key={i}
                            thumbNode={<IconWrapper className="p-2 rounded-full md:[&_svg]:w-[40px] md:[&_svg]:h-[40px]" svgAssetName={tab.iconName} iconSize={28} theme="red" />}
                            titleNode={<div className="font-semibold">{tab.title}</div>}
                            subtitleNode={<div className="text-grayVar3">{tab.subtitle}</div>}
                            traillingNode={tab.trailingNode ?? <SvgAsset name="AngleRight" className="ml-3 fill-grayVar3" />}
                            className={`px-4 py-6 rounded-md ${(href && isThisLocation) ? 'bg-pinkVar1' : ''}`}
                            href={href}
                        />
                    )
                })
            }
        </div>
    );
}

export default AccountTabs;