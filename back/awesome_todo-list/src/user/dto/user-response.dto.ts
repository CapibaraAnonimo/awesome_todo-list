import { User } from '../entities/user.entity';

export class UserResponse {
  private id: string;

  private name: string;

  private username: string;

  private email: string;

  constructor(
    id: string,
    name: string,
    username: string,
    email: string,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
  }

  public static of(user: User): UserResponse {
    return new UserResponse(
      user.id,
      user.name,
      user.username,
      user.email
    );
  }
}
