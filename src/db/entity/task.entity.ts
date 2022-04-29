import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { Users } from 'src/db/entity/user.entity';
import { TaskStatus } from '../../common/enums/tasks-status.enum';


@Entity()
export class Task {
  @ApiProperty({ example: 1, description: 'Primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'example', description: 'Title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'example', description: 'Decription' })
  @Column()
  description: string;

  @ApiProperty({ example: 'OPEN', description: 'Status' })
  @Column()
  status: TaskStatus;

  @ApiProperty({ example: '{}', description: 'Task Creator' })
  @ManyToOne((_type) => Users, (users) => users.tasks, { eager: false })
  users: Users;

  @ApiProperty({
    example: '2021-04-28 08:32:32.257207',
    description: 'Auto-Generated timestamp on creating a row',
  })
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    example: '2021-04-28 08:32:32.257207',
    description: 'Auto-Generated timestamp on updating a row',
  })
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;
}
