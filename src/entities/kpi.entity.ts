import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { KpiEnum } from '../enums/kpi.enum';


@Entity()
export class KPI {
  @ApiProperty({
    description: `Automatic generated ID`,
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: `Date of the KPI`,
    example: '2023-02-23T09:28:47.081Z',
  })
  @Column('timestamptz')
  date: string;

  @ApiProperty({
    description: `Type of the KPI`,
    enum: KpiEnum,
    example: 'volume_xof',
  })
  @Column({
    type: 'enum',
    enum: KpiEnum,
  })
  type: KpiEnum;

  @ApiProperty({
    description: `Data for that KPI`,
    example: { value: 2 },
  })
  @Column('jsonb')
  value: any;
}
