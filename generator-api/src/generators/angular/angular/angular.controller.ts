import { Body, Controller, Post } from '@nestjs/common';
import { ProjectDetailsDTO } from '../../dto/project-details.dto';
import { AngularService } from './angular.service';

@Controller('angular')
export class AngularController {

    constructor(private service: AngularService) { }

    @Post()
    async create(@Body() body: ProjectDetailsDTO) {
        console.log(body);
        return await this.service.createProject(body);
    }

}
