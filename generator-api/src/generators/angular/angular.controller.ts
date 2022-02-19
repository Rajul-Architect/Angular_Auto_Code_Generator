import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { ZipGeneratorService } from 'src/app-common/app-common.module';
import { ProjectDetailsDTO } from '../dto/project-details.dto';
import { AngularService } from './angular.service';

@Controller('angular')
export class AngularController {
    constructor(
        private service: AngularService,
        private config: ConfigService,
        private zipService: ZipGeneratorService,
    ) { }

    @Post()
    async create(@Body() body: ProjectDetailsDTO) {
        const isCreated: boolean = await this.service.createProject(body);
        //const path: string = this.config.get<string>('PROJECT_LOCATION') + '/' + body.projectName;
        return { isCreated };
        // if (isCreated) {
        //     //const file = createReadStream('project.zip');
        //     //file.pipe(response);
        //     //const ouput = await this.zipService.generateZip(path);
        //     return true;
        // } else {
        //     return isCreated;
        // }
    }
}
