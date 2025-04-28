import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '@dto';
import {
  UserCreateRequestDto,
  UserListRequestDto,
  UserUpdateRequestDto,
} from './dto/user.dto';
import { UserEntity } from '@entity';

// Task 1: Basic API development

@ApiBearerAuth()
@ApiTags('users')
// Task 6 (optional): JWT authentication
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Find list of users',
  })
  @ApiResponse({
    type: () => UserDto,
    isArray: true,
  })
  @Get()
  async findAll(@Query() dto: UserListRequestDto): Promise<UserEntity[]> {
    return this.usersService.findAll(dto);
  }

  @ApiOperation({
    summary: 'Find user by id',
  })
  @ApiResponse({
    type: () => UserDto,
  })
  @Get('/:id')
  async findById(@Param('id') id: number) {
    return await this.usersService.findById(id);
  }

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    type: () => UserDto,
  })
  @Post()
  async createUser(@Body() dto: UserCreateRequestDto) {
    return await this.usersService.createUser(dto);
  }

  @ApiOperation({
    summary: 'Update user',
  })
  @ApiResponse({
    type: () => UserDto,
  })
  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() dto: UserUpdateRequestDto) {
    return await this.usersService.updateUser(id, dto);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @Delete('/:id')
  async removeUser(@Param('id') id: number) {
    return await this.usersService.removeUser(id);
  }
}
