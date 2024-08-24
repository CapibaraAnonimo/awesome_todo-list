import { User } from '../entities/user.entity';

/**
 * DTO for User Response.
 */
export class UserResponse {
  /**
   * The unique identifier of the user.
   */
  private id: string;

  /**
   * The name of the user.
   */
  private name: string;

  /**
   * The username of the user.
   */
  private username: string;

  /**
   * The email of the user.
   */
  private email: string;

  /**
   * Creates an instance of UserResponse.
   *
   * @param {string} id - The unique identifier of the user.
   * @param {string} name - The name of the user.
   * @param {string} username - The username of the user.
   * @param {string} email - The email of the user.
   */
  constructor(id: string, name: string, username: string, email: string) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
  }

  /**
   * Creates a UserResponse object from a User entity.
   *
   * @param {User} user - The user entity from which to create the response.
   * @returns {UserResponse} - A new instance of UserResponse populated with user data.
   */
  public static of(user: User): UserResponse {
    return new UserResponse(user.id, user.name, user.username, user.email);
  }
}
