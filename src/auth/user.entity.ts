import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  first_name: string;

  @Column({ unique: true })
  last_name: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.users, { eager: true })
  @Exclude({ toPlainOnly: true })
  tasks: Task[];
}
