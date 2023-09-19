import { ApiProperty } from "@nestjs/swagger";


export class BadRequest {
  @ApiProperty({
    description: `Error name`,
    example: 'Bad Request',
    required: true,
  })
  error: string;

  @ApiProperty({
    description: `Error message`,
    example: 'date must be a valid ISO 8601 date string',
    required: true,

  })
  message: string;

  @ApiProperty({
    description: `Error code`,
    example: 400,
    required: true,
  })
  statusCode: number;

}
