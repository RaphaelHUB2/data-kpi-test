import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';

import { KpiEnum } from '@app/enums/kpi.enum';


export class KpiDataDto {
  @ApiProperty({
    description: `Start date for which KPIS are computed`,
    example: `2018-02-23T09:28:47.081Z`,
    required: true,
  })
  @IsISO8601()
  startDate: string;

  @ApiProperty({
    description: `End date for which KPIS are computed`,
    example: `2023-02-23T09:28:47.081Z`,
    required: true,
  })
  @IsISO8601()
  endDate: string;

  @ApiProperty({
    description: `Mean values of the different KPIS for the given dates`,
    example: {
      "success_rate__transfer_wave_ci": 91.25,
      "success_rate__transfer_orange_ci": 95,
    },
    required: true,
  })
  kpi: Record<KpiEnum, any>;
}
