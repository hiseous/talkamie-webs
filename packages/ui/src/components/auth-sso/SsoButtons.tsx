'use client';

import { ComponentPrimitiveProps, ssoName } from "../../utils/types/global.types";
import SsoButton from "../button/SsoButton";
import { useSsoButtonsProps } from "./useSsoButtons";

type SsoButtonsProps = ComponentPrimitiveProps & useSsoButtonsProps & {
    labelType?: 'up' | 'in';
    onClick?: (name?: ssoName) => void;
};

const SsoButtons = (props: SsoButtonsProps) => {
    const ssoNames: ssoName[] = ['google'];
    // const hook = useSsoButtons(props);

    return (
        <div
            className={`${props.className || ''}`}
        >
            {
                ssoNames.map((ssoName, i) => {
                    return (
                        <SsoButton
                            key={i}
                            className={`${i > 0 ? 'mt-4' : ''}`}
                            provider={ssoName}
                            authType={props.labelType === 'up' ? 'sign-up' : 'sign-in'}
                            onClick={() => {
                                if(props.onClick) props.onClick(ssoName);
                                // if(ssoName === 'google'){
                                //     hook.google.signIn();
                                // }
                                // else if(ssoName === 'apple'){
                                //     hook.apple.signIn();
                                // }
                            }}
                        />
                    )
                })
            }
        </div>
    );
}

export default SsoButtons;