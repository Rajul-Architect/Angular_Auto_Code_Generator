import { Module } from '@nestjs/common';
import { AngularController } from './angular/angular/angular.controller';
import { AngularService } from './angular/angular/angular.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AngularController],
  providers: [AngularService],
})
export class GeneratorsModule { }
