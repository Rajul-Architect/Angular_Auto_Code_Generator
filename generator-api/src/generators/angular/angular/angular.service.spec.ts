import { Test, TestingModule } from '@nestjs/testing';
import { AngularService } from './angular.service';
import { ProjectDetailsDTO } from '../../dto/project-details.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AngularService', () => {
  let service: AngularService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AngularService, ConfigService],
      imports: [ConfigModule]
    }).compile();

    service = module.get<AngularService>(AngularService);
  });

  it('should return right command', (done) => {
    const withoutPreAndCompoCommand: string = service.createCommand(new ProjectDetailsDTO([], [], 'sample', 'sample'));
    const withoutCompoCommand: string = service.createCommand(new ProjectDetailsDTO(['test', 'lint'], [], 'sample', 'sample'));
    const fullCommand: string = service.createCommand(new ProjectDetailsDTO(['test', 'lint'], ['data-grid', 'datepicker'], 'sample', 'sample'));
    expect(withoutPreAndCompoCommand).toBe('schematics .:base-generator --name=sample --applicationName=sample --debug=false ');
    expect(withoutCompoCommand).toBe('schematics .:base-generator --name=sample --applicationName=sample --debug=false --precommit=test,lint ');
    expect(fullCommand).toBe('schematics .:base-generator --name=sample --applicationName=sample --debug=false --precommit=test,lint --components=data-grid,datepicker ');
    done();
  });
});
