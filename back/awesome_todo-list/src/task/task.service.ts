import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { TaskStatus } from './taskStatus';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(
      new Task(
        createTaskDto.title,
        createTaskDto.description,
        await this.userRepository.findOneBy({ id: createTaskDto.user_id }),
      ),
    );
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: string) {
    return this.taskRepository.findOneBy({ id });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    let task = await this.taskRepository.findOneBy({ id });

    for (const [key, value] of Object.entries(updateTaskDto)) {
      if (value !== undefined) {
        task[key] = value;
      }
    }

    return this.taskRepository.save(task);
  }

  async updateStatus(id: string, status: UpdateTaskStatusDto) {
    let task = await this.taskRepository.findOneBy({ id });
    task.status = status.status;

    return this.taskRepository.save(task);
  }

  remove(id: string) {
    return this.taskRepository.delete(id);
  }
}
