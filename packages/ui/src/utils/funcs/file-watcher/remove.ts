import fs from 'fs';
import path from 'path';
import { fromFileName } from '../string/filename';

type removeFromImportFileProps = {
    filePath: string;
    importFilePath: string;
    exculdeExtensions?: string[];
    preDir: string;
}
export const removeFromImportFile = (props: removeFromImportFileProps) => {
    const filePath = props.filePath;
    const importFilePath = props.importFilePath;

    const fileName = path.basename(filePath);
    // const imageName = fileName.replace(/\..+$/, '');
    const fileNameProps = fromFileName(fileName);
    if(!props.exculdeExtensions?.includes(fileNameProps.extension)){
        const imageName = fileNameProps.variableName;
        const fileNameWithoutExt = imageName;
        const filePathInCode = `${props.preDir ? `${props.preDir}/` : ''}${fileName}`;
        const importStatement = `import ${fileNameWithoutExt} from '${filePathInCode}';\n`;
        const exportKeyPair = `    ${imageName},\n`;

        //read the current content of the import file
        const importFileContent = fs.readFileSync(importFilePath, 'utf8');

        //remove import statement;
        let updatedContent = importFileContent.replace(
            new RegExp(importStatement, 'g'),
            ''
        );
        //remove the image key-value pair from the images object
        updatedContent = updatedContent.replace(
            new RegExp(exportKeyPair, 'g'),
            ''
        );

        //write the updated content back to the import file
        fs.writeFileSync(importFilePath, updatedContent, 'utf8');
        console.log(`File removed: ${filePath}`);
    }
}