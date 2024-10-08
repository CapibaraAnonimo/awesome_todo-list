import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { SignInDto } from './dto/signin-dto';
import { Public } from './auth.guard';

/**
 * Controller for handling user-related requests.
 * Defines the routes and methods for CRUD operations on users.
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user.
   *
   * @param {CreateUserDto} createUserDto - DTO containing the user creation details.
   * @returns {Promise<UserResponse>} The newly created user, formatted as a UserResponse.
   */
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return UserResponse.of(await this.userService.create(createUserDto));
  }

  /**
   * Retrieves a list of all users.
   *
   * @returns {Promise<UserResponse[]>} An array of all users, each formatted as a UserResponse.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const users: User[] = await this.userService.findAll();
    return users.map((user) => UserResponse.of(user));
  }

  /**
   * Retrieves a single user by ID.
   *
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<UserResponse>} The user with the specified ID, formatted as a UserResponse.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return UserResponse.of(await this.userService.findOne(id));
  }

  /**
   * Updates an existing user by ID.
   *
   * @param {string} id - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - DTO containing the updated user details.
   * @returns {Promise<UserResponse>} The updated user, formatted as a UserResponse.
   */
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return UserResponse.of(await this.userService.update(id, updateUserDto));
  }

  /**
   * Deletes a user by ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns An empty response, indicating the user was successfully deleted.
   */
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }
}
