
export const fromFileName = (fileName: string) => {
    // Extract the file extension
    const extensionMatch = fileName.match(/\.[^/.]+$/);
    const extension = extensionMatch ? extensionMatch[0].toLowerCase().replace('.', '') : '';
  
    // Remove file extension from the fileName
    let nameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
  
    // Replace invalid characters with spaces (so we can later capitalize properly)
    let camelCaseName = nameWithoutExtension.replace(/[^a-zA-Z0-9]/g, ' ');
  
    // Convert to camelCase: first word lowercase, rest capitalized
    camelCaseName = camelCaseName
      .split(' ') // Split by spaces
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase(); // First word lowercase
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize subsequent words
      })
      .join('');
  
    // Ensure the variable doesn't start with a number
    if (/^[0-9]/.test(camelCaseName)) {
      camelCaseName = "_" + camelCaseName; // Add an underscore at the start
    }
  
    // Append the file extension in camel-case format (e.g., Png, Jpg)
    const formattedExtension = extension.charAt(0).toUpperCase() + extension.slice(1);
    
    return {
      variableName: camelCaseName + formattedExtension,
      extension,
    };
}
  