import { ApiProperty } from "@nestjs/swagger";


export class Unauthorized {
  @ApiProperty({
    description: `Error name`,
    example: 'Unauthorized',
    required: true,
  })
  error: string;


  @ApiProperty({
    description: `Error code`,
    example: 401,
    required: true,
  })
  statusCode: number;

}
