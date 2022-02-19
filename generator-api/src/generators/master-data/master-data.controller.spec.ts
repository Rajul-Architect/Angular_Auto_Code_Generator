import { Test, TestingModule } from '@nestjs/testing';
import { MasterDataDto } from '../dto/master-data.dto';
import { MasterDataController } from './master-data.controller';
import { MasterDataService } from './master-data.service';

describe('MasterDataController', () => {
  let controller: MasterDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterDataController],
      providers: [MasterDataService]
    }).compile();

    controller = module.get<MasterDataController>(MasterDataController);
  });

  it('should return master data', (done) => {
    const data = new MasterDataDto(
      ['data-grid', 'date-picker'],
      ['test', 'lint', 'prettier'],
    );
    const response = controller.getData();
    expect(response).toEqual(data);
    done()
  });
});
