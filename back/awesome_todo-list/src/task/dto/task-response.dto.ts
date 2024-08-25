import { Expose, plainToInstance, Transform } from 'class-transformer';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../taskStatus';
import { format } from 'date-fns';

/**
 * DTO for Task Response.
 */
export class TaskResponseDto {
  /**
   * Unique identifier of the task.
   */
  private id: string;

  /**
   * Title of the task.
   */
  private title: string;

  /**
   * Description of the task.
   */
  private description: string;

  /**
   * Current status of the task.
   */
  private status: TaskStatus;

  /**
   * The date when the task was created.
   */
  private creationDate: string;

  /**
   * Unique identifier of the user associated with the task.
   */
  private user_id: string;

  /**
   * Constructs a TaskResponseDto object with the provided parameters.
   *
   * @param {string} id - The unique identifier of the task.
   * @param {string} title - The title of the task.
   * @param {string} description - The description of the task.
   * @param {TaskStatus} status - The current status of the task (enum TaskStatus).
   * @param {string} user_id - The unique identifier of the user associated with the task.
   */
  constructor(
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    user_id: string,
    creationDate: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.user_id = user_id;
    this.creationDate = creationDate.toLocaleDateString('es-Es', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  /**
   * Static factory method to create a TaskResponseDto from a Task entity.
   *
   * @param {Task} task - The Task entity from which to create the DTO.
   * @returns A new instance of TaskResponseDto.
   */
  public static of(task: Task): TaskResponseDto {
    return new TaskResponseDto(
      task.id,
      task.title,
      task.description,
      task.status,
      task.user.id,
      task.creationDate,
    );
  }
}
