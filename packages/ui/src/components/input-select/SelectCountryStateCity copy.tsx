// 'use client';

// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { useState } from "react";
// import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
// import { City, Country, State } from "react-country-state-city/dist/esm/types";
// import "react-country-state-city/dist/react-country-state-city.css";
// import { __classNames } from "../../utils/constants/classNames";

// type changeProps = {
//     country?: {
//         iso2?: string;
//         name?: string;
//     };
//     state?: {
//         name?: string;
//         code?: string;
//     };
//     city?: {
//         name?: string;
//     };
// }
// type states = {
//     data?: {
//         country?: Country;
//         state?: State;
//         city?: City;
//     };
// }
// type SelectCountryStateCityProps = ComponentPrimitiveProps & {
//     onChange?: (changeProps: changeProps) => void;
// };

// const SelectCountryStateCity = (props: SelectCountryStateCityProps) => {
//     const [states, setStates] = useState<states>({});

//     const handles = {
//         onStatesChange: (currentStates: states) => {
//             if(props.onChange){
//                 const changeProps: changeProps = {};
//                 if(currentStates.data?.country){
//                     changeProps.country = {
//                         name: currentStates.data.country.name,
//                         iso2: currentStates.data.country.iso2,
//                     };
//                 }
//                 if(currentStates.data?.state){
//                     changeProps.state = {
//                         name: currentStates.data.state.name,
//                         code: currentStates.data.state.state_code,
//                     };
//                 }
//                 if(currentStates.data?.city){
//                     changeProps.city = {
//                         name: currentStates.data.city.name,
//                     };
//                 }

//                 props.onChange(changeProps);
//             }
//         },
//         onCountryChange: (country?: Country | React.ChangeEvent<HTMLInputElement>) => {
//             setStates(prev => {
//                 if(country && 'name' in country){
//                     prev.data = {
//                         ...prev.data,
//                         country,
//                     };
//                 }

//                 return {...prev};
//             });
//         },
//         onStateChange: (state?: State | React.ChangeEvent<HTMLInputElement>) => {
//             setStates(prev => {
//                 if(state && 'name' in state){
//                     prev.data = {
//                         ...prev.data,
//                         state,
//                     };
//                 }

//                 return {...prev};
//             });
//         },
//         onCityChange: (city?: City | React.ChangeEvent<HTMLInputElement>) => {
//             setStates(prev => {
//                 if(city && 'name' in city){
//                     prev.data = {
//                         ...prev.data,
//                         city,
//                     };
//                 }

//                 return {...prev};
//             });
//         },
//     };
    
//     return (
//         <div
//             className={`${props.className || ''}`}
//         >
//             <CountrySelect
//                 containerClassName={`${__classNames.inputVar1}`}
//                 inputClassName=""
//                 onChange={handles.onCountryChange}
//                 // onTextChange={(text) => console.log(text)}
//                 placeHolder="Select Country"
//             />
//             {
//                 states.data?.country?.id ?
//                 <>
//                     <StateSelect
//                         countryid={states.data?.country?.id}
//                         containerClassName="form-group"
//                         inputClassName=""
//                         onChange={handles.onStateChange}
//                         // onTextChange={(_txt) => console.log(_txt)}
//                         // defaultValue={currentState}
//                         placeHolder="Select State"
//                     />
//                     {
//                         states.data?.state?.id ?
//                         <>
//                             <CitySelect
//                                 countryid={states.data?.country?.id}
//                                 stateid={states.data.state.id}
//                                 onChange={handles.onCityChange}
//                                 // onTextChange={(_txt) => console.log(_txt)}
//                                 // defaultValue={currentCity}
//                                 placeHolder="Select City"
//                             />
//                         </> : undefined
//                     }
//                 </> : undefined
//             }
//         </div>
//     );
// }

// export default SelectCountryStateCity;