import { Component, OnInit } from '@angular/core';
import { ApiService, AppConstantsHelper, MasterData, Project } from 'src/app/app-common/app-common.module';

@Component({
  selector: 'app-project-generation',
  templateUrl: './project-generation.component.html',
  styleUrls: ['./project-generation.component.scss']
})
export class ProjectGenerationComponent implements OnInit {
  public model: Project;
  public masterData: MasterData;
  constructor(private service: ApiService) {
    this.model = new Project('', '', '', '');
    this.masterData = new MasterData([], []);
  }

  ngOnInit(): void {
    this.service.getMasterData().subscribe((data: any) => {
      this.masterData = data;
    });
  }

  generateProject(): void {
    this.service.generateAndDownloadProject(AppConstantsHelper.types.angular, this.model).subscribe((data: any) => {
      const a = document.createElement('a');
      const myBufferData = new Uint8Array(data);
      const blob = new Blob([myBufferData], { type: 'application/zip' });
      a.href = window.URL.createObjectURL(blob);
      a.download = 'project.zip';
      a.click();
    })
  }

}
