import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../taskStatus';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 60 })
  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  @Column({ type: 'varchar' })
  private _description: string;
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

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
  @ManyToOne(() => User, (user: User) => user.tasks, { eager: true })
  private _user: User;
  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }

  constructor(title: string, description: string, user: User) {
    this.title = title;
    this.description = description;
    this.status = TaskStatus.TO_DO;
    this.user = user;
  }
}
