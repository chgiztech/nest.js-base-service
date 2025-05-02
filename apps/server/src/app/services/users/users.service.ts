import { PassportEntity, PassportHistoryEntity, UserEntity } from '@entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as passwordGenerator from 'generate-password';
import * as speakeasy from 'speakeasy';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  UserCreateRequestDto,
  UserListRequestDto,
  UserUpdateRequestDto,
} from './dto/user.dto';

const relations = ['passport', 'role'];

@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(PassportHistoryEntity)
    private readonly passportHistoryRepo: Repository<PassportHistoryEntity>,
  ) {}

  async findAll(dto: UserListRequestDto): Promise<UserEntity[]> {
    const queryBuilder = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.passport', 'passport')
      .leftJoinAndSelect('user.role', 'role')
      .limit(dto.limit)
      .offset(dto.offset)
      .orderBy('user.id', 'DESC');

    if (dto.name) {
      queryBuilder.andWhere('user.name ILIKE :name', {
        name: `%${dto.name}%`,
      });
    }

    if (dto.isDeleted) {
      queryBuilder.andWhere('user.isDeleted = :isDeleted', {
        isDeleted: dto.isDeleted,
      });
    }

    const result = await queryBuilder.getMany();
    return result;
  }

  async findById(id: number): Promise<UserEntity> {
    const result = await this.userRepo.findOne({
      where: { id },
      relations,
    });

    if (!result) {
      throw new NotFoundException('User not found');
    }

    if (result?.isDeleted) {
      throw new BadRequestException('USER_BLOCKED');
    }
    return result;
  }

  async createUser(dto: UserCreateRequestDto): Promise<UserEntity> {
    const existUser = await this.userRepo.findOne({
      where: [
        {
          username: dto.username,
        },
        { email: dto.email },
      ],
    });

    if (existUser) {
      throw new BadRequestException('User with data already exists');
    }

    const secretToken = speakeasy.generateSecret({ length: 20 }).base32;

    const password = this.generatePassword();

    const passwordHash = await bcrypt.hash(password, 8);

    const queryRunner = this.dataSource.createQueryRunner();

    let createResult;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      createResult = await queryRunner.manager.insert(UserEntity, dto);

      await queryRunner.manager.insert(PassportEntity, {
        password: passwordHash,
        secretToken: secretToken,
        user: createResult.identifiers[0].id,
      });

      await queryRunner.manager.insert(PassportHistoryEntity, {
        password: passwordHash,
        user: { id: createResult.identifiers[0].id },
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log('Transaction err: ', err);
      throw new BadRequestException(err);
    } finally {
      await queryRunner.release();
    }

    const user = await this.userRepo.findOne({
      where: { id: createResult.identifiers[0].id },
      relations,
    });
    user.passport.password = password;

    return user;
  }

  async updateUser(id: number, dto: UserUpdateRequestDto): Promise<UserEntity> {
    const existUser = await this.userRepo.findOne({
      where: { id },
    });

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    if (existUser?.isDeleted) {
      throw new BadRequestException('USER_BLOCKED');
    }

    await this.userRepo.save({
      id: id,
      ...dto,
    });

    const result = await this.userRepo.findOne({
      where: { id },
      relations,
    });

    return result;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const result = await this.userRepo.findOne({
      where: { username },
      relations,
    });
    if (result?.isDeleted) {
      throw new UnauthorizedException('USER_BLOCKED');
    }
    return result;
  }

  async updateLastFailedLoginTime(id: number): Promise<void> {
    await this.userRepo.update(
      { id },
      {
        lastFailedLoginTime: new Date(),
      },
    );
  }

  async removeUser(id: number) {
    const existUser = await this.userRepo.findOne({
      where: { id },
    });

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    if (existUser?.isDeleted) {
      throw new BadRequestException('USER_BLOCKED');
    }
    await this.userRepo.update(id, { isDeleted: true });
  }

  private generatePassword() {
    const generatedPassword = passwordGenerator.generate({
      symbols: true,
      uppercase: true,
      numbers: true,
      lowercase: true,
      strict: true,
    });

    return generatedPassword.match(/[@#!$%&*]/)
      ? generatedPassword
      : `${generatedPassword}${
          '@#!$%&*'.split('')[Math.floor(Math.random() * '@#!$%&*'.length)]
        }`;
  }
}
