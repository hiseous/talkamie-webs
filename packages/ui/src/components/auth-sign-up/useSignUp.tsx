// 'use client';

// import { useEffect, useState } from "react";
// import { signUpForm, useSignUpApi } from "../../utils/api/auth/useSignUpApi";
// import { useLocalUser } from "../local-user-provider/useLocalUser";
// import CreateAccount from "./CreateAccount";
// import VerifyEmail from "./VerifyEmail";
// import SelectUserType from "./SelectUserType";
// import AddSpecialization from "./AddSpecialization";
// import WelcomeIntro from "./WelcomeIntro";
// import { useSearchParams } from "next/navigation";
// import AddYourInfo from "./AddYourInfo";

// export type signUpFormChangeProps = {
//     name: keyof signUpForm;
//     value?: string;
// }

// export const useSignUp = () => {
//     // const navigate = useNavigate();
//     const localUser = useLocalUser();
//     const api = useSignUpApi();
//     const searchParams = useSearchParams();
//     const defaultUserType = searchParams.get('type');
//     const [form, setForm] = useState<signUpForm>({
//         type: defaultUserType === 'volunteer' || defaultUserType === 'senior' ? defaultUserType : undefined,
//     });
//     // const [authResponse, setAuthResponse] = useState<authButtonResponse>({});
//     const [stepIndex, setStepIndex] = useState(0);

//     const handles = {
//         onChange: (changeProps: signUpFormChangeProps) => {
//             setForm({
//                 ...form,
//                 [changeProps.name]: changeProps.value,
//             });
//         },
//         submit: () => {
//             api.trigger({
//                 body: form,
//             });
//         },
//         onPrev: () => {
//             setStepIndex(
//                 stepIndex > 0 ? stepIndex - 1 : 0
//             );
//         },
//         onPrevToBase: () => {
//             setStepIndex(0);
//         },
//         onNext: (nextProps?: Partial<signUpForm>) => {
//             if(nextProps?.authProvider) form.authProvider = nextProps.authProvider;
//             if(nextProps?.type) form.type = nextProps.type;
//             setStepIndex(stepIndex + 1);
//         },
//         updateForm: (updateProps: Partial<signUpForm>) => {
//             setForm((prev) => ({
//                 ...prev,
//                 ...updateProps,
//             }));
//         },
//     };

//     const stepNodes = [
//         <CreateAccount
//             form={form}
//             onChange={handles.onChange}
//             updateForm={handles.updateForm}
//             onNext={handles.onNext}
//         />,
//         ...(
//             form.authProvider === 'apple' || form.authProvider === 'google' ? [
                
//             ] : [
//                 <VerifyEmail
//                     form={form}
//                     onPrev={handles.onPrev}
//                     onNext={handles.onNext}
//                 />
//             ]
//         ),
//         ...(
//             form.type ? [] : [
//                 <SelectUserType
//                     onPrev={handles.onPrevToBase}
//                     // onPrev={handles.onPrev}
//                     onNext={handles.onNext}
//                     updateForm={handles.updateForm}
//                     // updateForm={(updateProps) => {
//                     //     form.type = updateProps.type;
//                     // }}
//                 />
//             ]
//         ),
//         ...(
//             (localUser?.type === 'volunteer' || form?.type === 'volunteer') ? [
//                 <AddSpecialization
//                     // onPrev={handles.onPrev}
//                     onPrev={handles.onPrev}
//                     onNext={handles.onNext}
//                 />,
//                 <WelcomeIntro
//                     onPrev={handles.onPrev}
//                     onNext={handles.onNext}
//                 />,
//                 // <AddBackgroundCheck
//                 //     onPrev={handles.onPrev}
//                 //     onNext={handles.onNext}
//                 // />,
//             ] : []
//         ),
//         <AddYourInfo
//             type={form.type}
//             onPrev={handles.onPrev}
//             // onNext={handles.onNext}
//         />,
//         // <SelectGender
//         //     onPrev={handles.onPrev}
//         //     onNext={handles.onNext}
//         // />,
//         // ...(
//         //     (localUser?.type === 'volunteer' || form?.type === 'volunteer') ? [] : [
//         //         <SelectDob
//         //             onPrev={handles.onPrev}
//         //             onNext={handles.onNext}
//         //         />,
//         //     ]
//         // ),
//         // <SelectLocation
//         //     onPrev={handles.onPrev}
//         //     onNext={handles.onNext}
//         // />,
//         // bio,gender,interests,dob
//         // <SelectInterests
//         //     onPrev={handles.onPrev}
//         //     onNext={handles.onNext}
//         // />,
//         // <AddBioNLanguage
//         //     onPrev={handles.onPrev}
//         //     onNext={handles.onNext}
//         // />,
//         // <AddPicture
//         //     onPrev={handles.onPrev}
//         //     onNext={handles.onNext}
//         // />,
//         // <AddVideo
//         //     onPrev={handles.onPrev}
//         //     // onNext={handles.onNext}
//         // />,
//     ];

//     useEffect(() => {
//         if(api.loading === false && api.success){
//             const user = api.data?.user;
//             localUser?.setUser(user);
//             localUser?.setLocalStorageUser({
//                 id: user?.id,
//                 accessToken: api.data?.tokens?.access,
//             })
//         }
//     }, [api.loading]);
    
//     return {
//         ...handles,
//         loading: api.loading,
//         form,
//         stepIndex,
//         stepNode: stepNodes[stepIndex],
//         // setAuthResponse,
//     };
// };