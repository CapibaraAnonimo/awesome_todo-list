import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { TaskStatus } from './taskStatus';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

/**
 * Service that handles business logic related to tasks.
 * It interacts with the Task repository for data operations.
 */
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new task and saves it in the database.
   *
   * @param {CreateTaskDto} createTaskDto - DTO containing task creation details.
   * @returns {Task} The created task.
   */
  async create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(
      new Task(
        createTaskDto.title,
        createTaskDto.description,
        await this.userRepository.findOneBy({ id: createTaskDto.user_id }),
      ),
    );
  }

  /**
   * Retrieves all tasks from the database.
   *
   * @returns {Promise<Task[]>}  A promise that resolves to an array of tasks.
   */
  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  /**
   * Retrieves all tasks associated with a specific user.
   *
   * @param {string} id - The ID of the user whose tasks are to be retrieved.
   * @returns {Promise<Task[]>} A promise that resolves to an array of tasks associated with the user.
   */
  findAllByUser(id: string): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task._user', 'user')
      .where('user.id = :id', { id })
      .getMany();
    //return this.taskRepository.find({ where: { user: { id: id } } });
    // return this.taskRepository.find({
    //   where: {
    //     user.id: id
    //   },
    // });
  }

  /**
   * Retrieves a single task by its ID.
   *
   * @param {string} id - The ID of the task to retrieve.
   * @returns {Task} The found task.
   * @throws {NotFoundException} NotFoundException if no task is found with the given ID.
   */
  async findOne(id: string) {
    let task = await this.taskRepository.findOneBy({ id });
    console.log(task);
    if (task !== null) {
      return task;
    } else {
      throw new NotFoundException('No task was found');
    }
  }

  /**
   * Updates an existing task with new data.
   *
   * @param {string} id - The ID of the task to update.
   * @param {UpdateTaskDto} updateTaskDto - DTO containing the updated task details.
   * @returns {Task} The updated task.
   * @throws {NotFoundException} NotFoundException if no task is found with the given ID.
   */
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    let task = await this.taskRepository.findOneBy({ id });

    if (task !== null) {
      for (const [key, value] of Object.entries(updateTaskDto)) {
        if (value !== undefined) {
          task[key] = value;
        }
      }

      return this.taskRepository.save(task);
    } else {
      throw new NotFoundException('No task was found');
    }
  }

  /**
   * Updates the status of a specific task.
   *
   * @param {string} id - The ID of the task to update.
   * @param {UpdateTaskStatusDto} status - DTO containing the new status of the task.
   * @returns {Promise<Task>} The updated task.
   * @throws {NotFoundException} NotFoundException if no task is found with the given ID.
   */
  async updateStatus(id: string, status: UpdateTaskStatusDto) {
    let task = await this.taskRepository.findOneBy({ id });

    if (task !== null) {
      task.status = status.status;

      return this.taskRepository.save(task);
    } else {
      throw new NotFoundException('No task was found');
    }
  }

  /**
   * Deletes a task by its ID.
   *
   * @param {String} id - The ID of the task to delete.
   * @returns A promise that resolves when the task is deleted.
   */
  remove(id: string) {
    return this.taskRepository.delete(id);
  }
}
