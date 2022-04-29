import { IsEnum } from 'class-validator';
import { TaskStatus } from '../../../common/enums/tasks-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
