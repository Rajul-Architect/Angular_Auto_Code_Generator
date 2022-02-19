import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GeneratorsModule } from './generators/generators.module';
import { AppCommonModule } from './app-common/app-common.module';

@Module({
  imports: [GeneratorsModule, ConfigModule.forRoot(), AppCommonModule],
  controllers: [],
})
export class AppModule {}
