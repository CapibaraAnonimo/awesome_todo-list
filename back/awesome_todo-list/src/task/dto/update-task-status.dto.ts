import { IsEnum } from 'class-validator';
import { TaskStatus } from '../taskStatus';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: 'Status must be part of TaskStatus.',
  })
  status: TaskStatus;
}
