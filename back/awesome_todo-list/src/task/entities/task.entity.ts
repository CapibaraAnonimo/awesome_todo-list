import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  private _description: string;
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

  private _status: keyof typeof TaskStatus;
  public get status(): keyof typeof TaskStatus {
    return this._status;
  }
  public set status(value: keyof typeof TaskStatus) {
    this._status = value;
  }

  @ManyToOne(() => User, (user) => user.tasks)
  private _user: User;
  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }

  constructor(id: string, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}

export enum TaskStatus {
  TO_DO = 'TO-DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
