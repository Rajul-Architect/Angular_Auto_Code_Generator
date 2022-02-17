import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GeneratorsModule } from './generators/generators.module';

@Module({
  imports: [GeneratorsModule, ConfigModule.forRoot()],
  controllers: [],
})
export class AppModule { }
