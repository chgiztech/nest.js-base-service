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
import { UserEntity } from '@entity';
import { PassportDto } from './passport.dto';
import { RoleDto } from './role.dto';

export class UserDto implements UserEntity {
  @ApiProperty()
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty()
  @IsString()
  @Expose()
  username: string;

  @ApiProperty()
  @IsString()
  @Expose()
  email: string;

  @ApiProperty()
  @IsString()
  @Expose()
  firstName: string;

  @ApiProperty()
  @IsString()
  @Expose()
  lastName: string;

  @ApiProperty()
  @IsBoolean()
  @Expose()
  isDeleted: boolean;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Expose()
  lastFailedLoginTime: Date | null;

  @ApiProperty({
    type: () => PassportDto,
  })
  @IsNotEmptyObject({ nullable: true })
  @Type(() => PassportDto)
  @IsOptional()
  @Expose()
  passport?: PassportDto;

  @ApiProperty({
    type: () => RoleDto,
  })
  @IsNotEmptyObject({ nullable: true })
  @Type(() => RoleDto)
  @IsOptional()
  @Expose()
  role?: RoleDto;

  @ApiProperty()
  @IsDate()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @Expose()
  updatedAt: Date;
}
