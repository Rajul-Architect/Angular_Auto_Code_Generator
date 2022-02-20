import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService, AppConstantsHelper, MasterData, Project } from 'src/app/app-common/app-common.module';

@Component({
  selector: 'app-project-generation',
  templateUrl: './project-generation.component.html',
  styleUrls: ['./project-generation.component.scss']
})
export class ProjectGenerationComponent implements OnInit {
  public model: Project;
  public masterData: MasterData;
  public isGenerating: boolean;
  constructor(
    private service: ApiService,
    private toastrService: ToastrService) {
    this.model = new Project('', '', '', '');
    this.masterData = new MasterData([], []);
    this.isGenerating = false;
  }

  ngOnInit(): void {
    this.service.getMasterData().subscribe((data: any) => {
      this.masterData = data;
    });
  }

  generateProject(): void {
    this.isGenerating = true;
    this.service.generateAndGetZipUrl(AppConstantsHelper.types.angular, this.model).then(done => {
      this.isGenerating = false;
      this.toastrService.success('Project Generated!!');
    })
  }

}
