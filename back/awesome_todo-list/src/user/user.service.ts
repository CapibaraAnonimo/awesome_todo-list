import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signin-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response.dto';

/**
 * The UserService handles all operations related to users,
 * including creating, finding, updating, and deleting user records.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Creates a new user record in the database.
   *
   * @param {CreateUserDto} createUserDto - The DTO containing the details for the new user.
   * @returns {Promise<User>} The newly created User entity.
   */
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(
      new User(
        createUserDto.name,
        createUserDto.username,
        createUserDto.password,
        createUserDto.email,
      ),
    );
  }

  /**
   * Retrieves all users from the database.
   *
   * @returns {Promise<User[]>} A promise that resolves to an array of User entities.
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Retrieves a single user by their ID.
   *
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User>} A promise that resolves to the User entity if found.
   * @throws {NotFoundException} NotFoundException if no user is found with the given ID.
   */
  async findOne(id: string): Promise<User> {
    let user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
    if (user !== null) {
      return user;
    } else {
      throw new NotFoundException('No user was found');
    }
  }

  /**
   * Updates an existing user record.
   *
   * @param {string} id - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - The data transfer object containing the updated user details.
   * @returns {Promise<User>} A promise that resolves to the updated User entity.
   * @throws {NotFoundException} NotFoundException if no user is found with the given ID.
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();

    if (user !== null) {
      for (const [key, value] of Object.entries(updateUserDto)) {
        if (value !== undefined) {
          user[key] = value;
        }
      }

      return this.userRepository.save(user);
    } else {
      throw new NotFoundException('No user was found');
    }
  }

  /**
   * Deletes a user by their ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns A promise that resolves to the result of the delete operation.
   */
  remove(id: string) {
    // return this.userRepository
    //   .createQueryBuilder('user')
    //   .delete()
    //   .where('user.id = :id', { id: id })
    //   .execute();
    return this.userRepository.delete(id);
  }

  async signIn(singInDto: SignInDto): Promise<LoginResponse> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: singInDto.username })
      .getOne();
    if (user?.password !== singInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return LoginResponse.of(user, await this.jwtService.signAsync(payload));
  }
}
