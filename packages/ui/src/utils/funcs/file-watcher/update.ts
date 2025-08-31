import fs from 'fs';
import path from 'path';
import { fromFileName } from '../string/filename';

type updateImportFileProps = {
    filePath: string;
    importFilePath: string;
    exportVariable: string;
    preDir?: string;
    exculdeExtensions?: string[];
}
export const updateImportFile = (props: updateImportFileProps) => {
    const filePath = props.filePath;
    const importFilePath = props.importFilePath;

    const fileName = path.basename(filePath);
    // const fileNameWithoutExt = fileName.split('.').slice(0, -1).join('.');
    // const imageName = fileName.replace(/\..+$/, ''); //strip extension
    const fileNameProps = fromFileName(fileName);
    if(!props.exculdeExtensions?.includes(fileNameProps.extension)){
        // console.log(props.exculdeExtensions, fileNameProps.extension)
        const imageName = fileNameProps.variableName;
        const fileNameWithoutExt = imageName;
        const filePathInCode = `${props.preDir ? `${props.preDir}/` : ''}${fileName}`;

        //read the current content of the import file
        let importFileContent = '';
        if (fs.existsSync(importFilePath)) {
            importFileContent = fs.readFileSync(importFilePath, 'utf8');
        }

        //check if the image is already in the file
        if (!importFileContent.includes(imageName)) {
            const importStatement = `import ${fileNameWithoutExt} from '${filePathInCode}';\n`;

            //find the position where the images object starts (or where the imports end)
            const imagesObjectStartIndex = importFileContent.indexOf(`\nexport const ${props.exportVariable} = {`);

            if (imagesObjectStartIndex !== -1) {
                //split the content into the part before the images object and after
                const beforeImagesObject = importFileContent.slice(0, imagesObjectStartIndex);
                const afterImagesObject = importFileContent.slice(imagesObjectStartIndex);

                //add the import statement just before the images object
                const updatedContent = beforeImagesObject + importStatement + afterImagesObject;

                //insert the new key-value pair for the image in the images object
                const closingBracketIndex = updatedContent.lastIndexOf('};');
                if (closingBracketIndex !== -1) {
                    const finalContent = (
                        updatedContent.slice(0, closingBracketIndex) +
                        `    ${imageName},\n` +
                        // `  ${imageName}: ${imageName},\n` +
                        updatedContent.slice(closingBracketIndex)
                    );

                    //write the updated content back to the import file
                    fs.writeFileSync(importFilePath, finalContent, 'utf8');
                }
            } else {
                //if the file doesn't have the correct structure, initialize it
                const newContent = `${importStatement}\nexport const ${props.exportVariable} = {\n    ${imageName},\n};\n`;
                fs.writeFileSync(importFilePath, newContent, 'utf8');
            }
        }
        console.log(`File added: ${filePath};`);
    }
}
