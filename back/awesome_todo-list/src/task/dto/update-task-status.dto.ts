import { IsEnum } from 'class-validator';
import { TaskStatus } from '../taskStatus';

/**
 * DTO for updating the status of a task.
 */
export class UpdateTaskStatusDto {
  /**
   * The status of the task.
   */
  @IsEnum(TaskStatus, {
    message: 'Status must be part of TaskStatus.',
  })
  status: TaskStatus;
}
