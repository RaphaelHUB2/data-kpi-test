import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { KpiEnum } from '../enums/kpi.enum';


@Entity()
@Unique(['type', 'language'])
export class KpiInfo {
  @ApiProperty({
    description: `Automatic generated ID`,
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

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
    description: `Title`,
    example: 'Success Rate - PAY-OUT Orange CI',
  })
  @Column('varchar')
  title: string;

  @ApiProperty({
    description: `Description`,
    example: 'This is the success rate for PAY-OUT using the Orange CI provider',
  })
  @Column('varchar')
  description: string;

  @ApiProperty({
    description: `Language`,
    example: 'en',
  })
  @Column('varchar')
  language: string;
}
