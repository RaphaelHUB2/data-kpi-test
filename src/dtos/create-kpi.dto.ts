import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsISO8601, IsObject } from 'class-validator';

import { KpiEnum } from '@app/enums/kpi.enum';


export class CreateKpi {
  @ApiProperty({
    description: `Date of the KPI`,
    example: `2023-02-23T09:28:47.081Z`,
    required: true,
  })
  @IsISO8601()
  date: string;

  @ApiProperty({
    description: `Type of the KPI`,
    example: 'volume_xof',
    required: true,
    enum: KpiEnum,
  })
  @IsEnum(KpiEnum)
  type: KpiEnum;

  @ApiProperty({
    description: `Value of the KPI`,
    example: { value: 2 },
    required: true,
  })
  @IsObject()
  value: any;
}
