import { IsOptional, IsString } from 'class-validator'; // IsEnum,
import { TaskStatus } from '../tasks-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsString()
  // @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
