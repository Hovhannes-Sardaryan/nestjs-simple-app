import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Task' })
  @ApiOkResponse({ status: HttpStatus.OK, type: GetTasksFilterDto })
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() users: Users,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, users);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Product by ID' })
  @ApiOkResponse({ status: HttpStatus.OK, type: GetTasksFilterDto })
  getTaskById(@Param('id') id: number, @GetUser() users: Users): Promise<Task> {
    return this.tasksService.getTaskById(id, users);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create Product' })
  @ApiOkResponse({ status: HttpStatus.OK, type: CreateTaskDto })
  @ApiBody({ type: CreateTaskDto })
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() users: Users,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, users);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete Product' })
  @ApiOkResponse({ status: HttpStatus.OK })
  deleteTask(@Param('id') id: number, @GetUser() users: Users): Promise<void> {
    return this.tasksService.deleteTask(id, users);
  }

  @Patch('/:id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Edit Product' })
  @ApiOkResponse({ status: HttpStatus.OK, type: UpdateTaskStatusDto })
  @ApiBody({ type: UpdateTaskStatusDto })
  updateTaskStatus(
    @Param('id') id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() users: Users,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, users);
  }
}
