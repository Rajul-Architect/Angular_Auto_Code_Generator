import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectGenerationComponent } from './project-generation/project-generation.component';
import { AutoGeneratorRoutingModule } from './auto-generator-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectGenerationComponent],
  imports: [
    CommonModule,
    FormsModule,
    AutoGeneratorRoutingModule
  ]
})
export class AutoGeneratorModule { }
