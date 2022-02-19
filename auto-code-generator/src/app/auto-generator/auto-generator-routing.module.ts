import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectGenerationComponent } from './project-generation/project-generation.component';

const routes: Routes = [{
    path: '',
    component: ProjectGenerationComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutoGeneratorRoutingModule { }
