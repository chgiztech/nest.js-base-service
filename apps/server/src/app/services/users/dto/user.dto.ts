import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { transformJson } from '@utils';
import { UserDto } from '@dto';

export class UserListRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Expose()
  name?: string;

  @ApiProperty({ required: false })
  @Transform(transformJson)
  @IsBoolean()
  @IsOptional()
  @Expose()
  isDeleted?: boolean;

  @ApiProperty({ required: false })
  @Transform(transformJson)
  @IsNumber()
  @IsOptional()
  @Expose()
  limit?: number;

  @ApiProperty({ required: false })
  @Transform(transformJson)
  @IsNumber()
  @IsOptional()
  @Expose()
  offset?: number;
}

export class UserCreateRequestDto extends PickType(UserDto, [
  'username',
  'email',
  'firstName',
  'lastName',
] as const) {
  @ApiProperty()
  @IsString()
  @Expose()
  password: string;
}

export class UserUpdateRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Expose()
  username?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Expose()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Expose()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Expose()
  lastName?: string;
}
