import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return UserResponse.of(await this.userService.create(createUserDto));
  }

  @Get()
  async findAll() {
    const users: User[] = await this.userService.findAll()
    return users.map(user => UserResponse.of(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return UserResponse.of(await this.userService.findOne(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return UserResponse.of(await this.userService.update(id, updateUserDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
