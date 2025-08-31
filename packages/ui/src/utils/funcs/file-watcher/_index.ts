import { watchAssets } from "./watcher";

const watchAllAssets = () => {
    watchAssets({
        dirPath: `./src/assets/images/items`,
        importFilePath: `./src/assets/images/_index.ts`,
        preDir: `./items`,
        exportVarName: `__imageAssets`,
        exculdeExtensions: ['crdownload'], //just in case the file is being downloaded, esp on Chrome;
    });
};

watchAllAssets();