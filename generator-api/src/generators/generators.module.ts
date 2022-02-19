import { Module } from '@nestjs/common';
import { AngularController } from './angular/angular.controller';
import { AngularService } from './angular/angular.service';
import { ConfigModule } from '@nestjs/config';
import { MasterDataController } from './master-data/master-data.controller';
import { MasterDataService } from './master-data/master-data.service';
import { AppCommonModule } from '../app-common/app-common.module';

@Module({
  imports: [ConfigModule.forRoot(), AppCommonModule],
  controllers: [AngularController, MasterDataController],
  providers: [AngularService, MasterDataService],
})
export class GeneratorsModule {}
