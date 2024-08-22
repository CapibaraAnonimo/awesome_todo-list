import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponse } from './dto/task-response.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './taskStatus';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return TaskResponse.of(await this.taskService.create(createTaskDto));
  }

  @Get()
  async findAll() {
    const tasks: Task[] = await this.taskService.findAll();
    //return tasks;
    return tasks.map((task) => TaskResponse.of(task));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return TaskResponse.of(await this.taskService.findOne(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return TaskResponse.of(await this.taskService.update(id, updateTaskDto));
  }

  @Patch('status/:id')
  async updateStatus(@Param('id') id: string, @Body() status: UpdateTaskStatusDto) {
    return TaskResponse.of(await this.taskService.updateStatus(id, status));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
