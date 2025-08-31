// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import Icon from "../icon/Icon";
// import { useLocalUser } from "../local-user-provider/useLocalUser";
// import UserCardVar1 from "../user-cards/UserCardVar1";
// import { useUserRequestCards } from "./useUserRequestCards";

// type UserRequestCardsProps = ComponentPrimitiveProps & {
    
// };

// const UserRequestCards = (props: UserRequestCardsProps) => {
//     const localUser = useLocalUser();
//     const hook = useUserRequestCards();
    
//     return (
//         <div
//             className={`${props.className || ''}`}
//         >
//             <div className="flex items-center text-blackVar5 font-medium">
//                 <div className="pr-2">
//                     Pending request <span className="text-redVar1 text-xsm">{localUser?.totalPendingRequests ? `(${localUser.totalPendingRequests})` : ``}</span>
//                 </div>
//                 <Icon iconName="ChevronRight" size={12} />
//             </div>
//             {
//                 hook.items?.length ?
//                 <div className="mt-5 flex items-stretch overflow-x-auto scrollbar-hidden md:!scrollbar-visible [&>*]:shrink-0">
//                     {
//                         hook.items?.map((item, i) => {
//                             return (
//                                 <UserCardVar1
//                                     key={`${i}_${item.id}`}
//                                     user={item}
//                                     className={`${i > 0 ? 'ml-7' : ''} w-[76%] h-[320px]`}
//                                     showViewProfileTag
//                                 />
//                             )
//                         })
//                     }
//                 </div> :
//                 <div className="px-4 py-6 text-center">
//                     no requests yet
//                 </div>
//             }
//         </div>
//     );
// }

// export default UserRequestCards;