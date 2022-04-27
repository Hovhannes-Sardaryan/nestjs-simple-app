import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { Users } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, users: Users): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, users);
  }

  async getTaskById(id: number, users: Users): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id, users });
    console.log('fount ', found);
    if (!found) throw new NotFoundException(`Task with id: ${id} not found!`);

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, users: Users): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, users);
  }

  async deleteTask(id: number, users: Users): Promise<void> {
    const result = await this.tasksRepository.delete({ id, users });
    if (result.affected === 0)
      throw new NotFoundException(`Task with id: ${id} not found!`);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: Users,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
