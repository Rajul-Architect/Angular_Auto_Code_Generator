import { Injectable } from '@nestjs/common';
import { zip } from 'zip-a-folder';
import * as fs from 'fs';

@Injectable()
export class ZipGeneratorService {

    async generateZip(directoryPath, zipFileName): Promise<any> {
        await zip(directoryPath, zipFileName);
    }

    removeDirectory(path): void {
        fs.rmdirSync(path, { recursive: true });
    }
}
