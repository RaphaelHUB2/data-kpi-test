import { ApiProperty } from '@nestjs/swagger';

import { KpiEnum } from '@app/enums/kpi.enum';


export class UpdateKpiInfoDto {

  @ApiProperty({
    description: `Type of the KPI`,
    enum: KpiEnum,
    example: 'success_rate__transfer_orange_ci',
  })
  type?: KpiEnum;

  @ApiProperty({
    description: `Title`,
    example: 'Success Rate - PAY-OUT Orange CI',
  })
  title?: string;

  @ApiProperty({
    description: `Description`,
    example: 'This is the success rate for PAY-OUT using the Orange CI provider',
  })
  description?: string;
}
