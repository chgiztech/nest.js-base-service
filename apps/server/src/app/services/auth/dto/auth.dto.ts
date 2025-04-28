import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthRequestDto {
  @ApiProperty({ description: 'username пользователя' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Код с двухфакторной аутентификатора',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  verificationCode?: string;
}

export class GenerateRefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class JwtResponseDto {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsNumber()
  expireTime: number;
}
