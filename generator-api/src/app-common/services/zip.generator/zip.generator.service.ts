import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as JSZip from 'jszip';

@Injectable()
export class ZipGeneratorService {
  addFilesFromDirectoryToZip(directoryPath: string, zip: any): void {
    const directoryContents = fs.readdirSync(directoryPath, {
      withFileTypes: true,
    });

    directoryContents.forEach(({ name }) => {
      const path = `${directoryPath}/${name}`;

      if (fs.statSync(path).isFile()) {
        zip.file(path, fs.readFileSync(path, 'utf-8'));
      }

      if (fs.statSync(path).isDirectory()) {
        this.addFilesFromDirectoryToZip(path, zip);
      }
    });
  }

  generateZip(directoryPath): Promise<any> {
    const file = 'project.zip';
    return new Promise<any>((resolve) => {
      const zip = new JSZip();
      zip.file(
        'standalone.txt',
        "I will exist inside of the zip archive, but I'm not a real file here on the server.",
      );
      this.addFilesFromDirectoryToZip(directoryPath, zip);
      zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
        fs.writeFileSync(file, content);
        resolve(file);
      });
    });
  }
}
