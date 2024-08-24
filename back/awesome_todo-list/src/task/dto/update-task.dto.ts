import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

/**
 * DTO for updating an existing task.
 */
export class UpdateTaskDto extends PartialType(
  OmitType(CreateTaskDto, ['user_id'] as const),
) {}
