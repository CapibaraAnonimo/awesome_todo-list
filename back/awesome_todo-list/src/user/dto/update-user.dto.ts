import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * DTO for updating an existing user.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
