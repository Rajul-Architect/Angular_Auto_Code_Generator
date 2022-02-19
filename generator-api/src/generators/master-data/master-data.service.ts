import { Injectable } from '@nestjs/common';
import { MasterDataDto } from '../dto/master-data.dto';

@Injectable()
export class MasterDataService {
    getMasterData() {
        return new MasterDataDto(
            ['data-grid', 'date-picker'],
            ['test', 'lint', 'prettier'],
        );
    }
}
