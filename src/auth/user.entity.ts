import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
