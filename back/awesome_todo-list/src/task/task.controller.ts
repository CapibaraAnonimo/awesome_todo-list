import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

/**
 * Controller for handling task-related requests.
 * Defines the routes and methods for CRUD operations on tasks.
 */
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Creates a new task.
   * @param {CreateTaskDto} createTaskDto The DTO containing data for creating a new task.
   * @returns {TaskResponseDto} The created task wrapped in a TaskResponseDto.
   */
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return TaskResponseDto.of(await this.taskService.create(createTaskDto));
  }

  /**
   * Retrieves all tasks.
   * @returns {TaskResponseDto[]} An array of tasks wrapped in TaskResponseDto.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const tasks: Task[] = await this.taskService.findAll();
    return tasks.map((task) => TaskResponseDto.of(task));
  }

  /**
   * Retrieves all tasks associated with a specific user.
   * @param {string} id The ID of the user for whom to retrieve tasks.
   * @returns {TaskResponseDto[]} An array of tasks for the specified user, wrapped in TaskResponseDto.
   */
  @HttpCode(HttpStatus.OK)
  @Get('user/:id')
  async findAllByUser(@Param('id') id: string) {
    const tasks: Task[] = await this.taskService.findAllByUser(id);
    return tasks.map((task) => TaskResponseDto.of(task));
  }

  /**
   * Retrieves a specific task by its ID.
   * @param {string} id The ID of the task to retrieve.
   * @returns {TaskResponseDto} The task with the specified ID, wrapped in TaskResponseDto.
   */
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return TaskResponseDto.of(await this.taskService.findOne(id));
  }

  /**
   * Updates a task with new data.
   * @param {string} id The ID of the task to update.
   * @param {UpdateTaskDto} updateTaskDto The DTO containing updated data for the task.
   * @returns {TaskResponseDto} The updated task wrapped in TaskResponseDto.
   */
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return TaskResponseDto.of(await this.taskService.update(id, updateTaskDto));
  }

  /**
   * Updates the status of a task.
   * @param {string} id The ID of the task to update.
   * @param {UpdateTaskStatusDto} status The DTO containing the new status for the task.
   * @returns {TaskResponseDto} The updated task with the new status, wrapped in TaskResponseDto.
   */
  @HttpCode(HttpStatus.OK)
  @Patch('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() status: UpdateTaskStatusDto,
  ) {
    return TaskResponseDto.of(await this.taskService.updateStatus(id, status));
  }

  /**
   * Deletes a task by its ID.
   * @param {string} id The ID of the task to delete.
   * @returns A promise indicating the completion of the deletion operation.
   */
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
