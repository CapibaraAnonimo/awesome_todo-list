import { Task } from '../entities/task.entity';
import { TaskStatus } from '../taskStatus';

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
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.user_id = user_id;
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
    );
  }
}
