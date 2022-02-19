import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../app-common.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urls.service;
  }

  getMasterData() {
    return this.http.get(this.url + 'master-data');
  }

  generateAndDownloadProject(type: string, data: Project) {
    return this.http.post(this.url + type, data);
  }
}
