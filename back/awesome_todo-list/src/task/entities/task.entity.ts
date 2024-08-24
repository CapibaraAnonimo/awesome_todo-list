import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../taskStatus';

/**
 * Task entity
 */
@Entity()
export class Task {
  /**
   * Unique identifier for each task, generated as a UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The title of the task.
   */
  @Column({ type: 'varchar', length: 60 })
  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  /**
   * The description of the task.
   */
  @Column({ type: 'varchar' })
  private _description: string;
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

  /**
   * The status of the task.
   */
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TO_DO })
  private _status: TaskStatus;
  public get status(): TaskStatus {
    return this._status;
  }
  public set status(value: TaskStatus) {
    this._status = value;
  }

  //There should be a way to make it work in deafault,
  //but since is a ManyToOne is not problematic to use eager
  /**
   * The user who is associated with the task.
   */
  @ManyToOne(() => User, (user: User) => user.tasks, { eager: true })
  private _user: User;
  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }

  /**
   * Constructs a new task instance with the given title, description, and associated user.
   *
   * @param {string} title - The title of the task.
   * @param {string} description - The description of the task.
   * @param {User} user - The user associated with this task.
   */
  constructor(title: string, description: string, user: User) {
    this.title = title;
    this.description = description;
    this.status = TaskStatus.TO_DO;
    this.user = user;
  }
}
