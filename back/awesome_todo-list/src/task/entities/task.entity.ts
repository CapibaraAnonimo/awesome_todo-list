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
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  /**
   * The title of the task.
   */
  @Column({ type: 'varchar', length: 60, name: 'title' })
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
  @Column({ type: 'varchar', name: 'description' })
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
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TO_DO,
    name: 'status',
  })
  private _status: TaskStatus;
  public get status(): TaskStatus {
    return this._status;
  }
  public set status(value: TaskStatus) {
    this._status = value;
  }

  /**
   * The date when the task was created.
   */
  @Column({ type: 'timestamp', name: 'creationDate' })
  private _creationDate: Date;
  public get creationDate(): Date {
    return this._creationDate;
  }
  public set creationDate(value: Date) {
    this._creationDate = value;
  }


  /**
   * The user who is associated with the task.
   */
  @ManyToOne(() => User, (user: User) => user.tasks)
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
    this.creationDate = new Date();
  }
}
