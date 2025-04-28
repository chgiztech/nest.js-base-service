import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleEntity } from '@entity';
import { UserDto } from './user.dto';

export class RoleDto implements RoleEntity {
  @ApiProperty()
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose()
  description: string | null;

  @ApiProperty()
  @IsBoolean()
  @Expose()
  isDeleted: boolean;

  @ApiProperty({
    type: () => UserDto,
    isArray: true,
    required: false,
  })
  @IsNotEmptyObject({ nullable: true }, { each: true })
  @IsOptional()
  @Type(() => UserDto)
  @Expose()
  users?: UserDto[];

  @ApiProperty()
  @IsDate()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @Expose()
  updatedAt: Date;
}
