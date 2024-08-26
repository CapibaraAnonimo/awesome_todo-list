import { User } from '../entities/user.entity';

/**
 * DTO for User Response.
 */
export class LoginResponse {
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
   * The JWT of the user.
   */
  private access_token: string;

  /**
   * Creates an instance of UserResponse.
   *
   * @param {string} id - The unique identifier of the user.
   * @param {string} name - The name of the user.
   * @param {string} username - The username of the user.
   * @param {string} email - The email of the user.
   * @param {string} access_token- The JWT of the user.
   */
  constructor(
    id: string,
    name: string,
    username: string,
    email: string,
    access_token: string,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.access_token = access_token;
  }

  /**
   * Creates a UserResponse object from a User entity.
   *
   * @param {User} user - The user entity from which to create the response.
   * @param {string} access_token - The JWT of the user.
   * @returns {UserResponse} - A new instance of UserResponse populated with user data.
   */
  public static of(user: User, access_token: string): LoginResponse {
    return new LoginResponse(
      user.id,
      user.name,
      user.username,
      user.email,
      access_token,
    );
  }
}
