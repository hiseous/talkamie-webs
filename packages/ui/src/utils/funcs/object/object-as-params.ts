
// export const objectToQueryParams = (object?: string[][] | Record<string, string> | string | URLSearchParams) => {
//     return new URLSearchParams(object).toString();
// };

export const objectToQueryParams = (object?: string[][] | Record<string, string> | string | URLSearchParams) => {
    // If the object is undefined or falsy, return an empty string
    if (!object) return '';

    // Handle if it's a simple object or key-value pair
    if (Array.isArray(object)) {
        // If it's an array of tuples, filter out undefined values before creating URLSearchParams
        const filteredObject = object.filter(([, value]) => value !== undefined);
        return new URLSearchParams(filteredObject).toString();
    }

    if (typeof object === 'object' && !Array.isArray(object)) {
        // If it's a Record<string, string> object, filter out undefined values
        const filteredObject = Object.entries(object).filter(([, value]) => value !== undefined);
        return new URLSearchParams(filteredObject).toString();
    }

    if (object instanceof URLSearchParams) {
        // If it's already URLSearchParams, just return its string representation
        return object.toString();
    }

    // If it's a string or anything else, return it directly (this is unlikely based on your input types)
    return object ? String(object) : '';
};

export const objectToFormData = (obj?: Record<string, any>) => {
    const formData = new FormData();
    
    if(obj){
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            // If the value is an array, append each item with the same key
            if(Array.isArray(value)){
                value.forEach(item => formData.append(key, item));
            }
            else if(value !== undefined){
                formData.append(key, value);
            }
        });
    }
    
    return formData;
}  