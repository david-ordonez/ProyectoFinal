import fs from 'fs';

class FileManager {
    static async saveFile(fileName, content){
        await fs.promises.writeFile(fileName,content);
    }

    static async readFile(fileName){
        if(fs.existsSync(fileName)){
            const content = await fs.promises.readFile(fileName,'utf-8');
            if(content === ''){
                return [];
            }
            return JSON.parse(content);
        }
        return [];

    }
}

export default FileManager;