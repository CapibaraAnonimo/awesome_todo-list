import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEnum,
  Length,
} from 'class-validator';

/**
 * DTO for creating a new task.
 * This DTO ensures that the data sent to the API for creating a task
 * adheres to the necessary validation rules.
 */
export class CreateTaskDto {
  /**
   * The title of the task.
   */
  @IsString()
  @MaxLength(60, { message: 'Title must have 60 or less characters' })
  @IsNotEmpty({ message: 'Title is mandatory' })
  title: string;

  /**
   * The description of the task.
   */
  @IsString()
  @MinLength(5, { message: 'Description must have 60 or less characters' })
  @IsNotEmpty({ message: 'Description is mandatory' })
  description: string;

  //@IsEnum(TaskStatus, { message: 'Status must be part of TaskStatus' })
  //state: TaskStatus;

  /**
   * The ID of the user to whom the task is assigned.
   */
  @IsString()
  @Length(36, 36, { message: 'User ID must match UUID length' })
  @IsNotEmpty({ message: 'Description is mandatory' })
  user_id: string;
}
