import { UserEntity } from '@entity';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Request } from 'express';
import ms from 'ms';
import { AppConfig } from '../../../config/global.config';
import { UsersService } from '../users/users.service';
import { JwtPayloadInterface } from './auth.type';
import { GenerateRefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private appConf: AppConfig,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    req: Request,
    username: string,
    pass: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.findByUsername(username);

    if (!user?.passport?.password) {
      throw new NotFoundException('NOT_FOUND');
    }

    const isMatch = await compare(pass, user.passport.password);

    if (!isMatch) {
      await this.usersService.updateLastFailedLoginTime(user.id);
      throw new UnauthorizedException('WRONG_PASS');
    }

    const { passport, ...result } = user;

    return result;
  }

  async getJwt(user: UserEntity) {
    const payload: JwtPayloadInterface = {
      username: user.username,
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
    };

    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refreshToken: string = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.appConf.JWT_REFRESH_SECRET,
      algorithm: 'HS256',
    });

    return {
      accessToken,
      refreshToken,
      expireTime: ms('15m'),
    };
  }

  async login(req: Request, user: UserEntity) {
    const jwt = await this.getJwt(user);
    return jwt;
  }

  async generateRefreshToken(dto: GenerateRefreshTokenDto) {
    const { refreshToken } = dto;
    const verified = this.jwtService.verify(refreshToken, {
      secret: this.appConf.JWT_REFRESH_SECRET,
      algorithms: ['HS256'],
    });
    if (!verified) {
      throw new UnauthorizedException('NOT_AUTHED');
    }
    const payload: JwtPayloadInterface = this.jwtService.decode(
      refreshToken,
    ) as JwtPayloadInterface;

    const user = await this.usersService.findById(payload.id);

    if (!user) {
      throw new ForbiddenException('USER_BLOCKED');
    }

    const jwt = await this.getJwt(user);
    return jwt;
  }
}
