import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsISO8601, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

import { KpiEnum } from '@app/enums/kpi.enum';


export class UpdateKpi {
  @ApiProperty({
    description: `Id of the KPI to update`,
    example: 2,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    description: `Date of the KPI`,
    example: `2023-02-23T09:28:47.081Z`,
  })
  @IsOptional()
  @IsISO8601()
  date?: string;

  @ApiProperty({
    description: `Type of the KPI`,
    example: 'volume_xof',
    enum: KpiEnum,
  })
  @IsOptional()
  @IsEnum(KpiEnum)
  type?: KpiEnum;

  @ApiProperty({
    description: `Value of the KPI`,
    example: { value: 2 },
  })
  @IsObject()
  @IsOptional()
  value?: any;
}
