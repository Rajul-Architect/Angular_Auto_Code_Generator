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

  generateAndGetZipUrl(type: string, data: Project): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.post(this.url + type, data).subscribe((data: any) => {
        window.location.href = `${this.url + type}?fileName=${data.fileName}`;
        resolve(true);
      });
    });
  }
}
