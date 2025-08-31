// import ImageAsset, { imageAssetName } from "../../../assets/images/ImageAsset";

// type interests = {
//     [interest: string]: imageAssetName;
// }
// const __interests: interests = {
//     dancing: 'emojiGirlDancing',
//     shopping: 'emojiShoppingBag',
//     artwork: 'emojiFramedPicture',
//     music: 'emojiMusic',
//     photography: 'emojiCamera',
//     swimming: 'emojiCamera',
//     'being productive': 'emojiBulb',
//     skating: 'emojiBulb',
//     cycling: 'emojiMusic',
//     basketball: 'emojiCamera',
//     game: 'emojiCamera',
//     never: 'emojiBeerCup',
//     sometimes: 'emojiCigarette',
// };

// export const getInterestIcon = (interest?: string, className?: string) => {
//     let imageName: imageAssetName = 'emojiBulb';
//     const lowerInterest = interest?.toLowerCase();

//     if(lowerInterest && lowerInterest in __interests){
//         imageName = __interests[lowerInterest];
//     }

//     const node = <>
//         <ImageAsset
//             name={imageName}
//             className={className}
//         />
//     </>;

//     return {
//         node,
//     };
// };