import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PassportEntity } from '@entity';
import { UserDto } from './user.dto';

export class PassportDto implements PassportEntity {
  @ApiProperty()
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty()
  @IsDate()
  @Expose()
  expiredAt: Date;

  @ApiProperty()
  @IsString()
  @Expose()
  secretToken: string;

  @ApiProperty()
  @IsString()
  @Expose()
  password: string;

  @ApiProperty({
    type: () => UserDto,
  })
  @IsNotEmptyObject({ nullable: true })
  @Type(() => UserDto)
  @IsOptional()
  @Expose()
  user?: UserDto;

  @ApiProperty()
  @IsDate()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @Expose()
  updatedAt: Date;
}
