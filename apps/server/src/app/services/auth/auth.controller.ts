import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  AuthRequestDto,
  GenerateRefreshTokenDto,
  JwtResponseDto,
} from './dto/auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Auth by login/password',
  })
  @ApiResponse({
    type: () => JwtResponseDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() _dto: AuthRequestDto) {
    const user = req.user;
    return this.authService.login(req, user);
  }

  @ApiOperation({
    description: 'Generate refresh token',
  })
  @ApiResponse({
    type: () => JwtResponseDto,
  })
  @Post('refresh-token')
  async generateRefreshToken(@Body() dto: GenerateRefreshTokenDto) {
    const result = await this.authService.generateRefreshToken(dto);
    return result;
  }
}
