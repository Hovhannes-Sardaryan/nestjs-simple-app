import { Users } from 'src/db/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './api-response/get-task-filter.dto';
import { Task } from '../../db/entity/task.entity';
import { TaskStatus } from '../../common/enums/tasks-status.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto, users: Users): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ users });

    if (status) query.andWhere('(LOWER(task.status) = LOWER(:status))', { status });

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto, users: Users) {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      users,
    });
    await this.save(task);
    return task;
  }
}
