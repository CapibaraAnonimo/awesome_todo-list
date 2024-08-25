import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * User entity
 */
@Entity()
export class User {
  /**
   * Unique identifier for each User, generated as a UUID.
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
   * The name of the user.
   */
  @Column({ type: 'varchar', length: 30, name: 'name' })
  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  /**
   * The username of the user.
   */
  @Column({ type: 'varchar', length: 30 , name: 'username'})
  private _username: string;
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  /**
   * The password of the user.
   */
  @Column({ type: 'varchar', length: 15, name: 'password' })
  private _password: string;
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }

  /**
   * The email of the user.
   */
  @Column({ type: 'varchar', length: 30, name: 'email' })
  private _email: string;
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  /**
   * The list of tasks associated with the user.
   */
  @OneToMany(() => Task, (task: Task) => task.user)
  private _tasks: Task[];
  public get tasks(): Task[] {
    return this._tasks;
  }
  public set tasks(value: Task[]) {
    this._tasks = value;
  }

  /**
   * Constructor to initialize a new User instance.
   *
   * @param {string} name - The name of the user.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @param {string} email - The email of the user.
   */
  constructor(name: string, username: string, password: string, email: string) {
    this._name = name;
    this._username = username;
    this._password = password;
    this._email = email;
  }
}
