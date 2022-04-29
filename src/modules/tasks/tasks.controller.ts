import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorators';
import { Users } from 'src/db/entity/user.entity';
import { CreateTaskDto } from './api-response/create-task.dto';
import { GetTasksFilterDto } from './api-response/get-task-filter.dto';
import { UpdateTaskStatusDto } from './api-response/update-task-status.dto';
import { Task } from '../../db/entity/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() users: Users,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, users);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number, @GetUser() users: Users): Promise<Task> {
    return this.tasksService.getTaskById(id, users);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() users: Users,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, users);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number, @GetUser() users: Users): Promise<void> {
    return this.tasksService.deleteTask(id, users);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() users: Users,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, users);
  }
}
