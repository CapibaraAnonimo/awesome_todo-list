import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/validation/unique/is-unique-decorator';

const passwordRegEx =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

/**
 * DTO for creating a new user.
 * This class is used to validate the input data when a new user is created.
 */
export class CreateUserDto {
  /**
   * The user's full name.
   */
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @MaxLength(30, { message: 'Name must have 30 or less characters' })
  @IsNotEmpty({ message: 'Name is mandatory' })
  name: string;

  /**
   * The user's unique username.
   */
  @IsNotEmpty({ message: 'Username is mandatory' })
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @MaxLength(30, { message: 'Username must have 30 or less characters' })
  @IsAlphanumeric('es-ES', {
    message: 'Username only allows alpha numeric chars.',
  })
  @IsUnique({ tableName: 'user', column: '_username' })
  username: string;

  /**
   * The user's password.
   * Password must contain one digit from 1 to 9,
   * one lowercase letter, one uppercase letter,
   * one special character, no space,
   * and it must be 8-16 characters long.
   */
  @IsNotEmpty({ message: 'Password is mandatory' })
  @Matches(passwordRegEx, {
    message: `Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.`,
  })
  password: string;

  /**
   * The user's email address.
   */
  @IsNotEmpty({ message: 'Email is mandatory' })
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;
}
