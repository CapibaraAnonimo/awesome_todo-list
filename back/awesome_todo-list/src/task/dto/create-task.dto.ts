import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEnum,
  Length,
} from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @MaxLength(60, { message: 'Title must have 60 or less characters' })
  @IsNotEmpty({ message: 'Title is mandatory' })
  title: string;

  @IsString()
  @MinLength(5, { message: 'Description must have 60 or less characters' })
  @IsNotEmpty({ message: 'Description is mandatory' })
  description: string;

  @IsEnum(TaskStatus, { message: 'Status must be part of TaskStatus' })
  state: keyof typeof TaskStatus;

  @IsString()
  @Length(36, 36, { message: 'User ID must match UUID length' })
  @IsNotEmpty({ message: 'Description is mandatory' })
  user_id: string;
}
