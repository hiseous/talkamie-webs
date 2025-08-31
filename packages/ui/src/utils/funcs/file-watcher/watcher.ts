
import { watch } from 'chokidar';
import { removeFromImportFile } from './remove';
import { updateImportFile } from './update';

type watchAssetsProps = {
    dirPath: string; //where to watch and get the files;
    preDir: string; //items dir;
    importFilePath: string; //the file with the imported files;
    exportVarName: string;
    exculdeExtensions?: string[];
}
export const watchAssets = (props: watchAssetsProps) => {
    const watcher = watch(props.dirPath, {
        ignored: /(^|[/\\])\../, // ignore dotfiles
        persistent: true,
    });
    
    //event listeners
    watcher.on('add', (filePath: string) => {
        updateImportFile({
            filePath,
            importFilePath: props.importFilePath,
            exportVariable: props.exportVarName,
            preDir: props.preDir,
            exculdeExtensions: props.exculdeExtensions,
        });
    })
    .on('unlink', (filePath: string) => {
        removeFromImportFile({
            filePath,
            importFilePath: props.importFilePath,
            exculdeExtensions: props.exculdeExtensions,
            preDir: props.preDir,
        });
    });
    
    console.log(`Watching for file changes in: ${props.dirPath}`);
};