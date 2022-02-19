import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
export { Project } from './models/project';
export { MasterData } from './models/master-data';
export { ApiService } from './services/api.service';
export { AppConstantsHelper } from './helpers/app-constants.helper';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class AppCommonModule { }
