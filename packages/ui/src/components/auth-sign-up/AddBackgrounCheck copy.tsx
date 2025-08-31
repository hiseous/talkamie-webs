// 'use client';

// import { ComponentPrimitiveProps, valueOf } from "../../utils/types/global.types";
// import { __classNames } from "../../utils/constants/classNames";
// import Button from "../button/Button";
// import HeaderVar2 from "../heading/HeadingVar2";
// import AuthBackButton from "./AuthBackButton";
// import { useEffect, useState } from "react";
// import Icon from "../icon/Icon";
// import InputDob from "../input-text/InputDob";
// import InputLabel from "../input-label/InputLabel";
// import { backgroundCheckForm, useBackgroundCheckApi } from "../../utils/api/user/useBackgroundCheckApi";
// import InputText from "../input-text/InputText";
// import Checkbox from "../checkbox/Checkbox";
// import SvgAsset from "../../assets/svg/SvgAsset";

// type changeProps = {
//     value?: valueOf<backgroundCheckForm>;
//     name: keyof backgroundCheckForm;
// }
// type AddBackgroundCheckProps = ComponentPrimitiveProps & {
//     onPrev?: () => void;
//     onNext?: () => void;
// };

// const AddBackgroundCheck = (props: AddBackgroundCheckProps) => {
//     const checkApi = useBackgroundCheckApi();
//     const [form, setForm] = useState<backgroundCheckForm>({});
//     const [links, setLinks] = useState<string[]>(['']);
//     const [consentChecked, setConsentChecked] = useState(false);

//     const handles = {
//         onChange: (changeProps: changeProps) => {
//             setForm({
//                 ...form,
//                 [changeProps.name]: changeProps.value,
//             });
//         },
//         addLink: () => {
//             setLinks(prev => ([
//                 ...prev,
//                 '',
//             ]));
//         },
//         updateLink: (i: number, link?: string) => {
//             const newLinks = [...links];
//             if(i in newLinks){
//                 newLinks[i] = link ?? '';
//             }
//         },
//         update: () => {
//             if(Object.keys(form).length){
//                 checkApi.trigger({
//                     body: {
//                         ...form,
//                     },
//                 });
//             }
//             // else {
//             //     if(props.onNext) props.onNext();
//             // }
//         },
//     };

//     useEffect(() => {
//         if(checkApi.loading === false && checkApi.success){
//             // localUser?.updateUser(checkApi.data);
//             if(props.onNext) props.onNext();
//         }
//     }, [checkApi.loading]);
    
//     return (
//         <div
//             className={`${props.className || ''} h-full flex flex-col justify-between`}
//         >
//             <div>
//                 <AuthBackButton onClick={props.onPrev} className="mb-8" />
//                 <HeaderVar2
//                     title={`Background Check`}
//                     subtitle={`For the safety of our seniors, we conduct background checks via a third party software.`}
//                     titleClassName="text-2xl"
//                 />
//                 <div className="mt-7">
//                     <div>
//                         <InputLabel>
//                             Legal Full Name
//                         </InputLabel>
//                         <InputText
//                             className={`mt-2 ${__classNames.inputVar1}`}
//                             placeholder="What is your legal full name?"
//                             // onChange={(value) => {
//                             //     handles.updateLink(i, value);
//                             // }}
//                         />
//                     </div>
//                     <div className="mt-5">
//                         <InputLabel>
//                             Date of Birth
//                         </InputLabel>
//                         <InputDob
//                             className={`${__classNames.inputVar1} mt-2 flex items-center justify-between  cursor-pointer`}
//                             // defaultDob={props.defaultDob}
//                             onChange={(dob) => {
//                                 handles.onChange({
//                                     name: 'dob',
//                                     value: dob,
//                                 });
//                             }}
//                         />
//                     </div>
//                     {/* <InputTextLabel
//                         className="mt-5"
//                         label="State of Birth"
//                         inputProps={{
//                             className: `${__classNames.inputVar1}`,
//                             placeholder: `Enter your state of birth`,
//                             onChange: (value) => {
//                                 handles.onChange({
//                                     name: 'state',
//                                     value,
//                                 });
//                             },
//                         }}
//                     /> */}
//                     <div className="mt-5">
//                         <div className="flex items-center justify-between">
//                             <div className="font-medium">
//                                 Online Presence
//                                 <span className="font-normal text-grayVar5">{` (Facebook, LinkedIn, etc)`}</span>
//                             </div>
//                             <div onClick={handles.addLink} className="cursor-pointer flex items-center fill-redVar1 text-redVar1 text-sm">
//                                 <Icon iconName="PlusLg" size={24} />
//                                 <div className="pl-2">Add Link</div>
//                             </div>
//                         </div>
//                         <div className="mt-4">
//                             {
//                                 links?.map((link, i) => {
//                                     return (
//                                         <InputText
//                                             key={i}
//                                             className={`${i > 0 ? 'mt-2' : ''} ${__classNames.inputVar1}`}
//                                             placeholder="www.social.com/amie"
//                                             defaultValue={link}
//                                             onChange={(value) => {
//                                                 handles.updateLink(i, value);
//                                             }}
//                                         />
//                                     )
//                                 })
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-6 flex items-center">
//                 <Checkbox
//                     onChange={(checked) => setConsentChecked(checked ?? false)}
//                     size={24}
//                 />
//                 <div className="pl-3">
//                     I consent to a background check using my information
//                 </div>
//             </div>
//             <Button
//                 theme="red"
//                 className="mt-8 w-full !opacity-[1] flex items-center justify-center"
//                 loading={checkApi.loading}
//                 disabled={!consentChecked}
//                 onClick={handles.update}
//             >
//                 <SvgAsset
//                     name='Checkr'
//                     // size={32}
//                 />
//                 <span className="pl-2">Proceed to Checkr</span>
//             </Button>
//         </div>
//     );
// }

// export default AddBackgroundCheck;