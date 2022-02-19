import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';
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
        const path: string = this.config.get<string>('PROJECT_LOCATION') + '/' + body.projectName;
        if (isCreated) {
            const fileName: string = `project_${new Date().getTime()}.zip`;
            await this.zipService.generateZip(path, fileName);
            this.zipService.removeDirectory(path);
            return { fileName };
        } else {
            throw 'Not Created';
        }
    }

    @Get()
    downlodFile(@Query() query: any, @Res() response: any) {
        const file = createReadStream(query.fileName);
        response.setHeader('Content-Type', 'application/octet-stream');
        response.setHeader(
            'Content-Disposition',
            'attachment; filename="project.zip"',
        );
        file.pipe(response);
    }
}
