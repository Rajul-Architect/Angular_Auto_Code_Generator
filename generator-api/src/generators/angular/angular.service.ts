import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProjectDetailsDTO } from 'src/generators/dto/project-details.dto';

@Injectable()
export class AngularService {

    constructor(private config: ConfigService) { }

    async createProject(body: ProjectDetailsDTO): Promise<boolean> {
        return new Promise((resolve: any) => {
            const exec = require('child_process').exec;
            const cmd = this.createCommand(body);
            exec(cmd, {
                cwd: this.config.get<string>('PROJECT_LOCATION')
            }, (error, stdout, stderr) => {
                if (error) {
                    resolve(false);
                }
                console.log(stdout);
                resolve(true);
            });
        });
    }

    createCommand(body: ProjectDetailsDTO) {
        let baseCmd = "schematics .:base-generator --name={projectName} --applicationName={appName} --debug=false ";
        baseCmd = baseCmd.replace('{projectName}', body.projectName);
        baseCmd = baseCmd.replace('{appName}', body.applicationName);
        if (body.hooks.length > 0) {
            baseCmd += `--precommit=${body.hooks} `;
        }
        if (body.components.length > 0) {
            baseCmd += `--components=${body.components} `;
        }
        return baseCmd;
    }
}   
