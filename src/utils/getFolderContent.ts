import fs from 'fs';
import path from 'path';
export default (folderPath: string) => {
    const files = fs.readdirSync(folderPath);

    files.sort((a, b) => a.localeCompare(b));

    return files.map(file => {
        const filePath = path.join(folderPath, file);

        return {
            name: file,
            isDirectory: fs.statSync(filePath).isDirectory()
        };
    });
}