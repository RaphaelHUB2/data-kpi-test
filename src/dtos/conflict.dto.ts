import { ApiProperty } from "@nestjs/swagger";


export class Conflict {
  @ApiProperty({
    description: `Error name`,
    example: 'Conflict exception',
    required: true,
  })
  error: string;


  @ApiProperty({
    description: `Error code`,
    example: 409,
    required: true,
  })
  statusCode: number;

}
