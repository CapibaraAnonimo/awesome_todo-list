import { Task } from '../entities/task.entity';
import { TaskStatus } from '../taskStatus';

export class TaskResponse {
  private id: string;

  private title: string;

  private description: string;

  private status: TaskStatus;

  private user_id: string;

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

  public static of(task: Task): TaskResponse {
    return new TaskResponse(
      task.id,
      task.title,
      task.description,
      task.status,
      task.user.id,
    );
  }
}
