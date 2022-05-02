import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Task } from 'src/db/entity/task.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Users {
  @ApiProperty({ example: 1, description: 'Primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Name', description: 'Name' })
  @Column({ unique: true })
  name: string;

  // @ApiProperty({ example: 'Surname', description: 'Surname' })
  // @Column({ unique: true })
  // last_name: string;

  @ApiProperty({ example: 'example@example.com', description: 'Email' })
  @Column({ unique: true })
  email: string;


  @ApiProperty({ example: 'password', description: 'Password (At least 8 characters)' })
  @Column()
  password: string;

  @ApiProperty({ example: '[]', description: 'Tasks (Array of objects)' })
  @OneToMany(() => Task, (task) => task.users, { eager: true })
  @Exclude({ toPlainOnly: true })
  tasks: Task[];

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
