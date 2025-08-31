'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Icon from "../icon/Icon";
import HeaderVar2 from "../heading/HeadingVar2";
import { useUpdateUserApi } from "../../utils/api/user/useUpdateUserApi";
import ImageAsset, { imageAssetName } from "../../assets/images/ImageAsset";
import { __classNames } from "../../utils/constants/classNames";
import LoadingText from "../loader/LoadingText";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { userType } from "../../utils/types/user";
import { useAuth } from "../auth-provider/useAuth";

type option = {
    value: userType;
    title: string;
    subtitle: string;
    iconName: imageAssetName;
}
type SelectUserTypeProps = ComponentPrimitiveProps & {
    
};

const SelectUserType = (props: SelectUserTypeProps) => {
    const auth = useAuth();
    const localUser = useLocalUser();
    const updateApi = useUpdateUserApi();
    const options: option[] = [
        {
            value: 'senior',
            title: `Senior`,
            subtitle: `Start talking to caring amies.`,
            // subtitle: `Looking to share stories and make connections.`,
            iconName: 'memojiMalePng',
        },
        {
            value: 'volunteer',
            title: `Amie`,
            subtitle: `Share the moment with seniors.`,
            // subtitle: `Support and create meaningful conversations`,
            iconName: 'memojiFemalePng',
        },
    ];

    const handles = {
        selectType: (type: userType) => {
            auth?.onSignUpFormChange('type', type);
            updateApi.trigger({
                body: {type}
            });
        },
    };

    useEffect(() => {
        if(updateApi.loading === false && updateApi.success){
            localUser?.updateUser(updateApi.data);
            auth?.nextSignUpStep();
        }
    }, [updateApi.loading]);
    
    return (
        <div className={`${props.className || ''}`}>
            {/* <AuthBackButton onClick={props.onPrev} className="mb-8" /> */}
            <HeaderVar2
                className="mt-4"
                title={`Let's get started!`}
                subtitle={`Are you here to connect or to lend a helping hand?`}
            />
            <div className="mt-14">
                {
                    options.map((option, i) => {
                        return (
                            <div
                                key={i}
                                className={`${__classNames.inputVar1} ${i > 0 ? 'mt-7' : ''} flex items-center !px-5 !py-4 cursor-pointer text-xl`}
                                onClick={() => {
                                    handles.selectType(option.value);
                                }}
                            >
                                <div className="w-[48px] h-[48px] box-content p-[9px] rounded-full bg-pinkVar1">
                                    <ImageAsset
                                        name={option.iconName}
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="flex-1 pl-2 pr-2">
                                    <div className="font-medium">{option.title}</div>
                                    <div className="text-grayVar3">{option.subtitle}</div>
                                </div>
                                <Icon
                                    iconName="ChevronRight"
                                />
                            </div>
                        )
                    })
                }
            </div>
            {
                updateApi.loading ?
                <LoadingText className="mt-6" text="updating..." /> :
                <></>
            }
        </div>
    );
}

export default SelectUserType;