import { Body, Controller, HttpStatus, Post, BadRequestException, Get, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './api-response/auth-credentials.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { AppService } from './app.service';

import { AuthGuard } from '@nestjs/passport';
import { TasksService } from '../tasks/tasks.service';
import { GetTasksFilterDto } from '../tasks/api-response/get-task-filter.dto';
import { Users } from 'src/db/entity/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorators';
import { Task } from 'src/db/entity/task.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register' })
  async register(@Body() authCredentialsDto: AuthCredentialsDto): Promise<object> {
    return await this.authService.registerUser(authCredentialsDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<object> {
    try {
      return await this.authService.login(authCredentialsDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

// return await this.authService.authenticateUser(authenticateRequest);
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() users: Users,
  ): Promise<Task[]>  {
    return this.taskService.getTasks(filterDto, users);
  }
}
