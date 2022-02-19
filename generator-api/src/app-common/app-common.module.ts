import { Module } from '@nestjs/common';
import { ZipGeneratorService } from './services/zip.generator/zip.generator.service';
export { ZipGeneratorService } from './services/zip.generator/zip.generator.service';

@Module({
  providers: [ZipGeneratorService],
  exports: [ZipGeneratorService],
})
export class AppCommonModule {}
