import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator'; // IsEnum,
import { TaskStatus } from '../../../common/enums/tasks-status.enum';

export class GetTasksFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  // @IsEnum(TaskStatus)
  readonly status?: TaskStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly search?: string;
}
