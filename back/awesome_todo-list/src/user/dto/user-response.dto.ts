import { Task } from 'src/task/entities/task.entity';
import { User } from '../entities/user.entity';

export class UserResponse {
  private id: string;

  private name: string;

  private username: string;

  private email: string;

  private tasks: Task[];

  constructor(
    id: string,
    name: string,
    username: string,
    email: string,
    tasks: Task[],
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.tasks = tasks;
  }

  public static of(user: User): UserResponse {
    return new UserResponse(
      user.id,
      user.name,
      user.username,
      user.email,
      user.tasks,
    );
  }
}
