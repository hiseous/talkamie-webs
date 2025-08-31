'use client';

import { ComponentPrimitiveProps, valueOf } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import Button from "../button/Button";
import HeaderVar2 from "../heading/HeadingVar2";
import { useEffect, useState } from "react";
import Checkbox from "../checkbox/Checkbox";
import SvgAsset from "../../assets/svg/SvgAsset";
import { initiateBackgroundCheckTriggerProps, useInitiateBackgroundCheckApi } from "../../utils/api/verification/initiate-background-check";
import InputTextLabel from "../input-text/InputTextLabel";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { fromUserName } from "../../utils/funcs/string/name";
import SelectCountryStateCity from "../input-select/SelectCountryStateCity";

type formProps = initiateBackgroundCheckTriggerProps['body'];
type states = {
    form?: formProps;
    consentChecked?: boolean;
    validated?: boolean;
}
type VerificationAddBackgroundCheckProps = ComponentPrimitiveProps & {
    onNext?: () => void;
};

const VerificationAddBackgroundCheck = (props: VerificationAddBackgroundCheckProps) => {
    const localUser = useLocalUser();
    const localUserNames = fromUserName(localUser?.name).names;
    const defaultForms: formProps = {
        firstName: localUserNames?.[0],
        lastName: localUserNames?.[1],
        middleName: localUserNames?.[2],
        // email: localUser?.email,
    };

    const checkApi = useInitiateBackgroundCheckApi({
        useToastSuccess: true,
    });
    const [states, setStates] = useState<states>({
        form: {
            ...defaultForms,
        },
    });

    const handles = {
        validateStates: (currStates: states) => {
            let validated = currStates.consentChecked ? true : false;
            if(validated){
                const workLocation = currStates.form?.workLocations?.[0];
                if(
                    !currStates.form?.firstName || !currStates.form.lastName
                    || !workLocation?.countryCode || !workLocation.stateCode
                ){
                    validated = false;
                }
            }

            return validated;
        },
        onFormChange: (name: keyof formProps, value: valueOf<formProps>) => {
            setStates(prev => {
                prev.form = {
                    ...prev.form,
                    [name]: value,
                };
                prev.validated = handles.validateStates(prev);

                return {...prev};
            });
        },
        onConsentChange: (checked?: boolean) => {
            setStates(prev => {
                prev.consentChecked = checked;
                prev.validated = handles.validateStates(prev);
                
                return {...prev};
            });
        },
        submit: () => {
            setStates(prev => {
                checkApi.trigger({
                    body: prev.form || {},
                });
                
                return {...prev};
            });
        },
    };

    useEffect(() => {
        handles.validateStates(states);
    }, []);
    useEffect(() => {
        if(checkApi.loading === false && checkApi.success){
            // localUser?.updateUser(checkApi.data);
            if(props.onNext) props.onNext();
        }
    }, [checkApi.loading]);
    
    return (
        <div
            className={`${props.className || ''} h-full flex flex-col justify-between`}
        >
            <div>
                <HeaderVar2
                    title={`Background Check`}
                    subtitle={`For the safety of our seniors, we conduct background checks via a third party software.`}
                    titleClassName="text-2xl"
                />
                <div className="mt-7">
                    <InputTextLabel
                        label="First Name"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            defaultValue: defaultForms.firstName,
                            placeholder: `What is your legal first name?`,
                            onChange: (value) => handles.onFormChange('firstName', value),
                        }}
                    />
                    <InputTextLabel
                        className="mt-5"
                        label="Last Name"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `What is your legal last name?`,
                            defaultValue: defaultForms.lastName,
                            onChange: (value) => handles.onFormChange('lastName', value),
                        }}
                    />
                    <InputTextLabel
                        className="mt-5"
                        label="Middle Name (optional)"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `What is your legal middle name?`,
                            defaultValue: defaultForms.middleName,
                            onChange: (value) => handles.onFormChange('middleName', value),
                        }}
                    />
                    {/* <InputTextLabel
                        className="mt-5"
                        label="Email Address"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `What is your email address?`,
                            defaultValue: defaultForms.email,
                            onChange: (value) => handles.onFormChange('email', value),
                        }}
                    /> */}
                    {/* <div className="mt-5">
                        <InputLabel>
                            Date of Birth
                        </InputLabel>
                        <InputDob
                            className={`${__classNames.inputVar1} mt-2 flex items-center justify-between  cursor-pointer`}
                            // defaultDob={props.defaultDob}
                            onChange={(dob) => {
                                handles.onFormChange('dob', dob);
                            }}
                        />
                    </div> */}
                    {/* <InputTextLabel
                        className="mt-5"
                        label="Social Security Number"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `What is your social security number?`,
                            onChange: (value) => handles.onFormChange('ssn', value),
                        }}
                    /> */}
                    <SelectCountryStateCity
                        className="mt-5"
                        country={{
                            label: `Work Location`
                        }}
                        onChange={(changeProps) => {
                            setStates(prev => {
                                prev.form = {
                                    ...prev.form,
                                    workLocations: [{
                                        countryCode: changeProps.country?.iso2,
                                        stateCode: changeProps.state?.code,
                                        city: changeProps.city?.name,
                                    }],
                                };
                                prev.validated = handles.validateStates(prev);

                                return {...prev};
                            });
                        }}
                    />
                    {/* <InputTextLabel
                        className="mt-5"
                        label="Phone Number"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `What is your telephone number?`,
                            onChange: (value) => handles.onFormChange('telephone', value),
                        }}
                    /> */}
                    <InputTextLabel
                        className="mt-5"
                        label="Zip Code"
                        inputProps={{
                            className: `${__classNames.inputVar1}`,
                            placeholder: `What is your zip code?`,
                            onChange: (value) => handles.onFormChange('zipCode', value),
                        }}
                    />
                </div>
            </div>
            <div className="mt-6 flex items-center">
                <Checkbox
                    onChange={handles.onConsentChange}
                    size={24}
                />
                <div className="pl-3">
                    I consent to a background check using my information
                </div>
            </div>
            <Button
                theme="red"
                className="mt-8 w-full !opacity-[1] flex items-center justify-center"
                loading={checkApi.loading}
                disabled={!states.validated}
                onClick={handles.submit}
            >
                <SvgAsset
                    name='Checkr'
                    // size={32}
                />
                <span className="pl-2">Start Background Check</span>
            </Button>
        </div>
    );
}

export default VerificationAddBackgroundCheck;