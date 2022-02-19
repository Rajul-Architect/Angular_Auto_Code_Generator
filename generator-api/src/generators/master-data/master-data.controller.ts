import { Controller, Get } from '@nestjs/common';
import { MasterDataService } from './master-data.service';

@Controller('master-data')
export class MasterDataController {
  constructor(private service: MasterDataService) {}

  @Get()
  getData() {
    return this.service.getMasterData();
  }
}
