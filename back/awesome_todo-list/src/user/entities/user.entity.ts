import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  @Column({ type: 'varchar', length: 30 })
  private _username: string;
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  @Column({ type: 'varchar', length: 15 })
  private _password: string;
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }

  @Column({ type: 'varchar', length: 30 })
  private _email: string;
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  @OneToMany(() => Task, (task: Task) => task.user)
  private _tasks: Task[];
  public get tasks(): Task[] {
    return this._tasks;
  }
  public set tasks(value: Task[]) {
    this._tasks = value;
  }


  constructor(
    name: string,
    username: string,
    password: string,
    email: string,
  ) {
    this._name = name;
    this._username = username;
    this._password = password;
    this._email = email;
  }
}
