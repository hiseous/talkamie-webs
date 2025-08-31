import { addTraillingSlash, removeTraillingSlash } from "./string";

const splitStringNRemoveEmptyElements = (string: string, delim: string) => {
    const elements: string[] = [];

    string.split(delim).map(element => {
        if(element) elements.push(element);
    })

    return elements;
}
// const normalizeSegment = (segment: string) => {
//   return segment.replace(/s$/, ''); // crude singularizer
// };

// export const whichIsTheClosestBasePath = (pathName: string = '', basePathNames: string[] = []): string => {
//     let closestPath = '';

//     const targetPath = removeTraillingSlash(pathName);
//     const targetPathArr = splitStringNRemoveEmptyElements(targetPath, '/');

//     for(let i = 0; i < basePathNames.length; i++){
//         let path = '/';

//         const thisBasePath = removeTraillingSlash(basePathNames[i]);
//         const thisBasePathArr = splitStringNRemoveEmptyElements(thisBasePath, '/');
//         if(thisBasePathArr.length <= targetPathArr.length){
//             // console.log(thisBasePathArr.length, targetPathArr.length, thisBasePathArr, targetPathArr)
//             if(thisBasePathArr.length){
//                 for(let j = 0; j < thisBasePathArr.length; j++){
//                     const thisBasePathElement = thisBasePathArr[j];
//                     const targetPathElement = targetPathArr[j];
//                     if(thisBasePathElement === targetPathElement){
//                         path += thisBasePathElement + '/';

//                         if(j === thisBasePathArr.length - 1){
//                             //the last element;
//                             closestPath = addTraillingSlash(path);
//                         }
//                         else {
//                             // path = '/';
//                         }
//                     }
//                 }
//             }
//             else if(targetPathArr.length === 0){
//                 closestPath = '/';
//             }
//         }
//     }

//     // console.log(closestPath, targetPathArr)

//     return closestPath;
// }
const normalizeSegment = (segment?: string) => segment?.replace(/s$/, ''); //to check against similar paths, regardless of plurality, like /users == /user;

export const whichIsTheClosestBasePath = (pathName: string = '', basePathNames: string[] = []): string => {
    let closestPath = '';
    let maxMatchedSegments = -1;

    const targetPath = removeTraillingSlash(pathName);
    const targetPathArr = splitStringNRemoveEmptyElements(targetPath, '/');

    for (let i = 0; i < basePathNames.length; i++) {
        let path = '/';
        let matchCount = 0;

        const thisBasePath = removeTraillingSlash(basePathNames[i]);
        const thisBasePathArr = splitStringNRemoveEmptyElements(thisBasePath, '/');

        if (thisBasePathArr.length <= targetPathArr.length) {
            for (let j = 0; j < thisBasePathArr.length; j++) {
                const baseSegment = normalizeSegment(thisBasePathArr[j]);
                const targetSegment = normalizeSegment(targetPathArr[j]);

                if (baseSegment === targetSegment) {
                    path += thisBasePathArr[j] + '/';
                    matchCount++;
                } else {
                    break;
                }
            }

            if (matchCount > maxMatchedSegments) {
                maxMatchedSegments = matchCount;
                closestPath = addTraillingSlash(path);
            }
        }
    }

    return closestPath;
};


export const updateSearchParam = (param: string, value?: string) => {
    const url = new URL(window.location.href);  // Create a URL object from the current location
    
    if (value) {
        // If the value is not empty, update the search parameter
        url.searchParams.set(param, value);
    } else {
        // If the value is empty, remove the parameter
        url.searchParams.delete(param);
    }

    // Log the updated URL
    // console.log(url.toString());  // This will log the full updated URL

    // Update the browser's URL without reloading the page
    // window.history.replaceState({}, '', url);
    return {
        updatedUrl: url.toString(),
    }
}
